import { type Product, type InsertProduct, type CartItem, type InsertCartItem, type CartItemWithProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.seedData();
  }

  private seedData() {
    const initialProducts: Product[] = [
      {
        id: "1",
        name: "Natural Stick",
        description: "Desodorante natural de piedra de alumbre 120g - Sin clorhidrato de aluminio, sin parabenos, sin alcohol, vegano y orgánico",
        price: "275.00",
        category: "unisex",
        weight: "120g",
        images: ["https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        features: ["Sin clorhidrato de aluminio", "Sin parabenos", "Sin alcohol", "Vegano", "Orgánico", "No mancha la ropa"],
        inStock: true,
        isFeatured: true,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Natural Stick 60g",
        description: "Piedra de alumbre con empaque de corcho - Perfecto para viaje",
        price: "163.00",
        category: "travel",
        weight: "60g",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        features: ["Empaque de corcho", "Tamaño viaje", "100% natural", "Biodegradable"],
        inStock: true,
        isFeatured: true,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "3",
        name: "Jabón Corporal",
        description: "Jabón natural con aceite de árbol de té - Para todo el cuerpo",
        price: "120.00",
        category: "soap",
        weight: "100g",
        images: ["https://pixabay.com/get/g0996635bc5aa6705008aa43cc6c1e88693bac95863111502676bbcf3d964b3b7a578cafe17cabd79d122a00a61a772fccacb880f26796bcd05c97a1516f92b8b_1280.jpg"],
        features: ["Aceite de árbol de té", "Propiedades antibacterianas", "Vegano", "Natural"],
        inStock: true,
        isFeatured: true,
        isNew: true,
        createdAt: new Date(),
      },
      {
        id: "4",
        name: "Roll On Unisex",
        description: "Desodorante roll-on con aloe vera - 90ml",
        price: "110.00",
        category: "unisex",
        weight: "90ml",
        images: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        features: ["Con aloe vera", "Fácil aplicación", "Sin alcohol", "pH neutro"],
        inStock: true,
        isFeatured: false,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "5",
        name: "Roll On Sport",
        description: "Desodorante roll-on con carbón activado - Protección intensa",
        price: "120.00",
        category: "sport",
        weight: "90ml",
        images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        features: ["Carbón activado", "Protección 24h", "Para deportistas", "Sin fragancia"],
        inStock: true,
        isFeatured: false,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "6",
        name: "Roll On Teens",
        description: "Desodorante suave para adolescentes - Fórmula especial",
        price: "120.00",
        category: "teens",
        weight: "90ml",
        images: ["https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"],
        features: ["Fórmula suave", "Para piel sensible", "Sin irritantes", "Dermatológicamente probado"],
        inStock: true,
        isFeatured: false,
        isNew: false,
        createdAt: new Date(),
      },
    ];

    initialProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.isFeatured);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      weight: null,
      images: [],
      features: [],
      inStock: true,
      isFeatured: false,
      isNew: false,
      ...insertProduct,
      id,
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    const itemsWithProducts: CartItemWithProduct[] = [];
    
    for (const item of items) {
      const product = this.products.get(item.productId);
      if (product) {
        itemsWithProducts.push({ ...item, product });
      }
    }
    
    return itemsWithProducts;
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists for this session
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.sessionId === insertItem.sessionId && item.productId === insertItem.productId
    );

    if (existingItem) {
      // Update quantity
      existingItem.quantity += (insertItem.quantity || 1);
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = randomUUID();
    const cartItem: CartItem = {
      quantity: 1,
      ...insertItem,
      id,
      createdAt: new Date(),
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    if (quantity <= 0) {
      this.cartItems.delete(id);
      return undefined;
    }

    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToDelete = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId)
      .map(([id, _]) => id);
    
    itemsToDelete.forEach(id => this.cartItems.delete(id));
  }
}

export const storage = new MemStorage();
