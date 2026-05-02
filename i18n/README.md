# Wisteria landing i18n

This directory holds the maintainable multilingual layer for the static landing site.

## Files

- `config.js`: supported locales, language aliases, localStorage key, and SEO-friendly localized routes.
- `locales/<locale>.js`: translation dictionaries. Each file registers itself on `window.WISTERIA_I18N_DICTIONARIES`.
- `../i18n.js`: runtime only. It reads config and dictionaries, injects the language selector, applies translations, and handles language preference.

## Loading order

Pages that use the language selector must load scripts in this order:

```html
<script src="i18n/config.js" defer></script>
<script src="i18n/locales/zh-Hans.js" defer></script>
<script src="i18n.js" defer></script>
```

For localized static pages under `/zh-Hans/`, the current pages use `<base href="../" />`, so the same script paths work there too.

## Adding a language

1. Add the locale to `config.js`.
2. Add any browser aliases to `config.js`.
3. Create `locales/<locale>.js`.
4. Add a `<script>` tag for the locale file before `i18n.js`.
5. Add SEO routes, static localized pages, `hreflang`, and sitemap entries for pages that should be indexed in that language.

## Translating page content

Preferred new-page pattern:

```html
<h1 data-i18n="pages.index.hero.title">English fallback</h1>
<img
  src="example.png"
  alt="English fallback"
  data-i18n-attrs="alt"
  data-i18n-alt="pages.index.hero.imageAlt"
/>
```

For older pages, the runtime also supports the `selectors` map in locale files. Use it as a compatibility bridge, but prefer `data-i18n` keys for new work because they survive layout changes better.

## Language priority

1. User-selected language stored in `localStorage`.
2. Language implied by the URL path, such as `/zh-Hans/`.
3. Browser language.
4. Default locale from `config.js`.
