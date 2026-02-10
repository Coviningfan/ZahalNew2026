import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Heart, Leaf, Users, Sparkles, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Natural y Consciente",
    description: "Creamos alternativas saludables para tu piel que cuidan de ti y del planeta, con productos libres de químicos agresivos."
  },
  {
    icon: Leaf,
    title: "Sostenible",
    description: "Mejoramos constantemente nuestros procesos y productos con tecnología limpia y metodologías sustentables."
  },
  {
    icon: Users,
    title: "Trabajo en Equipo",
    description: "Nuestro equipo está formado por personas apasionadas, proactivas y creativas comprometidas con cuidarte naturalmente."
  },
  {
    icon: Sparkles,
    title: "Innovación",
    description: "La innovación no se detiene. Combinamos tradición y ciencia para crear productos auténticos, eficaces y confiables."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://cdn.shopify.com/s/files/1/0622/1004/8065/articles/banner_2_promo_1_738f2117-970e-4120-bdf7-8c3db4c24eab_1100x.jpg?v=1753817472" 
              alt="Filosofía Zahal" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-2xl">
              <p className="text-white/70 font-semibold text-sm tracking-wider uppercase mb-4">Quiénes Somos</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-serif leading-tight" data-testid="text-about-title">
                Natural. Consciente. Real.
              </h1>
              <p className="text-white/90 text-lg leading-relaxed">
                En Zahal creemos que el cuidado personal puede ser natural, consciente y poderoso. 
                Somos una marca mexicana comprometida con la salud, el bienestar y el medio ambiente.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
                <div>
                  <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Nuestra Misión</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 font-serif">
                    Cuidarte naturalmente
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Cada producto que desarrollamos tiene una razón: ayudarte a sentirte bien en tu piel todos los días, 
                    mientras contribuimos a un mundo más limpio.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Creamos alternativas saludables para tu piel que cuidan de ti y del planeta, 
                    con productos libres de químicos agresivos, elaborados con ingredientes naturales y sostenibles.
                  </p>
                </div>
                <div>
                  <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Nuestra Filosofía</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 font-serif">
                    Más que una marca
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Somos una comunidad que inspira a cambiar. Creemos en las personas que se atreven, 
                    que transforman su vida y la de los demás.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Personas que eligen lo natural, que buscan sentirse bien y vivir en equilibrio. 
                    En Zahal, cada decisión tiene un propósito: servir con conciencia, crear con sentido y vivir con propósito.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Nuestros Valores</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-serif">
                Lo que nos mueve
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center" data-testid={`value-card-${index}`}>
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 lg:p-12">
                <div className="text-center">
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 font-serif" data-testid="text-ambassadors-title">
                    Embajadores de Marca
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Son personas identificadas con los valores y filosofía de Zahal que quieren representar nuestra marca en su ámbito de influencia.
                  </p>
                  <div className="bg-white rounded-xl p-6 mb-6 text-left space-y-3">
                    <p className="text-foreground text-sm">
                      <strong>Envío gratis</strong> a cualquier parte de la República Mexicana en la compra mínima de $3,000.00 de productos Zahal.
                    </p>
                    <p className="text-foreground text-sm">
                      <strong>Descuento del 30%</strong> sobre los precios de la tienda, con una ganancia del 30% sobre cada producto.
                    </p>
                  </div>
                  <a href="mailto:contacto@zahal.com.mx">
                    <Button className="bg-primary hover:bg-primary/90 text-white gap-2" data-testid="button-ambassador-contact">
                      Contáctanos
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
