import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { checkoutSchema } from "@shared/schema";
import { getStripeClient, getStripePublishableKey } from "./stripeClient";
import { z } from "zod";
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});

const checkoutLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many checkout attempts, please try again later." },
});

// Normalize a string to a URL-friendly slug (strips accents, lowercases, hyphens)
function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Shopify collection handle → new site category param
const COLLECTION_MAP: Record<string, string> = {
  unisex: "unisex",
  hombre: "hombre",
  "para-hombre": "hombre",
  sport: "sport",
  deportivo: "sport",
  teens: "teens",
  "para-jovenes": "teens",
  travel: "travel",
  viaje: "travel",
  jabon: "soap",
  "jabon-natural": "soap",
  soap: "soap",
  cuidado: "cuidado",
  "cuidado-personal": "cuidado",
  manos: "manos",
};

// Shopify page handle → new site route
const PAGE_MAP: Record<string, string> = {
  "politica-de-privacidad": "/privacidad",
  "privacy-policy": "/privacidad",
  privacidad: "/privacidad",
  privacy: "/privacidad",
  "terminos-y-condiciones": "/terminos",
  "terms-and-conditions": "/terminos",
  terminos: "/terminos",
  terms: "/terminos",
  "preguntas-frecuentes": "/preguntas-frecuentes",
  "frequently-asked-questions": "/preguntas-frecuentes",
  faq: "/preguntas-frecuentes",
  contacto: "/contacto",
  contact: "/contacto",
  nosotros: "/nosotros",
  "about-us": "/nosotros",
  about: "/nosotros",
  "donde-encontrarnos": "/donde-encontrarnos",
  "donde-encontrar": "/donde-encontrarnos",
  "find-us": "/donde-encontrarnos",
};

export async function registerRoutes(app: Express): Promise<Server> {
  app.use("/api", apiLimiter);

  // ─── API Routes ────────────────────────────────────────────────────────────

  app.get("/api/products", async (req, res) => {
    try {
      const { category, featured } = req.query;
      let products;
      if (category) {
        products = await storage.getProductsByCategory(category as string);
      } else if (featured === "true") {
        products = await storage.getFeaturedProducts();
      } else {
        products = await storage.getProducts();
      }
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/stripe/publishable-key", async (req, res) => {
    try {
      const key = getStripePublishableKey();
      res.json({ publishableKey: key });
    } catch (error) {
      console.error("Error getting publishable key:", error);
      res.status(500).json({ message: "Failed to get Stripe configuration" });
    }
  });

  app.post("/api/checkout", checkoutLimiter, async (req, res) => {
    try {
      const { items } = checkoutSchema.parse(req.body);
      const stripe = getStripeClient();
      const lineItems = items.map(item => ({
        price: item.stripePriceId,
        quantity: item.quantity,
      }));
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${baseUrl}/checkout/exito?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/checkout/cancelado`,
        shipping_address_collection: { allowed_countries: ["MX"] },
        locale: "es",
      });
      res.json({ url: session.url });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid checkout data", errors: error.errors });
      }
      console.error("Checkout error:", error);
      res.status(500).json({ message: "Failed to create checkout session" });
    }
  });

  // ─── SEO: Sitemap & Robots ─────────────────────────────────────────────────

  app.get("/sitemap.xml", (_req, res) => {
    const baseUrl = process.env.BASE_URL || `${_req.protocol}://${_req.get("host")}`;
    const pages = [
      { url: "/", priority: "1.0", changefreq: "weekly" },
      { url: "/productos", priority: "0.9", changefreq: "weekly" },
      { url: "/nosotros", priority: "0.7", changefreq: "monthly" },
      { url: "/contacto", priority: "0.7", changefreq: "monthly" },
      { url: "/preguntas-frecuentes", priority: "0.6", changefreq: "monthly" },
      { url: "/privacidad", priority: "0.3", changefreq: "yearly" },
      { url: "/donde-encontrarnos", priority: "0.5", changefreq: "monthly" },
      { url: "/terminos", priority: "0.3", changefreq: "yearly" },
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;
    res.set("Content-Type", "application/xml");
    res.send(xml);
  });

  app.get("/robots.txt", (_req, res) => {
    const baseUrl = process.env.BASE_URL || `${_req.protocol}://${_req.get("host")}`;
    res.set("Content-Type", "text/plain");
    res.send(`User-agent: *
Allow: /
Disallow: /checkout/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`);
  });

  // ─── Shopify → New Site 301 Redirects (preserves Google link equity) ───────
  //
  // Matches every URL pattern Shopify generates so no indexed page 404s.
  // Product slugs are matched dynamically against the product catalog.
  // Unmatched slugs fall back to the catalog page (/productos).

  // /products/:slug  →  /productos/:id  (or /productos if no match)
  app.get("/products/:slug", async (req, res) => {
    try {
      const products = await storage.getProducts();
      const slug = req.params.slug.toLowerCase();
      const match = products.find(p => toSlug(p.name) === slug);
      if (match) return res.redirect(301, `/productos/${match.id}`);
    } catch { /* fall through to catalog */ }
    res.redirect(301, "/productos");
  });

  // /collections/:collection/products/:slug  →  specific product or catalog
  app.get("/collections/:collection/products/:slug", async (req, res) => {
    try {
      const products = await storage.getProducts();
      const slug = req.params.slug.toLowerCase();
      const match = products.find(p => toSlug(p.name) === slug);
      if (match) return res.redirect(301, `/productos/${match.id}`);
    } catch { /* fall through */ }
    const cat = COLLECTION_MAP[req.params.collection.toLowerCase()];
    res.redirect(301, cat ? `/productos?categoria=${cat}` : "/productos");
  });

  // /collections/:collection  →  /productos?categoria=X  (or /productos)
  app.get("/collections/:collection", (req, res) => {
    const cat = COLLECTION_MAP[req.params.collection.toLowerCase()];
    res.redirect(301, cat ? `/productos?categoria=${cat}` : "/productos");
  });

  // /collections  →  /productos
  app.get("/collections", (_req, res) => res.redirect(301, "/productos"));

  // /pages/:page  →  mapped route or homepage
  app.get("/pages/:page", (req, res) => {
    const dest = PAGE_MAP[req.params.page.toLowerCase()];
    res.redirect(301, dest || "/");
  });

  // Legacy Shopify utility routes
  app.get("/cart", (_req, res) => res.redirect(301, "/"));
  app.get("/cart/:token", (_req, res) => res.redirect(301, "/"));
  app.get("/checkout", (_req, res) => res.redirect(301, "/"));
  app.get("/account", (_req, res) => res.redirect(301, "/"));
  app.get("/account/login", (_req, res) => res.redirect(301, "/"));
  app.get("/account/register", (_req, res) => res.redirect(301, "/"));
  app.get("/blogs/:blog/:article", (_req, res) => res.redirect(301, "/preguntas-frecuentes"));
  app.get("/blogs/:blog", (_req, res) => res.redirect(301, "/preguntas-frecuentes"));
  app.get("/search", (_req, res) => {
    const q = (_req.query.q || "") as string;
    res.redirect(301, q ? `/productos?buscar=${encodeURIComponent(q)}` : "/productos");
  });

  const httpServer = createServer(app);
  return httpServer;
}
