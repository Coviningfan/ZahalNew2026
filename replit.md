# Overview

This is a full-stack e-commerce application for Zahal, a natural skincare brand specializing in alum stone deodorants and natural personal care products. The application is a hybrid solution: a custom React frontend displays products with premium UI/UX, while redirecting to Shopify for purchases, cart management, and order processing.

# Recent Changes (February 10, 2026)

## UI/UX Redesign
- Complete color theme overhaul for better contrast: deep green primary (#2B6B3D), amber accent, clean white backgrounds
- Refined typography with Playfair Display for headings, Inter for body text
- Cleaner product cards with improved layout, MXN labels, and "Comprar" buttons
- Streamlined navigation with proper page links
- Professional footer with real contact info from Shopify

## New Pages Created
- **About Us** (/nosotros): Brand story, mission, philosophy, values, and brand ambassador program — all sourced from Shopify blog content
- **FAQ** (/preguntas-frecuentes): Comprehensive FAQ with accordion sections covering product ingredients, safety, benefits, application, and duration — all from Shopify blog content
- **Contact** (/contacto): Contact form with real phone (55 4532 7249), emails (contacto@zahal.com.mx, pedidos@zahal.com.mx), and social media links

## Product Catalog (6 Products)
1. Desodorante Spray 15ml - $45.00
2. Roll On con Aloe Vera 30ml - $56.00
3. Pack Dúo Stick + Spray - $130.00
4. Spray Corporal 240ml - $131.00
5. Stick Natural 60g - $230.00
6. Kit Eco Viajero - $150.00

## Shopify Integration
- Product IDs are exact Shopify product handles for seamless checkout
- Checkout URL format: `https://5b32c9-07.myshopify.com/products/{product-handle}`
- All "Comprar" buttons open Shopify in new tabs
- Product images sourced from Shopify CDN

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
