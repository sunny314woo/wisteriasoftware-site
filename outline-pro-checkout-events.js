/* Shared payment callback: analytics, transaction fallback and success redirect. */
(() => {
  let activeTransaction = '';
  let activeCheckout = '';
  window.OutlineSaveCheckoutEvent = function (event) {
    // Preserve popup analytics, transaction fallback and the existing return URL flow.
    try { window.OutlineSaveAnalytics?.checkoutEvent(event?.name); } catch (_) {}
    const data = event?.data || {};
    const candidates = [data.transaction_id, data.transactionId, data.transaction?.id,
      data.transaction?.transaction_id, data.checkout?.transaction_id, data.checkout?.transaction?.id, data.id];
    if (event?.name === 'checkout.loaded' || (data.id?.startsWith('che_') && data.id !== activeCheckout)) {
      activeTransaction = '';
      activeCheckout = data.id || '';
      for (const name of ['sessionStorage', 'localStorage']) {
        try { window[name].removeItem('paddle_checkout_txn'); window[name].removeItem('paddle_checkout_txn_ts'); } catch (_) {}
      }
    }
    let tid = candidates.find(value => typeof value === 'string' && value.startsWith('txn_'));
    if (tid) activeTransaction = tid;
    tid ||= activeTransaction;
    try { window.OutlineSaveCheckoutRecovery?.track(event, tid); } catch (_) {}
    if (tid) {
      for (const name of ['sessionStorage', 'localStorage']) {
        try {
          window[name].setItem('paddle_checkout_txn', tid);
          window[name].setItem('paddle_checkout_txn_ts', String(Date.now()));
        } catch (_) {}
      }
    }
    if (event?.name !== 'checkout.completed') return;
    window.OutlineSaveCheckoutReturn.redirect(tid || '', event);
  };
})();
