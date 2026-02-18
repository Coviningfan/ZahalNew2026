import { getStripeClient } from '../server/stripeClient';

const categoryUpdates: Record<string, string> = {
  "zahal-desodorante-natural-en-spray-para-pies-240ml": "sport",
  "zahal-jabon-natural-arbol-de-te-100g": "sport",
  "zahal-limpiador-de-manos-natural-en-spray-240-ml": "sport",
  "desodorante-corporal-de-piedra-de-alumbre-sales-naturales-en-spray-240-ml-copia": "travel",
  "zahal-limpiador-de-manos-natural-30-ml": "travel",
  "desodorante-natural-de-piedra-de-alumbre-roll-on-unisex-90-ml": "travel",
  "zahal-desodorante-natural-roll-on-teens-con-aroma-30-ml": "travel",
};

async function updateCategories() {
  const stripe = getStripeClient();
  const products = await stripe.products.list({ active: true, limit: 100 });

  for (const product of products.data) {
    const slug = product.metadata?.slug;
    if (slug && categoryUpdates[slug]) {
      await stripe.products.update(product.id, {
        metadata: {
          ...product.metadata,
          additionalCategories: categoryUpdates[slug],
        },
      });
      console.log(`Updated "${product.name}" (${slug}) -> additionalCategories: ${categoryUpdates[slug]}`);
    }
  }

  console.log('\nAll category updates complete!');
}

updateCategories().catch(console.error);
