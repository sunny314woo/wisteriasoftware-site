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
  const MAX_RESEND = 3;
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const transactionId = params.get('transaction_id') || params.get('txn') || params.get('_ptxn');
  const state = {
    status: 'pending', code: '', plan: null, token, resendCount: 0,
    sending: false, cooldown: 0, resendKey: '', copyKey: '',
    wechat: params.get('payment_method') === 'wechat',
  };
  const el = id => document.getElementById(id);
  function put(id, value) { if (el(id).textContent !== value) el(id).textContent = value; }
  function text(key, values = {}) {
    let value = window.WisteriaI18n
      ? window.WisteriaI18n.t(`runtime.paymentSuccess.${key}`, messages[key]) : messages[key];
    Object.entries(values).forEach(([name, replacement]) => { value = value.split(`{${name}}`).join(String(replacement)); });
    return value;
  }
  function render() {
    const ready = Boolean(state.code);
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
    const response = await fetch(API_BASE + path, options);
    if (!response.ok) throw new Error('Request failed');
    return response.json();
  }
  function waitThen(action, attempt, maximum, delay) {
    if (attempt < maximum) setTimeout(action, delay);
    else { state.status = 'timeout'; render(); }
  }
  async function exchangeToken(id, attempt = 1) {
    try {
      const data = await request(`/api/public/exchange-token?transaction_id=${encodeURIComponent(id)}`, { method: 'POST' });
      if (data.status === 'ok' && data.token) {
        state.token = data.token;
        const url = new URL(window.location.href);
        ['transaction_id', 'txn', '_ptxn'].forEach(key => url.searchParams.delete(key));
        url.searchParams.set('token', data.token);
        // Preserve language and payment-method display hints across refreshes.
        window.history.replaceState(null, '', url.pathname + url.search + url.hash);
        pollLicense();
        return;
      }
    } catch (_) {}
    waitThen(() => exchangeToken(id, attempt + 1), attempt, 120, 1000);
  }
  async function pollLicense(attempt = 1) {
    try {
      const data = await request(`/api/public/license?token=${encodeURIComponent(state.token)}`);
      if (data.status === 'ok' && (data.short_code || data.license_string)) {
        state.code = data.short_code || data.license_string;
        state.plan = data.plan_type; // Never infer the plan from a URL, amount or payment method.
        state.resendCount = Number(data.resend_count) || 0;
        state.status = 'ready';
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
    waitThen(() => pollLicense(attempt + 1), attempt, 150, 200);
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
    try {
      const context = JSON.parse(sessionStorage.getItem('outlinesave_checkout_return') || 'null');
      if (context && id && context.transactionId === id && Date.now() - context.createdAt < 4 * 60 * 60 * 1000) state.wechat ||= context.wechat === true;
    } catch (_) {}
    // Preserve a recovered order ID until token exchange succeeds so a delayed payment can be refreshed.
    if (!token && id) {
      const url = new URL(window.location.href);
      url.searchParams.set('transaction_id', id);
      url.searchParams.set('lang', /^zh/i.test(document.documentElement.lang) ? 'zh-CN' : 'en');
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
