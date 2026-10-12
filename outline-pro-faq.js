/* Single-open FAQ accordion. All questions and answers are present in the source HTML. */
(() => {
  const faq = document.querySelector('.op-faq');
  if (!faq) return;

  const groups = [...faq.querySelectorAll('[data-faq-group]')];
  if (!groups.length) return;

  function setExpanded(openGroup) {
    for (const group of groups) {
      const button = group.querySelector('[data-faq-toggle]');
      const panel = document.getElementById(button.getAttribute('aria-controls'));
      const expanded = group === openGroup;
      group.dataset.expanded = String(expanded);
      button.setAttribute('aria-expanded', String(expanded));
      panel.dataset.expanded = String(expanded);
      panel.inert = !expanded;
      panel.setAttribute('aria-hidden', String(!expanded));
    }
  }

  faq.classList.add('op-faq-enhanced', 'op-faq-initializing');
  setExpanded(null);
  window.requestAnimationFrame(() => faq.classList.remove('op-faq-initializing'));

  faq.addEventListener('click', (event) => {
    const button = event.target.closest('[data-faq-toggle]');
    if (!button || !faq.contains(button)) return;
    const group = button.closest('[data-faq-group]');
    setExpanded(button.getAttribute('aria-expanded') === 'true' ? null : group);
  });
})();
