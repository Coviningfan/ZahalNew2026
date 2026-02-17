# Overview

This is a full-stack e-commerce application for Zahal, a natural skincare brand specializing in alum stone deodorants and natural personal care products. The application is a hybrid solution: a custom React frontend displays products with premium UI/UX, while redirecting to Shopify for purchases, cart management, and order processing.

# Recent Changes (February 17, 2026)

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

## Shopify Integration
- Product IDs are exact Shopify product handles for seamless checkout
- Checkout URL format: `https://5b32c9-07.myshopify.com/products/{product-handle}`
- "Comprar en Shopify" button only on product detail page
- "Preguntar por WhatsApp" button on product detail page
- Product images sourced from Shopify CDN

## Key Components
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
- **Routing**: Wouter — routes: /, /productos, /productos/:id, /nosotros, /preguntas-frecuentes, /contacto
- **State Management**: TanStack Query (React Query) v5
- **UI Framework**: Shadcn/ui + Radix UI + Tailwind CSS
- **Build Tool**: Vite

## Backend Architecture
- **Express.js Server**: RESTful API server with TypeScript
- **Storage Layer**: In-memory MemStorage implementation
- **API Endpoints**: GET /api/products, GET /api/products/:id, cart CRUD operations

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
- Neon Database (PostgreSQL), Radix UI, Tailwind CSS, Lucide React, React Icons, React Hook Form, Zod, date-fns

The application follows a monorepo structure with shared TypeScript types between frontend and backend. The design emphasizes premium, organic aesthetics with warm earthy tones aligned with the brand's natural positioning and Mexican market focus.
