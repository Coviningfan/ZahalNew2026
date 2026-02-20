import { getStripeClient } from '../server/stripeClient';

const products = [
  {
    name: "Desodorante Spray 15ml",
    description: "Desodorante natural en spray elaborado con piedra de alumbre. Protección antibacterial hasta por 24 horas sin interferir con la transpiración natural. Sin clorhidrato de aluminio, sin parabenos, sin alcohol. Ideal para piel sensible.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/8_c937cf13-ffcb-486e-9fc4-d818760d4fb0.png?v=1753911429",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/208_42cb1125-2c54-4c81-8638-19328ad37bbf.jpg?v=1753911451"
    ],
    price: 4500,
    metadata: {
      slug: "desodorante-corporal-de-piedra-de-alumbre-sales-naturales-en-spray-240-ml-copia",
      category: "unisex",
      weight: "15ml",
      additionalCategories: "travel",
      features: JSON.stringify(["Sin clorhidrato de aluminio", "Sin parabenos", "Sin alcohol", "Sin aroma", "Vegano", "Orgánico", "No mancha", "pH neutro", "Protección 24hrs"]),
      inStock: "true",
      isFeatured: "true",
      isNew: "false",
    }
  },
  {
    name: "Limpiador de Manos Spray 30ml",
    description: "Limpiador natural para manos en spray tamaño viaje. Hecho a base de sales minerales, sin alcohol, sin aroma. Deja la piel suave y limpia sin enjuagar. Rinde más que el gel porque no se volatiliza al contacto con la piel. No contamina el medio ambiente.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/17.png?v=1753754062",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/84.jpg?v=1753817049"
    ],
    price: 4200,
    metadata: {
      slug: "zahal-limpiador-de-manos-natural-30-ml",
      category: "manos",
      weight: "30ml",
      additionalCategories: "travel",
      features: JSON.stringify(["Sales minerales", "Sin alcohol", "Sin aroma", "Tamaño viaje", "No se enjuaga", "Eco-friendly"]),
      inStock: "true",
      isFeatured: "false",
      isNew: "false",
    }
  },
  {
    name: "Roll On con Aloe Vera 30ml",
    description: "Desodorante natural roll on elaborado con piedra de alumbre y extracto de sábila. Protección antibacterial por 24 horas. Sin clorhidrato de aluminio, sin alcohol, sin parabenos. Ideal para aplicación ligera y rápida.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/3.png?v=1753738575",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/107.jpg?v=1753738575"
    ],
    price: 5600,
    metadata: {
      slug: "desodorante-natural-de-piedra-de-alumbre-roll-on-unisex-90-ml",
      category: "unisex",
      weight: "30ml",
      additionalCategories: "travel",
      features: JSON.stringify(["Con aloe vera", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin fragancia", "Sin parabenos", "Vegano", "Orgánico", "No tóxico", "pH neutro"]),
      inStock: "true",
      isFeatured: "true",
      isNew: "false",
    }
  },
  {
    name: "Roll On Teens con Aroma 30ml",
    description: "Ideal para niños y adolescentes, con aroma fresco. Desodorante natural roll on con piedra de alumbre y extracto de sábila. Protección antibacterial hasta por 24 horas. Aplicación ligera y rápida. Apto para piel sensible.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/24.png?v=1753740898",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/25.png?v=1753740898"
    ],
    price: 6600,
    metadata: {
      slug: "zahal-desodorante-natural-roll-on-teens-con-aroma-30-ml",
      category: "teens",
      weight: "30ml",
      additionalCategories: "travel",
      features: JSON.stringify(["Con aroma fresco", "Para niños y adolescentes", "Con aloe vera", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin parabenos", "Vegano", "Orgánico", "Piel sensible"]),
      inStock: "true",
      isFeatured: "false",
      isNew: "false",
    }
  },
  {
    name: "Jabón Natural Árbol de Té 100g",
    description: "Jabón corporal natural de amplio espectro elaborado con aceite esencial de árbol de té. Elimina bacterias, hongos y ayuda en el tratamiento del acné y pie de atleta. Ideal para después de tatuar tu piel, ya que evita infección y acelera la cicatrización.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/14_e454b680-c7d9-44e4-8bdc-8b1984a6974d.png?v=1753753777",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/15.png?v=1753753788"
    ],
    price: 6800,
    metadata: {
      slug: "zahal-jabon-natural-arbol-de-te-100g",
      category: "cuidado",
      weight: "100g",
      additionalCategories: "sport",
      features: JSON.stringify(["Aceite de árbol de té", "Antibacterial natural", "Auxiliar anti-acné", "Post-tatuaje", "Sin químicos", "100% biodegradable"]),
      inStock: "true",
      isFeatured: "false",
      isNew: "false",
    }
  },
  {
    name: "Limpiador de Manos Spray 240ml",
    description: "Limpiador natural para manos en spray tamaño familiar. Hecho a base de piedra de alumbre, sin alcohol, sin aroma. Libre de residuos, deja la piel suave y limpia. Rinde más que las presentaciones en gel. No contamina el medio ambiente.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/16.png?v=1753753019"
    ],
    price: 9000,
    metadata: {
      slug: "zahal-limpiador-de-manos-natural-en-spray-240-ml",
      category: "manos",
      weight: "240ml",
      additionalCategories: "sport",
      features: JSON.stringify(["Piedra de alumbre", "Sin alcohol", "Sin aroma", "Tamaño familiar", "No se enjuaga", "Eco-friendly"]),
      inStock: "true",
      isFeatured: "false",
      isNew: "false",
    }
  },
  {
    name: "Roll On Unisex 90ml",
    description: "Desodorante natural roll on unisex elaborado con piedra de alumbre y extracto de sábila (aloe vera). Protección antibacterial hasta por 24 horas. Sin clorhidrato de aluminio, sin alcohol, sin fragancia, sin parabenos. Vegano, orgánico, no tóxico.",
    images: [
      "https://zahal.com.mx/img/roll-on-unisex-90ml.jpeg"
    ],
    price: 11500,
    metadata: {
      slug: "zahal-desodorante-natural-roll-on-unisex-90-ml",
      category: "unisex",
      weight: "90ml",
      features: JSON.stringify(["Con aloe vera", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin fragancia", "Sin parabenos", "Vegano", "Orgánico", "No tóxico", "pH neutro"]),
      inStock: "true",
      isFeatured: "false",
      isNew: "false",
    }
  },
  {
    name: "Roll On For Men 90ml",
    description: "Desodorante natural roll on para hombre, elaborado con piedra de alumbre y extracto de sábila (aloe vera). Protección antibacterial hasta por 24 horas. Aplicación ligera y rápida. Sin clorhidrato de aluminio, sin alcohol, sin parabenos.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/18_b12bb71f-34f5-474a-b9dc-9bd50802f32c.png?v=1753750893",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/19.png?v=1753750910"
    ],
    price: 11500,
    metadata: {
      slug: "zahal-desodorante-natural-roll-on-men-90-ml",
      category: "hombre",
      weight: "90ml",
      features: JSON.stringify(["Para hombre", "Con aloe vera", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin fragancia", "Sin parabenos", "Vegano", "Orgánico", "No tóxico"]),
      inStock: "true",
      isFeatured: "false",
      isNew: "false",
    }
  },
  {
    name: "Roll On Teens 90ml",
    description: "Ideal para niños y adolescentes. Desodorante natural roll on con piedra de alumbre, extracto de sábila y carbón activado. Protección antibacterial hasta por 24 horas. Apto para piel sensible, sin fragancia.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/20_03593599-4a47-4229-9ab9-13ddd0b88349.png?v=1753748140",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/20.png?v=1753747633"
    ],
    price: 11500,
    metadata: {
      slug: "zahal-desodorante-natural-roll-on-teens-90-ml",
      category: "teens",
      weight: "90ml",
      features: JSON.stringify(["Para niños y adolescentes", "Con aloe vera", "Carbón activado", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin parabenos", "Vegano", "Orgánico", "Piel sensible"]),
      inStock: "true",
      isFeatured: "false",
      isNew: "false",
    }
  },
  {
    name: "Roll On Sport 90ml",
    description: "Ideal para deportistas. Desodorante natural roll on con piedra de alumbre, extracto de sábila y carbón activado. Protección antibacterial hasta por 24 horas. Aplicación ligera y rápida. Sin clorhidrato de aluminio, sin alcohol, sin parabenos.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/22_ff2e0357-efb6-461e-afc0-46f05cc19f51.png?v=1753751451",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/23.png?v=1753751463"
    ],
    price: 12000,
    metadata: {
      slug: "zahal-desodorante-natural-roll-on-sport-con-carbon-activado-90-ml",
      category: "sport",
      weight: "90ml",
      features: JSON.stringify(["Carbón activado", "Ideal para deportistas", "Con aloe vera", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin parabenos", "Vegano", "Orgánico", "No tóxico"]),
      inStock: "true",
      isFeatured: "false",
      isNew: "false",
    }
  },
  {
    name: "Pack Dúo Stick + Spray",
    description: "Juego de desodorantes naturales: Mini Stick 60g y Spray corporal 15ml. Desodorante natural en piedra de alumbre con protección antibacterial hasta por 24 horas. Sin clorhidrato de aluminio, ni alcohol, ni parabenos.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/ZAHAL_Shopify_19.jpg?v=1730402957"
    ],
    price: 13000,
    metadata: {
      slug: "zahal-blister-duo-de-desodorante-natural-mini-stick-60-g-spray-corporal-15ml",
      category: "unisex",
      weight: "Pack",
      features: JSON.stringify(["Pack 2 productos", "Mini Stick 60g", "Spray 15ml", "Sin parabenos", "Vegano", "Orgánico", "Sin alcohol", "Ideal para viaje"]),
      inStock: "true",
      isFeatured: "true",
      isNew: "false",
    }
  },
  {
    name: "Spray para Pies 240ml",
    description: "Desodorante natural en spray especialmente formulado para pies, elaborado con piedra de alumbre. Protección antibacterial hasta por 24 horas. Sin alcohol, sin aroma, vegano y orgánico. Aplicar en pies y calzado para mejores resultados.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/12_8cd0f3a8-7767-4859-b2cd-c58573b9c24a.png?v=1753753663",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/13.png?v=1753753677"
    ],
    price: 13000,
    metadata: {
      slug: "zahal-desodorante-natural-en-spray-para-pies-240ml",
      category: "unisex",
      weight: "240ml",
      additionalCategories: "sport",
      features: JSON.stringify(["Para pies y calzado", "Piedra de alumbre", "24h protección", "Sin alcohol", "Sin aroma", "pH neutro", "Vegano"]),
      inStock: "true",
      isFeatured: "false",
      isNew: "false",
    }
  },
  {
    name: "Spray Corporal 240ml",
    description: "Desodorante corporal natural en spray de gran tamaño. Elaborado con piedra de alumbre. Protección antibacterial hasta por 24 horas. Ideal para todo el cuerpo. Sin clorhidrato de aluminio, sin alcohol, sin parabenos.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/1_c7be3dfa-4d93-46ce-836c-67dbe4a66b92.png?v=1753753301",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/2.png?v=1753753312"
    ],
    price: 13100,
    metadata: {
      slug: "zahal-desodorante-corporal-natural-en-spray-240-ml",
      category: "unisex",
      weight: "240ml",
      features: JSON.stringify(["Tamaño familiar", "Para todo el cuerpo", "Sin clorhidrato de aluminio", "Sin alcohol", "Sin parabenos", "Vegano", "Orgánico", "No tóxico", "pH neutro"]),
      inStock: "true",
      isFeatured: "true",
      isNew: "false",
    }
  },
  {
    name: "Kit Eco Viajero",
    description: "Kit completo de viaje con desodorantes naturales + limpiador de manos + jabón. Tamaños permitidos en puntos de revisión durante viajes. Permitido en aguas y playas protegidas. Incluye 2 jabones de árbol de té 30g, 1 Roll On 30ml, 1 Spray limpiador 30ml y 1 Eco 3 recargable 10g.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/26.png?v=1753740213",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/ZAHAL_momento_2.jpg?v=1753740213"
    ],
    price: 20700,
    metadata: {
      slug: "eco-traveler-kit-de-viaje-natural-desodorantes-limpiador-de-manos-jabon",
      category: "travel",
      weight: "Kit",
      features: JSON.stringify(["Kit completo 5 piezas", "Tamaño viaje", "Eco-friendly", "Sin químicos", "Biodegradable", "Vegano", "Orgánico", "Ideal para viajeros"]),
      inStock: "true",
      isFeatured: "true",
      isNew: "false",
    }
  },
  {
    name: "Eco Recargable 80g",
    description: "Desodorante natural recargable hasta 3 veces. Elaborado con piedra de alumbre en formato spray. Solo agrega agua purificada hasta la línea verde y déjalo reposar 12 horas para reactivar los cristales. Sin clorhidrato de aluminio, sin parabenos, sin alcohol.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/11.png?v=1753740323",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/31.jpg?v=1753740498"
    ],
    price: 16300,
    metadata: {
      slug: "zahal-desodorante-natural-eco-recargable-3-veces-80-g",
      category: "unisex",
      weight: "80g",
      features: JSON.stringify(["Recargable 3 veces", "Piedra de alumbre", "Eco-friendly", "Sin parabenos", "Sin alcohol", "Piel sensible"]),
      inStock: "true",
      isFeatured: "false",
      isNew: "false",
    }
  },
  {
    name: "Stick Natural 60g",
    description: "Desodorante natural en piedra de alumbre, práctico y funcional. Protección antibacterial por 24 horas sin interferir con la transpiración natural. Sin clorhidrato de aluminio, sin parabenos, sin alcohol. Apto para piel sensible. Duración de 2 años.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/9_8bfc3190-0f7b-4627-b0a3-08f674e99f15.png?v=1753751926",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/10.png?v=1753752239"
    ],
    price: 18900,
    metadata: {
      slug: "zahal-desodorante-natural-stick-60-g",
      category: "unisex",
      weight: "60g",
      features: JSON.stringify(["Piedra de alumbre pura", "Sin clorhidrato de aluminio", "Sin parabenos", "Sin alcohol", "Sin aroma", "Vegano", "Orgánico", "Duración 2 años"]),
      inStock: "true",
      isFeatured: "false",
      isNew: "false",
    }
  },
  {
    name: "Stick Natural 120g",
    description: "Desodorante natural en piedra de alumbre de gran tamaño. Protección antibacterial hasta por 24 horas sin interferir con la transpiración natural. Presentación en stick ideal para aplicación ligera y rápida. Duración de 4 años.",
    images: [
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/Imagenes_Pagina_Web_1.png?v=1753731242",
      "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/SQUARE_ZAHAL_9.jpg?v=1753731242"
    ],
    price: 27500,
    metadata: {
      slug: "zahal-desodorante-natural-stik-120-g",
      category: "unisex",
      weight: "120g",
      features: JSON.stringify(["Gran tamaño 120g", "Piedra de alumbre pura", "Sin clorhidrato de aluminio", "Sin parabenos", "Sin alcohol", "Sin aroma", "Vegano", "Orgánico", "Duración 4 años"]),
      inStock: "true",
      isFeatured: "true",
      isNew: "false",
    }
  },
];

async function seedProducts() {
  const stripe = getStripeClient();

  const existingProducts = await stripe.products.list({ active: true, limit: 100 });
  const existingSlugs = new Set(
    existingProducts.data.map(p => p.metadata?.slug).filter(Boolean)
  );

  for (const product of products) {
    if (existingSlugs.has(product.metadata.slug)) {
      console.log(`Skipping "${product.name}" - already exists`);
      continue;
    }

    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
      images: product.images.slice(0, 8),
      metadata: product.metadata,
    });

    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: product.price,
      currency: 'mxn',
    });

    console.log(`Created: ${product.name} -> ${stripeProduct.id} / ${stripePrice.id} ($${(product.price / 100).toFixed(2)} MXN)`);
  }

  console.log('\nAll products seeded successfully!');
}

seedProducts().catch(console.error);
