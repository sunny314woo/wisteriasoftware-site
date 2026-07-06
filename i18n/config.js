/*
 * 【MODIFIED】File purpose: central i18n configuration for the static Wisteria landing site.
 * Main functions: declares supported locales, aliases, shared navigation/footer structure, and compatibility routes.
 * Latest modification purpose: support the first-stage runtime/localStorage/query language strategy without changing English default URLs.
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
        { href: "index.html", label: "Home" },
        { href: "product.html", label: "Products" },
        { href: "outline-pro.html", label: "Outline" },
        { href: "inbox.html", label: "Inbox" },
        { href: "support.html", label: "Support" },
        {
          href: "privacy.html",
          label: "Privacy",
          children: [
            { href: "privacy.html", label: "General Privacy", i18nKey: "privacy-general" },
            { href: "englishflow-privacy.html", label: "EnglishFlow Privacy" },
          ],
        },
        { href: "terms.html", label: "Terms" },
        { href: "refund.html", label: "Refund" },
      ],
      footer: [
        { href: "product.html", label: "Products" },
        { href: "outline-pro.html", label: "Outline" },
        { href: "inbox.html", label: "Inbox" },
        { href: "support.html", label: "Support" },
        { href: "privacy.html", label: "Privacy Policy" },
        { href: "englishflow-privacy.html", label: "EnglishFlow Privacy" },
        { href: "terms.html", label: "Terms of Service" },
        { href: "refund.html", label: "Refund Policy" },
      ],
      companyHtml:
        "© 2026 Wisteria Software Ltd.<br />Registered in England and Wales.<br />Company No. 16965144<br />Email: <a href=\"mailto:support@wisteriasoftware.uk\">support@wisteriasoftware.uk</a>",
    },
    // 【MODIFIED】Legacy path pages are compatibility-only; the official first-stage language model is query/runtime.
    legacyPathPrefixes: ["/zh-Hans"],
  };
})();
