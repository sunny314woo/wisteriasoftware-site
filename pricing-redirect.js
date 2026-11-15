/* Keep existing pricing links, language, source and anchors on one sales page. */
(() => {
  const target = new URL('outline-pro.html', location.href);
  target.search = location.search;
  target.hash = location.hash || '#pricing';
  location.replace(target.href);
})();
