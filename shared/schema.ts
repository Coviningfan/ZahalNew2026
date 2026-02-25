import { z } from "zod";
import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  message: text("message").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  key: text("key").notNull().unique(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type SelectContactMessage = typeof contactMessages.$inferSelect;

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({ id: true, createdAt: true });
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type SelectNewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

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

export type ApiKey = typeof apiKeys.$inferSelect;
