/* Confirm the activation email for Chinese checkout, then prefill Paddle. */
(function () {
  let dialog;
  let checkoutOptions;
  let preferences;

  const copy = {
    'zh-Hans': {
      title: '接收激活码的邮箱',
      description: '激活码是启用插件 PRO 权益的凭证。付款确认后会显示在成功页，并发送到此邮箱，方便长期保存。请确认邮箱地址无误。',
      label: '邮箱地址',
      wechatNote: '如使用微信支付，页面可能稍慢；激活码邮件可能需要约几分钟。',
      repeatWarning: '若已扣款，请勿重复支付。',
      close: '关闭',
      continue: '继续',
      error: '暂时无法打开支付窗口，请重试。',
    },
    'zh-TW': {
      title: '接收啟用碼的信箱',
      description: '啟用碼是啟用擴充功能 PRO 權益的憑證。付款確認後會顯示在成功頁，並寄送至此信箱，方便長期保存。請確認電子郵件地址無誤。',
      label: '電子郵件地址',
      wechatNote: '如使用微信支付，頁面可能稍慢；啟用碼郵件可能需要約幾分鐘。',
      repeatWarning: '若已扣款，請勿重複支付。',
      close: '關閉',
      continue: '繼續',
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

  function resolveOptions() {
    const options = typeof checkoutOptions === 'function' ? checkoutOptions() : {
      items: [{ priceId: checkoutOptions, quantity: 1 }],
      settings: window.OutlineSaveCheckoutReturn.settings(),
    };
    try {
      const attribution = window.OutlineSaveGrowth?.customData();
      if (attribution) options.customData = { ...options.customData, ...attribution };
    } catch (_) { /* Attribution is optional for every purchase. */ }
    return { ...options, customData: { ...options.customData, license_email_locale: preferences.locale === 'en' ? 'en' : 'zh' } };
  }

  function createDialog() {
    dialog = document.createElement('dialog');
    dialog.className = 'checkout-email';
    dialog.setAttribute('aria-labelledby', 'checkout-email-title');
    dialog.setAttribute('aria-describedby', 'checkout-email-description');
    dialog.innerHTML = `
      <form method="dialog" class="checkout-email-form">
        <div class="checkout-email-heading">
          <h2 id="checkout-email-title"></h2>
          <button type="button" class="checkout-email-close" aria-label=""></button>
        </div>
        <p id="checkout-email-description"></p>
        <label for="checkout-email-input"></label>
        <input id="checkout-email-input" name="email" type="email" autocomplete="email"
          inputmode="email" enterkeyhint="go" autocapitalize="none" spellcheck="false"
          aria-describedby="checkout-wechat-note" required autofocus>
        <p id="checkout-wechat-note" class="checkout-email-hint"><span data-wechat-note></span> <strong data-repeat-warning></strong></p>
        <p class="checkout-email-error" role="alert" hidden></p>
        <div class="checkout-email-actions">
          <button type="submit" class="checkout-email-continue"></button>
        </div>
      </form>`;
    document.body.append(dialog);
    dialog.querySelector('.checkout-email-close').addEventListener('click', () => dialog.close());
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
        const options = resolveOptions();
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
    open(options, plan) {
      if (!options) throw new Error('Missing checkout options');
      if (dialog?.open) return;
      checkoutOptions = options;
      preferences = checkoutPreferences();
      if (preferences.locale === 'en') {
        window.Paddle.Checkout.open(resolveOptions());
        return;
      }
      if (!dialog) createDialog();
      const text = copy[preferences.locale];
      dialog.lang = preferences.locale;
      dialog.querySelector('h2').textContent = text.title;
      dialog.querySelector('#checkout-email-description').textContent = text.description;
      dialog.querySelector('label').textContent = text.label;
      const wechatHint = dialog.querySelector('#checkout-wechat-note');
      wechatHint.hidden = plan !== 'lifetime' || preferences.country !== 'CN';
      dialog.querySelector('[data-wechat-note]').textContent = wechatHint.hidden ? '' : text.wechatNote;
      dialog.querySelector('[data-repeat-warning]').textContent = wechatHint.hidden ? '' : text.repeatWarning;
      dialog.querySelector('input').setAttribute('aria-describedby', wechatHint.hidden ? 'checkout-email-description' : 'checkout-wechat-note');
      dialog.querySelector('.checkout-email-close').setAttribute('aria-label', text.close);
      dialog.querySelector('.checkout-email-close').textContent = '×';
      dialog.querySelector('.checkout-email-continue').textContent = text.continue;
      dialog.querySelector('.checkout-email-error').hidden = true;
      dialog.showModal();
    },
  };
})();
