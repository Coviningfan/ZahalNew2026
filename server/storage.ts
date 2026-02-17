import { type Product } from "@shared/schema";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
});

function mapRowToProduct(row: any, priceRow?: any): Product {
  const metadata = typeof row.metadata === 'string' ? JSON.parse(row.metadata) : (row.metadata || {});
  let features: string[] = [];
  try {
    features = typeof metadata.features === 'string' ? JSON.parse(metadata.features) : (metadata.features || []);
  } catch { features = []; }

  let images: string[] = [];
  if (row.images) {
    images = typeof row.images === 'string' ? JSON.parse(row.images) : row.images;
  }

  const unitAmount = priceRow?.unit_amount || row.unit_amount;
  const priceStr = unitAmount ? (Number(unitAmount) / 100).toFixed(2) : "0.00";

  return {
    id: metadata.slug || row.id,
    name: row.name || '',
    description: row.description || '',
    price: priceStr,
    category: metadata.category || 'unisex',
    weight: metadata.weight || null,
    images,
    features,
    inStock: metadata.inStock !== 'false',
    isFeatured: metadata.isFeatured === 'true',
    isNew: metadata.isNew === 'true',
    stripePriceId: priceRow?.price_id || priceRow?.id || row.price_id || '',
    stripeProductId: row.id || row.product_id || '',
  };
}

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
}

class StripeStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    const result = await pool.query(`
      SELECT p.id, p.name, p.description, p.images, p.metadata, p.active,
             pr.id as price_id, pr.unit_amount, pr.currency
      FROM stripe.products p
      LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
      WHERE p.active = true
      ORDER BY pr.unit_amount ASC
    `);

    const productsMap = new Map<string, Product>();
    for (const row of result.rows) {
      const product = mapRowToProduct(row, { id: row.price_id, unit_amount: row.unit_amount });
      if (!productsMap.has(product.id)) {
        productsMap.set(product.id, product);
      }
    }
    return Array.from(productsMap.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const result = await pool.query(`
      SELECT p.id, p.name, p.description, p.images, p.metadata, p.active,
             pr.id as price_id, pr.unit_amount, pr.currency
      FROM stripe.products p
      LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
      WHERE p.active = true AND (p.metadata->>'slug' = $1 OR p.id = $1)
      LIMIT 1
    `, [id]);

    if (result.rows.length === 0) return undefined;
    const row = result.rows[0];
    return mapRowToProduct(row, { id: row.price_id, unit_amount: row.unit_amount });
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const result = await pool.query(`
      SELECT p.id, p.name, p.description, p.images, p.metadata, p.active,
             pr.id as price_id, pr.unit_amount, pr.currency
      FROM stripe.products p
      LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
      WHERE p.active = true AND p.metadata->>'category' = $1
      ORDER BY pr.unit_amount ASC
    `, [category]);

    return result.rows.map(row => mapRowToProduct(row, { id: row.price_id, unit_amount: row.unit_amount }));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const result = await pool.query(`
      SELECT p.id, p.name, p.description, p.images, p.metadata, p.active,
             pr.id as price_id, pr.unit_amount, pr.currency
      FROM stripe.products p
      LEFT JOIN stripe.prices pr ON pr.product = p.id AND pr.active = true
      WHERE p.active = true AND p.metadata->>'isFeatured' = 'true'
      ORDER BY pr.unit_amount ASC
    `);

    return result.rows.map(row => mapRowToProduct(row, { id: row.price_id, unit_amount: row.unit_amount }));
  }
}

export const storage = new StripeStorage();
