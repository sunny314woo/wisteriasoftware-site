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
        const response = await fetch('https://api.wisteriasoftware.uk/api/public/analytics', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event), credentials: 'omit', referrerPolicy: 'no-referrer',
          keepalive: true, signal: controller.signal,
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
})();
