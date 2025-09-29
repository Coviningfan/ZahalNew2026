# Overview

This is a full-stack e-commerce application for Zahal, a natural skincare brand specializing in alum stone deodorants and natural personal care products. The application is built as a React frontend with an Express.js backend, featuring a product catalog, shopping cart functionality, and a clean, modern user interface focused on natural and organic skincare products.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React SPA**: Single-page application built with React 18 and TypeScript
- **Routing**: Client-side routing using Wouter for lightweight navigation
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Express.js Server**: RESTful API server with TypeScript
- **Storage Layer**: Abstracted storage interface with in-memory implementation (designed for easy database migration)
- **Session Management**: Express sessions for cart persistence across user sessions
- **API Design**: RESTful endpoints for products and cart operations

## Data Storage
- **Database ORM**: Drizzle ORM configured for PostgreSQL with type-safe schema definitions
- **Schema Design**: Product catalog with categories, features, pricing, and inventory management
- **Cart System**: Session-based shopping cart with product relationships
- **Migration Support**: Drizzle-kit for database schema migrations

## Authentication & Authorization
- **Session-based**: Currently using express sessions for cart persistence
- **Anonymous Users**: Cart functionality works without user accounts
- **Extensible**: Architecture supports future user authentication implementation

## External Dependencies
- **Neon Database**: Serverless PostgreSQL database provider (@neondatabase/serverless)
- **UI Components**: Radix UI primitives for accessible component foundation
- **Styling**: Tailwind CSS with custom design tokens for brand consistency
- **Icons**: Lucide React icons and React Icons for UI elements
- **Development**: Replit-specific plugins for development environment integration
- **Form Handling**: React Hook Form with Zod validation for type-safe forms
- **Date Utilities**: date-fns for date manipulation and formatting

The application follows a monorepo structure with shared TypeScript types between frontend and backend, ensuring type safety across the full stack. The design emphasizes natural, earth-tone aesthetics that align with the brand's organic and eco-friendly positioning.