/* Keep language and extension source when moving between product and pricing. */
(() => {
  const links = document.querySelectorAll('[data-outlinesave-link]');
  const source = new URLSearchParams(location.search).get('source');
  function updateLinks() {
    links.forEach(link => {
      const url = new URL(link.dataset.outlinesaveLink, document.baseURI);
      if (document.documentElement.dataset.staticLanguage === 'zh-Hans' && /^\/(outlinesave|outline-pro)\.html$/.test(url.pathname)) {
        url.pathname = '/zh-Hans' + url.pathname;
      }
      url.searchParams.set('lang', document.documentElement.lang === 'zh-Hans' ? 'zh-CN' : 'en');
      if (source) url.searchParams.set('source', source);
      link.href = url.pathname + url.search + url.hash;
    });
  }
  new MutationObserver(updateLinks).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  updateLinks();
  // Prefer the current browser without hiding either store or changing any destination.
  if (/\bEdg\//.test(navigator.userAgent || '')) {
    document.querySelectorAll('.os-install-group').forEach(group => {
      const edge = group.querySelector('[data-browser-store="edge"]');
      if (edge) group.prepend(edge);
    });
  }
})();
