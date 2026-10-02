/* Presentation context only. Payment confirmation and license issuance stay on the server. */
(function () {
  let checkoutLanguage = null;
  const contextKey = 'outlinesave_checkout_return';

  function language() {
    const current = window.WisteriaI18n
      ? window.WisteriaI18n.currentLanguage() : document.documentElement.lang;
    return /^zh/i.test(current) ? 'zh-CN' : 'en';
  }

  function isWeChat(event) {
    const type = event?.data?.payment?.method_details?.type;
    return typeof type === 'string' && /^wechat(?:pay)?$/.test(type.toLowerCase().replace(/[-_]/g, ''));
  }

  function successUrl(transactionId, event) {
    const url = new URL('/payment-success', window.location.origin);
    url.searchParams.set('lang', checkoutLanguage || language());
    if (transactionId) url.searchParams.set('transaction_id', transactionId);
    if (isWeChat(event)) url.searchParams.set('payment_method', 'wechat');
    return url.href;
  }

  window.OutlineSaveCheckoutReturn = {
    settings() {
      checkoutLanguage = language();
      return {
        theme: 'light',
        locale: checkoutLanguage === 'zh-CN' ? 'zh-Hans' : 'en',
        successUrl: successUrl(),
      };
    },
    redirect(transactionId, event) {
      try {
        sessionStorage.setItem(contextKey, JSON.stringify({
          transactionId, wechat: isWeChat(event), createdAt: Date.now(),
        }));
      } catch (_) { /* URL parameters also work when storage is unavailable. */ }
      window.location.href = successUrl(transactionId, event);
    },
  };
})();
