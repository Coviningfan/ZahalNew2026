# Tracking, Consent, and Project Context Report

Generated: 2026-05-05 13:11:11 Pacific Time (PDT, UTC-07; requested as PST)

Repository: `Coviningfan/ZahalNew2026`

Active tracking branch: `codex/fix-google-purchase-tracking`

Draft pull request: https://github.com/Coviningfan/ZahalNew2026/pull/3

## Scope

This report summarizes the project audit and follow-up debugging conversation around Shopify legacy dependencies, Replit runtime context, Stripe checkout, Google Ads purchase tracking, Google Tag Assistant, and cookie consent behavior.

No secret values were recorded in this report.

## Timeline Of Relevant Changes

All times below are Pacific Time.

| Date and time | Change | Reference |
| --- | --- | --- |
| 2026-04-23 09:00:15 | Replit published app after BabyLove removal and media deletion changes. | Commit `8825346` |
| 2026-04-23 09:48:05 | Restored consent and purchase tracking plumbing. | Commit `16f3115` |
| 2026-04-23 09:55:02 | Opened draft PR for tracking fixes. | PR #3 |
| 2026-04-23 10:01:17 | Added footer cookie settings reopen control. | Commit `88e6f5c` |
| 2026-05-05 13:11:11 | Generated this documentation report. | This file |

## Issues Raised

### Shopify dependency confusion

Question raised: whether the app still had a huge dependency on Shopify even though the Shopify service is no longer available.

Finding:

- The app does not appear to use live Shopify APIs.
- Shopify remains only as legacy redirect compatibility for old `/products`, `/collections`, `/cart`, `/checkout`, and related URLs.
- The main live product dependency is Stripe, because product browsing and checkout depend on Stripe products/prices.

Status: clarified. No live Shopify service is required for current runtime, but legacy redirects still matter for SEO and old links.

### Replit runtime audit

A Replit CLI audit was run with constraints:

- Do not print secret values.
- Only list environment variable names.
- Do not write to the database.
- Do not call live Stripe write APIs.

Findings from that audit included:

- Express/Vite/React frontend and backend.
- Drizzle/Postgres persistence.
- Stripe product catalog and Stripe Checkout.
- Replit Object Storage media upload pipeline.
- Replit environment variables for database, Stripe, Object Storage, GA4, and app hosting.
- `npm run build` passed.
- `npm run check` failed due to pre-existing TypeScript and dependency issues.

Status: captured in `docs/audit-context/replit-audit.md`.

### BabyLove integration removal

Issue raised: BabyLove service/integration was no longer desired.

Changes made through Replit:

- Removed BabyLove client UI from the marketing portal.
- Removed BabyLove server sync endpoints.
- Removed related API key handling code from the active route surface.

Status: resolved in current application code.

Residual note:

- If the old database ever stored a `site_settings` row for `babylove_api_key`, it should be cleared without printing the value. This is not the current focus, but it remains a hygiene check.

### Media deletion behavior

Issue found:

- The media delete flow could delete database metadata even if object storage deletion failed, leaving orphaned public objects.

Change made through Replit:

- Media deletion now fails the whole request if object deletion fails, so the database row is not removed first.

Status: improved in current code.

### Google Ads purchase tracking

Issue raised: Google Ads purchase tag was difficult to get working.

Findings:

- The base Google tag was already present and consent-gated.
- Tag IDs already in use:
  - Google tag container: `GT-WVC25M7P`
  - GA4 property: `G-NNR6S8V151`
  - Google Ads account/tag: `AW-17964557666`
- The tag script is loaded from `client/src/components/cookie-consent.tsx` after analytics or marketing consent.
- The app initializes consent from `client/src/App.tsx`.
- The checkout success page tried to call `window.gtag`, but the consent helper only defined a local `gtag` function and did not reliably assign it to `window.gtag`.
- The prior purchase event used `conversion_event_purchase_1`, which is not the standard Google Ads conversion event shape.
- The checkout verify endpoint only returned `valid`, so the frontend did not have purchase value or currency for conversion reporting.

Status: patched in PR #3.

Changes in PR #3:

- `client/src/components/cookie-consent.tsx`
  - Sets `window.gtag = gtag`.
  - Bumps consent version from `1` to `2`.
  - Adds `openCookieConsent()` and a custom reopen event.
- `client/src/pages/checkout-success.tsx`
  - Replaces the custom `conversion_event_purchase_1` event.
  - Fires Google Ads `conversion` when `VITE_GOOGLE_ADS_PURCHASE_SEND_TO` is set.
  - Fires a GA4-style `purchase` event.
  - Uses Stripe `session_id` as `transaction_id`.
  - Adds duplicate protection in `sessionStorage`.
- `server/routes.ts`
  - `/api/checkout/verify` now returns `payment_status`, `amount_total`, and `currency`.
- `client/src/components/footer.tsx`
  - Adds a global footer `Cookies` control that reopens cookie preferences.

### Cookie banner visibility

Issue raised: the cookie message may not be showing to visitors.

Findings:

- The banner only appears when `localStorage["zahal-cookie-consent"]` is missing or has an outdated version.
- Existing visitors who accepted, rejected, or closed the banner would not see it again.
- Because Google tags are consent-gated, missing or stale consent can also make Tag Assistant appear disconnected.

Status: patched in PR #3.

Resolution:

- Bumped `CONSENT_VERSION` from `1` to `2`, causing prior stored consent to be considered outdated.
- Added a footer `Cookies` control so users can reopen preferences after their first decision.
- Reopening preferences restores the saved analytics and marketing toggles.

### Tag Assistant not connected

Issue observed:

- Google Tag Assistant displayed: `Tag Assistant Not Connected` and `Could not connect to Tag Assistant`.

Likely causes in this app:

- Tag Assistant opened before the user granted consent.
- The Google tag script did not load until after accepting cookies.
- Tag Assistant needed a retry after the consent-gated script was injected.
- Browser extensions, ad blockers, or debug URL handling may have interfered.

Status: pending live verification after deploying PR #3.

## Verification Completed

Local verification on branch `codex/fix-google-purchase-tracking`:

- `npm run build`: passed.
- `npm run check`: failed due to known pre-existing issues unrelated to the tracking patch.

Pre-existing `npm run check` failures:

- Missing `embla-carousel-react`.
- Missing `recharts`.
- Implicit `any` parameters in `client/src/components/ui/chart.tsx`.
- `server/index.ts` uses top-level `await`, but `tsconfig.json` lacks a compatible explicit `target`.

## Pending Verification

These items still need to be verified after PR #3 is merged or deployed in Replit.

### Required Google Ads env var

Set the full Google Ads purchase conversion target:

```env
VITE_GOOGLE_ADS_PURCHASE_SEND_TO=AW-17964557666/REPLACE_WITH_CONVERSION_LABEL
```

The value after the slash must come from the Google Ads purchase conversion action's event snippet.

### Cookie consent behavior

Verify in an incognito browser:

1. Open the deployed site.
2. Confirm the cookie banner appears.
3. Accept all cookies, or enable at least Marketing.
4. Confirm the footer `Cookies` button reopens preferences.
5. Confirm saved analytics and marketing toggles are restored in the reopened panel.

Useful browser console checks after accepting marketing consent:

```js
typeof window.gtag
document.querySelector('script[src*="googletagmanager.com/gtag"]')
localStorage.getItem("zahal-cookie-consent")
```

Expected:

- `typeof window.gtag` returns `"function"`.
- The script query returns a Google tag script element.
- Local storage contains consent JSON with version `2`.

### Google Tag Assistant

Recommended test flow:

1. Open Tag Assistant on the production homepage, not the checkout success URL first.
2. Open the site in incognito with ad blockers disabled.
3. Accept Marketing cookies.
4. Return to Tag Assistant and click Retry if it initially says not connected.
5. Confirm consent state shows granted values for the choices accepted.
6. Complete a Stripe test checkout.
7. Inspect the `/checkout/exito?session_id=...` page in Tag Assistant.

Expected events after successful checkout:

- Google Ads `conversion` event, only if `VITE_GOOGLE_ADS_PURCHASE_SEND_TO` is configured.
- GA4-style `purchase` event.
- `transaction_id` set to the Stripe Checkout Session ID.
- `value` based on Stripe `amount_total / 100`.
- `currency` based on Stripe session currency, expected to be `MXN`.

### Stripe checkout test

Use Stripe test mode or a safe test checkout flow to confirm:

- `/api/checkout/verify?session_id=...` returns `valid: true`.
- The response includes `payment_status`, `amount_total`, and `currency`.
- Refreshing the success page does not duplicate the purchase event in the same browser session.

## Remaining Technical Debt

These were identified during the broader audit and are outside PR #3.

### Typecheck health

Recommended next fix:

- Add missing dependencies:
  - `embla-carousel-react`
  - `recharts`
- Add a compatible `target` to `tsconfig.json`.
- Fix chart implicit `any` types.

Goal: make `npm run check` pass.

### Checkout hardening

Current concern:

- Checkout accepts client-submitted Stripe price IDs and validates that they exist in Stripe, but does not prove they belong to the approved site catalog.

Recommended direction:

- Have the client submit product IDs and quantities.
- Resolve products and Stripe price IDs server-side.
- Build line items from server-trusted catalog data.

### Upload finalization hardening

Current concern:

- Admin upload finalization accepts a client-submitted raw URL.

Recommended direction:

- Ensure finalize only accepts URLs or paths that were issued by the server and belong to the expected Object Storage upload directory.

### Admin auth hardening

Current concern:

- Admin auth uses a shared password header.

Recommended direction:

- Add stronger identity/session handling and audit logging before more admin workflows are exposed.

## Current Recommended Order

1. Merge/deploy PR #3.
2. Configure `VITE_GOOGLE_ADS_PURCHASE_SEND_TO`.
3. Verify cookie consent, Tag Assistant, and Stripe purchase events.
4. Fix pre-existing typecheck failures.
5. Harden checkout catalog validation.
6. Harden upload finalization.
