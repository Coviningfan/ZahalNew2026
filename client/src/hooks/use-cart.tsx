import { useState, useEffect, useCallback, useRef, useMemo, createContext, useContext } from "react";
import type { Product, CartItem } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

function safePrice(val: string | number): number {
  const n = typeof val === "number" ? val : parseFloat(val);
  return Number.isFinite(n) ? n : 0;
}

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
  const { toast } = useToast();
  const fetchedIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    saveCart(rawItems);
  }, [rawItems]);

  const cartProductIds = useMemo(
    () => rawItems.map(i => i.productId).sort().join(","),
    [rawItems]
  );

  useEffect(() => {
    const ids = cartProductIds ? cartProductIds.split(",") : [];
    const neededIds = ids.filter(id => !fetchedIdsRef.current.has(id));
    if (neededIds.length === 0) return;

    fetch("/api/products")
      .then(r => r.json())
      .then((products: Product[]) => {
        products.forEach(p => fetchedIdsRef.current.add(p.id));
        setProductCache(prev => {
          const next = new Map(prev);
          products.forEach(p => next.set(p.id, p));
          return next;
        });

        setRawItems(prev => prev.map(item => {
          const p = products.find(prod => prod.id === item.productId);
          if (p && p.stripePriceId !== item.stripePriceId) {
            return { ...item, stripePriceId: p.stripePriceId };
          }
          return item;
        }));
      })
      .catch(() => {});
  }, [cartProductIds]);

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
          i.productId === product.id ? { ...i, quantity: Math.min(i.quantity + quantity, 10) } : i
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
        i.productId === productId ? { ...i, quantity: Math.min(quantity, 10) } : i
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
  const totalPrice = cartItems.reduce((sum, i) => sum + (safePrice(i.product.price) * i.quantity), 0);

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

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || "Checkout failed");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Error al procesar el pago",
        description: error instanceof Error && error.message !== "Checkout failed"
          ? error.message
          : "Hubo un problema al iniciar el pago. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  }, [rawItems, toast]);

  const buyNow = useCallback(async (product: Product) => {
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ stripePriceId: product.stripePriceId, quantity: 1 }] }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || "Checkout failed");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Buy now error:", error);
      toast({
        title: "Error al procesar el pago",
        description: error instanceof Error && error.message !== "Checkout failed"
          ? error.message
          : "Hubo un problema al iniciar el pago. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  }, [toast]);

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
