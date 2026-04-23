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

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  coverImage: text("cover_image").notNull().default(""),
  author: text("author").notNull().default("Zahal"),
  published: boolean("published").notNull().default(false),
  tags: text("tags").array().notNull().default([]),
  categories: text("categories").array().notNull().default([]),
  seoTitle: text("seo_title").notNull().default(""),
  seoDescription: text("seo_description").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull().default(""),
});

export const mediaAssets = pgTable("media_assets", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  filename: text("filename").notNull(),
  mimeType: text("mime_type").notNull(),
  size: text("size").notNull().default("0"),
  uploadedBy: text("uploaded_by").notNull().default("admin"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type MediaAsset = typeof mediaAssets.$inferSelect;

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type SelectContactMessage = typeof contactMessages.$inferSelect;

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({ id: true, createdAt: true });
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
export type SelectNewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type SiteSetting = typeof siteSettings.$inferSelect;

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

export const blogPostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional().default(""),
  content: z.string().optional().default(""),
  coverImage: z.string().optional().default(""),
  author: z.string().optional().default("Zahal"),
  published: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional().default([]),
  categories: z.array(z.string()).optional().default([]),
  seoTitle: z.string().optional().default(""),
  seoDescription: z.string().optional().default(""),
});

export const heroSlideSchema = z.object({
  badge: z.string().optional().default(""),
  title: z.string().min(1),
  mobileTitle: z.string().optional().default(""),
  description: z.string().optional().default(""),
  mobileDescription: z.string().optional().default(""),
  ctaLabel: z.string().optional().default(""),
  ctaHref: z.string().optional().default(""),
  ctaSecondaryLabel: z.string().optional().default(""),
  ctaSecondaryHref: z.string().optional().default(""),
  bgImage: z.string().min(1),
  bgPosition: z.string().optional().default("center center"),
  alignRight: z.boolean().optional().default(true),
  externalLink: z.boolean().optional().default(false),
  showLogos: z.boolean().optional().default(false),
  hideBadge: z.boolean().optional().default(false),
});
export type HeroSlide = z.infer<typeof heroSlideSchema>;
export const heroSlidesSchema = z.array(heroSlideSchema).min(1);
