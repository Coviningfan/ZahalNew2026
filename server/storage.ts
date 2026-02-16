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
        id: "zahal-desodorante-natural-stick-60-g",
        name: "Stick Natural 60g",
        description: "Desodorante natural en piedra de alumbre, práctico y funcional. Protección antibacterial por 24 horas sin interferir con la transpiración natural. Sin clorhidrato de aluminio, sin parabenos, sin alcohol. Apto para piel sensible. Duración de 2 años.",
        price: "189.00",
        category: "unisex",
        weight: "60g",
        images: [
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/9_8bfc3190-0f7b-4627-b0a3-08f674e99f15.png?v=1753751926",
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/10.png?v=1753752239"
        ],
        features: ["Piedra de alumbre pura", "Sin clorhidrato de aluminio", "Sin parabenos", "Sin alcohol", "Sin aroma", "Vegano", "Orgánico", "Duración 2 años"],
        inStock: true,
        isFeatured: false,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-natural-stik-120-g",
        name: "Stick Natural 120g",
        description: "Desodorante natural en piedra de alumbre de gran tamaño. Protección antibacterial hasta por 24 horas sin interferir con la transpiración natural. Presentación en stick ideal para aplicación ligera y rápida. Duración de 4 años.",
        price: "275.00",
        category: "unisex",
        weight: "120g",
        images: [
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/Imagenes_Pagina_Web_1.png?v=1753731242",
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/SQUARE_ZAHAL_9.jpg?v=1753731242"
        ],
        features: ["Gran tamaño 120g", "Piedra de alumbre pura", "Sin clorhidrato de aluminio", "Sin parabenos", "Sin alcohol", "Sin aroma", "Vegano", "Orgánico", "Duración 4 años"],
        inStock: true,
        isFeatured: true,
        isNew: true,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-natural-roll-on-men-90-ml",
        name: "Roll On For Men 90ml",
        description: "Desodorante natural roll on para hombre, elaborado con piedra de alumbre y extracto de sábila (aloe vera). Protección antibacterial hasta por 24 horas. Aplicación ligera y rápida. Sin clorhidrato de aluminio, sin alcohol, sin parabenos.",
        price: "115.00",
        category: "hombre",
        weight: "90ml",
        images: [
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/18_b12bb71f-34f5-474a-b9dc-9bd50802f32c.png?v=1753750893",
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/19.png?v=1753750910"
        ],
        features: ["Para hombre", "Con aloe vera", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin fragancia", "Sin parabenos", "Vegano", "Orgánico", "No tóxico"],
        inStock: true,
        isFeatured: false,
        isNew: true,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-natural-roll-on-sport-con-carbon-activado-90-ml",
        name: "Roll On Sport 90ml",
        description: "Ideal para deportistas. Desodorante natural roll on con piedra de alumbre, extracto de sábila y carbón activado. Protección antibacterial hasta por 24 horas. Aplicación ligera y rápida. Sin clorhidrato de aluminio, sin alcohol, sin parabenos.",
        price: "120.00",
        category: "sport",
        weight: "90ml",
        images: [
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/22_ff2e0357-efb6-461e-afc0-46f05cc19f51.png?v=1753751451",
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/23.png?v=1753751463"
        ],
        features: ["Carbón activado", "Ideal para deportistas", "Con aloe vera", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin parabenos", "Vegano", "Orgánico", "No tóxico"],
        inStock: true,
        isFeatured: false,
        isNew: true,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-natural-roll-on-teens-90-ml",
        name: "Roll On Teens 90ml",
        description: "Ideal para niños y adolescentes. Desodorante natural roll on con piedra de alumbre, extracto de sábila y carbón activado. Protección antibacterial hasta por 24 horas. Apto para piel sensible, sin fragancia.",
        price: "115.00",
        category: "teens",
        weight: "90ml",
        images: [
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/20_03593599-4a47-4229-9ab9-13ddd0b88349.png?v=1753748140",
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/20.png?v=1753747633"
        ],
        features: ["Para niños y adolescentes", "Con aloe vera", "Carbón activado", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin parabenos", "Vegano", "Orgánico", "Piel sensible"],
        inStock: true,
        isFeatured: false,
        isNew: true,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-natural-roll-on-teens-con-aroma-30-ml",
        name: "Roll On Teens con Aroma 30ml",
        description: "Ideal para niños y adolescentes, con aroma fresco. Desodorante natural roll on con piedra de alumbre y extracto de sábila. Protección antibacterial hasta por 24 horas. Aplicación ligera y rápida. Apto para piel sensible.",
        price: "66.00",
        category: "teens",
        weight: "30ml",
        images: [
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/24.png?v=1753740898",
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/25.png?v=1753740898"
        ],
        features: ["Con aroma fresco", "Para niños y adolescentes", "Con aloe vera", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin parabenos", "Vegano", "Orgánico", "Piel sensible"],
        inStock: true,
        isFeatured: false,
        isNew: true,
        createdAt: new Date(),
      },
      {
        id: "eco-traveler-kit-de-viaje-natural-desodorantes-limpiador-de-manos-jabon",
        name: "Kit Eco Viajero",
        description: "Kit completo de viaje con desodorantes naturales + limpiador de manos + jabón. Tamaños permitidos en puntos de revisión durante viajes. Permitido en aguas y playas protegidas. Sin aceites ni químicos que perjudiquen el medio ambiente.",
        price: "150.00",
        category: "travel",
        weight: "Kit",
        images: [
          "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/ZAHAL_momento_2.jpg?v=1753740213"
        ],
        features: ["Kit completo", "Tamaño viaje", "Eco-friendly", "Sin químicos", "Biodegradable", "Vegano", "Orgánico", "Ideal para viajeros"],
        inStock: true,
        isFeatured: true,
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
