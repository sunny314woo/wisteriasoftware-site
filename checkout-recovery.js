/* Recovery hints are local UI context, never evidence of payment. */
(() => {
  const key = 'outlinesave_checkout_recovery';
  const ttl = 4 * 60 * 60 * 1000;
  const validId = value => typeof value === 'string' && /^txn_[a-z0-9]{26}$/.test(value);
  let current = null, banner = null;
  function read() {
    for (const name of ['sessionStorage', 'localStorage']) {
      try {
        const value = JSON.parse(window[name].getItem(key) || 'null');
        if (value && validId(value.transactionId) && Number.isFinite(value.createdAt) &&
            Date.now() >= value.createdAt && Date.now() - value.createdAt < ttl) return value;
        window[name].removeItem(key);
      } catch (_) {}
    }
    return null;
  }
  function save(value) {
    current = value;
    if (!value.initiated) return;
    for (const name of ['sessionStorage', 'localStorage']) {
      try { window[name].setItem(key, JSON.stringify(value)); } catch (_) {}
    }
  }
  function copy() {
    const lang = window.WisteriaI18n?.currentLanguage() || document.documentElement.lang;
    if (/^zh.*(?:TW|HK|Hant)/i.test(lang)) return ['已經完成微信掃碼付款？支付結果可能需要一些時間同步。已付款請勿重複支付。', '查看支付狀態'];
    if (/^zh/i.test(lang)) return ['已经完成微信扫码付款？支付结果可能需要一些时间同步。已付款请勿重复支付。', '查看支付状态'];
    return ['Already paid with WeChat Pay? Confirmation may take some time. If you have paid, please do not pay again.', 'Check payment status'];
  }
  function show() {
    const value = current?.initiated ? current : read();
    if (!value?.initiated || Date.now() - value.createdAt >= ttl) return;
    if (!banner) {
      banner = document.createElement('aside');
      banner.className = 'checkout-recovery';
      banner.setAttribute('aria-label', 'WeChat Pay');
      const message = document.createElement('p');
      message.setAttribute('role', 'status');
      const link = document.createElement('a');
      banner.append(message, link);
      document.body.append(banner);
    }
    const [message, label] = copy();
    banner.firstElementChild.textContent = message;
    const link = banner.lastElementChild;
    link.textContent = label;
    const url = new URL('/payment-success', window.location.origin);
    url.searchParams.set('transaction_id', value.transactionId);
    url.searchParams.set('payment_method', 'wechat');
    url.searchParams.set('lang', window.WisteriaI18n?.currentLanguage() || document.documentElement.lang || 'en');
    link.href = url.href;
    link.rel = 'noreferrer';
    banner.hidden = false;
  }
  const names = new Set(['checkout.loaded', 'checkout.payment.selected', 'checkout.payment.initiated',
    'checkout.payment.failed', 'checkout.payment.error', 'checkout.error', 'checkout.closed', 'checkout.completed']);
  window.OutlineSaveCheckoutRecovery = {
    track(event, transactionId) {
      if (!names.has(event?.name)) return;
      if (event.name === 'checkout.loaded' && banner) banner.hidden = true;
      if (!validId(transactionId)) return;
      let value = current || read();
      if (value?.transactionId !== transactionId) value = { transactionId, createdAt: Date.now(), initiated: false, method: '', events: [] };
      const method = event.data?.payment?.method_details?.type;
      if (typeof method === 'string') value.method = /^wechat(?:pay)?$/.test(method.toLowerCase().replace(/[-_]/g, '')) ? 'wechat' : 'other';
      if (value.method === 'wechat' && ['checkout.payment.initiated', 'checkout.completed'].includes(event.name)) value.initiated = true;
      // Keep only event names and timestamps. Never persist customer details, payloads or tokens.
      value.events = [...(Array.isArray(value.events) ? value.events : []), { name: event.name, at: Date.now() }].slice(-20);
      save(value);
      if (event.name === 'checkout.closed') show();
    },
    clear(transactionId) {
      for (const name of ['sessionStorage', 'localStorage']) {
        try {
          const value = JSON.parse(window[name].getItem(key) || 'null');
          if (value?.transactionId === transactionId) window[name].removeItem(key);
        } catch (_) {}
      }
      if (current?.transactionId === transactionId) current = null;
      if (banner) banner.hidden = true;
    },
    restore: show,
  };
  // Return pages use the same helper only to clear a fulfilled recovery record.
  if (!/\/payment-success(?:\.html)?$/.test(window.location.pathname)) {
    show();
    new MutationObserver(() => { if (banner && !banner.hidden) show(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
})();
