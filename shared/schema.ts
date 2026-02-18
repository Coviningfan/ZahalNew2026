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

export const contactMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  message: z.string().optional().default(""),
});
export type ContactMessage = z.infer<typeof contactMessageSchema> & { id: number; createdAt: string };

export const newsletterSchema = z.object({
  email: z.string().email(),
});
export type NewsletterSubscriber = z.infer<typeof newsletterSchema> & { id: number; createdAt: string };
