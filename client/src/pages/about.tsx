import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Heart, Leaf, Users, Sparkles, CheckCircle, Mail } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Nuestra Historia"
        description="Conoce la historia de Zahal, marca mexicana de desodorantes naturales de piedra de alumbre."
        path="/nosotros"
      />
      <Navigation />
      
      <main id="main-content" className="pt-20">
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
              <div>
                <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-4">Quiénes Somos</p>
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-serif leading-tight" data-testid="text-about-title">
                  Natural.<br />Consciente.<br /><span className="italic text-primary/70">Real.</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  En Zahal creemos que el cuidado personal puede ser natural, consciente y poderoso. 
                  Somos una marca comprometida con la salud, el bienestar y el medio ambiente.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Cada producto que desarrollamos tiene una razón: ayudarte a sentirte bien en tu piel todos los días, 
                  mientras contribuimos a un mundo más limpio.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl -z-10"></div>
                <img 
                  src="https://cdn.shopify.com/s/files/1/0622/1004/8065/articles/banner_2_promo_1_738f2117-970e-4120-bdf7-8c3db4c24eab_1100x.jpg?v=1753817472" 
                  alt="Filosofía Zahal" 
                  className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl"
                />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 lg:w-36 lg:h-36 bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl overflow-hidden flex items-center justify-center hidden md:flex">
                  <img 
                    src="/img/zahal-escudo.png" 
                    alt="Libre de parabenos, clorhidrato de aluminio y alcohol" 
                    className="w-44 h-44 lg:w-52 lg:h-52 object-contain pointer-events-none select-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-card linen-texture">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1">
                  <div className="relative">
                    <div className="absolute -inset-3 bg-primary/5 rounded-3xl -z-10"></div>
                    <img
                      src="https://cdn.shopify.com/s/files/1/0622/1004/8065/files/WhatsApp_Image_2024-11-26_at_09.09.05.jpg?v=1732636829&width=1500"
                      alt="Equipo Zahal"
                      className="w-full h-auto max-h-[500px] object-cover object-top rounded-2xl"
                    />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Nuestra Esencia</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-5 font-serif">
                    Cuidarte naturalmente y sorprenderte cada día
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    Creamos alternativas saludables para tu piel que cuidan de ti y del planeta, 
                    con productos libres de químicos agresivos, elaborados con ingredientes naturales y sostenibles.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    La innovación no se detiene. Mejoramos constantemente nuestros procesos y productos 
                    con tecnología limpia, metodologías sustentables y mucho amor por lo que hacemos.
                  </p>
                  <div className="space-y-3">
                    {["Sin químicos agresivos", "Ingredientes naturales", "Procesos sustentables", "Libre de crueldad animal"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-14 max-w-xl mx-auto">
              <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Nuestros Valores</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-serif mb-4">
                Lo que nos mueve cada día
              </h2>
              <p className="text-muted-foreground text-sm">
                Nos mueve el trabajo en equipo, la empatía, la comunicación y el respeto. 
                Esa energía colectiva hace que nuestros productos sean auténticos.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {[
                { icon: Heart, title: "Consciente", desc: "Creamos con propósito, cuidando de ti y del planeta con cada decisión que tomamos." },
                { icon: Leaf, title: "Sostenible", desc: "Tecnología limpia y procesos sustentables para un mundo más limpio y saludable." },
                { icon: Users, title: "Comunidad", desc: "Más que una marca, somos una comunidad que inspira a vivir en equilibrio." },
                { icon: Sparkles, title: "Innovación", desc: "Combinamos tradición y ciencia para productos auténticos, eficaces y confiables." }
              ].map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-card rounded-2xl p-6 border border-border/40 hover:shadow-md transition-shadow duration-300" data-testid={`value-card-${index}`}>
                    <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-primary linen-texture">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 font-serif">
                Más que una marca
              </h2>
              <p className="text-white/75 leading-relaxed mb-3">
                Somos una comunidad que inspira a cambiar. Creemos en las personas que se atreven, 
                que transforman su vida y la de los demás.
              </p>
              <p className="text-white/75 leading-relaxed text-sm">
                Personas que eligen lo natural, que buscan sentirse bien y vivir en equilibrio. 
                En Zahal, cada decisión tiene un propósito: servir con conciencia, crear con sentido y vivir con propósito.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-5 gap-10 items-center">
                <div className="md:col-span-3">
                  <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Programa</p>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 font-serif" data-testid="text-ambassadors-title">
                    Embajadores de Marca
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Son personas identificadas con los valores y filosofía de Zahal que quieren representar 
                    nuestra marca en su ámbito de influencia.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Envío gratis</p>
                        <p className="text-sm text-muted-foreground">A cualquier parte de la República Mexicana en la compra mínima de $3,000.00</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">30% de descuento</p>
                        <p className="text-sm text-muted-foreground">Sobre los precios de la tienda, con ganancia del 30% sobre cada producto</p>
                      </div>
                    </div>
                  </div>
                  <a href="mailto:contacto@zahal.com.mx">
                    <Button className="bg-primary hover:bg-primary/90 text-white gap-2" data-testid="button-ambassador-contact">
                      <Mail className="h-4 w-4" />
                      contacto@zahal.com.mx
                    </Button>
                  </a>
                </div>
                <div className="md:col-span-2">
                  <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center">
                    <div className="text-5xl font-bold text-primary font-serif mb-2">30%</div>
                    <p className="text-sm text-muted-foreground mb-4">de descuento para embajadores</p>
                    <div className="w-16 h-px bg-primary/20 mx-auto mb-4"></div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Inicia tu negocio representando una marca natural, consciente y mexicana.
                    </p>
                  </div>
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
