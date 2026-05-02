(function () {
  window.WISTERIA_I18N_CONFIG = {
    storageKey: "wisteria-language",
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
    ],
    aliases: {
      "zh": "zh-Hans",
      "zh-cn": "zh-Hans",
      "zh-hans": "zh-Hans",
    },
    localizedRoutes: {
      "index.html": {
        en: "/",
        "zh-Hans": "/zh-Hans/",
      },
      "privacy.html": {
        en: "/privacy.html",
        "zh-Hans": "/zh-Hans/privacy.html",
      },
    },
  };
})();
