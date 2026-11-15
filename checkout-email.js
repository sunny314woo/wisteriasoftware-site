/* Collect the receipt email once, then pass it directly to Paddle without storing it. */
(function () {
  let dialog;
  let checkoutOptions;
  let preferences;
  let billing;

  const copy = {
    en: {
      title: 'Where should we send your activation code?',
      description: 'Your activation code and receipt will be sent to this email after payment.',
      label: 'Email address',
      wechatNote: '',
      cancel: 'Cancel',
      continue: 'Continue to payment',
      subscribe: 'Continue to subscription',
      subscription: 'Subscription', oneTime: 'No auto-renewal',
      quarterly: 'Quarterly subscription', annual: 'Annual subscription',
      annualOneTime: '1-year license', lifetime: 'Lifetime license',
      quarterlyRule: 'Auto-renews every 3 months. Cancel renewal anytime; Pro stays active until your paid period ends.',
      annualRule: 'Auto-renews yearly. Cancel renewal anytime; Pro stays active until your paid period ends.',
      annualOneTimeRule: 'One payment. Valid for one year, with no auto-renewal.',
      lifetimeRule: 'One payment. Lifetime access, with no auto-renewal.',
      error: 'Checkout is temporarily unavailable. Please try again.',
    },
    'zh-Hans': {
      title: '接收激活码的邮箱',
      description: '付款后，激活码与收据将发送到此邮箱，请确认填写正确。',
      label: '邮箱地址',
      wechatNote: '温馨提示：使用微信支付时，付款确认及激活码发送可能需要约15分钟。请留意邮箱，已付款请勿重复支付。',
      cancel: '取消',
      continue: '继续付款',
      subscribe: '继续订阅',
      subscription: '订阅', oneTime: '不自动续费',
      quarterly: '季度订阅', annual: '年度订阅', annualOneTime: '一年授权', lifetime: '终身许可证',
      quarterlyRule: '每 3 个月自动续费。可随时取消续费，当前付费周期内权益保留。',
      annualRule: '每年自动续费。可随时取消续费，当前付费周期内权益保留。',
      annualOneTimeRule: '一次付款，一年有效，不自动续费。',
      lifetimeRule: '一次付款，永久有效，不自动续费。',
      error: '暂时无法打开支付窗口，请重试。',
    },
    'zh-TW': {
      title: '接收啟用碼的電子郵件',
      description: '付款後，啟用碼與收據將寄至此信箱，請確認填寫正確。',
      label: '電子郵件地址',
      wechatNote: '溫馨提示：使用微信支付時，付款確認及啟用碼寄送可能需要約15分鐘。請留意信箱，已付款請勿重複支付。',
      cancel: '取消',
      continue: '繼續付款',
      subscribe: '繼續訂閱',
      subscription: '訂閱', oneTime: '不自動續費',
      quarterly: '季度訂閱', annual: '年度訂閱', annualOneTime: '一年授權', lifetime: '終身許可證',
      quarterlyRule: '每 3 個月自動續費。可隨時取消續費，目前付費週期內權益保留。',
      annualRule: '每年自動續費。可隨時取消續費，目前付費週期內權益保留。',
      annualOneTimeRule: '一次付款，一年有效，不自動續費。',
      lifetimeRule: '一次付款，永久有效，不自動續費。',
      error: '暫時無法開啟付款視窗，請重試。',
    },
  };

  function checkoutPreferences() {
    const current = window.WisteriaI18n
      ? window.WisteriaI18n.currentLanguage() : document.documentElement.lang;
    if (!/^zh(?:-|$)/i.test(current)) return { locale: 'en' };

    // The site currently normalizes all Chinese to zh-Hans. Preserve regional
    // URL/browser hints here without changing the site's translation or return flow.
    const requested = new URLSearchParams(window.location.search).get('lang');
    const browser = [navigator.languages?.[0], navigator.language].find(value => /^zh(?:-|$)/i.test(value || '')) || '';
    let manual = false;
    try {
      const config = window.WISTERIA_I18N_CONFIG || {};
      manual = localStorage.getItem(config.manualStorageKey || 'wisteria-language-manual') === '1';
    } catch (_) { /* Browser language still works when storage is blocked. */ }
    const source = requested && /^zh(?:-|$)/i.test(requested) ? requested
      : !manual && /^zh(?:-|$)/i.test(browser) ? browser : current;
    const parts = source.toLowerCase().split('-');
    const country = parts.includes('hk') ? 'HK' : parts.includes('tw') ? 'TW' : 'CN';
    const traditional = country === 'HK' || country === 'TW' || parts.includes('hant');
    return { locale: traditional ? 'zh-TW' : 'zh-Hans', country };
  }

  function createDialog() {
    dialog = document.createElement('dialog');
    dialog.className = 'checkout-email';
    dialog.setAttribute('aria-labelledby', 'checkout-email-title');
    dialog.setAttribute('aria-describedby', 'checkout-email-description');
    dialog.innerHTML = `
      <form method="dialog" class="checkout-email-form">
        <p class="checkout-email-brand">OutlineSave Pro</p>
        <h2 id="checkout-email-title"></h2>
        <p id="checkout-email-description"></p>
        <section class="checkout-billing" hidden aria-live="polite">
          <div class="checkout-billing-heading"><strong data-checkout-plan></strong><span data-checkout-billing-type></span></div>
          <p data-checkout-billing-rule></p>
        </section>
        <label for="checkout-email-input"></label>
        <input id="checkout-email-input" name="email" type="email" autocomplete="email"
          inputmode="email" enterkeyhint="go" autocapitalize="none" spellcheck="false"
          aria-describedby="checkout-wechat-note" required autofocus>
        <p id="checkout-wechat-note" class="checkout-email-hint" data-wechat-note></p>
        <p class="checkout-email-error" role="alert" hidden></p>
        <div class="checkout-email-actions">
          <button type="button" class="checkout-email-cancel"></button>
          <button type="submit" class="checkout-email-continue"></button>
        </div>
      </form>`;
    document.body.append(dialog);
    dialog.querySelector('.checkout-email-cancel').addEventListener('click', () => dialog.close());
    dialog.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const input = dialog.querySelector('input');
      input.value = input.value.trim();
      if (!input.reportValidity()) return;
      const customer = { email: input.value };
      if (preferences.country) customer.address = { countryCode: preferences.country };
      const error = dialog.querySelector('.checkout-email-error');
      error.hidden = true;
      // Release the native modal's top layer before Paddle opens its own overlay.
      dialog.close();
      try {
        // Rebuild the original payload at confirmation time so discounts and
        // campaign deadlines remain owned by the existing pricing controller.
        const options = typeof checkoutOptions === 'function' ? checkoutOptions() : {
          items: [{ priceId: checkoutOptions, quantity: 1 }],
          settings: window.OutlineSaveCheckoutReturn.settings(),
        };
        window.Paddle.Checkout.open({
          ...options,
          customer,
          settings: { ...options.settings, locale: preferences.locale },
        });
      } catch (_) {
        error.textContent = copy[preferences.locale].error;
        error.hidden = false;
        dialog.showModal();
      }
    });
  }

  function renderBilling(text) {
    const summary = typeof billing === 'function' ? billing() : billing;
    const known = summary && ['quarterly', 'annual', 'annualOneTime', 'lifetime'].includes(summary.plan)
      && summary.type === (['quarterly', 'annual'].includes(summary.plan) ? 'subscription' : 'one-time');
    dialog.querySelector('.checkout-billing').hidden = !known;
    if (known) {
      dialog.querySelector('[data-checkout-plan]').textContent = text[summary.plan];
      dialog.querySelector('[data-checkout-billing-type]').textContent = text[summary.type === 'subscription' ? 'subscription' : 'oneTime'];
      dialog.querySelector('[data-checkout-billing-rule]').textContent = text[summary.plan + 'Rule'];
    }
    dialog.querySelector('.checkout-email-continue').textContent = known && summary.type === 'subscription' ? text.subscribe : text.continue;
  }

  window.OutlineSaveCheckout = {
    open(options, summary) {
      if (!options) throw new Error('Missing checkout options');
      if (!dialog) createDialog();
      if (dialog.open) return;
      checkoutOptions = options;
      billing = summary;
      preferences = checkoutPreferences();
      const text = copy[preferences.locale];
      dialog.lang = preferences.locale;
      dialog.querySelector('h2').textContent = text.title;
      dialog.querySelector('#checkout-email-description').textContent = text.description;
      dialog.querySelector('label').textContent = text.label;
      const wechatNote = dialog.querySelector('[data-wechat-note]');
      wechatNote.textContent = text.wechatNote;
      wechatNote.hidden = !text.wechatNote;
      dialog.querySelector('.checkout-email-cancel').textContent = text.cancel;
      renderBilling(text);
      dialog.querySelector('.checkout-email-error').hidden = true;
      dialog.showModal();
    },
  };
})();
