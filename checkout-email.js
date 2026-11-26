/* Confirm the activation email and billing region for Simplified Chinese checkout. */
(function () {
  let dialog;
  let checkoutOptions;
  let paymentHint = '';
  const subscriptionHint = '温馨提示：支付宝支付确认可能需要1–3分钟，个别情况可能更久。请耐心等待，避免重复付款。';
  const lifetimeHint = '温馨提示：支付宝或微信支付确认通常需要几分钟，个别情况可能需要等待5–10分钟。请耐心等待，避免重复付款。';

  function browserLanguage() {
    return navigator.languages?.[0] || navigator.language || '';
  }

  function checkoutLocale() {
    const current = window.WisteriaI18n
      ? window.WisteriaI18n.currentLanguage() : document.documentElement.lang;
    if (!/^zh(?:-|$)/i.test(current)) return 'en';

    // The storefront currently displays Simplified Chinese for all Chinese locales.
    const requested = new URLSearchParams(window.location.search).get('lang');
    const browser = browserLanguage();
    let manual = false;
    try {
      const config = window.WISTERIA_I18N_CONFIG || {};
      manual = localStorage.getItem(config.manualStorageKey || 'wisteria-language-manual') === '1';
    } catch (_) { /* Browser language still works when storage is blocked. */ }
    const source = requested && /^zh(?:-|$)/i.test(requested) ? requested
      : !manual && /^zh(?:-|$)/i.test(browser) ? browser : current;
    return /-(?:hant|tw|hk|mo)(?:-|$)/i.test(source) ? 'zh-TW' : 'zh-Hans';
  }

  function resolveOptions(input, locale) {
    const options = typeof input === 'function' ? input() : {
      items: [{ priceId: input, quantity: 1 }],
      settings: window.OutlineSaveCheckoutReturn.settings(),
    };
    let attribution;
    try {
      attribution = window.OutlineSaveGrowth?.customData();
    } catch (_) { /* Attribution is optional for every purchase. */ }
    return {
      ...options,
      settings: { ...options.settings, locale },
      customData: { ...options.customData, ...attribution, license_email_locale: locale === 'en' ? 'en' : 'zh' },
    };
  }

  function openPaddle(options) {
    try { window.OutlineSaveAnalytics?.checkoutOpening?.(); } catch (_) {}
    try {
      window.Paddle.Checkout.open(options);
    } catch (error) {
      try { window.OutlineSaveAnalytics?.checkoutEvent('checkout.error'); } catch (_) {}
      throw error;
    }
  }

  function selectedRegion() {
    return dialog.querySelector('input[name="billing-region"]:checked')?.value;
  }

  function updatePaymentHint() {
    const hint = dialog.querySelector('#checkout-payment-hint');
    const region = dialog.querySelector('.checkout-region');
    const message = selectedRegion() === 'CN' ? paymentHint : '';
    hint.hidden = !message;
    hint.textContent = message;
    if (message) region.setAttribute('aria-describedby', hint.id);
    else region.removeAttribute('aria-describedby');
  }

  function createDialog() {
    dialog = document.createElement('dialog');
    dialog.className = 'checkout-email';
    dialog.lang = 'zh-Hans';
    dialog.setAttribute('aria-labelledby', 'checkout-email-title');
    dialog.innerHTML = `
      <form method="dialog" class="checkout-email-form">
        <div class="checkout-email-heading">
          <h2 id="checkout-email-title">接收激活码的邮箱</h2>
          <button type="button" class="checkout-email-close" aria-label="关闭">×</button>
        </div>
        <label for="checkout-email-input">邮箱地址</label>
        <input id="checkout-email-input" name="email" type="email" autocomplete="email"
          inputmode="email" enterkeyhint="go" autocapitalize="none" spellcheck="false" required autofocus>
        <fieldset class="checkout-region">
          <legend>账单地区</legend>
          <div class="checkout-region-options">
            <label class="checkout-region-option">
              <input type="radio" name="billing-region" value="CN" required>
              <span>中国大陆</span>
            </label>
            <label class="checkout-region-option">
              <input type="radio" name="billing-region" value="other">
              <span>其他地区</span>
            </label>
          </div>
        </fieldset>
        <p id="checkout-payment-hint" class="checkout-email-hint" hidden></p>
        <p class="checkout-email-error" role="alert" hidden></p>
        <div class="checkout-email-actions">
          <button type="submit" class="checkout-email-continue">继续</button>
        </div>
      </form>`;
    document.body.append(dialog);
    dialog.querySelector('input[value="CN"]').checked = /^zh-CN$/i.test(browserLanguage());
    dialog.querySelector('.checkout-email-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('.checkout-region').addEventListener('change', updatePaymentHint);
    const form = dialog.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = dialog.querySelector('#checkout-email-input');
      email.value = email.value.trim();
      const region = selectedRegion();
      if (!email.reportValidity() || !region) return;

      // Leaving the address out lets Paddle suggest an editable billing region.
      const customer = { email: email.value };
      if (region === 'CN') customer.address = { countryCode: 'CN' };
      const error = dialog.querySelector('.checkout-email-error');
      error.hidden = true;
      dialog.close();
      try {
        // Resolve again after email confirmation to account for campaign deadlines.
        openPaddle({ ...resolveOptions(checkoutOptions, 'zh-Hans'), customer });
      } catch (_) {
        error.textContent = '暂时无法打开支付窗口，请重试。';
        error.hidden = false;
        dialog.showModal();
      }
    });
  }

  window.OutlineSaveCheckout = {
    open(options, plan) {
      if (!options) throw new Error('Missing checkout options');
      if (dialog?.open) return;
      const locale = checkoutLocale();
      if (locale !== 'zh-Hans') {
        openPaddle(resolveOptions(options, locale));
        return;
      }
      checkoutOptions = options;
      if (plan === 'lifetime') paymentHint = lifetimeHint;
      else if (plan === 'quarterly' || plan === 'annual') paymentHint = subscriptionHint;
      else paymentHint = '';
      if (!dialog) createDialog();
      updatePaymentHint();
      dialog.querySelector('.checkout-email-error').hidden = true;
      dialog.showModal();
    },
  };
})();
