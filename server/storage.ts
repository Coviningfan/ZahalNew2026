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
        id: "desodorante-corporal-de-piedra-de-alumbre-sales-naturales-en-spray-240-ml-copia",
        name: "Desodorante Spray 15ml",
        description: "Desodorante natural en spray elaborado con piedra de alumbre. Protección antibacterial hasta por 24 horas sin interferir con la transpiración natural. Sin clorhidrato de aluminio, sin parabenos, sin alcohol. Ideal para piel sensible.",
        price: "45.00",
        category: "unisex",
        weight: "15ml",
        images: [
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/8_c937cf13-ffcb-486e-9fc4-d818760d4fb0.png?v=1753911429",
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/208_42cb1125-2c54-4c81-8638-19328ad37bbf.jpg?v=1753911451"
        ],
        features: ["Sin clorhidrato de aluminio", "Sin parabenos", "Sin alcohol", "Sin aroma", "Vegano", "Orgánico", "No mancha", "pH neutro", "Protección 24hrs"],
        inStock: true,
        isFeatured: true,
        isNew: true,
        createdAt: new Date(),
      },
      {
        id: "desodorante-natural-de-piedra-de-alumbre-roll-on-unisex-90-ml",
        name: "Roll On con Aloe Vera 30ml",
        description: "Desodorante natural roll on elaborado con piedra de alumbre y extracto de sábila. Protección antibacterial por 24 horas. Sin clorhidrato de aluminio, sin alcohol, sin parabenos. Ideal para aplicación ligera y rápida.",
        price: "56.00",
        category: "unisex",
        weight: "30ml",
        images: [
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/3.png?v=1753738575",
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/107.jpg?v=1753738575"
        ],
        features: ["Con aloe vera", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin fragancia", "Sin parabenos", "Vegano", "Orgánico", "No tóxico", "pH neutro"],
        inStock: true,
        isFeatured: true,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "zahal-blister-duo-de-desodorante-natural-mini-stick-60-g-spray-corporal-15ml",
        name: "Pack Dúo Stick + Spray",
        description: "Juego de desodorantes naturales: Mini Stick 60g y Spray corporal 15ml. Desodorante natural en piedra de alumbre con protección antibacterial hasta por 24 horas. Sin clorhidrato de aluminio, ni alcohol, ni parabenos.",
        price: "130.00",
        category: "unisex",
        weight: "Pack",
        images: [
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/ZAHAL_Shopify_19.jpg?v=1730402957"
        ],
        features: ["Pack 2 productos", "Mini Stick 60g", "Spray 15ml", "Sin parabenos", "Vegano", "Orgánico", "Sin alcohol", "Ideal para viaje"],
        inStock: true,
        isFeatured: true,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-corporal-natural-en-spray-240-ml",
        name: "Spray Corporal 240ml",
        description: "Desodorante corporal natural en spray de gran tamaño. Elaborado con piedra de alumbre. Protección antibacterial hasta por 24 horas. Ideal para todo el cuerpo. Sin clorhidrato de aluminio, sin alcohol, sin parabenos.",
        price: "131.00",
        category: "unisex",
        weight: "240ml",
        images: [
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/1_c7be3dfa-4d93-46ce-836c-67dbe4a66b92.png?v=1753753301",
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/2.png?v=1753753312"
        ],
        features: ["Tamaño familiar", "Para todo el cuerpo", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin parabenos", "Vegano", "Orgánico", "No tóxico", "pH neutro"],
        inStock: true,
        isFeatured: true,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-mini-stick-60-g",
        name: "Stick Natural 60g",
        description: "Desodorante natural en piedra de alumbre con empaque de corcho. Protección antibacterial por 24 horas. Sin clorhidrato de aluminio, sin parabenos, sin alcohol. Ideal para quienes prefieren aplicación en piedra. Duración de 2 años.",
        price: "230.00",
        category: "unisex",
        weight: "60g",
        images: [
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/6.png?v=1753739748",
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/7.png?v=1753740037"
        ],
        features: ["Empaque de corcho", "Piedra de alumbre pura", "Sin clorhidrato de aluminio", "Sin parabenos", "Sin alcohol", "Vegano", "Orgánico", "Duración 2 años"],
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
