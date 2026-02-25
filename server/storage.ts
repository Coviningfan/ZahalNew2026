import { type Product, type ApiKey, type BlogPost, type SiteSetting, contactMessages, newsletterSubscribers, apiKeys, blogPosts, siteSettings } from "@shared/schema";
import crypto from "crypto";
import { eq, and, desc } from "drizzle-orm";
import { getStripeClient } from "./stripeClient";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

function mapStripeProductToProduct(product: any, price: any): Product {
  const metadata = product.metadata || {};
  let features: string[] = [];
  try {
    features = typeof metadata.features === 'string' ? JSON.parse(metadata.features) : (metadata.features || []);
  } catch { features = []; }

  let images: string[] = product.images || [];

  const unitAmount = price?.unit_amount || 0;
  const priceStr = (unitAmount / 100).toFixed(2);

  let additionalCategories: string[] = [];
  if (metadata.additionalCategories) {
    additionalCategories = metadata.additionalCategories.split(',').map((c: string) => c.trim()).filter(Boolean);
  }

  return {
    id: metadata.slug || product.id,
    name: product.name || '',
    description: product.description || '',
    price: priceStr,
    category: metadata.category || 'unisex',
    additionalCategories,
    weight: metadata.weight || null,
    images,
    features,
    inStock: metadata.inStock !== 'false',
    isFeatured: metadata.isFeatured === 'true',
    isNew: metadata.isNew === 'true',
    stripePriceId: price?.id || '',
    stripeProductId: product.id || '',
  };
}

let cachedProducts: Product[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60000;

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  addContactMessage(msg: { name: string; email: string; phone: string; message: string }): Promise<{ id: number }>;
  addNewsletterSubscriber(email: string): Promise<{ id: number }>;
  listApiKeys(): Promise<ApiKey[]>;
  createApiKey(label: string): Promise<ApiKey>;
  revokeApiKey(id: number): Promise<void>;
  validateApiKey(key: string): Promise<boolean>;
  listBlogPosts(includeUnpublished?: boolean): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost>;
  updateBlogPost(id: number, data: Partial<Omit<BlogPost, "id" | "createdAt">>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  getSetting(key: string): Promise<string | null>;
  setSetting(key: string, value: string): Promise<void>;
  invalidateProductCache(): void;
}

class StripeApiStorage implements IStorage {
  private async fetchAllProducts(): Promise<Product[]> {
    const now = Date.now();
    if (cachedProducts && (now - cacheTimestamp) < CACHE_TTL) {
      return cachedProducts;
    }

    const stripe = getStripeClient();
    const stripeProducts = await stripe.products.list({ active: true, limit: 100 });

    const productPricePromises = stripeProducts.data.map(async (product) => {
      try {
        const prices = await stripe.prices.list({ product: product.id, active: true, limit: 1 });
        const price = prices.data[0];
        if (price) {
          return mapStripeProductToProduct(product, price);
        }
        return null;
      } catch {
        return null;
      }
    });

    const results = await Promise.all(productPricePromises);
    const products = results.filter((p): p is Product => p !== null);

    products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

    cachedProducts = products;
    cacheTimestamp = now;
    return products;
  }

  invalidateProductCache(): void {
    cachedProducts = null;
    cacheTimestamp = 0;
  }

  async getProducts(): Promise<Product[]> {
    return this.fetchAllProducts();
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const products = await this.fetchAllProducts();
    return products.find(p => p.id === id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const products = await this.fetchAllProducts();
    return products.filter(p => p.category === category || p.additionalCategories.includes(category));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const products = await this.fetchAllProducts();
    return products.filter(p => p.isFeatured);
  }

  async addContactMessage(msg: { name: string; email: string; phone: string; message: string }): Promise<{ id: number }> {
    const [row] = await db.insert(contactMessages).values({
      name: msg.name,
      email: msg.email,
      phone: msg.phone || '',
      message: msg.message || '',
    }).returning({ id: contactMessages.id });
    return { id: row.id };
  }

  async addNewsletterSubscriber(email: string): Promise<{ id: number }> {
    const [row] = await db.insert(newsletterSubscribers).values({ email })
      .onConflictDoUpdate({ target: newsletterSubscribers.email, set: { email } })
      .returning({ id: newsletterSubscribers.id });
    return { id: row.id };
  }

  async listApiKeys(): Promise<ApiKey[]> {
    return db.select().from(apiKeys).orderBy(apiKeys.createdAt);
  }

  async createApiKey(label: string): Promise<ApiKey> {
    const key = `zahal_live_${crypto.randomBytes(24).toString("hex")}`;
    const [row] = await db.insert(apiKeys).values({ label, key }).returning();
    return row;
  }

  async revokeApiKey(id: number): Promise<void> {
    await db.update(apiKeys).set({ active: false }).where(eq(apiKeys.id, id));
  }

  async validateApiKey(key: string): Promise<boolean> {
    const [row] = await db.select().from(apiKeys).where(and(eq(apiKeys.key, key), eq(apiKeys.active, true)));
    return !!row;
  }

  async listBlogPosts(includeUnpublished = false): Promise<BlogPost[]> {
    if (includeUnpublished) {
      return db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    }
    return db.select().from(blogPosts).where(eq(blogPosts.published, true)).orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [row] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return row;
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [row] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return row;
  }

  async createBlogPost(data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
    const [row] = await db.insert(blogPosts).values(data).returning();
    return row;
  }

  async updateBlogPost(id: number, data: Partial<Omit<BlogPost, "id" | "createdAt">>): Promise<BlogPost> {
    const [row] = await db.update(blogPosts)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return row;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async getSetting(key: string): Promise<string | null> {
    const [row] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return row?.value ?? null;
  }

  async setSetting(key: string, value: string): Promise<void> {
    await db.insert(siteSettings).values({ key, value })
      .onConflictDoUpdate({ target: siteSettings.key, set: { value } });
  }
}

export const storage = new StripeApiStorage();
