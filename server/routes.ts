import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { checkoutSchema, contactMessageSchema, newsletterSchema, blogPostSchema } from "@shared/schema";
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

const KNOWN_SPA_ROUTES = new Set([
  "/", "/productos", "/nosotros", "/contacto",
  "/preguntas-frecuentes", "/donde-encontrarnos",
  "/blog", "/privacidad", "/terminos",
  "/checkout/exito", "/checkout/cancelado",
  "/admin/api-keys", "/empleados/Marketing",
]);

const NOINDEX_ROUTES = new Set([
  "/checkout/exito", "/checkout/cancelado",
  "/privacidad", "/terminos",
  "/admin/api-keys", "/empleados/Marketing",
]);

function isKnownSpaRoute(path: string): boolean {
  if (KNOWN_SPA_ROUTES.has(path)) return true;
  if (path.startsWith("/productos/") && path.split("/").length === 3) return true;
  if (path.startsWith("/blog/") && path.split("/").length === 3) return true;
  return false;
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use((req, res, next) => {
    const { path, originalUrl } = req;
    if (path !== "/" && path.endsWith("/")) {
      const cleanUrl = originalUrl.replace(/\/(\?|$)/, "$1");
      return res.redirect(301, cleanUrl);
    }
    next();
  });

  app.use((req, res, next) => {
    const path = req.path;
    if (NOINDEX_ROUTES.has(path)) {
      res.setHeader("X-Robots-Tag", "noindex, nofollow");
    }
    next();
  });

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

  app.post("/api/contact", async (req, res) => {
    try {
      const data = contactMessageSchema.parse(req.body);
      const result = await storage.addContactMessage(data);
      res.json({ success: true, id: result.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      console.error("Contact form error:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const data = newsletterSchema.parse(req.body);
      const result = await storage.addNewsletterSubscriber(data.email);
      res.json({ success: true, id: result.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid email", errors: error.errors });
      }
      console.error("Newsletter error:", error);
      res.status(500).json({ message: "Failed to subscribe" });
    }
  });

  // ─── Admin: API Key Management ─────────────────────────────────────────────

  function requireAdminPassword(req: any, res: any, next: any) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return res.status(503).json({ message: "Admin access not configured. Set ADMIN_PASSWORD environment variable." });
    }
    const provided = req.headers["x-admin-password"] as string;
    if (!provided || provided !== adminPassword) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  }

  app.get("/api/admin/api-keys", requireAdminPassword, async (_req, res) => {
    try {
      const keys = await storage.listApiKeys();
      res.json(keys);
    } catch (error) {
      console.error("Error listing API keys:", error);
      res.status(500).json({ message: "Failed to list API keys" });
    }
  });

  app.post("/api/admin/api-keys", requireAdminPassword, async (req, res) => {
    try {
      const { label } = z.object({ label: z.string().min(1) }).parse(req.body);
      const key = await storage.createApiKey(label);
      res.json(key);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Label is required" });
      }
      console.error("Error creating API key:", error);
      res.status(500).json({ message: "Failed to create API key" });
    }
  });

  app.delete("/api/admin/api-keys/:id", requireAdminPassword, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      await storage.revokeApiKey(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error revoking API key:", error);
      res.status(500).json({ message: "Failed to revoke API key" });
    }
  });

  // ─── Public Blog Routes ───────────────────────────────────────────────────

  app.get("/api/blog", async (_req, res) => {
    try {
      const posts = await storage.listBlogPosts(false);
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post || !post.published) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // ─── Admin: Blog Management ──────────────────────────────────────────────

  app.get("/api/admin/blog", requireAdminPassword, async (_req, res) => {
    try {
      const posts = await storage.listBlogPosts(true);
      res.json(posts);
    } catch (error) {
      console.error("Error listing blog posts:", error);
      res.status(500).json({ message: "Failed to list blog posts" });
    }
  });

  app.post("/api/admin/blog", requireAdminPassword, async (req, res) => {
    try {
      const data = blogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(data);
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.put("/api/admin/blog/:id", requireAdminPassword, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      const data = blogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, data);
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog post data", errors: error.errors });
      }
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete("/api/admin/blog/:id", requireAdminPassword, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });
      await storage.deleteBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // ─── Admin: BabyLoveGrowth Sync ────────────────────────────────────────────

  app.post("/api/admin/sync-articles", requireAdminPassword, async (_req, res) => {
    try {
      const apiKey = process.env.BABYLOVE_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ message: "BABYLOVE_API_KEY not configured" });
      }

      const response = await fetch("https://api.babylovegrowth.ai/api/integrations/v1/articles?limit=100&page=1", {
        headers: { "X-API-Key": apiKey, "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("BabyLoveGrowth API error:", response.status, errText);
        return res.status(502).json({ message: `BabyLoveGrowth API error: ${response.status}` });
      }

      const articles = await response.json();
      if (!Array.isArray(articles)) {
        return res.status(502).json({ message: "Unexpected response from BabyLoveGrowth API" });
      }

      let created = 0;
      let skipped = 0;

      for (const article of articles) {
        const slug = article.slug || `article-${article.id}`;
        const existing = await storage.getBlogPost(slug);
        if (existing) {
          skipped++;
          continue;
        }

        await storage.createBlogPost({
          title: article.title || "Sin título",
          slug,
          excerpt: article.excerpt || article.meta_description || "",
          content: article.content_markdown || article.content_html || "",
          coverImage: article.hero_image_url || "",
          author: "Zahal",
          published: true,
        });
        created++;
      }

      res.json({ success: true, created, skipped, total: articles.length });
    } catch (error) {
      console.error("Sync error:", error);
      res.status(500).json({ message: "Failed to sync articles" });
    }
  });

  // ─── Admin: Site Settings ─────────────────────────────────────────────────

  app.get("/api/admin/settings/:key", requireAdminPassword, async (req, res) => {
    try {
      const value = await storage.getSetting(req.params.key);
      res.json({ key: req.params.key, value });
    } catch (error) {
      console.error("Error getting setting:", error);
      res.status(500).json({ message: "Failed to get setting" });
    }
  });

  app.put("/api/admin/settings/:key", requireAdminPassword, async (req, res) => {
    try {
      const { value } = z.object({ value: z.string() }).parse(req.body);
      await storage.setSetting(req.params.key, value);
      res.json({ success: true });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Value is required" });
      }
      console.error("Error setting value:", error);
      res.status(500).json({ message: "Failed to save setting" });
    }
  });

  // ─── Admin: Product Management via Stripe ─────────────────────────────────

  app.put("/api/admin/products/:stripeProductId", requireAdminPassword, async (req, res) => {
    try {
      const stripe = getStripeClient();
      const { stripeProductId } = req.params;
      const { name, description, images, metadata, newPrice } = req.body;

      const updateData: any = {};
      if (name) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (images) updateData.images = images;
      if (metadata) updateData.metadata = metadata;

      await stripe.products.update(stripeProductId, updateData);

      if (newPrice && typeof newPrice === "number") {
        const existingPrices = await stripe.prices.list({ product: stripeProductId, active: true, limit: 1 });
        const newPriceObj = await stripe.prices.create({
          product: stripeProductId,
          unit_amount: Math.round(newPrice * 100),
          currency: "mxn",
        });
        for (const oldPrice of existingPrices.data) {
          await stripe.prices.update(oldPrice.id, { active: false });
        }
        storage.invalidateProductCache();
        res.json({ success: true, newPriceId: newPriceObj.id });
      } else {
        storage.invalidateProductCache();
        res.json({ success: true });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  // ─── Public: Site Settings (for dynamic banner) ───────────────────────────

  app.get("/api/settings/:key", async (req, res) => {
    try {
      const value = await storage.getSetting(req.params.key);
      res.json({ key: req.params.key, value });
    } catch (error) {
      res.status(500).json({ message: "Failed to get setting" });
    }
  });

  app.get("/api/checkout/verify", async (req, res) => {
    try {
      const sessionId = req.query.session_id as string;
      if (!sessionId) return res.status(400).json({ valid: false });
      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      res.json({ valid: session.payment_status === "paid" });
    } catch (error) {
      console.error("Session verify error:", error);
      res.json({ valid: false });
    }
  });

  // ─── SEO: Sitemap & Robots ─────────────────────────────────────────────────

  app.get("/sitemap.xml", async (_req, res) => {
    const baseUrl = process.env.BASE_URL || `${_req.protocol}://${_req.get("host")}`;

    const today = new Date().toISOString().split("T")[0];

    const staticPages = [
      { url: "/",                     lastmod: today, changefreq: "weekly",  priority: "1.0" },
      { url: "/productos",            lastmod: today, changefreq: "daily",   priority: "0.9" },
      { url: "/nosotros",             lastmod: today, changefreq: "monthly", priority: "0.7" },
      { url: "/contacto",             lastmod: today, changefreq: "monthly", priority: "0.6" },
      { url: "/preguntas-frecuentes", lastmod: today, changefreq: "monthly", priority: "0.6" },
      { url: "/donde-encontrarnos",   lastmod: today, changefreq: "monthly", priority: "0.7" },
      { url: "/blog",                 lastmod: today, changefreq: "weekly",  priority: "0.8" },
    ];

    let productPages: { url: string; lastmod: string; changefreq: string; priority: string }[] = [];
    try {
      const products = await storage.getProducts();
      productPages = products.map(p => ({
        url: `/productos/${p.id}`,
        lastmod: today,
        changefreq: "weekly",
        priority: "0.8",
      }));
    } catch (err) {
      console.error("Sitemap: failed to fetch products", err);
    }

    let blogPages: { url: string; lastmod: string; changefreq: string; priority: string }[] = [];
    try {
      const posts = await storage.listBlogPosts(false);
      blogPages = posts.map(p => ({
        url: `/blog/${p.slug}`,
        lastmod: p.updatedAt.toISOString().split("T")[0],
        changefreq: "monthly",
        priority: "0.7",
      }));
    } catch (err) {
      console.error("Sitemap: failed to fetch blog posts", err);
    }

    const allPages = [...staticPages, ...productPages, ...blogPages];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
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
Disallow: /admin/
Disallow: /empleados/

Sitemap: ${baseUrl}/sitemap.xml`);
  });

  app.get("/llms.txt", (_req, res) => {
    res.set("Content-Type", "text/plain");
    res.send(`# Zahal - Desodorantes Naturales de Alumbre

> Zahal offers natural stone-based deodorants free of aluminum, parabens, and harmful chemicals, emphasizing protection, eco-friendliness, and cruelty-free practices.

Zahal is a brand dedicated to providing natural deodorant alternatives made from pure mineral alum stone. Their products are designed to ensure effective 24-hour protection while respecting health, the environment, and animal welfare. The website features detailed descriptions of product benefits, usage, and community testimonials, making it a comprehensive resource for natural personal care solutions.

## Core Content

[Productos naturales](https://zahal.com.mx/productos)

### Product Descriptions and Benefits
- Desodorantes con piedra de alumbre, sin químicos agresivos ni parabenos.
- Protección antibacterial y duradera por 24 horas.
- Productos en formato roll-on, stick y para toda la familia.
- Libre de manchas y residuos en la ropa.
- Libre de crueldad animal y empaques sostenibles.

### Product Categories
- Vida Cotidiana
- Deportistas
- Viajeros
- Teens

### Customer Testimonials
- Experiencias de usuarios satisfechos sobre protección efectiva, sin irritación y sin manchas en la ropa.
- Recomendaciones y comentarios en sección de reseñas con productos destacados como Roll On Teens, Aloe Vera, y Stick Natural.

## Resources

[Elige tu favorito](https://zahal.com.mx/productos)

[Nuestros Más Vendidos](https://zahal.com.mx/productos)

### Popular Products
- Roll On con Aloe Vera 30ml
- Stick Natural 120g
- Limpiador de Manos Spray 30ml

### Sobre la Marca
- [Nuestra historia](https://zahal.com.mx/nosotros)
- [Conoce más sobre el origen del alumbrado](https://zahal.com.mx/nosotros)

## Why Choose Zahal?

- Producto natural, sin químicos dañinos.
- Adecuado para piel sensible y uso diario.
- Eco-friendly y cruelty-free.
- Garantía de protección efectiva sin residuos blancos ni manchas amarillas.

## Optional

### Comunidad y Suscripciones
- Recibe tips de cuidado natural y ofertas exclusivas.
- Suscríbete para recibir novedades, sin spam y con opción de cancelar.

### Contacto y Puntos de Venta
- Encuentra puntos de venta distribuidos en toda México.
- Información sobre disponibilidad y compra en línea.

[Ver Tienda Completa](https://zahal.com.mx/productos)`);
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
