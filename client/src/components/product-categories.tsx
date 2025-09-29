import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const categories = [
  {
    id: "unisex",
    title: "UNISEX",
    description: "Para toda la familia",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
  },
  {
    id: "sport",
    title: "SPORT", 
    description: "Protección intensa",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
  },
  {
    id: "travel",
    title: "TRAVEL",
    description: "Tamaño perfecto",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
  },
  {
    id: "teens",
    title: "TEENS",
    description: "Suave y efectivo",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
  }
];

export default function ProductCategories() {
  return (
    <section id="categorias" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Elige tu momento Zahal
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Una opción natural que se adapta a tu estilo de vida
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/productos?category=${category.id}`}
              className="group cursor-pointer"
              data-testid={`link-category-${category.id}`}
            >
              <div className="relative overflow-hidden rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <img 
                  src={category.image}
                  alt={`${category.title} lifestyle`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-white/90 text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/productos">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              data-testid="button-view-all-categories"
            >
              Ver Todas las Categorías
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
