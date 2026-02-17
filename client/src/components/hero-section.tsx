import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Leaf, ArrowRight } from "lucide-react";

const featuredProduct = {
  id: "zahal-desodorante-natural-stik-120-g",
  name: "Stick Natural 120g",
  price: "$275",
  image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/Imagenes_Pagina_Web_1.png?v=1753731242",
};

export default function HeroSection() {
  const [, setLocation] = useLocation();

  const navigateTo = (path: string) => {
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;background:hsl(80 20% 98%);opacity:0;z-index:9999;transition:opacity 150ms ease;pointer-events:none;";
    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.opacity = "1"; });
    setTimeout(() => {
      window.scrollTo(0, 0);
      setLocation(path);
      setTimeout(() => {
        overlay.style.opacity = "0";
        overlay.addEventListener("transitionend", () => overlay.remove());
      }, 50);
    }, 150);
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080"
          alt="Natural skincare products with green botanical background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      <div className="absolute inset-0 z-[1] opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md text-white/90 border border-white/15 rounded-full mb-8 text-sm font-medium tracking-wide" data-testid="badge-natural">
              <Leaf className="h-4 w-4 mr-2 text-emerald-300" />
              Hecho en México — 100% Natural
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 font-serif text-balance">
              Cuida tu piel,{" "}
              <span className="italic text-emerald-200">respeta</span>{" "}
              tu cuerpo
            </h1>
            <p className="text-lg lg:text-xl text-white/80 mb-10 leading-relaxed max-w-lg">
              Desodorantes de piedra de alumbre: protección natural que dura 24 horas,
              sin químicos que dañen tu piel ni tu ropa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg shadow-black/10 gap-2 h-13 px-8 text-base"
                onClick={() => navigateTo("/productos")}
                data-testid="button-shop-now"
              >
                Ver Productos
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 font-semibold h-13 px-8 text-base"
                onClick={() => navigateTo("/nosotros")}
                data-testid="button-view-catalog"
              >
                Nuestra Historia
              </Button>
            </div>
          </div>

          {/* Product Square — Desktop */}
          <div className="relative animate-scale-in hidden lg:flex justify-center" data-testid="hero-product-square">
            <div
              className="relative bg-white/[0.07] backdrop-blur-lg border border-white/12 rounded-3xl p-8 max-w-sm w-full cursor-pointer group"
              onClick={() => navigateTo(`/productos/${featuredProduct.id}`)}
            >
              <div className="relative rounded-2xl p-6 mb-6">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-72 object-contain drop-shadow-lg group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-1 font-serif">
                  {featuredProduct.name}
                </h3>
                <p className="text-white/50 text-sm mb-5">Nuestro más vendido</p>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-white">{featuredProduct.price}</span>
                  <span className="text-white/40 text-sm">MXN</span>
                </div>
                <Button
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-medium h-11 gap-2 text-sm border border-white/15 backdrop-blur-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateTo(`/productos/${featuredProduct.id}`);
                  }}
                  data-testid="button-hero-product-cta"
                >
                  Ver Producto
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Square — Mobile */}
          <div className="lg:hidden animate-fade-in mt-2" data-testid="hero-product-square-mobile">
            <div
              className="bg-white/[0.07] backdrop-blur-lg border border-white/12 rounded-2xl p-3.5 cursor-pointer"
              onClick={() => navigateTo(`/productos/${featuredProduct.id}`)}
            >
              <div className="flex gap-4 items-center">
                <div className="rounded-xl p-1.5 shrink-0">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/40 text-[11px] uppercase tracking-wider mb-0.5">Más vendido</p>
                  <h3 className="text-sm font-semibold text-white font-serif mb-1">
                    {featuredProduct.name}
                  </h3>
                  <span className="text-lg font-bold text-white">{featuredProduct.price} <span className="text-white/40 text-xs font-normal">MXN</span></span>
                </div>
                <ArrowRight className="h-4 w-4 text-white/30 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
