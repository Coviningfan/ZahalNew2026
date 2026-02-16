# Overview

This is a full-stack e-commerce application for Zahal, a natural skincare brand specializing in alum stone deodorants and natural personal care products. The application is a hybrid solution: a custom React frontend displays products with premium UI/UX, while redirecting to Shopify for purchases, cart management, and order processing.

# Recent Changes (February 16, 2026)

## Product Catalog Expansion & Navigation Update
- Expanded product catalog from 6 to 12 products matching full Shopify store
- "Ver Tienda Completa" button now navigates to /productos (internal) instead of Shopify
- Product card buttons changed from "Comprar" (Shopify redirect) to "Ver Detalles" (internal navigation)
- Category filtering on /productos page now works client-side
- Added new categories: hombre, sport, teens
- Updated Stick 60g with correct Shopify handle and price ($189)
- Contact page hero redesigned with clean centered layout (no background image)

## Product Catalog (12 Products)
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
- "Comprar en Shopify" button only on product detail page (purchase flow to be configured later)
- Product images sourced from Shopify CDN

## Previous Changes (February 10, 2026)
- Complete UI/UX redesign: deep green primary (#2B6B3D), amber accent, clean white backgrounds
- Playfair Display for headings, Inter for body text
- New pages: About Us (/nosotros), FAQ (/preguntas-frecuentes), Contact (/contacto)
- Professional footer with real contact info from Shopify

# User Preferences

Preferred communication style: Simple, everyday language.

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
- **Accent**: Warm amber hsl(38 90% 55%) — CTAs and highlights
- **Background**: Pure white
- **Foreground**: Dark green-tinted black hsl(150 10% 15%)
- **Fonts**: Playfair Display (headings), Inter (body)
- **Border radius**: 12px default

## External Dependencies
- Neon Database (PostgreSQL), Radix UI, Tailwind CSS, Lucide React, React Icons, React Hook Form, Zod, date-fns

The application follows a monorepo structure with shared TypeScript types between frontend and backend. The design emphasizes clean, natural aesthetics aligned with the brand's organic and eco-friendly positioning.
