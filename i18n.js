/*
 * 【MODIFIED】File purpose: runtime i18n and shared layout renderer for the static Wisteria landing site.
 * Main functions: resolves language preference, renders shared navigation/footer, applies translations, and records missing keys.
 * Latest modification purpose: keep the first-stage language model query/runtime-first while preserving legacy /zh-Hans/ entry pages.
 */
(function () {
  const config = window.WISTERIA_I18N_CONFIG || {};
  const dictionaries = window.WISTERIA_I18N_DICTIONARIES || {};
  const defaultLocale = config.defaultLocale || "en";
  const locales = config.locales || [{ code: defaultLocale, label: "English", htmlLang: "en" }];
  const selectableLocales = locales.filter((locale) => !locale.pending);
  const supported = new Set(locales.map((locale) => locale.code));
  const selectable = new Set(selectableLocales.map((locale) => locale.code));
  const localeByCode = locales.reduce((all, locale) => {
    all[locale.code] = locale;
    return all;
  }, {});
  const storageKey = config.storageKey || "wisteria-language";
  const manualStorageKey = config.manualStorageKey || `${storageKey}-manual`;
  const missingKeys = [];
  const missingKeySet = new Set();
  let activeLanguage = defaultLocale;

  /**
   * 【MODIFIED】Records an i18n fallback that should be visible during QA.
   * @param {string} type - Missing item category, such as dictionary, selector, or page.
   * @param {string} key - Translation key, selector, or page identifier.
   * @param {string} language - Locale being applied.
   * @param {string} page - Current page key.
   * Side effects: writes to window.WisteriaI18n.missingKeys when the public object is available and warns in the console.
   */
  function recordMissing(type, key, language, page) {
    if (language === defaultLocale) return;
    const id = `${type}:${language}:${page}:${key}`;
    if (missingKeySet.has(id)) return;
    missingKeySet.add(id);
    const entry = { type, key, language, page };
    missingKeys.push(entry);
    if (window.WisteriaI18n) {
      window.WisteriaI18n.missingKeys = missingKeys;
    }
    if (window.console && typeof window.console.warn === "function") {
      window.console.warn("[Wisteria i18n missing]", entry);
    }
  }

  /**
   * Returns the canonical page key for dictionary lookups.
   * Normalises so /outline-pro and /outline-pro.html both become "outline-pro.html".
   */
  function pageKey() {
    let file = window.location.pathname.split("/").pop();
    if (!file) return "index.html";
    if (!file.endsWith(".html")) file = file + ".html";
    return file;
  }

  function pathLanguage() {
    const match = locales.find((locale) => {
      if (!locale.pathPrefix) return false;
      return window.location.pathname === `${locale.pathPrefix}/`
        || window.location.pathname.startsWith(`${locale.pathPrefix}/`);
    });
    return match ? match.code : defaultLocale;
  }

  /**
   * 【MODIFIED】Converts internal locale codes into public query values.
   * @param {string} language - Internal locale code, such as zh-Hans.
   * Output: public query value, such as zh-CN.
   * Side effects: none.
   */
  function publicLanguageCode(language) {
    if (language === "zh-Hans") return "zh-CN";
    return language;
  }

  function normalizeLanguage(value) {
    if (!value) return defaultLocale;
    const lower = value.toLowerCase();
    if (supported.has(value)) return value;
    if (config.aliases && config.aliases[lower]) return config.aliases[lower];

    const directMatch = locales.find((locale) => locale.code.toLowerCase() === lower);
    if (directMatch) return directMatch.code;

    const languageMatch = locales.find((locale) => lower.startsWith(locale.code.toLowerCase().split("-")[0]));
    return languageMatch && selectable.has(languageMatch.code) ? languageMatch.code : defaultLocale;
  }

  /**
   * 【MODIFIED】Reads the URL language parameter for first-stage runtime language switching.
   * Input: current window.location.search.
   * Output: normalized locale code or null when no supported query language exists.
   * Side effects: none.
   */
  function queryLanguage() {
    try {
      const value = new URLSearchParams(window.location.search).get("lang");
      if (!value) return null;
      const normalized = normalizeLanguage(value);
      return selectable.has(normalized) ? normalized : defaultLocale;
    } catch (error) {
      return null;
    }
  }

  function readSavedLanguage() {
    try {
      const saved = localStorage.getItem(storageKey);
      return selectable.has(saved) ? saved : null;
    } catch (error) {
      return null;
    }
  }

  /**
   * 【MODIFIED】Persists a user-selected locale.
   * @param {string} language - Locale code to store.
   * @param {boolean} manual - Whether this came from a user action or explicit query parameter.
   * Side effects: writes localStorage keys used by the i18n runtime.
   */
  function saveLanguage(language, manual) {
    try {
      localStorage.setItem(storageKey, language);
      if (manual) localStorage.setItem(manualStorageKey, "1");
    } catch (error) {
      return;
    }
  }

  /**
   * 【MODIFIED】Chooses the initial language without redirecting away from the English default path.
   * Input priority: query parameter, saved user choice, legacy localized path, browser language, default locale.
   * Output: locale code.
   * Side effects: explicit query parameters and legacy path entries are saved so child pages keep the selected language.
   */
  function preferredLanguage() {
    const queried = queryLanguage();
    if (queried) {
      saveLanguage(queried, true);
      return queried;
    }
    const saved = readSavedLanguage();
    if (supported.has(saved)) return saved;
    const pathLocale = pathLanguage();
    if (selectable.has(pathLocale) && pathLocale !== defaultLocale) {
      saveLanguage(pathLocale, true);
      return pathLocale;
    }
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

  /**
   * 【MODIFIED】Translates a single runtime string for inline page scripts.
   * @param {string} key - Dot-separated dictionary key.
   * @param {string} fallback - English fallback string.
   * Output: localized string when available, otherwise fallback.
   * Side effects: records missing runtime keys for QA visibility.
   */
  function translateString(key, fallback) {
    if (activeLanguage === defaultLocale) return fallback;
    const value = getValue(currentDictionary(activeLanguage), key);
    if (value === undefined) {
      recordMissing("runtime", key, activeLanguage, pageKey());
      return fallback;
    }
    return value;
  }

  function setHtml(selector, html, language) {
    const matches = document.querySelectorAll(selector);
    if (!matches.length) {
      recordMissing("selector", selector, language, pageKey());
      return;
    }
    matches.forEach((element) => {
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

  /**
   * 【MODIFIED】Returns a URL with only the lang query parameter changed for runtime language switching.
   * @param {string} language - Locale code selected by the user.
   * Output: path/search/hash string for the current page.
   * Side effects: none.
   */
  function languageUrl(language) {
    const url = new URL(window.location.href);
    if (language === defaultLocale) {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", publicLanguageCode(language));
    }
    return `${url.pathname}${url.search}${url.hash}`;
  }

  /**
   * 【MODIFIED】Builds public links for shared navigation/footer using query parameters, not localized paths.
   * @param {string} href - Base static page href from config.sharedLayout.
   * @param {string} language - Active locale.
   * Output: href with ?lang=zh-CN when active locale is Chinese; English remains clean.
   * Side effects: none.
   */
  function localizedHref(href, language) {
    if (language === defaultLocale) return href;
    try {
      /* Build language-aware URL with pure string manipulation.
         Avoids new URL() which breaks under file:// (origin "null" in Chrome). */
      var base = href.split("#")[0].split("?")[0];
      var hashPart = href.includes("#") ? "#" + href.split("#").slice(1).join("#") : "";
      var existingQuery = href.includes("?") ? href.split("?")[1].split("#")[0] : "";
      var searchParams = new URLSearchParams(existingQuery);
      searchParams.set("lang", publicLanguageCode(language));
      var queryString = searchParams.toString();
      return base + (queryString ? "?" + queryString : "") + hashPart;
    } catch (error) {
      return href;
    }
  }

  /**
   * Renders shared header and footer from configuration.
   * Nav structure comes from window.WISTERIA_NAV (nav.js).
   * Footer structure comes from config.sharedLayout (i18n/config.js).
   */
  function renderNavItem(item, currentPage) {
    if (!item.children || !item.children.length) {
      /* Plain link */
      var active = item.href.split("#")[0].split("?")[0].replace(/^\//, "") === currentPage
        ? " active"
        : "";
      return (
        '<a class="nav-link' + active + '"'
        + ' data-i18n-base-href="' + item.href + '"'
        + ' href="' + item.href + '">'
        + item.label
        + '</a>'
      );
    }

    /* Dropdown */
    if (item.href) {
      /* Has a dedicated page — trigger is an <a> with dropdown arrow */
      var active =
        item.href.split("#")[0].split("?")[0].replace(/^\//, "") === currentPage
          ? " active"
          : "";
      var childLinks = item.children
        .map(function (child) {
          var cActive =
            child.href.split("#")[0].split("?")[0].replace(/^\//, "") ===
            currentPage
              ? " active"
              : "";
          return (
            '<a class="nav-link dropdown-item' + cActive + '"'
            + ' data-i18n-base-href="' + child.href + '"'
            + ' href="' + child.href + '">'
            + child.label
            + '</a>'
          );
        })
        .join("");
      return (
        '<div class="nav-dropdown">'
        + '<a class="nav-link nav-dropdown-trigger' + active + '"'
        + ' href="' + item.href + '"'
        + ' data-i18n-base-href="' + item.href + '"'
        + ' aria-haspopup="true">'
        + '<span class="nav-label">' + item.label + '</span>'
        + ' <span class="dropdown-arrow">▾</span>'
        + '</a>'
        + '<div class="nav-dropdown-menu">'
        + childLinks
        + '</div>'
        + '</div>'
      );
    }

    /* No href — trigger is a <button> */
    var key = item.key || "";
    var childLinks = item.children
      .map(function (child) {
        var cActive =
          child.href.split("#")[0].split("?")[0].replace(/^\//, "") ===
          currentPage
            ? " active"
            : "";
        return (
          '<a class="nav-link dropdown-item' + cActive + '"'
          + ' data-i18n-base-href="' + child.href + '"'
          + ' href="' + child.href + '">'
          + child.label
          + '</a>'
        );
      })
      .join("");
    return (
      '<div class="nav-dropdown">'
      + '<button class="nav-link nav-dropdown-trigger"'
      + ' type="button"'
      + ' data-nav-key="' + key + '"'
      + ' aria-haspopup="true"'
      + ' aria-expanded="false">'
      + '<span class="nav-label">' + item.label + '</span>'
      + ' <span class="dropdown-arrow">▾</span>'
      + '</button>'
      + '<div class="nav-dropdown-menu">'
      + childLinks
      + '</div>'
      + '</div>'
    );
  }

  function renderSharedLayout() {
    var navConfig = window.WISTERIA_NAV || {};
    var layout = config.sharedLayout || {};

    /* ---- Header / Navigation ---- */
    var header = document.querySelector("header");
    if (header && navConfig.main) {
      var current = pageKey();
      var navLinks = navConfig.main
        .map(function (item) {
          return renderNavItem(item, current);
        })
        .join("");
      header.innerHTML = [
        '<!-- Shared navigation rendered from nav.js -->',
        '<div class="nav-wrap">',
        '<div class="brand">'
        + '<svg class="brand-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">'
        + '<circle cx="7" cy="7" r="3" fill="#a78bfa" opacity=".9"/>'
        + '<circle cx="17" cy="7" r="3" fill="#8b5cf6" opacity=".9"/>'
        + '<circle cx="7" cy="17" r="3" fill="#7c3aed" opacity=".8"/>'
        + '<circle cx="17" cy="17" r="3" fill="#6d28d9" opacity=".7"/>'
        + '<circle cx="12" cy="12" r="5" fill="none" stroke="#7c3aed" stroke-width="1.2" opacity=".5"/>'
        + '</svg>'
        + (navConfig.brand || "Wisteria Software")
        + '</div>',
        '<nav>' + navLinks + '</nav>',
        '</div>',
      ].join("");

      /* Dropdown hover behaviour */
      var dropdowns = header.querySelectorAll(".nav-dropdown");
      dropdowns.forEach(function (dd) {
        dd.addEventListener("mouseenter", function () {
          var menu = dd.querySelector(".nav-dropdown-menu");
          var trigger = dd.querySelector(".nav-dropdown-trigger");
          if (menu) menu.style.display = "block";
          if (trigger) trigger.setAttribute("aria-expanded", "true");
        });
        dd.addEventListener("mouseleave", function () {
          var menu = dd.querySelector(".nav-dropdown-menu");
          var trigger = dd.querySelector(".nav-dropdown-trigger");
          if (menu) menu.style.display = "";
          if (trigger) trigger.setAttribute("aria-expanded", "false");
        });
        /* Click toggle for touch / keyboard */
        var trigger = dd.querySelector(".nav-dropdown-trigger");
        if (trigger && trigger.tagName === "BUTTON") {
          trigger.addEventListener("click", function (e) {
            e.preventDefault();
            var menu = dd.querySelector(".nav-dropdown-menu");
            var expanded = trigger.getAttribute("aria-expanded") === "true";
            if (menu) menu.style.display = expanded ? "" : "block";
            trigger.setAttribute("aria-expanded", expanded ? "false" : "true");
          });
        }
      });
    }

    /* ---- Footer ---- */
    var footer = document.querySelector("footer");
    if (footer && layout.footer) {
      var links = layout.footer
        .map(function (item) {
          return (
            '<a data-i18n-base-href="' + item.href + '" href="' + item.href + '">'
            + item.label
            + '</a>'
          );
        })
        .join(" | ");
      footer.innerHTML = [
        '<!-- Shared footer rendered from i18n/config.js -->',
        '<div class="footer-links">' + links + '</div>',
        '<p>' + (layout.companyHtml || "") + '</p>',
      ].join("");
    }
  }

  /**
   * Translates shared navigation and footer text.
   * Handles regular nav links, dropdown items, and dropdown trigger buttons.
   */
  function translateShared(language) {
    const dictionary = currentDictionary(language);
    const shared = dictionary.shared || {};

    /* ---- Regular nav links (including dropdown items) ---- */
    document.querySelectorAll("nav .nav-link").forEach((anchor) => {
      rememberOriginalText(anchor);
      const translated = shared.nav && shared.nav[hrefFile(anchor)];
      if (!translated) recordMissing("shared.nav", hrefFile(anchor), language, pageKey());

      if (anchor.classList.contains("nav-dropdown-trigger")) {
        /* Translate only the .nav-label child, preserve the arrow */
        var labelEl = anchor.querySelector(".nav-label");
        if (labelEl) {
          rememberOriginalText(labelEl);
          labelEl.textContent = language !== defaultLocale && translated ? translated : labelEl.dataset.i18nOriginalText;
        }
      } else {
        anchor.textContent = language !== defaultLocale && translated ? translated : anchor.dataset.i18nOriginalText;
      }

      anchor.setAttribute("href", localizedHref(anchor.dataset.i18nBaseHref || anchor.getAttribute("href") || "", language));
    });

    /* ---- Dropdown trigger buttons (About) ---- */
    document.querySelectorAll("nav .nav-dropdown-trigger[data-nav-key]").forEach((trigger) => {
      const key = trigger.getAttribute("data-nav-key");
      const translated = shared.nav && shared.nav[key];
      const labelEl = trigger.querySelector(".nav-label");
      if (labelEl) {
        rememberOriginalText(labelEl);
        labelEl.textContent = language !== defaultLocale && translated ? translated : labelEl.dataset.i18nOriginalText;
      }
      if (!translated) recordMissing("shared.nav", key, language, pageKey());
    });

    /* ---- Footer links ---- */
    document.querySelectorAll(".footer-links a").forEach((anchor) => {
      rememberOriginalText(anchor);
      const translated = shared.footer && shared.footer[hrefFile(anchor)];
      if (!translated) recordMissing("shared.footer", hrefFile(anchor), language, pageKey());
      anchor.textContent = language !== defaultLocale && translated ? translated : anchor.dataset.i18nOriginalText;
      anchor.setAttribute("href", localizedHref(anchor.dataset.i18nBaseHref || anchor.getAttribute("href") || "", language));
    });

    /* ---- Footer company line ---- */
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

  /**
   * 【MODIFIED】Applies explicit data-i18n attributes while recording missing keys.
   * @param {string} language - Locale currently being applied.
   * Output: none.
   * Side effects: mutates annotated DOM nodes and translated attributes.
   */
  function translateAnnotatedElements(language) {
    const dictionary = currentDictionary(language);

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = getValue(dictionary, key);
      rememberOriginalHtml(element);
      element.innerHTML = language === defaultLocale || value === undefined
        ? element.dataset.i18nOriginalHtml
        : value;
      if (value === undefined) recordMissing("data-i18n", key, language, pageKey());
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
        if (value === undefined) recordMissing("data-i18n-attr", key, language, pageKey());
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

  /**
   * 【MODIFIED】Applies page-level selector translations and records pages/selectors that fall back to English.
   * @param {string} language - Locale currently being applied.
   * Output: none.
   * Side effects: mutates page DOM and metadata.
   */
  function translatePage(language) {
    const dictionary = currentDictionary(language);
    const pageConfig = dictionary.pages && dictionary.pages[pageKey()];
    if (!pageConfig) {
      recordMissing("page", pageKey(), language, pageKey());
      return;
    }

    translatePageMetadata(pageConfig, language);
    Object.entries(pageConfig.selectors || {}).forEach(([selector, html]) => {
      setHtml(selector, html, language);
    });
  }

  /**
   * 【MODIFIED】Compatibility API for callers that need the current-page language URL.
   * @param {string} language - Locale code.
   * Output: current path with lang query adjusted; no path redirect is generated.
   * Side effects: none.
   */
  function localizedPath(language) {
    return languageUrl(language);
  }

  /**
   * 【MODIFIED】Injects the language selector into the shared navigation.
   * @param {string} language - Initial active locale.
   * Output: none.
   * Side effects: mutates navigation DOM, updates URL query on user selection, writes localStorage through saveLanguage.
   */
  function ensureLanguageControl(language) {
    const nav = document.querySelector("header nav");
    if (!nav || document.querySelector(".language-control")) return;

    const control = document.createElement("div");
    control.className = "language-control";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "language-toggle";
    button.setAttribute("aria-haspopup", "menu");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Language");
    button.innerHTML = [
      '<span class="language-icon" aria-hidden="true">🌐</span>',
      '<span class="language-label">Language</span>',
      '<span class="language-caret" aria-hidden="true">▾</span>',
    ].join("");

    const menu = document.createElement("ul");
    menu.className = "language-menu";
    menu.setAttribute("role", "menu");
    menu.hidden = true;

    function closeMenu() {
      menu.hidden = true;
      button.setAttribute("aria-expanded", "false");
    }

    selectableLocales.forEach((locale) => {
      const item = document.createElement("li");
      item.setAttribute("role", "none");

      const option = document.createElement("button");
      option.type = "button";
      option.className = "language-option";
      option.setAttribute("role", "menuitemradio");
      option.setAttribute("data-language", locale.code);
      option.textContent = locale.label;
      option.addEventListener("click", () => {
        saveLanguage(locale.code, true);
        const target = languageUrl(locale.code);
        closeMenu();
        if (target !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
          window.history.replaceState(null, "", target);
        }
        applyLanguage(locale.code);
      });

      item.append(option);
      menu.append(item);
    });

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu();
      } else {
        menu.hidden = false;
        button.setAttribute("aria-expanded", "true");
      }
    });

    document.addEventListener("click", (event) => {
      if (!control.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    control.append(button);
    control.append(menu);
    nav.append(control);
  }

  function syncLanguageControl(language) {
    const button = document.querySelector(".language-toggle");
    const label = document.querySelector(".language-label");
    if (button && label) {
      const locale = localeByCode[language];
      label.textContent = locale ? locale.label : "Language";
    }

    document.querySelectorAll(".language-option").forEach((option) => {
      const isActive = option.getAttribute("data-language") === language;
      option.classList.toggle("is-active", isActive);
      option.setAttribute("aria-checked", isActive ? "true" : "false");
    });
  }

  /**
   * 【MODIFIED】Applies a locale to the current document.
   * @param {string} language - Locale code to apply.
   * Output: none.
   * Side effects: updates html lang/data attributes, DOM text, metadata, and language selector state.
   */
  function applyLanguage(language) {
    const normalized = selectable.has(language) ? language : defaultLocale;
    activeLanguage = normalized;
    document.documentElement.lang = (localeByCode[normalized] && localeByCode[normalized].htmlLang) || normalized;
    document.documentElement.setAttribute("data-current-language", normalized);
    translateShared(normalized);
    translateAnnotatedElements(normalized);
    translatePage(normalized);

    syncLanguageControl(normalized);
  }

  const initialLanguage = preferredLanguage();
  renderSharedLayout();
  ensureLanguageControl(initialLanguage);
  applyLanguage(initialLanguage);

  window.WisteriaI18n = {
    applyLanguage,
    currentLanguage: () => document.documentElement.lang,
    localizedPath,
    missingKeys,
    t: translateString,
  };
})();
