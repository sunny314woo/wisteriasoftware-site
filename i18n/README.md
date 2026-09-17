# Wisteria landing i18n

This directory holds the maintainable multilingual layer for the static landing site.

## Files

- `config.js`: supported locales, language aliases, localStorage key, and shared navigation/footer structure. It also loads the semantic compatibility layer from the config file location so nested pages resolve it correctly.
- `locales/<locale>.js`: translation dictionaries. Each file registers itself on `window.WISTERIA_I18N_DICTIONARIES`.
- `../i18n.js`: legacy-compatible runtime. It reads config and dictionaries, injects the language selector, applies `data-i18n`, and keeps old selector mappings working.
- `../i18n-semantic.js`: semantic compatibility layer for redesigned legacy pages. It binds translations to message keys / source copy instead of section order or CSS layout, and repairs shared labels that should remain stable across languages.

## Loading order

Pages that use the language selector keep the existing script order:

```html
<script src="i18n/config.js" defer></script>
<script src="i18n/locales/zh-Hans.js" defer></script>
<script src="i18n.js" defer></script>
```

`config.js` loads `i18n-semantic.js` centrally, so existing pages do not need another script tag. For localized static pages under `/zh-Hans/`, the current pages use `<base href="../" />`, and the semantic script URL is resolved relative to `config.js` itself.

## Adding a language

1. Add the locale to `config.js`.
2. Add any browser aliases to `config.js`.
3. Create `locales/<locale>.js`.
4. Add a `<script>` tag for the locale file before `i18n.js`.
5. Add SEO routes, static localized pages, `hreflang`, and sitemap entries for pages that should be indexed in that language.

## Translating page content

### Preferred pattern: semantic `data-i18n`

New pages and newly edited sections should use stable semantic keys in the HTML:

```html
<h1 data-i18n="pages.index.hero.title">English fallback</h1>
<img
  src="example.png"
  alt="English fallback"
  data-i18n-attrs="alt"
  data-i18n-alt="pages.index.hero.imageAlt"
/>
```

These keys must describe meaning, not layout. Do not encode section numbers, `nth-child`, or visual position in a new translation key.

### Redesigned legacy pages: semantic compatibility layer

If an old page has already been heavily redesigned and its historical selector dictionary no longer matches the DOM, add its critical copy to `i18n-semantic.js` instead of creating another large set of positional selectors. The semantic layer scans message text and records a semantic key at runtime, so moving a block or changing CSS classes does not break the translation.

This layer is a migration bridge, not a reason to avoid `data-i18n` on future edits. When a migrated section is edited again, prefer placing the semantic key directly in the HTML and then remove the corresponding fallback message when safe.

### Legacy selector bridge

The runtime still supports the `selectors` map in locale files for older pages. Treat it as compatibility-only. Avoid adding new selectors such as:

```text
main > section:nth-of-type(3) .card:nth-child(2) p
```

Those selectors are tightly coupled to layout and are the main cause of translation regressions after page redesigns.

## Brand names

Product and platform names remain stable across languages unless the product explicitly has a localized brand name. In particular:

- `OutlineSave` stays `OutlineSave` in English and Chinese.
- `ChatGPT`, `Gemini`, `Chrome`, `Inbox`, and `EnglishFlow` are not translated as brand names.

Translate surrounding UI labels such as `Products`, `Support`, `Help & Guides`, buttons, descriptions, FAQs, and instructions.

## Language priority

The current runtime resolves language in this order:

1. Explicit `?lang=` selection / saved manual choice.
2. Saved language in `localStorage`.
3. Compatible localized path such as `/zh-Hans/`.
4. Browser language.
5. Default locale from `config.js`.

Existing public URLs remain unchanged. Runtime language switching should not rename product routes, checkout routes, payment-success routes, or extension website targets.

## Safety rule for commerce pages

Internationalization changes must not modify Paddle price IDs, checkout callbacks, transaction storage keys, `successUrl`, `/payment-success`, activation-code polling/resend logic, or API endpoints. Translate visible copy only. Run the payment flow separately after deployment when a commerce page has changed.
