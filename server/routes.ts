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
      { url: "/",                     lastmod: today },
      { url: "/productos",            lastmod: today },
      { url: "/nosotros",             lastmod: today },
      { url: "/contacto",             lastmod: today },
      { url: "/preguntas-frecuentes", lastmod: today },
      { url: "/donde-encontrarnos",   lastmod: today },
      { url: "/blog",                 lastmod: today },
      { url: "/privacidad",           lastmod: "2026-02-18" },
      { url: "/terminos",             lastmod: "2026-02-18" },
    ];

    let productPages: { url: string; lastmod: string }[] = [];
    try {
      const products = await storage.getProducts();
      productPages = products.map(p => ({
        url: `/productos/${p.id}`,
        lastmod: today,
      }));
    } catch (err) {
      console.error("Sitemap: failed to fetch products", err);
    }

    let blogPages: { url: string; lastmod: string }[] = [];
    try {
      const posts = await storage.listBlogPosts(false);
      blogPages = posts.map(p => ({
        url: `/blog/${p.slug}`,
        lastmod: p.updatedAt.toISOString().split("T")[0],
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
