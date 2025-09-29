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
        id: "zahal-desodorante-natural-stik-120-g",
        name: "Natural Stick 120g",
        description: "Desodorante Natural de Piedra de Alumbre ZAHAL 120 g Unisex – Sin Clorhidrato de Aluminio, Sin Parabenos, Sin Alcohol, Sin Aroma, Vegano, Orgánico, No Mancha la piel ni la ropa, pH Neutro",
        price: "275.00",
        category: "unisex",
        weight: "120g",
        images: [
          "https://5b32c9-07.myshopify.com/cdn/shop/files/Imagenes_Pagina_Web_1_533x.png?v=1753731242",
          "https://5b32c9-07.myshopify.com/cdn/shop/files/SQUARE_ZAHAL_9_533x.jpg?v=1753731242"
        ],
        features: ["Sin clorhidrato de aluminio", "Sin parabenos", "Sin alcohol", "Sin aroma", "Vegano", "Orgánico", "No mancha la piel ni la ropa", "pH neutro"],
        inStock: true,
        isFeatured: true,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-natural-eco-recargable-3-veces-80-g",
        name: "Natural Eco Recargable 80g",
        description: "Desodorante Natural Eco Recargable ZAHAL 80 g con Piedra de Alumbre Para todo el cuerpo, Unisex, – Sin Clorhidrato de Aluminio, Sin Parabenos, Sin Alcohol, Sin Aroma, Vegano, Orgánico, No Mancha, pH Neutro",
        price: "163.00",
        category: "unisex",
        weight: "80g",
        images: [
          "https://5b32c9-07.myshopify.com/cdn/shop/files/11_533x.png?v=1753740323",
          "https://5b32c9-07.myshopify.com/cdn/shop/files/31_533x.jpg?v=1753740498"
        ],
        features: ["Eco recargable", "Para todo el cuerpo", "Unisex", "Sin clorhidrato de aluminio", "Sin parabenos", "Sin alcohol", "No mancha"],
        inStock: true,
        isFeatured: true,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-mini-stick-60-g",
        name: "Natural Stick 60g",
        description: "Piedra de alumbre con empaque de corcho - Perfecto para viaje",
        price: "163.00",
        category: "travel",
        weight: "60g",
        images: [
          "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_1.jpg?v=1729191478&width=1420"
        ],
        features: ["Empaque de corcho", "Tamaño viaje", "100% natural", "Biodegradable"],
        inStock: true,
        isFeatured: true,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "zahal-jabon-natural-arbol-de-te-100g",
        name: "Jabón Corporal",
        description: "Jabón natural con aceite de árbol de té - Para todo el cuerpo",
        price: "120.00",
        category: "soap",
        weight: "100g",
        images: [
          "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_VERTICALES_WEB_1.jpg?v=1730226812&width=1420"
        ],
        features: ["Aceite de árbol de té", "Propiedades antibacterianas", "Vegano", "Natural"],
        inStock: true,
        isFeatured: true,
        isNew: true,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-natural-roll-on-unisex-90-ml",
        name: "Roll On Unisex",
        description: "Desodorante Natural de Piedra de Alumbre ZAHAL Roll On Unisex 90 ml – Sin Clorhidrato de Aluminio, Sin Alcohol, Sin Fragancia, Sin Parabenos – Con Aloe Vera – Vegano, Orgánico, No Tóxico, pH Neutro",
        price: "110.00",
        category: "unisex",
        weight: "90ml",
        images: [
          "https://5b32c9-07.myshopify.com/cdn/shop/files/4_92b57410-71ea-4240-8827-cb1106f7cc70_533x.png?v=1753748770",
          "https://5b32c9-07.myshopify.com/cdn/shop/files/5_c5dd5d96-0286-485c-989d-97a8291623c4_533x.png?v=1753748757"
        ],
        features: ["Con aloe vera", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin fragancia", "Sin parabenos", "Vegano", "Orgánico", "No tóxico", "pH neutro"],
        inStock: true,
        isFeatured: false,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-natural-roll-on-sport-con-carbon-activado-90-ml",
        name: "Roll On Sport",
        description: "Desodorante Natural de Piedra de Alumbre ZAHAL Roll On Sport Carbón Activado 90 ml – Sin Clorhidrato de Aluminio, Sin Alcohol, Sin Fragancia, Sin Parabenos – Con Aloe Vera – Vegano, Orgánico, No Tóxico, pH Neutro",
        price: "120.00",
        category: "sport",
        weight: "90ml",
        images: [
          "https://5b32c9-07.myshopify.com/cdn/shop/files/22_ff2e0357-efb6-461e-afc0-46f05cc19f51_533x.png?v=1753751451",
          "https://5b32c9-07.myshopify.com/cdn/shop/files/23_533x.png?v=1753751463"
        ],
        features: ["Carbón activado", "Protección intensa", "Para deportistas", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin fragancia", "Con aloe vera"],
        inStock: true,
        isFeatured: false,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-natural-roll-on-teens-90-ml",
        name: "Roll On Teens",
        description: "Desodorante Natural de Piedra de Alumbre ZAHAL Roll On Teens 90 ml – Sin Clorhidrato de Aluminio, Sin Alcohol, Sin Fragancia, Sin Parabenos – Con Aloe Vera – Vegano, Orgánico, No Tóxico, pH Neutro",
        price: "120.00",
        category: "teens",
        weight: "90ml",
        images: [
          "https://5b32c9-07.myshopify.com/cdn/shop/files/20_03593599-4a47-4229-9ab9-13ddd0b88349_533x.png?v=1753748140",
          "https://5b32c9-07.myshopify.com/cdn/shop/files/20_533x.png?v=1753747633"
        ],
        features: ["Fórmula suave", "Para piel sensible", "Para adolescentes", "Sin irritantes", "Con aloe vera", "Dermatológicamente probado"],
        inStock: true,
        isFeatured: false,
        isNew: false,
        createdAt: new Date(),
      },
      {
        id: "zahal-desodorante-natural-roll-on-men-90-ml",
        name: "Roll On For Men",
        description: "Desodorante Natural de Piedra de Alumbre ZAHAL Roll On For men 90 ml – Sin Clorhidrato de Aluminio, Sin Alcohol, Sin Fragancia, Sin Parabenos – Con Aloe Vera – Vegano, Orgánico, No Tóxico, pH Neutro",
        price: "115.00",
        category: "unisex",
        weight: "90ml",
        images: [
          "https://5b32c9-07.myshopify.com/cdn/shop/files/18_b12bb71f-34f5-474a-b9dc-9bd50802f32c_533x.png?v=1753750893",
          "https://5b32c9-07.myshopify.com/cdn/shop/files/19_533x.png?v=1753750910"
        ],
        features: ["Especial para hombres", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin fragancia", "Con aloe vera", "Vegano", "Orgánico"],
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
