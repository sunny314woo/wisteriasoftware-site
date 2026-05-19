/*
 * nav.js — Unified navigation configuration for all pages.
 *
 * This is the single source of truth for the site navigation. Every page loads
 * this file and i18n.js renders the actual navigation DOM from this config.
 *
 * Structure:
 *   - Items without "children" are plain links.
 *   - Items with "children" become a dropdown trigger + dropdown menu.
 *     The trigger is a <button> (for "About") or an <a> (for "Products").
 *     Dropdown items with "href" are links; use "key" for translation lookups.
 */

(function () {
  window.WISTERIA_NAV = {
    brand: "Wisteria Software",

    /* ---- Main navigation ---- */
    main: [
      /* Home */
      { href: "index.html", label: "Home" },

      /* Products dropdown — trigger clicks through to product.html */
      {
        href: "product.html",
        label: "Products",
        children: [
          { href: "outline-pro.html", label: "Outline" },
          { href: "inbox.html",      label: "Inbox" },
        ],
      },

      /* About dropdown — no dedicated page, pure dropdown */
      {
        key: "nav-about",
        label: "About",
        children: [
          { href: "privacy.html", label: "Privacy Policy" },
          { href: "terms.html",   label: "Terms of Service" },
          { href: "refund.html",  label: "Refund Policy" },
        ],
      },

      /* Support */
      { href: "support.html", label: "Support" },

      /* Blog */
      { href: "https://blog.wisteriasoftware.uk/", label: "Blog" },
    ],
  };
})();
