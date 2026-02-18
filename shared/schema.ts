import { z } from "zod";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  additionalCategories: string[];
  weight: string | null;
  images: string[];
  features: string[];
  inStock: boolean;
  isFeatured: boolean;
  isNew: boolean;
  stripePriceId: string;
  stripeProductId: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  stripePriceId: string;
}

export const checkoutSchema = z.object({
  items: z.array(z.object({
    stripePriceId: z.string(),
    quantity: z.number().min(1),
  })).min(1),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
