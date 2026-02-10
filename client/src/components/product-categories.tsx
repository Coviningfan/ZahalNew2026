import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "unisex",
    title: "UNISEX",
    description: "Para toda la familia",
    image: "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_12_d3f065e2-e2ed-47ce-b2d5-3e90a108f64a.jpg?v=1729194975&width=1500",
    shopifyUrl: "https://5b32c9-07.myshopify.com/collections/unisex"
  },
  {
    id: "sport",
    title: "SPORT", 
    description: "Protección intensa",
    image: "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_15_39055246-6ec5-49ef-87a0-7e1de3b85b9a.jpg?v=1730323398&width=1500",
    shopifyUrl: "https://5b32c9-07.myshopify.com/collections/sport"
  },
  {
    id: "tamano-viaje",
    title: "TRAVEL",
    description: "Tamaño perfecto",
    image: "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_13_959e9a9d-14fb-4d0b-bf05-9df00ec8fe20.jpg?v=1729194974&width=1500",
    shopifyUrl: "https://5b32c9-07.myshopify.com/collections/tamano-viaje"
  },
  {
    id: "teens",
    title: "TEENS",
    description: "Suave y efectivo",
    image: "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_14.jpg?v=1729193010&width=1500",
    shopifyUrl: "https://5b32c9-07.myshopify.com/collections/teens"
  }
];

export default function ProductCategories() {
  return (
    <section id="categorias" className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Colecciones</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif">
            Elige tu momento Zahal
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Una opción natural que se adapta a tu estilo de vida
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a 
              key={category.id} 
              href={category.shopifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer"
              data-testid={`link-category-${category.id}`}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-400 transform hover:-translate-y-1">
                <img 
                  src={category.image}
                  alt={`${category.title} lifestyle`}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-white mb-0.5 tracking-wide">{category.title}</h3>
                  <p className="text-white/80 text-sm">{category.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
