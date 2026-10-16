/* Shared payment callback: analytics, transaction fallback and success redirect. */
(() => {
  window.OutlineSaveCheckoutEvent = function (event) {
    // Preserve popup analytics, transaction fallback and the existing return URL flow.
    try { window.OutlineSaveAnalytics?.checkoutEvent(event?.name); } catch (_) {}
    const data = event?.data || {};
    const candidates = [data.transaction_id, data.transactionId, data.transaction?.id,
      data.transaction?.transaction_id, data.checkout?.transaction_id, data.checkout?.transaction?.id, data.id];
    let tid = candidates.find(value => typeof value === 'string' && value.startsWith('txn_'));
    if (tid) {
      for (const name of ['sessionStorage', 'localStorage']) {
        try {
          window[name].setItem('paddle_checkout_txn', tid);
          window[name].setItem('paddle_checkout_txn_ts', String(Date.now()));
        } catch (_) {}
      }
    }
    if (event?.name !== 'checkout.completed') return;
    if (!tid) {
      for (const name of ['sessionStorage', 'localStorage']) {
        try {
          const stored = window[name].getItem('paddle_checkout_txn');
          const ts = Number(window[name].getItem('paddle_checkout_txn_ts') || 0);
          if (stored?.startsWith('txn_') && ts > 0 && Date.now() - ts < 4 * 60 * 60 * 1000) { tid = stored; break; }
        } catch (_) {}
      }
    }
    window.OutlineSaveCheckoutReturn.redirect(tid || '', event);
  };
})();
