/* New pricing controller. Production callbacks still use checkout-return.js.
   The original page/checkout is preserved in tests/fixtures/outline-pro-legacy.html. */
(() => {
  'use strict';
  const config = window.OutlineSavePricingConfig;
  const model = window.OutlineSavePricingModel;
  const buttons = [...document.querySelectorAll('[data-purchase-plan]')];
  const error = document.querySelector('[data-checkout-error]');
  const mode = model.mode(config, location.hostname);
  const paddlePrices = window.OutlineSavePaddlePrices;
  let priceRequest, priceKey, priceGeneration = 0;
  let loading = false, pendingPlan, sdkPromise, mockPlan, mockTotal;
  const local = model.isLocal(location.hostname);
  const schema = document.querySelector('script[type="application/ld+json"]');
  const graph = JSON.parse(schema.textContent);
  let schemaKey;
  const dialog = document.createElement('dialog');
  dialog.className = 'op-mock-dialog';
  dialog.setAttribute('aria-labelledby', 'mock-title');
  dialog.innerHTML = '<button type="button" class="op-mock-close" data-mock-close>×</button><h2 id="mock-title"></h2><p data-mock-note></p><dl><dt data-mock-plan></dt><dd data-mock-total></dd></dl><p data-mock-billing></p><p data-mock-changed role="status" hidden></p><div class="op-mock-actions"><button type="button" class="op-button op-button-primary" data-mock-complete></button><button type="button" class="op-button op-button-secondary" data-mock-cancel></button></div>';
  document.body.append(dialog);
  const language = () => /^zh/i.test(document.documentElement.lang) ? 'zh-Hans' : 'en';
  const t = key => window.OutlineSavePricingMessages[language()][key];
  const replace = (value, key, text) => value.replace('{' + key + '}', text);
  const put = (selector, value) => {
    for (const node of document.querySelectorAll(selector)) {
      if (node.textContent !== value) node.textContent = value;
    }
  };
  function showError(key = 'error') { error.textContent = t(key); error.hidden = false; }
  function updateSchema(state) {
    const key = JSON.stringify([state.quarterly, state.annual, state.annualOneTime, state.lifetime, state.active, state.end]);
    if (key === schemaKey) return;
    for (const item of graph['@graph']) {
      for (const offer of item.offers || []) {
        const lifetime = /Lifetime/.test(offer.name);
        offer.price = ((lifetime ? state.lifetime : /Quarterly/.test(offer.name) ? state.quarterly : /1-Year/.test(offer.name) ? state.annualOneTime : state.annual) / 100).toFixed(2);
        if (lifetime) {
          offer.description = 'One-time payment for lifetime Pro access. No subscription or renewal.';
          delete offer.priceValidUntil;
          delete offer.validThrough;
          if (state.active) {
            offer.priceValidUntil = new Date(state.end).toISOString().slice(0, 10);
            offer.validThrough = new Date(state.end).toISOString();
          }
        }
      }
    }
    schema.textContent = JSON.stringify(graph);
    schemaKey = key;
  }
  function renderMock(state) {
    const total = state[mockPlan];
    put('#mock-title', t('mockTitle'));
    put('[data-mock-note]', t('mockNote'));
    put('[data-mock-plan]', t(mockPlan) + ' · ' + t('total'));
    put('[data-mock-total]', model.money(total) + ' USD');
    put('[data-mock-billing]', t(mockPlan + 'Rule'));
    dialog.querySelector('[data-mock-close]').setAttribute('aria-label', t('close'));
    put('[data-mock-complete]', t('complete'));
    put('[data-mock-cancel]', t('cancel'));
    put('[data-mock-changed]', t('changed'));
  }
  function render() {
    try {
      // An ended or newly started campaign needs a fresh Paddle calculation.
      if (mode === 'live' && priceKey !== undefined && priceKey !== paddlePrices.campaignActive(config)) {
        refreshPrices();
      }
      document.querySelector('.op-price-grid').setAttribute('aria-busy', String(loading));
      // Display the release's verified USD prices immediately, then synchronize
      // in the background. Checkout charges by Paddle IDs, never these amounts.
      const state = model.snapshot(config);
      put('[data-price="quarterly"]', model.money(state.quarterly));
      put('[data-price="annual"]', model.money(state.annual));
      put('[data-price="annualOneTime"]', model.money(state.annualOneTime));
      put('[data-price-monthly-value="annual"]', model.money(Math.round(state.annual / 12)));
      put('[data-price-monthly-value="quarterly"]', model.money(Math.round(state.quarterly / 3)));
      put('[data-price="lifetime"]', model.money(state.lifetime));
      put('[data-regular-price]', model.money(state.regular));
      document.querySelectorAll('[data-promo]').forEach(node => { node.hidden = !state.active; });
      put('[data-saving]', replace(t('save'), 'amount', model.money(state.discount)));
      buttons.forEach(button => {
        button.disabled = loading || mode === 'disabled';
        button.setAttribute('aria-busy', String(loading && button.dataset.purchasePlan === pendingPlan));
      });
      updateSchema(state);
      if (dialog.open) {
        const total = state[mockPlan];
        if (total !== mockTotal) dialog.querySelector('[data-mock-changed]').hidden = false;
        renderMock(state);
      }
      return state;
    } catch (_) {
      buttons.forEach(button => { button.disabled = true; });
      showError('configured');
      return null;
    }
  }
  function bounded(promise) {
    let timer;
    const timeout = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Paddle request timed out')), 15000); });
    return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
  }
  function loadPaddle() {
    if (sdkPromise) return sdkPromise;
    let script;
    sdkPromise = bounded(new Promise((resolve, reject) => {
      script = document.createElement('script');
      script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
      script.onload = () => {
        try { window.Paddle.Initialize({ token: config.paddleClientToken, eventCallback: window.OutlineSaveCheckoutEvent }); resolve(); }
        catch (err) { reject(err); }
      };
      script.onerror = reject;
      document.head.append(script);
    })).catch(err => {
      script.onload = script.onerror = null;
      script.remove();
      sdkPromise = null;
      throw err;
    });
    return sdkPromise;
  }
  function refreshPrices() {
    if (mode !== 'live' || priceRequest) return priceRequest;
    const active = paddlePrices.campaignActive(config);
    priceKey = active;
    const generation = ++priceGeneration;
    priceRequest = (async () => {
      await loadPaddle();
      const requests = paddlePrices.requests(config, active);
      const [regular, discounted] = await bounded(Promise.all([
        window.Paddle.PricePreview(requests.regular),
        requests.discounted ? window.Paddle.PricePreview(requests.discounted) : null,
      ]));
      // Discard results that crossed the deadline while the requests were pending.
      if (generation !== priceGeneration || active !== paddlePrices.campaignActive(config)) return;
      const prices = paddlePrices.normalize(config, regular, discounted, active);
      config.quarterly.amount = prices.quarterly;
      config.annual.amount = prices.annual;
      config.annualOneTime.amount = prices.annualOneTime;
      config.lifetime.amount = prices.regular;
      if (active) config.campaign.discountAmount = prices.discount;
    })().catch(() => {
      // A read-only preview outage must not prevent Paddle Checkout, which
      // independently resolves prices and validates discounts before payment.
    }).finally(() => {
      priceRequest = null;
      // render() starts a new request if the time window changed in flight.
      render();
    });
    return priceRequest;
  }
  async function purchase(plan) {
    if (loading || !['quarterly', 'annual', 'lifetime'].includes(plan)) return;
    error.hidden = true;
    const state = render();
    if (!state) return;
    if (mode === 'mock' && local) {
      mockPlan = plan;
      mockTotal = state[plan];
      dialog.querySelector('[data-mock-changed]').hidden = true;
      // Exercise the exact same payload builder as a future live checkout.
      window.OutlineSaveMockCheckout = model.checkout(config, plan, Date.now(), window.OutlineSaveCheckoutReturn.settings());
      renderMock(state);
      dialog.showModal();
      return;
    }
    if (mode !== 'live') { showError('configured'); return; }
    try {
      loading = true;
      pendingPlan = plan;
      render();
      model.validateLive(config, model.checkout(config, plan, Date.now(), {}));
      await loadPaddle();
      window.OutlineSaveCheckout.open(() => {
        // Recompute after email confirmation: the promotion may have expired
        // while the SDK loaded or while the customer entered their email.
        const options = model.checkout(config, plan, Date.now(), window.OutlineSaveCheckoutReturn.settings());
        model.validateLive(config, options);
        render();
        return options;
      }, () => model.billingSummary(config, plan));
    } catch (_) { showError(); }
    finally { loading = false; pendingPlan = null; render(); }
  }
  buttons.forEach(button => button.addEventListener('click', () => purchase(button.dataset.purchasePlan)));
  dialog.querySelector('[data-mock-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-mock-cancel]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-mock-complete]').addEventListener('click', () => {
    const state = render();
    if (!state) return;
    const total = state[mockPlan];
    if (total !== mockTotal) {
      mockTotal = total;
      dialog.querySelector('[data-mock-changed]').hidden = false;
      return;
    }
    dialog.close();
    window.OutlineSaveCheckoutReturn.settings();
    // Preview IDs never enter production storage or real APIs. The local server
    // exchanges this ID for a fixture token; the actual success page runs unchanged.
    window.OutlineSaveCheckoutReturn.redirect('txn_preview_' + mockPlan + '_' + crypto.randomUUID());
  });
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { if (mode === 'live') refreshPrices(); render(); } });
  window.addEventListener('pageshow', render);
  if (mode === 'live') refreshPrices();
  render();
  if (new URLSearchParams(location.search).get('autoCheckout') === '1') {
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
})();
