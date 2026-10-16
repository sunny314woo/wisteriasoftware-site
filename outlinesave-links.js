/* Keep language and extension source when moving between product and pricing. */
(() => {
  const links = document.querySelectorAll('[data-outlinesave-link]');
  const source = new URLSearchParams(location.search).get('source');
  function updateLinks() {
    links.forEach(link => {
      const url = new URL(link.dataset.outlinesaveLink, location.href);
      url.searchParams.set('lang', document.documentElement.lang === 'zh-Hans' ? 'zh-CN' : 'en');
      if (source) url.searchParams.set('source', source);
      link.href = url.pathname + url.search + url.hash;
    });
  }
  new MutationObserver(updateLinks).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  updateLinks();
})();
