import { type Product } from "@shared/schema";
import { getStripeClient } from "./stripeClient";

function mapStripeProductToProduct(product: any, price: any): Product {
  const metadata = product.metadata || {};
  let features: string[] = [];
  try {
    features = typeof metadata.features === 'string' ? JSON.parse(metadata.features) : (metadata.features || []);
  } catch { features = []; }

  let images: string[] = product.images || [];

  const unitAmount = price?.unit_amount || 0;
  const priceStr = (unitAmount / 100).toFixed(2);

  return {
    id: metadata.slug || product.id,
    name: product.name || '',
    description: product.description || '',
    price: priceStr,
    category: metadata.category || 'unisex',
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
}

class StripeApiStorage implements IStorage {
  private async fetchAllProducts(): Promise<Product[]> {
    const now = Date.now();
    if (cachedProducts && (now - cacheTimestamp) < CACHE_TTL) {
      return cachedProducts;
    }

    const stripe = getStripeClient();
    const products: Product[] = [];

    const stripeProducts = await stripe.products.list({ active: true, limit: 100 });

    for (const product of stripeProducts.data) {
      const prices = await stripe.prices.list({ product: product.id, active: true, limit: 1 });
      const price = prices.data[0];
      if (price) {
        const p = mapStripeProductToProduct(product, price);
        products.push(p);
        // Ensure the cache is updated with the correct price ID
        if (cachedProducts) {
          const index = cachedProducts.findIndex(cp => cp.id === p.id);
          if (index !== -1) {
            cachedProducts[index] = p;
          }
        }
      }
    }

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
    return products.filter(p => p.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const products = await this.fetchAllProducts();
    return products.filter(p => p.isFeatured);
  }
}

export const storage = new StripeApiStorage();
