import { useState, useEffect, useCallback, createContext, useContext } from "react";
import type { Product, CartItem } from "@shared/schema";

interface CartContextType {
  cartItems: (CartItem & { product: Product })[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCheckingOut: boolean;
  checkout: () => Promise<void>;
  buyNow: (product: Product) => Promise<void>;
}

const CART_KEY = "zahal_cart";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [rawItems, setRawItems] = useState<CartItem[]>(loadCart);
  const [productCache, setProductCache] = useState<Map<string, Product>>(new Map());
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    saveCart(rawItems);
  }, [rawItems]);

  useEffect(() => {
    const productIds = rawItems.map(i => i.productId).filter(id => !productCache.has(id));
    if (productIds.length === 0) return;

    fetch("/api/products")
      .then(r => r.json())
      .then((products: Product[]) => {
        setProductCache(prev => {
          const next = new Map(prev);
          products.forEach(p => next.set(p.id, p));
          return next;
        });
      })
      .catch(() => {});
  }, [rawItems.length]);

  const cartItems = rawItems
    .map(item => {
      const product = productCache.get(item.productId);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean) as (CartItem & { product: Product })[];

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setProductCache(prev => {
      const next = new Map(prev);
      next.set(product.id, product);
      return next;
    });

    setRawItems(prev => {
      const existing = prev.find(i => i.productId === product.id);
      if (existing) {
        return prev.map(i =>
          i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId: product.id, quantity, stripePriceId: product.stripePriceId }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setRawItems(prev => prev.filter(i => i.productId !== productId));
    } else {
      setRawItems(prev => prev.map(i =>
        i.productId === productId ? { ...i, quantity } : i
      ));
    }
  }, []);

  const removeItem = useCallback((productId: string) => {
    setRawItems(prev => prev.filter(i => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setRawItems([]);
  }, []);

  const totalItems = rawItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + (parseFloat(i.product.price) * i.quantity), 0);

  const checkout = useCallback(async () => {
    if (rawItems.length === 0) return;
    setIsCheckingOut(true);
    try {
      const items = rawItems.map(i => ({
        stripePriceId: i.stripePriceId,
        quantity: i.quantity,
      }));

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (!res.ok) throw new Error("Checkout failed");

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsCheckingOut(false);
    }
  }, [rawItems]);

  const buyNow = useCallback(async (product: Product) => {
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ stripePriceId: product.stripePriceId, quantity: 1 }] }),
      });

      if (!res.ok) throw new Error("Checkout failed");

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Buy now error:", error);
    } finally {
      setIsCheckingOut(false);
    }
  }, []);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, updateQuantity, removeItem, clearCart,
      totalItems, totalPrice, isCheckingOut, checkout, buyNow,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
