# FluentSocial AI website redesign

This folder contains the redesigned FluentSocial AI landing page and its existing purchase flow pages.

## Release process

Read the monorepo's [website release and troubleshooting runbook](../../../WEBSITE_RELEASE_RUNBOOK.md) before publishing. Pushing a feature branch does not deploy this site; the intended website changes must reach `wisteria-suite/main`, which triggers the automatic sync to the public site repository.

## Production files

- `index.html` — conversion-focused landing page
- `englishflow.css` — shared responsive design system
- `product.js` — referral handoff and reveal behavior
- `purchase.html` / `purchase.js` — legacy-plan-link fallback that opens Paddle directly
- `checkout.html` / `checkout.js` — server-created Paddle transaction flow
- `payment-complete.html` — post-payment guidance

The existing `/englishflow/` route, Paddle price identifiers, client token, API endpoint, `_ptxn` transaction parameter, referral event names, and success URL are intentionally preserved.

When payment behavior or production payment configuration changes, use the risk-based Sandbox/production criteria in the release runbook, then confirm:

1. A signed-in extension purchase opens `checkout.html?_ptxn=...`.
2. A website purchase opens Paddle directly for Monthly, Annual, or Lifetime; Paddle collects the receipt email.
3. Paddle completion reaches `payment-complete.html`.
4. The signed webhook resolves the Paddle Customer email and updates or creates the same FluentSocial AI account.
5. Refreshing account status in the extension shows the new entitlement.

`design-reference.png`, `pricing-reference.png`, `screenshots/`, `capture-site.js`, and `design-qa.md` are review materials and do not need to be deployed.
