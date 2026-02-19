import { type Product, contactMessages, newsletterSubscribers } from "@shared/schema";
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
}

export const storage = new StripeApiStorage();
