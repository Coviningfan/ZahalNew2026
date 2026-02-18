# Overview

This is a full-stack e-commerce application for Zahal, a natural skincare brand specializing in alum stone deodorants and natural personal care products. The application uses a custom React frontend with direct Stripe payment processing — no Shopify dependency.

# Recent Changes (February 18, 2026)

## External Audit Fixes
- **Server hardening**: Error handler no longer throws after response (was causing unhandled rejections), added request body size limits (1MB), rate limiting on /api/* (100 req/min) and /api/checkout (5 req/min) via express-rate-limit
- **Query client fix**: staleTime changed from Infinity to 5 minutes so product data refreshes; retry set to 1 so failed fetches aren't permanent
- **Dead code removal**: Deleted unused duplicate `client/src/lib/api.ts`
- **Cart fetch optimization**: Product cache only re-fetches from API when new (uncached) product IDs are in cart
- **Checkout UX**: Toast notifications on checkout failure (was silently swallowing errors); quantity cap of 10 per product; checkout success page verifies session_id from URL (prevents false confirmations)
- **SEO improvements**: og:image and twitter:image meta tags now rendered in SEO component with default fallback; Nunito ghost font removed from index.html (was loaded but never used); /donde-encontrarnos and /terminos added to sitemap.xml
- **Storage optimization**: Stripe price fetching parallelized with Promise.all (was sequential loop, N+1 API calls)
- **Legal pages**: Added Términos y Condiciones page at /terminos with full content; footer "Términos" link now functional

## Previous Website Audit & SEO Fixes
- Per-page SEO meta tags via react-helmet-async (unique title, description, canonical, OG tags per page)
- Fallback meta tags in index.html for crawlers that don't execute JavaScript
- Viewport meta fixed: removed maximum-scale=1 to allow user zooming (accessibility + mobile)
- Google Fonts trimmed from 20+ families to only Playfair Display + Inter (performance)
- Favicon added (SVG with green "Z" logo at /favicon.svg)
- Skip-to-content accessibility link (sr-only, visible on keyboard focus)
- All pages wrapped in `<main id="main-content">` landmarks
- Gzip compression middleware added to Express server
- sitemap.xml route with all public pages + proper XML format
- robots.txt route with crawl directives and sitemap reference
- SEO component: `client/src/components/seo.tsx` — reusable Helmet wrapper
- Invalid Tailwind classes fixed: h-13→h-14, duration-400→duration-500
- font-serif registered in Tailwind config
- 404 page translated to Spanish
- Cart sidebar image fallback for products without images
- Product category navigation fixed to pass ?categoria= query parameter

# Previous Changes (February 17, 2026)

## Stripe Integration (Replacing Shopify)
- Complete migration from Shopify checkout to native Stripe Checkout
- All 11 products created in Stripe with prices, metadata (category, weight, features, inStock, isFeatured, isNew)
- Backend reads products from Stripe sync tables (stripe.products, stripe.prices) via PostgreSQL
- Client-side shopping cart using React Context + localStorage
- Cart sidebar in navigation with add/remove items, quantity controls, checkout button
- POST /api/checkout creates Stripe Checkout session and redirects to Stripe-hosted checkout
- Success page at /checkout/exito, cancel page at /checkout/cancelado
- Stripe webhooks auto-sync product/price changes to local database
- "Agregar al Carrito" replaces old "Comprar en Shopify" button on product detail pages
- Removed all Shopify checkout/cart URLs; only legacy CDN image URLs remain (still functional)

## Premium + Earthy Redesign
- Complete visual overhaul: removed amber/yellow accent, replaced with all-green palette
- Warm off-white backgrounds (hsl(80 20% 98%)) instead of stark white
- Subtle linen-texture CSS pattern for organic feel
- New `accent` color: sage green hsl(152 35% 38%) instead of amber
- Improved glass-blur navigation with saturate(180%)
- Hero section: dramatic serif headlines with emerald-200 italic accent, internal navigation
- New ProofSection component: "¿Por qué cambiarte a ZAHAL?" with trust stats (24h, 0%, 100%)
- Product detail page: WhatsApp button + trust badges (envío, pago seguro, 100% natural)
- Footer: WhatsApp link added, all product links point internally to /productos
- Contact page: prominent WhatsApp CTA banner at top
- Smooth scroll-to-top blur transitions between pages
- Product cards: refined hover animations (lift + shadow), Eye icon on "Ver Detalles" button
- Newsletter subscribe button: white on green instead of amber

## Product Catalog (11 Products)
1. Desodorante Spray 15ml - $45.00
2. Roll On con Aloe Vera 30ml - $56.00
3. Roll On Teens con Aroma 30ml - $66.00
4. Roll On For Men 90ml - $115.00
5. Roll On Teens 90ml - $115.00
6. Roll On Sport 90ml - $120.00
7. Pack Dúo Stick + Spray - $130.00
8. Spray Corporal 240ml - $131.00
9. Kit Eco Viajero - $150.00
10. Stick Natural 60g - $189.00
11. Stick Natural 120g - $275.00

## Key Components
- `use-cart.tsx`: CartProvider context with localStorage persistence, checkout via Stripe
- `navigation.tsx`: Glass-blur nav with cart sidebar (Sheet component)
- `product-detail.tsx`: Product page with "Agregar al Carrito", WhatsApp, trust badges
- `checkout-success.tsx`: Order confirmation page, clears cart
- `checkout-cancel.tsx`: Payment cancelled page
- `proof-section.tsx`: Trust/reassurance component with highlights and stats
- `hero-section.tsx`: Full-screen hero with green gradient overlay
- `featured-products.tsx`: Shows first 3 products with "Ver Tienda Completa" CTA
- `product-categories.tsx`: 4 category cards (Unisex, Sport, Travel, Teens) linking to /productos

# User Preferences

Preferred communication style: Simple, everyday language.
Design: Premium + earthy aesthetic, green palette only (NO yellows/amber), Mexican market focus.
Mexican market UX: WhatsApp integration, trust signals, Spanish-first copy.

# System Architecture

## Frontend Architecture
- **React SPA**: Single-page application built with React 18 and TypeScript
- **Routing**: Wouter — routes: /, /productos, /productos/:id, /nosotros, /preguntas-frecuentes, /contacto, /privacidad, /terminos, /donde-encontrarnos, /checkout/exito, /checkout/cancelado
- **State Management**: TanStack Query v5 (product data) + React Context (cart)
- **Cart**: Client-side localStorage-based cart via CartProvider
- **UI Framework**: Shadcn/ui + Radix UI + Tailwind CSS
- **Build Tool**: Vite

## Backend Architecture
- **Express.js Server**: RESTful API server with TypeScript
- **Storage Layer**: Reads products from Stripe sync tables (stripe.products, stripe.prices) in PostgreSQL
- **Stripe Integration**: Managed webhook + backfill sync for products/prices
- **API Endpoints**:
  - GET /api/products — list all products
  - GET /api/products/:id — single product by slug
  - POST /api/checkout — create Stripe Checkout session
  - GET /api/stripe/publishable-key — frontend Stripe key

## Payment Flow
1. User adds items to cart (client-side localStorage)
2. User clicks "Proceder al pago" in cart sidebar
3. Frontend POSTs to /api/checkout with { items: [{ stripePriceId, quantity }] }
4. Backend creates Stripe Checkout Session with line items, MX shipping
5. User is redirected to Stripe-hosted checkout page
6. On success → /checkout/exito (cart cleared), on cancel → /checkout/cancelado

## Design System
- **Primary**: Deep green hsl(152 45% 28%) — brand color
- **Accent**: Sage green hsl(152 35% 38%) — CTAs and secondary actions
- **Background**: Warm off-white hsl(80 20% 98%)
- **Card**: Light sage hsl(90 15% 96%)
- **Foreground**: Dark green-tinted black hsl(150 10% 12%)
- **Fonts**: Playfair Display (headings), Inter (body)
- **Border radius**: 12px default
- **Texture**: Subtle linen-like SVG pattern via `.linen-texture` class

## External Dependencies
- Stripe (payments), Neon Database (PostgreSQL), Radix UI, Tailwind CSS, Lucide React, React Icons, React Hook Form, Zod, date-fns

## Important Files
- `server/stripeClient.ts` — Stripe client initialization
- `server/webhookHandlers.ts` — Stripe webhook event handlers
- `server/storage.ts` — Product storage reading from Stripe sync tables
- `server/routes.ts` — API routes including checkout
- `client/src/hooks/use-cart.tsx` — Cart context provider
- `scripts/seed-products.ts` — Script to seed products in Stripe
