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
  let priceReady = mode !== 'live', priceRequest, priceKey, priceGeneration = 0;
  let loading = false, sdkPromise, mockPlan, mockTotal;
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
        priceReady = false;
        refreshPrices();
      }
      document.querySelector('.op-price-grid').setAttribute('aria-busy', String(!priceReady));
      if (!priceReady) {
        buttons.forEach(button => { button.disabled = true; });
        document.querySelectorAll('[data-promo]').forEach(node => { node.hidden = true; });
        put('[data-price="annual"]', '…');
        put('[data-price="lifetime"]', '…');
        return null;
      }
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
      buttons.forEach(button => { button.disabled = loading || mode === 'disabled'; });
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
    sdkPromise = bounded(new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
      script.onload = () => {
        try { window.Paddle.Initialize({ token: config.paddleClientToken, eventCallback: window.OutlineSaveCheckoutEvent }); resolve(); }
        catch (err) { reject(err); }
      };
      script.onerror = reject;
      document.head.append(script);
    })).catch(err => { sdkPromise = null; throw err; });
    return sdkPromise;
  }
  function refreshPrices() {
    if (mode !== 'live' || priceRequest) return priceRequest;
    const active = paddlePrices.campaignActive(config);
    priceKey = active;
    priceReady = false;
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
      config.campaign.discountAmount = prices.discount;
      priceReady = true;
      error.hidden = true;
    })().catch(() => {
      priceReady = false;
      showError('priceError');
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
      render();
      await refreshPrices();
      if (!priceReady) return;
      model.validateLive(config, model.checkout(config, plan, Date.now(), {}));
      await loadPaddle();
      // Recompute AFTER SDK loading: a promotion may have expired while loading.
      const options = model.checkout(config, plan, Date.now(), window.OutlineSaveCheckoutReturn.settings());
      model.validateLive(config, options);
      render();
      window.Paddle.Checkout.open(options);
    } catch (_) { showError(); }
    finally { loading = false; render(); }
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
