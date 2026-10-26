/* Payment return UI. License issuance and short-code redemption remain server-owned. */
(function () {
  const messages = {
  "codeSubtitle": "Copy this code and activate your license in OutlineSave.",
  "waitingSubtitle": "Please check the status below and watch for your license email.",
  "checking": "Checking your license",
  "paymentSuccess": "Payment successful",
  "waitingConfirmation": "Waiting for payment confirmation",
  "processing": "Your activation code will be available once payment is confirmed.",
  "gratitude": "Thank you for purchasing OutlineSave and supporting our work.",
  "genericPlan": "OutlineSave License",
  "annualPlan": "PRO 1-Year License",
  "lifetimePlan": "PRO Lifetime License",
  "genericTerms": "One-time payment \u00b7 No auto-renewal",
  "annualTerms": "One-time payment \u00b7 Valid for 1 year \u00b7 No auto-renewal",
  "lifetimeTerms": "One-time payment \u00b7 No expiry \u00b7 No auto-renewal",
  "genericActivated": "After activation, open your membership status to check your license details.",
  "annualActivated": "After activation, your status will show PRO 1-Year. Open it to view the expiry date.",
  "lifetimeActivated": "After activation, your status will show PRO Lifetime with no expiry.",
  "waitingCode": "Your activation code is being prepared.",
  "wechatDelay": "WeChat Pay confirmation and email delivery may take around 15 minutes.",
  "possibleWechatDelay": "If you paid with WeChat Pay, confirmation and email delivery may take around 15 minutes.",
  "refreshHelp": "Your code will be emailed to the address used at checkout. Refresh this page later to check again.",
  "checkEmailTitle": "Please check your payment email address",
  "checkEmail": "Open the return link from checkout to retrieve your code here, or use the code in your license email.",
  "sessionExpiredTitle": "This link has expired",
  "sessionExpiredDetail": "Refreshing does not extend this link. Use the code in your email, or contact support if it has not arrived.",
  "invalidSession": "This link is invalid. Please check your license email or contact support.",
  "copySuccess": "Activation code copied.",
  "copyFailed": "Copy failed. Please select and copy the code manually.",
  "resendButton": "Resend activation email",
  "resendWaiting": "Available when your code is ready",
  "resendCountdown": "Resend ({seconds}s)",
  "sending": "Sending\u2026",
  "emailSentRemaining": "Email sent. {count} resends remaining.",
  "maximumResendReached": "Resend limit reached. Please check your inbox or spam folder, or contact support.",
  "sessionExpiredInbox": "This link has expired. Please check your email or contact support.",
  "failed": "Could not send the email. Please try again later.",
  "networkError": "Network error. Please try again later."
};
  const API_BASE = 'https://api.wisteriasoftware.uk';
  const MAX_RESEND = 2;
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const transactionId = params.get('transaction_id') || params.get('txn') || params.get('_ptxn');
  const state = {
    status: 'pending', code: '', plan: null, token, resendCount: 0,
    sending: false, cooldown: 0, resendKey: '', copyKey: '', email: '', emailNeeded: false, querying: false,
    wechat: params.get('payment_method') === 'wechat',
  };
  const pollingWindow = 30 * 60 * 1000;
  let pollingStarted = 0, retryTimer = null, pendingAction = null, recoveredId = transactionId;
  function rememberStart(id) {
    try {
      const key = 'outlinesave_payment_wait:' + id;
      const stored = Number(sessionStorage.getItem(key));
      if (stored > 0 && stored <= Date.now()) pollingStarted = pollingStarted ? Math.min(pollingStarted, stored) : stored;
      if (pollingStarted) sessionStorage.setItem(key, String(pollingStarted));
    } catch (_) {}
  }
  function waitingMessage(timedOut) {
    const lang = window.WisteriaI18n?.currentLanguage() || document.documentElement.lang;
    if (/^zh.*(?:TW|HK|Hant)/i.test(lang)) return timedOut
      ? '暫時無法確認付款結果。自動查詢已停止，這不表示付款失敗。已付款請勿重複支付，請聯絡 support@wisteriasoftware.uk。'
      : '正在自動查詢付款確認及啟用碼。已付款請勿重複支付。';
    if (/^zh/i.test(lang)) return timedOut
      ? '暂时无法确认付款结果。自动查询已停止，这不表示付款失败。已付款请勿重复支付，请联系 support@wisteriasoftware.uk。'
      : '正在自动查询付款确认及激活码。已付款请勿重复支付。';
    return timedOut
      ? 'We cannot confirm the result yet. Automatic checking has stopped; this does not mean payment failed. If you have paid, do not pay again. Contact support@wisteriasoftware.uk.'
      : 'Automatically checking payment confirmation and your activation code. If you have paid, please do not pay again.';
  }
  const el = id => document.getElementById(id);
  const languageSelect = el('payment-language');
  if (languageSelect && window.WisteriaI18n) {
    languageSelect.value = document.documentElement.dataset.currentLanguage || 'en';
    languageSelect.addEventListener('change', () => {
      window.WisteriaI18n.selectLanguage(languageSelect.value);
    });
  }
  function put(id, value) { if (el(id).textContent !== value) el(id).textContent = value; }
  function text(key, values = {}) {
    let value = window.WisteriaI18n
      ? window.WisteriaI18n.t(`runtime.paymentSuccess.${key}`, messages[key]) : messages[key];
    Object.entries(values).forEach(([name, replacement]) => { value = value.split(`{${name}}`).join(String(replacement)); });
    return value;
  }
  function orderEmailCopy() {
    const lang = window.WisteriaI18n?.currentLanguage() || document.documentElement.lang;
    return /^zh/i.test(lang)
      ? ['结账时填写的邮箱', '请填写本次订单的结账邮箱。邮箱一致才能领取激活码，无需验证码。', '查看本次订单']
      : ['Email used at checkout', 'Enter the checkout email for this order. The email must match to retrieve your code. No verification code is needed.', 'Check this order'];
  }
  function render() {
    const ready = Boolean(state.code);
    el('order-email-form').hidden = ready || !state.emailNeeded;
    const emailCopy = orderEmailCopy();
    put('order-email-label', emailCopy[0]); put('order-email-help', emailCopy[1]); put('order-email-submit', emailCopy[2]);
    el('order-email-submit').disabled = state.querying;
    const unavailable = ['expired', 'invalid', 'email'].includes(state.status);
    const plan = ['annual', 'lifetime'].includes(state.plan) ? state.plan : 'generic';
    document.body.dataset.state = ready ? 'ready' : 'waiting';
    document.body.dataset.longCode = String(state.code.length > 40);
    put('mark', ready ? '✓' : unavailable ? '–' : '…');
    put('heading', text(ready ? 'paymentSuccess' : state.status === 'expired' ? 'sessionExpiredTitle' : state.status === 'email' ? 'checkEmailTitle' : state.status === 'invalid' ? 'invalidSession' : state.wechat ? 'waitingConfirmation' : 'checking'));
    put('thanks', text(ready ? 'gratitude' : unavailable ? 'checkEmailTitle' : 'processing'));
    put('plan', text(`${plan}Plan`));
    put('terms', text(`${plan}Terms`));
    put('activated', text(`${plan}Activated`));
    document.title = el('heading').textContent + ' · OutlineSave';
    put('code-sub', ready ? text('codeSubtitle') : text('waitingSubtitle'));
    el('license-box').hidden = !ready;
    put('license-string', state.code);
    el('license-status').hidden = ready;
    el('refresh-row').hidden = ready || ['expired', 'invalid', 'email'].includes(state.status);
    let title = state.wechat ? 'wechatDelay' : 'waitingCode';
    let detail = state.wechat ? text('refreshHelp') : `${text('possibleWechatDelay')} ${text('refreshHelp')}`;
    if (state.status === 'expired') { title = 'sessionExpiredTitle'; detail = text('sessionExpiredDetail'); }
    if (state.status === 'invalid') { title = 'invalidSession'; detail = ''; }
    if (state.status === 'email') { title = 'checkEmailTitle'; detail = `${text('checkEmail')} ${text('possibleWechatDelay')}`; }
    put('waiting-title', text(title));
    if (!unavailable && !ready && !state.emailNeeded) detail += ' ' + waitingMessage(state.status === 'timeout');
    put('waiting-detail', detail);
    put('copy-tip', state.copyKey ? text(state.copyKey) : '');
    el('resend-btn').disabled = !ready || state.sending || state.cooldown > 0 || state.status === 'expired' || state.resendCount >= MAX_RESEND;
    put('resend-btn', text(state.status === 'expired' ? 'sessionExpiredTitle' : state.sending ? 'sending' : state.cooldown > 0 ? 'resendCountdown' : ready || unavailable ? 'resendButton' : 'resendWaiting', { seconds: state.cooldown }));
    put('resend-status', state.resendKey ? text(state.resendKey, { count: Math.max(0, MAX_RESEND - state.resendCount) }) : '');
  }

  // Keep the existing transaction fallback for Paddle's automatic success redirect.
  function takeStoredTransactionId() {
    for (const name of ['sessionStorage', 'localStorage']) {
      try {
        const storage = window[name];
        const value = storage.getItem('paddle_checkout_txn');
        const timestamp = Number(storage.getItem('paddle_checkout_txn_ts') || 0);
        storage.removeItem('paddle_checkout_txn');
        storage.removeItem('paddle_checkout_txn_ts');
        if (value && timestamp && Date.now() - timestamp < 4 * 60 * 60 * 1000) return value;
      } catch (_) {}
    }
    return null;
  }
  async function request(path, options) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(API_BASE + path, { ...options, signal: controller.signal, referrerPolicy: 'no-referrer' });
      if (!response.ok) throw new Error('Request failed');
      return await response.json();
    } finally { clearTimeout(timeout); }
  }
  function canPoll() {
    if (pollingStarted > 0 && Date.now() - pollingStarted < pollingWindow) return true;
    pendingAction = null;
    state.status = 'timeout';
    render();
    return false;
  }
  function waitThen(action) {
    if (!canPoll()) return;
    const elapsed = Date.now() - pollingStarted;
    const delay = document.hidden ? 60000 : elapsed < 60000 ? 5000 : elapsed < 5 * 60000 ? 10000 : 30000;
    pendingAction = action;
    clearTimeout(retryTimer);
    retryTimer = setTimeout(() => {
      pendingAction = null;
      if (canPoll()) action();
    }, Math.min(delay, pollingWindow - elapsed));
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden || !pendingAction) return;
    const action = pendingAction;
    pendingAction = null;
    clearTimeout(retryTimer);
    if (canPoll()) action();
  });
  async function exchangeToken(id) {
    if (state.querying) return;
    if (!state.email) { state.emailNeeded = true; render(); return; }
    state.querying = true; render();
    try {
      const data = await request(`/api/public/exchange-token?transaction_id=${encodeURIComponent(id)}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: state.email }) });
      if (['email_required', 'email_mismatch'].includes(data.status)) {
        state.emailNeeded = true; pendingAction = null; clearTimeout(retryTimer); return;
      }
      if (data.status === 'ok' && data.token) {
        state.token = data.token;
        try { sessionStorage.setItem('outlinesave_payment_wait:' + data.token, String(pollingStarted)); sessionStorage.setItem('outlinesave_payment_order:' + data.token, id); } catch (_) {}
        const url = new URL(window.location.href);
        ['transaction_id', 'txn', '_ptxn'].forEach(key => url.searchParams.delete(key));
        url.searchParams.set('token', data.token);
        // Preserve language and payment-method display hints across refreshes.
        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
        pollLicense();
        return;
      }
    } catch (_) {}
    finally { state.querying = false; render(); }
    waitThen(() => exchangeToken(id));
  }
  async function pollLicense() {
    try {
      const data = await request(`/api/public/license?token=${encodeURIComponent(state.token)}`);
      if (data.status === 'ok' && (data.short_code || data.license_string)) {
        state.code = data.short_code || data.license_string;
        state.plan = data.plan_type; // Never infer the plan from a URL, amount or payment method.
        state.resendCount = Number(data.resend_count) || 0;
        state.status = 'ready';
        try { window.OutlineSaveCheckoutRecovery?.clear(recoveredId); } catch (_) {}
        if (state.resendCount >= MAX_RESEND) state.resendKey = 'maximumResendReached';
        render();
        return;
      }
      if (data.status === 'expired' || data.status === 'not_found') {
        state.status = data.status === 'expired' ? 'expired' : 'invalid';
        render();
        return;
      }
    } catch (_) {}
    waitThen(pollLicense);
  }
  async function resendEmail() {
    if (!state.token || !state.code || state.sending || state.cooldown || state.status === 'expired' || state.resendCount >= MAX_RESEND) return;
    state.sending = true;
    state.resendKey = 'sending';
    render();
    try {
      const data = await request(`/api/public/resend-email?token=${encodeURIComponent(state.token)}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '1' },
      });
      if (data.status === 'ok') {
        state.resendCount++;
        state.resendKey = 'emailSentRemaining';
        if (state.resendCount < MAX_RESEND) {
          state.cooldown = 60;
          const timer = setInterval(() => {
            state.cooldown--;
            if (state.cooldown <= 0) clearInterval(timer);
            render();
          }, 1000);
        }
      } else if (data.status === 'limit_reached') {
        state.resendCount = MAX_RESEND;
        state.resendKey = 'maximumResendReached';
      } else if (data.status === 'expired') {
        state.status = 'expired';
        state.resendKey = 'sessionExpiredInbox';
      } else {
        state.resendKey = 'failed';
      }
    } catch (_) { state.resendKey = 'networkError'; }
    state.sending = false;
    render();
  }
  el('order-email-form').addEventListener('submit', event => {
    event.preventDefault();
    const input = el('order-email');
    input.value = input.value.trim();
    if (!input.reportValidity() || state.querying || !recoveredId) return;
    state.email = input.value; state.emailNeeded = false;
    try { sessionStorage.setItem('outlinesave_order_email:' + recoveredId, state.email); } catch (_) {}
    // A manual lookup is allowed after expiry; it never restarts automatic polling.
    clearTimeout(retryTimer); pendingAction = null;
    exchangeToken(recoveredId);
  });
  el('resend-btn').addEventListener('click', resendEmail);
  el('refresh-btn').addEventListener('click', () => window.location.reload());
  el('copy-btn').addEventListener('click', async () => {
    if (!state.code) return;
    try {
      await navigator.clipboard.writeText(state.code);
      state.copyKey = 'copySuccess';
    } catch (_) { state.copyKey = 'copyFailed'; }
    render();
  });
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  function init() {
    const id = transactionId || (!token ? takeStoredTransactionId() : null);
    recoveredId = id;
    try { if (!recoveredId && token) recoveredId = sessionStorage.getItem('outlinesave_payment_order:' + token); } catch (_) {}
    const recovery = window.OutlineSaveCheckoutRecovery?.details(id);
    if (recovery) { state.email = recovery.email; pollingStarted = recovery.startedAt; }
    try { const corrected = sessionStorage.getItem('outlinesave_order_email:' + id); if (corrected) state.email = corrected; } catch (_) {}
    try {
      const context = JSON.parse(sessionStorage.getItem('outlinesave_checkout_return') || 'null');
      if (context && id && context.transactionId === id && Date.now() - context.createdAt < 4 * 60 * 60 * 1000) {
        state.wechat ||= context.wechat === true;
        state.email ||= context.email || '';
        pollingStarted ||= context.startedAt || 0;
      }
    } catch (_) {}
    if (id || token) rememberStart(id || token);
    // Preserve a recovered order ID until token exchange succeeds so a delayed payment can be refreshed.
    if (!token && id) {
      const url = new URL(window.location.href);
      url.searchParams.set('transaction_id', id);
      const language = document.documentElement.dataset.currentLanguage || document.documentElement.lang || 'en';
      url.searchParams.set('lang', language === 'zh-Hans' ? 'zh-CN' : language);
      if (state.wechat) url.searchParams.set('payment_method', 'wechat');
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
    if (!token && !id) state.status = 'email';
    render();
    if (token) pollLicense();
    else if (id) exchangeToken(id);
  }
  init();
})();
