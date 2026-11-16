/* Counts actual Paddle overlay loads; never receives checkout/customer data. */
(() => {
  'use strict';
  if (window.OutlineSaveAnalytics) return;
  let openEvent = null;
  let loaded = false;

  function checkoutMetadata() {
    const platform = navigator.userAgentData?.platform || navigator.platform || '';
    const ua = navigator.userAgent || '';
    let operating_system = 'Other';
    if (/Android/i.test(ua)) operating_system = 'Android';
    else if (/iPhone|iPad|iPod/i.test(ua) || (/Mac/i.test(platform) && navigator.maxTouchPoints > 1)) operating_system = 'iOS';
    else if (/Windows|Win/i.test(platform)) operating_system = 'Windows';
    else if (/Mac/i.test(platform)) operating_system = 'macOS';
    else if (/CrOS/i.test(ua)) operating_system = 'ChromeOS';
    else if (/Linux/i.test(platform)) operating_system = 'Linux';
    const locale = window.WisteriaI18n?.currentLanguage() || document.documentElement.lang || '';
    return { operating_system, locale };
  }

  async function send(event) {
    for (let attempt = 0; attempt < 2; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3000);
      try {
        const endpoint = event.event === 'payment_popup_open' ? 'analytics' : 'growth';
        const response = await fetch('https://api.wisteriasoftware.uk/api/public/' + endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event), credentials: 'omit', referrerPolicy: 'no-referrer',
          keepalive: true, signal: controller.signal, priority: 'low',
        });
        if (response.status === 400 && 'operating_system' in event) {
          // Older servers still receive the original counter during rollout.
          const { locale, operating_system, ...legacy } = event;
          event = legacy;
          continue;
        }
        if (response.ok || (response.status >= 400 && response.status < 500)) return;
      } catch (_) { /* Best effort, with the same ID on retry. */ }
      finally { clearTimeout(timer); }
    }
  }

  window.OutlineSaveAnalytics = {
    checkoutEvent(name) {
      try {
        if (!['wisteriasoftware.uk', 'www.wisteriasoftware.uk'].includes(location.hostname)) return;
        const action = { 'checkout.loaded': 'loaded', 'checkout.closed': 'closed', 'checkout.error': 'failed' }[name];
        if (action && (name !== 'checkout.loaded' || !loaded)) window.OutlineSaveGrowth?.record('checkout_result', action);
        if (name === 'checkout.closed' || name === 'checkout.completed') {
          openEvent = null;
          loaded = false;
        } else if (name === 'checkout.loaded' && !loaded) {
          openEvent = { event: 'payment_popup_open', event_id: crypto.randomUUID(),
            occurred_at: new Date().toISOString(), ...checkoutMetadata() };
          loaded = true;
          void send(openEvent).catch(() => {});
        }
      } catch (_) { /* Never touch payment UI or its error handling. */ }
    },
  };

  // This short-lived flow ID connects an upgrade click to checkout. It grants no rights.
  try {
    if (!['wisteriasoftware.uk', 'www.wisteriasoftware.uk'].includes(location.hostname)) return;
    const query = new URLSearchParams(location.search || '');
    const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const incoming = query.get('os_flow');
    const flowId = uuid.test(incoming || '') ? incoming : crypto.randomUUID();
    const entry = uuid.test(incoming || '') && ['html', 'pdf', 'directory', 'account'].includes(query.get('os_entry')) ? query.get('os_entry') : 'unknown';
    function record(event, action) {
      try {
        void send({ event, event_id: crypto.randomUUID(), occurred_at: new Date().toISOString(),
          flow_id: flowId, entry, action }).catch(() => {});
      } catch (_) { /* Checkout proceeds when observations are unavailable. */ }
    }
    window.OutlineSaveGrowth = {
      record,
      customData: () => ({ outlinesave_flow: flowId }),
    };
    if (/^\/outline-pro(?:\.html)?\/?$/.test(location.pathname || '')) record('pricing_view', 'shown');
  } catch (_) { /* Older or restricted browsers retain the normal payment flow. */ }
})();
