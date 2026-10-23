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
  dialog.innerHTML = '<h2 id="mock-title"></h2><p data-mock-note></p><dl><dt data-mock-plan></dt><dd data-mock-total></dd><dt data-mock-discount-label></dt><dd data-mock-discount></dd></dl><p data-mock-changed role="status" hidden></p><div class="op-mock-actions"><button type="button" class="op-button op-button-primary" data-mock-complete></button><button type="button" class="op-button op-button-secondary" data-mock-cancel></button></div>';
  document.body.append(dialog);
  const language = () => /^zh/i.test(document.documentElement.lang) ? 'zh-Hans' : 'en';
  const t = key => window.OutlineSavePricingMessages[language()][key];
  const replace = (value, key, text) => value.replace('{' + key + '}', text);
  const put = (selector, value) => {
    const node = document.querySelector(selector);
    if (node && node.textContent !== value) node.textContent = value;
  };
  function showError(key = 'error') { error.textContent = t(key); error.hidden = false; }
  function updateSchema(state) {
    const key = JSON.stringify([state.annual, state.lifetime, state.active, state.end]);
    if (key === schemaKey) return;
    for (const item of graph['@graph']) {
      for (const offer of item.offers || []) {
        const lifetime = /Lifetime/.test(offer.name);
        offer.price = ((lifetime ? state.lifetime : state.annual) / 100).toFixed(2);
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
    const total = mockPlan === 'annual' ? state.annual : state.lifetime;
    put('#mock-title', t('mockTitle'));
    put('[data-mock-note]', t('mockNote'));
    put('[data-mock-plan]', t(mockPlan) + ' · ' + t('total'));
    put('[data-mock-total]', model.money(total) + ' USD');
    put('[data-mock-discount-label]', t('discount'));
    put('[data-mock-discount]', model.money(mockPlan === 'lifetime' ? state.discount : 0));
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
      put('[data-price="annual"]', model.money(state.annual));
      put('[data-price="lifetime"]', model.money(state.lifetime));
      put('[data-regular-price]', model.money(state.regular));
      document.querySelectorAll('[data-promo]').forEach(node => { node.hidden = !state.active; });
      put('[data-saving]', replace(t('save'), 'amount', model.money(state.discount)));
      // The value hint and campaign duration follow the supplied configuration.
      // Hide the price-difference hint if a custom lifetime price is cheaper.
      const difference = document.querySelector('[data-plan-difference]');
      const showDifference = state.active && state.lifetime > state.annual;
      difference.hidden = !showDifference;
      document.querySelector('[data-regular-note]').hidden = showDifference;
      put('[data-plan-difference]', replace(t('difference'), 'amount', model.money(state.lifetime - state.annual)));
      const seconds = state.remaining;
      for (const [unit, value] of Object.entries({ days: Math.floor(seconds / 86400),
        hours: Math.floor(seconds / 3600) % 24, minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60 })) {
        put('[data-time="' + unit + '"]', String(value).padStart(2, '0'));
      }
      document.querySelector('[data-countdown]').setAttribute('aria-label', t('timer'));
      if (state.active) {
        const days = new Intl.NumberFormat(language(), { maximumFractionDigits: 2 }).format((state.end - state.start) / 86400000);
        put('[data-campaign-title]', replace(t('campaign'), 'days', days));
        // All visitors see the same explicit campaign timezone and deadline.
        const date = new Intl.DateTimeFormat(language(), { timeZone: 'Asia/Shanghai',
          year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(state.end);
        put('[data-offer-date]', replace(t('ends'), 'date', date + ' (UTC+8)'));
      }
      buttons.forEach(button => {
        button.disabled = loading || mode === 'disabled';
        button.setAttribute('aria-busy', String(loading && button.dataset.purchasePlan === pendingPlan));
      });
      updateSchema(state);
      if (dialog.open) {
        const total = mockPlan === 'annual' ? state.annual : state.lifetime;
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
      config.annual.amount = prices.annual;
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
    if (loading) return;
    error.hidden = true;
    const state = render();
    if (!state) return;
    if (mode === 'mock' && local) {
      mockPlan = plan;
      mockTotal = plan === 'annual' ? state.annual : state.lifetime;
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
      });
    } catch (_) { showError(); }
    finally { loading = false; pendingPlan = null; render(); }
  }
  buttons.forEach(button => button.addEventListener('click', () => purchase(button.dataset.purchasePlan)));
  dialog.querySelector('[data-mock-cancel]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-mock-complete]').addEventListener('click', () => {
    const state = render();
    if (!state) return;
    const total = mockPlan === 'annual' ? state.annual : state.lifetime;
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
  window.setInterval(render, 1000);
  if (mode === 'live') refreshPrices();
  render();
  if (new URLSearchParams(location.search).get('autoCheckout') === '1') {
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
})();
