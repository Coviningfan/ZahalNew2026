import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import { Store, ShoppingBag, Globe } from "lucide-react";

const autoservicio = [
  "Walmart",
  "Chedraui",
  "La Comer",
  "HEB",
  "Dax",
  "Tienda UNAM",
];

const departamentales = [
  "Sanborns",
  "Sears",
  "Súper Naturista",
  "Pronasoya",
  "Caalfrabet",
  "Ultrasoya",
  "Nutrisa",
];

const ecommerce = [
  "Amazon",
  "Mercado Libre",
  "SheIn",
];

export default function DondeEncontrarnos() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="¿Dónde encontrarnos?"
        description="Encuentra productos Zahal en tiendas de autoservicio, departamentales, tiendas especializadas y plataformas de e-commerce."
        path="/donde-encontrarnos"
      />
      <Navigation />

      <main id="main-content" className="pt-20">
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-14">
                <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Puntos de Venta</p>
                <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-5 font-serif leading-tight" data-testid="text-stores-title">
                  ¿Dónde encontrarnos?
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  Encuentra nuestros productos en tiendas físicas y plataformas en línea en todo el país.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card rounded-2xl p-8 border border-border/40" data-testid="stores-autoservicio">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center mb-5">
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-4 font-serif">Autoservicio</h2>
                  <ul className="space-y-2.5">
                    {autoservicio.map((store) => (
                      <li key={store} className="text-muted-foreground text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full flex-shrink-0"></span>
                        {store}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-2xl p-8 border border-border/40" data-testid="stores-departamentales">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center mb-5">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-4 font-serif">Departamentales y Especializadas</h2>
                  <ul className="space-y-2.5">
                    {departamentales.map((store) => (
                      <li key={store} className="text-muted-foreground text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full flex-shrink-0"></span>
                        {store}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-2xl p-8 border border-border/40" data-testid="stores-ecommerce">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center mb-5">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-4 font-serif">E-commerce</h2>
                  <ul className="space-y-2.5">
                    {ecommerce.map((store) => (
                      <li key={store} className="text-muted-foreground text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full flex-shrink-0"></span>
                        {store}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="text-muted-foreground/50 text-[11px] text-center mt-10">
                Las marcas mostradas se usan solo para identificar puntos de venta y pertenecen a sus respectivos propietarios.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
