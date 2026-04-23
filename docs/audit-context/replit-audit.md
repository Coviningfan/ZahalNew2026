# Replit Project Audit

Generated: 2026-04-23

Scope constraints followed:
- Did not print secret values.
- Listed environment variable names only.
- Did not write to the database.
- Did not call live Stripe write APIs.
- Did not run `npm run db:push`, `scripts/seed-products.ts`, or `scripts/update-categories.ts`.

## Repo Structure

Top-level project files:
- `package.json`, `package-lock.json`: Node/Vite/Express scripts and dependencies.
- `tsconfig.json`: TypeScript config for `client`, `server`, and `shared`.
- `vite.config.ts`: Vite build and Replit dev plugins.
- `drizzle.config.ts`: Drizzle Kit config requiring `DATABASE_URL`.
- `tailwind.config.ts`, `postcss.config.js`, `components.json`: UI styling/config.
- `squirrel.toml`: project audit/config file.
- `replit.md`: Replit project notes.

Application directories:
- `client/`: React/Vite frontend.
  - `client/src/pages/`: route-level pages, including shop, blog, checkout success/cancel, admin API keys, and marketing portal.
  - `client/src/components/`: public UI, layout, content, SEO, upload, editor, and shadcn-style UI primitives.
  - `client/src/hooks/`: cart, toast, and mobile helpers.
  - `client/src/lib/`: client config, query client, upload helper, utilities.
  - `client/public/`: static public files.
- `server/`: Express backend.
  - `server/index.ts`: app setup, security headers/CSP, Stripe startup check, server boot.
  - `server/routes.ts`: API routes, redirects, SEO endpoints, admin endpoints, checkout.
  - `server/storage.ts`: Stripe product reads plus Drizzle/Postgres persistence methods.
  - `server/uploads.ts`: admin upload flow and public object serving.
  - `server/stripeClient.ts`: Stripe SDK singleton and publishable key accessor.
  - `server/replit_integrations/object_storage/`: Replit Object Storage integration and ACL helpers.
- `shared/`: shared schema/types.
  - `shared/schema.ts`: Drizzle table definitions and Zod schemas.
- `scripts/`: operational Stripe scripts.
  - `scripts/seed-products.ts`: creates Stripe products/prices.
  - `scripts/update-categories.ts`: updates Stripe product metadata.
- `attached_assets/`: imported images, CSVs, and pasted audit/debug notes.
- `dist/`: generated build output from `npm run build`.
- `.agents/`, `.local/`, `.cache/`, `.config/`, `.upm/`: local/Replit/agent support directories.

## Environment Variable Names Only

Names observed in the running environment:
- `ADMIN_PASSWORD`
- `BABYLOVE_API_KEY`
- `BASE_URL`
- `CODEX_CI`
- `CODEX_MANAGED_BY_NPM`
- `CODEX_SANDBOX_NETWORK_DISABLED`
- `CODEX_THREAD_ID`
- `COLORTERM`
- `CONNECTORS_HOSTNAME`
- `DATABASE_URL`
- `DEFAULT_OBJECT_STORAGE_BUCKET_ID`
- `DISPLAY`
- `DOCKER_CONFIG`
- `GH_PAGER`
- `GIT_ASKPASS`
- `GIT_CONFIG_GLOBAL`
- `GIT_EDITOR`
- `GIT_PAGER`
- `GLIBC_TUNABLES`
- `HISTCONTROL`
- `HISTFILE`
- `HISTFILESIZE`
- `HISTSIZE`
- `HOME`
- `HOSTNAME`
- `LANG`
- `LC_ALL`
- `LC_CTYPE`
- `LD_AUDIT`
- `LIBGL_DRIVERS_PATH`
- `LOCALE_ARCHIVE`
- `LS_COLORS`
- `NEON_DATABASE_URL`
- `NIXPKGS_ALLOW_UNFREE`
- `NIX_PATH`
- `NIX_PROFILES`
- `NIX_PS1`
- `NO_COLOR`
- `PAGER`
- `PATH`
- `PGDATABASE`
- `PGHOST`
- `PGPASSWORD`
- `PGPORT`
- `PGUSER`
- `PORT`
- `PRIVATE_OBJECT_DIR`
- `PROMPT_DIRTRIM`
- `PUBLIC_OBJECT_SEARCH_PATHS`
- `PWD`
- `REPLIT_ARTIFACT_ROUTER`
- `REPLIT_ASKPASS_PID2_SESSION`
- `REPLIT_BASHRC`
- `REPLIT_CLI`
- `REPLIT_CLUSTER`
- `REPLIT_CONNECTORS_HOSTNAME`
- `REPLIT_CONTAINER`
- `REPLIT_DB_URL`
- `REPLIT_DEV_DOMAIN`
- `REPLIT_DOMAINS`
- `REPLIT_ENVIRONMENT`
- `REPLIT_EXPO_DEV_DOMAIN`
- `REPLIT_GITSAFE_ENABLED`
- `REPLIT_GITSAFE_EXISTING_REPLS_ENABLED`
- `REPLIT_GITSAFE_NEW_REPLS_ENABLED`
- `REPLIT_HEIMDALL_ADDR`
- `REPLIT_HELIUM_ENABLED`
- `REPLIT_LD_AUDIT`
- `REPLIT_NIX_CHANNEL`
- `REPLIT_PID1_VERSION`
- `REPLIT_PID2`
- `REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE`
- `REPLIT_RIPPKGS_INDICES`
- `REPLIT_RTLD_LOADER`
- `REPLIT_RUN_PATH`
- `REPLIT_SESSION`
- `REPLIT_SUBCLUSTER`
- `REPLIT_USER`
- `REPLIT_USERID`
- `REPLIT_USER_RUN`
- `REPL_HOME`
- `REPL_ID`
- `REPL_IDENTITY`
- `REPL_IDENTITY_KEY`
- `REPL_LANGUAGE`
- `REPL_OWNER`
- `REPL_OWNER_ID`
- `REPL_PUBKEYS`
- `REPL_SLUG`
- `SESSION_SECRET`
- `SHLVL`
- `SLACK_LIVE_API_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_REAL_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_SHIPPING_RATE_FREE`
- `STRIPE_SHIPPING_RATE_PAID`
- `TERM`
- `TZDIR`
- `USER`
- `VITE_BASE_URL`
- `VITE_GA4_ID`
- `XDG_CACHE_HOME`
- `XDG_CONFIG_HOME`
- `XDG_DATA_DIRS`
- `XDG_DATA_HOME`
- `_`
- `__EGL_VENDOR_LIBRARY_FILENAMES`
- `npm_config_prefix`

Names referenced by source/config:
- `ADMIN_PASSWORD`
- `BABYLOVE_API_KEY`
- `BASE_URL`
- `DATABASE_URL`
- `NODE_ENV`
- `PORT`
- `PRIVATE_OBJECT_DIR`
- `PUBLIC_OBJECT_SEARCH_PATHS`
- `REPL_ID`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_SHIPPING_RATE_FREE`
- `STRIPE_SHIPPING_RATE_PAID`
- `VITE_BASE_URL`

## Build/Check Results

Commands run:
- `npm run check`
- `npm run build`

`npm run check` result: failed.

Errors:
- `client/src/components/ui/carousel.tsx`: cannot find module `embla-carousel-react` or its type declarations.
- `client/src/components/ui/chart.tsx`: cannot find module `recharts` or its type declarations.
- `client/src/components/ui/chart.tsx`: implicit `any` parameters at lines reported around `188` and `288`.
- `server/index.ts`: top-level `await` rejected by current `tsconfig` because no explicit compatible `target` is set, despite `module` being `ESNext`.

`npm run build` result: passed.

Build warnings:
- Browserslist/caniuse-lite data is outdated.
- Client bundle chunk exceeds 500 kB after minification. Main JS reported around 1.2 MB before gzip and around 378 kB gzip.

Build output:
- Vite produced `dist/public`.
- esbuild produced `dist/index.js`.

## Detected Runtime Risks

- Startup depends on a live Stripe read: `server/index.ts` calls `initStripe()` at top level and runs `stripe.products.list({ limit: 1 })`. If Stripe credentials, network, or Stripe availability fail, the whole server throws before listening.
- `server/stripeClient.ts` throws during module import when `STRIPE_SECRET_KEY` or `STRIPE_PUBLISHABLE_KEY` is missing. This affects any command or route path importing the server modules.
- Type checking is currently red. The production build passes because Vite/esbuild transpile without enforcing the same full TypeScript checks.
- `tsconfig.json` lacks an explicit `target`. That causes `tsc` to reject the top-level `await` in `server/index.ts`.
- UI source imports dependencies not declared in `package.json`: `embla-carousel-react` and `recharts`.
- Public product browsing depends on live Stripe reads through `storage.getProducts()`, `getProductById()`, category filters, featured products, sitemap product URLs, and Shopify redirect matching. Stripe read latency/failure can affect public pages and SEO endpoints.
- Checkout trusts client-supplied Stripe price IDs after validating them with `stripe.prices.retrieve()`. It checks positive unit amount but does not verify that price IDs belong to an allowed product catalog before creating Checkout sessions.
- Checkout success/cancel URLs use the request host, while sitemap/robots use `BASE_URL` fallback logic. In proxy or multi-domain setups this can produce inconsistent canonical/checkout domains.
- Admin auth is a shared password in `x-admin-password`. It is rate-limited globally under `/api`, but there is no session isolation, account identity, audit trail, or timing-safe comparison.
- Admin endpoints include live Stripe write paths:
  - `POST /api/admin/create-paid-shipping-rate`
  - `PUT /api/admin/products/:stripeProductId`
  These are gated by `ADMIN_PASSWORD` but can mutate live Stripe objects.
- Admin endpoints include database write/delete paths for API keys, blog posts, settings, media metadata, contact/newsletter entries, and article sync.
- `POST /api/admin/sync-articles` calls an external API and writes imported articles to the database. It may create many blog records in one request.
- `site_settings` may store integration secrets such as the BabyLove key when `BABYLOVE_API_KEY` is not used. This makes the database part of secret storage.
- `api_keys.key` values are stored directly in the database and are returned by the API key creation/listing flow.
- Object upload finalization trusts `rawURL` shape enough to normalize and set ACL. It enforces allowed MIME and size metadata, but the presigned PUT target and actual uploaded content are not revalidated by reading object metadata before making it public.
- Media deletion attempts object storage delete and then deletes DB metadata even if object deletion fails after logging the error, which can leave orphaned public objects.
- CSP allows `'unsafe-inline'` scripts and styles. Development additionally allows `'unsafe-eval'`. This increases XSS blast radius if any HTML injection reaches the page.
- CSP and attached browser-error notes indicate analytics/ads URLs have previously been blocked. Current `server/index.ts` includes additional Google domains, but analytics behavior should be rechecked after deploy.
- Database pool creation does not explicitly check for `DATABASE_URL`; failures may occur lazily on first DB operation. Drizzle CLI config checks it, runtime storage does not.
- There are no test scripts beyond `npm run check`; no automated unit/integration/e2e test command is defined.
- `dist/` is present in the workspace and was regenerated by the build. Treat it as generated output unless deployment expects it committed.

## Stripe/DB Integration Map

Stripe client:
- `server/stripeClient.ts`
  - Reads env names: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`.
  - Creates a singleton Stripe SDK client.
  - Uses API version `2025-11-17.clover`.

Server startup:
- `server/index.ts`
  - Calls `getStripeClient()`.
  - Performs live Stripe read: `stripe.products.list({ limit: 1 })`.
  - Fails startup on Stripe connection/config error.

Public Stripe-backed product catalog:
- `server/storage.ts`
  - `fetchAllProducts()` calls `stripe.products.list({ active: true, limit: 100 })`.
  - For each product, calls `stripe.prices.list({ product, active: true, limit: 1 })`.
  - Maps Stripe product metadata to app `Product` objects.
  - Caches product list in memory for 60 seconds.
- Used by routes:
  - `GET /api/products`
  - `GET /api/products/:id`
  - `GET /sitemap.xml`
  - Shopify redirect routes such as `/products/:slug` and `/collections/...`.

Checkout:
- `server/routes.ts`
  - `GET /api/stripe/publishable-key` returns the publishable key to the frontend.
  - `POST /api/checkout` validates request body with `checkoutSchema`.
  - Reads each submitted Stripe price with `stripe.prices.retrieve()`.
  - Reads env names: `STRIPE_SHIPPING_RATE_FREE`, `STRIPE_SHIPPING_RATE_PAID`.
  - Creates a Stripe Checkout Session with `stripe.checkout.sessions.create()`.
  - `GET /api/checkout/verify` retrieves a session with `stripe.checkout.sessions.retrieve()`.

Admin Stripe writes:
- `server/routes.ts`
  - `POST /api/admin/create-paid-shipping-rate` creates a Stripe shipping rate with `stripe.shippingRates.create()`.
  - `PUT /api/admin/products/:stripeProductId` updates Stripe products with `stripe.products.update()`.
  - The same product update route may create a new price with `stripe.prices.create()` and deactivate old prices with `stripe.prices.update()`.
- `scripts/seed-products.ts`
  - Lists products and creates Stripe products/prices.
- `scripts/update-categories.ts`
  - Lists products and updates Stripe product metadata.

Database client:
- `server/storage.ts`
  - Uses `pg.Pool` with env name `DATABASE_URL`.
  - Wraps the pool with `drizzle-orm/node-postgres`.
- `drizzle.config.ts`
  - Uses env name `DATABASE_URL` for Drizzle Kit.
  - `npm run db:push` would write schema changes to the database; it was not run.

Database schema:
- `shared/schema.ts`
  - `contact_messages`
  - `newsletter_subscribers`
  - `api_keys`
  - `blog_posts`
  - `site_settings`
  - `media_assets`

Database reads:
- API key listing/validation.
- Blog listing and lookup.
- Site setting lookup, including hero banners and optional BabyLove key.
- Media asset listing.
- Product/blog existence checks for SEO and SPA route 404 handling.

Database writes/deletes:
- `POST /api/contact`: inserts `contact_messages`.
- `POST /api/newsletter`: inserts/upserts `newsletter_subscribers`.
- `POST /api/admin/api-keys`: inserts `api_keys`.
- `DELETE /api/admin/api-keys/:id`: marks API key inactive.
- `POST /api/admin/blog`: inserts `blog_posts`.
- `PUT /api/admin/blog/:id`: updates `blog_posts`.
- `DELETE /api/admin/blog/:id`: deletes `blog_posts`.
- `PUT /api/admin/sync-articles/key`: stores BabyLove key in `site_settings`.
- `DELETE /api/admin/sync-articles/key`: clears BabyLove key in `site_settings`.
- `POST /api/admin/sync-articles`: imports external articles into `blog_posts`.
- `PUT /api/admin/settings/:key`: upserts `site_settings`.
- `POST /api/admin/upload-finalize`: inserts `media_assets`.
- `DELETE /api/admin/media/:id`: deletes object storage file if possible, then deletes `media_assets`.

Object storage:
- `server/uploads.ts`
  - Admin-gated presigned upload URL creation.
  - Admin-gated finalize step that sets object ACL public and writes `media_assets`.
  - Public object reads via `/objects/:objectPath(*)` with ACL checks.
- `server/replit_integrations/object_storage/objectStorage.ts`
  - Reads env names: `PUBLIC_OBJECT_SEARCH_PATHS`, `PRIVATE_OBJECT_DIR`.
  - Uses Replit sidecar credentials to access Google Cloud Storage-compatible object storage.
