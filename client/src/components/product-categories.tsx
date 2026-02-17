import { useLocation } from "wouter";

const categories = [
  {
    id: "unisex",
    title: "Unisex",
    description: "Para toda la familia",
    image: "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_12_d3f065e2-e2ed-47ce-b2d5-3e90a108f64a.jpg?v=1729194975&width=1500",
  },
  {
    id: "sport",
    title: "Sport", 
    description: "Protección intensa",
    image: "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_15_39055246-6ec5-49ef-87a0-7e1de3b85b9a.jpg?v=1730323398&width=1500",
  },
  {
    id: "travel",
    title: "Travel",
    description: "Tamaño perfecto",
    image: "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_13_959e9a9d-14fb-4d0b-bf05-9df00ec8fe20.jpg?v=1729194974&width=1500",
  },
  {
    id: "teens",
    title: "Teens",
    description: "Suave y efectivo",
    image: "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_14.jpg?v=1729193010&width=1500",
  }
];

export default function ProductCategories() {
  const [, setLocation] = useLocation();

  return (
    <section id="categorias" className="py-16 lg:py-24 bg-card linen-texture">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Colecciones</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif">
            Una opción para cada momento
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Protección natural que se adapta a tu estilo de vida
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category) => (
            <button 
              key={category.id} 
              onClick={() => setLocation("/productos")}
              className="group cursor-pointer text-left"
              data-testid={`link-category-${category.id}`}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-400 transform hover:-translate-y-1">
                <img 
                  src={category.image}
                  alt={`${category.title} lifestyle`}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-white mb-0.5 tracking-wide">{category.title}</h3>
                  <p className="text-white/75 text-sm">{category.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
