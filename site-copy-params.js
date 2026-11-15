/* Shared display parameters. No network requests and no billing decisions. */
(() => {
  function render() {
    for (const [attribute, key] of [['data-free-directory-limit', 'freeDirectoryLimit'],
      ['data-free-export-weekly-limit', 'freeExportWeeklyLimit']]) {
      const value = window.OutlineSavePricingConfig?.[key];
      if (!Number.isSafeInteger(value) || value < 1) continue;
      for (const node of document.querySelectorAll(`[${attribute}]`)) {
        if (node.textContent !== String(value)) node.textContent = String(value);
      }
    }
  }
  render();
  window.addEventListener('pageshow', render);
  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
