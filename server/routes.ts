import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { checkoutSchema } from "@shared/schema";
import { getStripeClient, getStripePublishableKey } from "./stripeClient";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/products", async (req, res) => {
    try {
      const { category, featured } = req.query;

      let products;
      if (category) {
        products = await storage.getProductsByCategory(category as string);
      } else if (featured === 'true') {
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

  app.post("/api/checkout", async (req, res) => {
    try {
      const { items } = checkoutSchema.parse(req.body);
      const stripe = getStripeClient();

      const lineItems = items.map(item => ({
        price: item.stripePriceId,
        quantity: item.quantity,
      }));

      const baseUrl = `${req.protocol}://${req.get('host')}`;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${baseUrl}/checkout/exito?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/checkout/cancelado`,
        shipping_address_collection: {
          allowed_countries: ['MX'],
        },
        locale: 'es',
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

  app.get("/sitemap.xml", (_req, res) => {
    const baseUrl = "https://zahal-productos-naturales.replit.app";
    const pages = [
      { url: "/", priority: "1.0", changefreq: "weekly" },
      { url: "/productos", priority: "0.9", changefreq: "weekly" },
      { url: "/nosotros", priority: "0.7", changefreq: "monthly" },
      { url: "/contacto", priority: "0.7", changefreq: "monthly" },
      { url: "/preguntas-frecuentes", priority: "0.6", changefreq: "monthly" },
      { url: "/privacidad", priority: "0.3", changefreq: "yearly" },
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
    const baseUrl = "https://zahal-productos-naturales.replit.app";
    res.set("Content-Type", "text/plain");
    res.send(`User-agent: *
Allow: /
Disallow: /checkout/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`);
  });

  const httpServer = createServer(app);
  return httpServer;
}
