import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import { Store, ShoppingBag, Globe, MapPin } from "lucide-react";

import walmartLogo from "@assets/WALMART_e7e3f2bf-c140-4087-9005-94a3fb231765_180x_1771434503363.avif";
import chedrauiLogo from "@assets/chedraui-seeklogobueno-fotor-bg-remover-2026021893334_1771436026327.png";
import hebLogo from "@assets/HEB_180x_1771434503355.avif";
import sorianaLogo from "@assets/soriana-logopng_1771435365592.png";
import sanbornsLogo from "@assets/Sanbornspng_1771434929637.png";
import searsLogo from "@assets/Sears_Mexico_Logo.svg_1771350421240.png";
import superNaturistaLogo from "@assets/SUPER_NATURISTA_180x_1771434503354.webp";
import pronasoyaLogo from "@assets/PRONASOYA_180x_1771434503308.webp";
import nutrisaLogo from "@assets/Nutrisa+logotipo+_1_-removebg-preview_1771434664253.png";
import amazonLogo from "@assets/AMAZON_180x_1771434503364.avif";
import mercadoLibreLogo from "@assets/MERCADO_LIBRE_180x_1771434503366.avif";
import getmeLogo from "@assets/logo_getmepng_1771435262525.png";
import daxLogo from "@assets/DaxLogo_1771437463517.png";
import tiendaUnamLogo from "@assets/tienda_unam_1771437690744.jpg";
import laComerLogo from "@assets/la-comer-logo-png_seeklogo-299203-fotor-bg-remover-20260218102_1771437783061.png";
import caalfrabetLogo from "@assets/Logo_CAALFRA_Oficial_1771437792297.avif";
import sheinLogo from "@assets/shein-seeklogo_1771437844496.png";
import ultrasoyaLogo from "@assets/logo-ultrasoya_1771437873164.png";

const autoservicio = [
  { name: "Walmart", logo: walmartLogo },
  { name: "Chedraui", logo: chedrauiLogo },
  { name: "La Comer", logo: laComerLogo },
  { name: "HEB", logo: hebLogo },
  { name: "Soriana", logo: sorianaLogo },
  { name: "Dax", logo: daxLogo },
  { name: "Tienda UNAM", logo: tiendaUnamLogo },
];

const departamentales = [
  { name: "Sanborns", logo: sanbornsLogo },
  { name: "Sears", logo: searsLogo },
  { name: "Súper Naturista", logo: superNaturistaLogo },
  { name: "Pronasoya", logo: pronasoyaLogo },
  { name: "Caalfrabet", logo: caalfrabetLogo },
  { name: "Ultrasoya", logo: ultrasoyaLogo },
  { name: "Nutrisa", logo: nutrisaLogo },
];

const ecommerce = [
  { name: "Amazon", logo: amazonLogo },
  { name: "Mercado Libre", logo: mercadoLibreLogo },
  { name: "Get Me by Ola", logo: getmeLogo },
  { name: "SheIn", logo: sheinLogo },
];

function StoreItem({ store }: { store: { name: string; logo: string | null } }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-border/30 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
      data-testid={`store-item-${store.name.toLowerCase().replace(/ /g, "-")}`}
    >
      {store.logo ? (
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
          <div role="img" aria-label={store.name} className="h-7 w-[40px] pointer-events-none select-none" style={{ backgroundImage: `url(${store.logo})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} />
        </div>
      ) : (
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary/5 rounded-lg">
          <MapPin className="h-4 w-4 text-primary/50" />
        </div>
      )}
      <span className="text-sm font-medium text-foreground">{store.name}</span>
    </div>
  );
}

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
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-primary/8 rounded-full mb-5">
                  <MapPin className="h-4 w-4 text-primary mr-2" />
                  <span className="text-primary font-semibold text-sm tracking-wider uppercase">Puntos de Venta</span>
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-5 font-serif leading-tight" data-testid="text-stores-title">
                  ¿Dónde encontrarnos?
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  Encuentra nuestros productos en tiendas físicas y plataformas en línea en todo el país.
                </p>
              </div>

              <div className="space-y-10">
                <div className="bg-gradient-to-br from-primary/[0.03] to-transparent rounded-3xl p-8 lg:p-10 border border-primary/10" data-testid="stores-autoservicio">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Store className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground font-serif">Autoservicio</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {autoservicio.map((store) => (
                      <StoreItem key={store.name} store={store} />
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/[0.03] to-transparent rounded-3xl p-8 lg:p-10 border border-primary/10" data-testid="stores-departamentales">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground font-serif">Departamentales y Especializadas</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {departamentales.map((store) => (
                      <StoreItem key={store.name} store={store} />
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/[0.03] to-transparent rounded-3xl p-8 lg:p-10 border border-primary/10" data-testid="stores-ecommerce">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground font-serif">E-commerce</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {ecommerce.map((store) => (
                      <StoreItem key={store.name} store={store} />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground/40 text-[10px] text-center mt-10">
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
