/*
 * 【MODIFIED】File purpose: central i18n configuration for the static Wisteria landing site.
 * Main functions: declares supported locales, aliases, shared navigation/footer structure, and compatibility routes.
 * Latest modification purpose: group all three products, help and policy links without changing existing routes.
 */
(function () {
  window.WISTERIA_I18N_CONFIG = {
    storageKey: "wisteria-language",
    manualStorageKey: "wisteria-language-manual",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        label: "English",
        htmlLang: "en",
        pathPrefix: "",
      },
      {
        code: "zh-Hans",
        label: "简体中文",
        htmlLang: "zh-Hans",
        pathPrefix: "/zh-Hans",
      },
      {
        code: "ja",
        label: "日本語",
        htmlLang: "ja",
        pathPrefix: "/ja",
        pending: true,
      },
      {
        code: "ko",
        label: "한국어",
        htmlLang: "ko",
        pathPrefix: "/ko",
        pending: true,
      },
      {
        code: "de",
        label: "Deutsch",
        htmlLang: "de",
        pathPrefix: "/de",
        pending: true,
      },
      {
        code: "es",
        label: "Español",
        htmlLang: "es",
        pathPrefix: "/es",
        pending: true,
      },
    ],
    aliases: {
      "zh": "zh-Hans",
      "zh-cn": "zh-Hans",
      "zh-hans": "zh-Hans",
      "zh-hk": "zh-Hans",
      "zh-tw": "zh-Hans",
    },
    sharedLayout: {
      brand: "Wisteria Software",
      nav: [
        {
          href: "product.html",
          label: "Products",
          children: [
            { href: "outlinesave.html", label: "OutlineSave", activePages: ["outline-pro.html"] },
            { href: "englishflow/", label: "EnglishFlow" },
            { href: "inbox.html", label: "Inbox" },
          ],
        },
        {
          href: "support.html",
          label: "Help & Support",
          i18nKey: "help-support",
          children: [
            { href: "support.html#help-guides", label: "Help & Guides", i18nKey: "support-help-guides" },
            { href: "support.html#contact", label: "Contact Support", i18nKey: "support-contact" },
          ],
        },
      ],
      footerGroups: [
        { id: "products", label: "Products" },
        { id: "support", label: "Help & Support" },
        { id: "legal", label: "Legal & Policies" },
      ],
      footer: [
        { group: "products", href: "outlinesave.html", label: "OutlineSave" },
        { group: "products", href: "englishflow/", label: "EnglishFlow" },
        { group: "products", href: "inbox.html", label: "Inbox" },
        { group: "support", href: "support.html#help-guides", label: "Help & Guides", i18nKey: "support-help-guides" },
        { group: "support", href: "support.html#contact", label: "Contact Support", i18nKey: "support-contact" },
        { group: "legal", href: "privacy.html", label: "Privacy Policy" },
        { group: "legal", href: "englishflow-privacy.html", label: "EnglishFlow Privacy" },
        { group: "legal", href: "terms.html", label: "Terms of Service" },
        { group: "legal", href: "refund.html", label: "Refund Policy" },
      ],
      companyHtml:
        "© 2026 Wisteria Software Ltd.<br />Registered in England and Wales.<br />Company No. 16965144<br />Email: <a href=\"mailto:support@wisteriasoftware.uk\">support@wisteriasoftware.uk</a>",
    },
    // 【MODIFIED】Legacy path pages are compatibility-only; the official first-stage language model is query/runtime.
    legacyPathPrefixes: ["/zh-Hans"],
  };

})();
