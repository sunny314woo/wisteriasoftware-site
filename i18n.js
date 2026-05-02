(function () {
  const config = window.WISTERIA_I18N_CONFIG || {};
  const dictionaries = window.WISTERIA_I18N_DICTIONARIES || {};
  const defaultLocale = config.defaultLocale || "en";
  const locales = config.locales || [{ code: defaultLocale, label: "English", htmlLang: "en" }];
  const supported = new Set(locales.map((locale) => locale.code));
  const localeByCode = locales.reduce((all, locale) => {
    all[locale.code] = locale;
    return all;
  }, {});
  const storageKey = config.storageKey || "wisteria-language";

  function pageKey() {
    const file = window.location.pathname.split("/").pop();
    return file || "index.html";
  }

  function pathLanguage() {
    const match = locales.find((locale) => {
      if (!locale.pathPrefix) return false;
      return window.location.pathname === `${locale.pathPrefix}/`
        || window.location.pathname.startsWith(`${locale.pathPrefix}/`);
    });
    return match ? match.code : defaultLocale;
  }

  function normalizeLanguage(value) {
    if (!value) return defaultLocale;
    const lower = value.toLowerCase();
    if (supported.has(value)) return value;
    if (config.aliases && config.aliases[lower]) return config.aliases[lower];

    const directMatch = locales.find((locale) => locale.code.toLowerCase() === lower);
    if (directMatch) return directMatch.code;

    const languageMatch = locales.find((locale) => lower.startsWith(locale.code.toLowerCase().split("-")[0]));
    return languageMatch ? languageMatch.code : defaultLocale;
  }

  function readSavedLanguage() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function saveLanguage(language) {
    try {
      localStorage.setItem(storageKey, language);
    } catch (error) {
      return;
    }
  }

  function preferredLanguage() {
    const saved = readSavedLanguage();
    if (supported.has(saved)) return saved;
    if (pathLanguage() !== defaultLocale) return pathLanguage();
    const browserLanguage =
      navigator.languages && navigator.languages.length ? navigator.languages[0] : navigator.language;
    return normalizeLanguage(browserLanguage);
  }

  function rememberOriginalHtml(element) {
    if (!element.dataset.i18nOriginalHtml) {
      element.dataset.i18nOriginalHtml = element.innerHTML;
    }
  }

  function rememberOriginalText(element) {
    if (!element.dataset.i18nOriginalText) {
      element.dataset.i18nOriginalText = element.textContent;
    }
  }

  function rememberOriginalAttribute(element, attribute) {
    const key = `i18nOriginalAttr${attribute.replace(/[^a-z0-9]/gi, "")}`;
    if (!element.dataset[key]) {
      element.dataset[key] = element.getAttribute(attribute) || "";
    }
    return key;
  }

  function getValue(dictionary, key) {
    return key.split(".").reduce((value, part) => {
      if (!value || typeof value !== "object") return undefined;
      return value[part];
    }, dictionary);
  }

  function setHtml(selector, html, language) {
    document.querySelectorAll(selector).forEach((element) => {
      rememberOriginalHtml(element);
      element.innerHTML = language === defaultLocale ? element.dataset.i18nOriginalHtml : html;
    });
  }

  function hrefFile(anchor) {
    const href = anchor.getAttribute("href") || "";
    return href.split("#")[0].split("?")[0].replace(/^\//, "");
  }

  function currentDictionary(language) {
    return dictionaries[language] || {};
  }

  function translateShared(language) {
    const dictionary = currentDictionary(language);
    const shared = dictionary.shared || {};

    document.querySelectorAll("nav .nav-link").forEach((anchor) => {
      rememberOriginalText(anchor);
      const translated = shared.nav && shared.nav[hrefFile(anchor)];
      anchor.textContent = language !== defaultLocale && translated ? translated : anchor.dataset.i18nOriginalText;
    });

    document.querySelectorAll(".footer-links a").forEach((anchor) => {
      rememberOriginalText(anchor);
      const translated = shared.footer && shared.footer[hrefFile(anchor)];
      anchor.textContent = language !== defaultLocale && translated ? translated : anchor.dataset.i18nOriginalText;
    });

    document.querySelectorAll("footer > p").forEach((paragraph) => {
      const mailLink = paragraph.querySelector("a");
      if (!mailLink) return;
      rememberOriginalHtml(paragraph);
      paragraph.innerHTML =
        language !== defaultLocale && shared.company
          ? `${shared.company}<a href="mailto:support@wisteriasoftware.uk">support@wisteriasoftware.uk</a>`
          : paragraph.dataset.i18nOriginalHtml;
    });
  }

  function translateAnnotatedElements(language) {
    const dictionary = currentDictionary(language);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = getValue(dictionary, key);
      rememberOriginalHtml(element);
      element.innerHTML = language === defaultLocale || value === undefined
        ? element.dataset.i18nOriginalHtml
        : value;
    });

    document.querySelectorAll("[data-i18n-attrs]").forEach((element) => {
      const attrs = element.getAttribute("data-i18n-attrs").split(",").map((attr) => attr.trim()).filter(Boolean);
      attrs.forEach((attribute) => {
        const key = element.getAttribute(`data-i18n-${attribute}`);
        if (!key) return;
        const value = getValue(dictionary, key);
        const originalKey = rememberOriginalAttribute(element, attribute);
        element.setAttribute(
          attribute,
          language === defaultLocale || value === undefined ? element.dataset[originalKey] : value
        );
      });
    });
  }

  function translatePageMetadata(pageConfig, language) {
    if (!document.documentElement.dataset.i18nOriginalTitle) {
      document.documentElement.dataset.i18nOriginalTitle = document.title;
    }
    document.title = language !== defaultLocale && pageConfig.title
      ? pageConfig.title
      : document.documentElement.dataset.i18nOriginalTitle;

    const description = document.querySelector('meta[name="description"]');
    if (!description) return;
    if (!description.dataset.i18nOriginalContent) {
      description.dataset.i18nOriginalContent = description.getAttribute("content") || "";
    }
    description.setAttribute(
      "content",
      language !== defaultLocale && pageConfig.description
        ? pageConfig.description
        : description.dataset.i18nOriginalContent
    );
  }

  function translatePage(language) {
    const dictionary = currentDictionary(language);
    const pageConfig = dictionary.pages && dictionary.pages[pageKey()];
    if (!pageConfig) return;

    translatePageMetadata(pageConfig, language);
    Object.entries(pageConfig.selectors || {}).forEach(([selector, html]) => {
      setHtml(selector, html, language);
    });
  }

  function localizedPath(language) {
    const routes = config.localizedRoutes || {};
    const route = routes[pageKey()];
    if (route && route[language]) return route[language];

    const currentPath = window.location.pathname.endsWith("/")
      ? `${window.location.pathname}index.html`
      : window.location.pathname;
    if (language === defaultLocale) {
      return currentPath.replace(/^\/[^/]+\/(.+)$/, "/$1");
    }
    return currentPath;
  }

  function comparablePath(path) {
    return path.replace(/\/index\.html$/, "/");
  }

  function redirectToPreferredRoute(language) {
    const routes = config.localizedRoutes || {};
    const route = routes[pageKey()];
    if (!route || !route[language]) return false;

    const target = route[language];
    if (comparablePath(target) === comparablePath(window.location.pathname)) return false;

    window.location.replace(target + window.location.search + window.location.hash);
    return true;
  }

  function ensureLanguageControl(language) {
    const nav = document.querySelector("header nav");
    if (!nav || document.querySelector(".language-control")) return;

    const label = document.createElement("label");
    label.className = "language-control";
    label.setAttribute("aria-label", "Language");

    const select = document.createElement("select");
    select.setAttribute("aria-label", "Language");
    select.innerHTML = locales.map((locale) => (
      `<option value="${locale.code}">${locale.label}</option>`
    )).join("");
    select.value = language;
    select.addEventListener("change", () => {
      saveLanguage(select.value);
      const target = localizedPath(select.value);
      if (target !== window.location.pathname) {
        window.location.href = target + window.location.search + window.location.hash;
        return;
      }
      applyLanguage(select.value);
    });

    label.append(select);
    nav.append(label);
  }

  function applyLanguage(language) {
    const normalized = supported.has(language) ? language : defaultLocale;
    document.documentElement.lang = (localeByCode[normalized] && localeByCode[normalized].htmlLang) || normalized;
    translateShared(normalized);
    translateAnnotatedElements(normalized);
    translatePage(normalized);

    const select = document.querySelector(".language-control select");
    if (select) select.value = normalized;
  }

  const initialLanguage = preferredLanguage();
  if (redirectToPreferredRoute(initialLanguage)) return;
  ensureLanguageControl(initialLanguage);
  applyLanguage(initialLanguage);

  window.WisteriaI18n = {
    applyLanguage,
    currentLanguage: () => document.documentElement.lang,
    localizedPath,
  };
})();
