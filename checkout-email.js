/* Collect the receipt email once, then pass it directly to Paddle without storing it. */
(function () {
  let dialog;
  let checkoutOptions;
  let preferences;

  const copy = {
    en: {
      title: 'Where should we send your activation code?',
      description: 'Your activation code and receipt will be sent to this email after payment.',
      label: 'Email address',
      hint: 'You can review your email and billing country in the next step.',
      wechatNote: 'With WeChat Pay, payment confirmation and activation code delivery may take around 15 minutes. Please check your email. If you have already paid, do not pay again.',
      cancel: 'Cancel',
      continue: 'Continue to payment',
      error: 'Checkout is temporarily unavailable. Please try again.',
    },
    'zh-Hans': {
      title: '接收激活码的邮箱',
      description: '付款后，激活码与收据将发送到此邮箱，请确认填写正确。',
      label: '邮箱地址',
      hint: '下一步将预选账单国家/地区，你仍可核对和修改。',
      wechatNote: '使用微信支付时，付款确认及激活码发送可能需要约15分钟。请留意邮箱，已付款请勿重复支付。',
      cancel: '取消',
      continue: '继续付款',
      error: '暂时无法打开支付窗口，请重试。',
    },
    'zh-TW': {
      title: '接收啟用碼的電子郵件',
      description: '付款後，啟用碼與收據將寄至此信箱，請確認填寫正確。',
      label: '電子郵件地址',
      hint: '下一步將預選帳單國家/地區，你仍可確認和修改。',
      wechatNote: '使用微信支付時，付款確認及啟用碼寄送可能需要約15分鐘。請留意信箱，已付款請勿重複支付。',
      cancel: '取消',
      continue: '繼續付款',
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
        <label for="checkout-email-input"></label>
        <input id="checkout-email-input" name="email" type="email" autocomplete="email"
          inputmode="email" enterkeyhint="go" autocapitalize="none" spellcheck="false"
          aria-describedby="checkout-email-hint" required autofocus>
        <p id="checkout-email-hint" class="checkout-email-hint"></p>
        <p class="checkout-email-hint" data-wechat-note></p>
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

  window.OutlineSaveCheckout = {
    open(options) {
      if (!options) throw new Error('Missing checkout options');
      if (!dialog) createDialog();
      if (dialog.open) return;
      checkoutOptions = options;
      preferences = checkoutPreferences();
      const text = copy[preferences.locale];
      dialog.lang = preferences.locale;
      dialog.querySelector('h2').textContent = text.title;
      dialog.querySelector('#checkout-email-description').textContent = text.description;
      dialog.querySelector('label').textContent = text.label;
      dialog.querySelector('#checkout-email-hint').textContent = text.hint;
      dialog.querySelector('[data-wechat-note]').textContent = text.wechatNote;
      dialog.querySelector('.checkout-email-cancel').textContent = text.cancel;
      dialog.querySelector('.checkout-email-continue').textContent = text.continue;
      dialog.querySelector('.checkout-email-error').hidden = true;
      dialog.showModal();
    },
  };
})();
