/* Register English page metadata so language switching restores the original. */
(() => {
  const en = window.WISTERIA_I18N_DICTIONARIES.en ||= {};
  en.pages ||= {};
  en.pages['outline-pro.html'] ||= {};
})();
