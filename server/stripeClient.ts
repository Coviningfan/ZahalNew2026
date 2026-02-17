import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;
const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;

if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

if (!publishableKey) {
  throw new Error('STRIPE_PUBLISHABLE_KEY environment variable is required');
}

const stripe = new Stripe(secretKey, {
  apiVersion: '2025-11-17.clover' as any,
});

export function getStripeClient(): Stripe {
  return stripe;
}

export function getStripePublishableKey(): string {
  return publishableKey!;
}
