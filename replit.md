# Overview

This project is a full-stack e-commerce application for Zahal, a natural skincare brand. It offers a custom React frontend with direct Stripe payment processing for alum stone deodorants and natural personal care products. The platform aims to provide a premium, earthy brand experience tailored for the Mexican market, emphasizing trust signals, WhatsApp integration, and a Spanish-first approach.

# User Preferences

Preferred communication style: Simple, everyday language.
Design: Premium + earthy aesthetic, green palette only (NO yellows/amber), Mexican market focus.
Mexican market UX: WhatsApp integration, trust signals, Spanish-first copy.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **State Management**: TanStack Query v5 for data fetching, React Context for cart management
- **UI**: Shadcn/ui, Radix UI, and Tailwind CSS for styling
- **Build Tool**: Vite
- **Key Features**: Client-side localStorage-based shopping cart, dynamic SEO via React Helmet, safe Markdown rendering, image uploads, and an advanced blog/banner marketing portal for employees.

## Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL, primarily storing contact messages, newsletter subscribers, API keys, blog posts, and site settings. It syncs product and pricing data from Stripe.
- **API**: RESTful API supporting product listings, checkout session creation, blog management (CRUD), site settings, and admin functionalities secured by an `x-admin-password` header.
- **Security**: Implements server hardening including request body size limits, rate limiting, and robust error handling.
- **SEO Enhancements**: Server-side rendering considerations for SEO, including dynamic sitemap, robots.txt, 301 redirects for trailing slashes, and proper HTTP 404 responses for non-existent content.

## Payment Flow
- Uses Stripe Checkout for secure payment processing.
- Cart contents are sent to the backend, which creates a Stripe Checkout Session.
- Users are redirected to a Stripe-hosted page for payment, then to success or cancellation pages on the Zahal site.
- Shipping rates are dynamically applied based on cart subtotal (e.g., free shipping above 600 MXN).

## Design System
- **Color Palette**: Primary deep green (hsl(152 45% 28%)), accent sage green (hsl(152 35% 38%)), warm off-white backgrounds, and dark green-tinted black foreground.
- **Typography**: Playfair Display for headings and Inter for body text.
- **Aesthetics**: Subtle linen-like SVG pattern for organic texture, 12px default border-radius.

# External Dependencies

- **Stripe**: For payment processing and product/price synchronization.
- **Neon Database**: Managed PostgreSQL service.
- **Radix UI**: Unstyled component primitives.
- **Tailwind CSS**: Utility-first CSS framework.
- **Lucide React / React Icons**: Icon libraries.
- **React Hook Form**: Form management.
- **Zod**: Schema validation.
- **date-fns**: Date utility library.
- **Replit Object Storage**: GCS-backed bucket for admin image uploads via presigned PUT URLs (no local disk). Uploaded objects are tagged with public ACL on finalize and served from `/objects/*` with ACL enforcement.
- **TipTap**: WYSIWYG editor for the marketing blog (`RichTextEditor`). Posts persist as sanitized HTML; legacy markdown posts are auto-converted on load via `marked`. Public renderer (`MarkdownContent`) detects HTML vs markdown and sanitizes both paths (`isomorphic-dompurify` + `rehype-sanitize`).
- **react-markdown**, **remark-gfm**, **rehype-sanitize**: For safe and robust markdown rendering.
- **express-rate-limit**: For API rate limiting.
- **Google Consent Mode v2**: For cookie consent management and analytics integration.