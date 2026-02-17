import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Leaf, ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";
import heroImage from "@assets/ZAHAL_PROD_012_dfa9fd33-8688-41b6-ac9b-c6ca187d00fa_1759341695530.jpg";

const featuredProduct = {
  id: "zahal-desodorante-natural-stik-120-g",
  name: "Stick Natural 120g",
  tagline: "Nuestro más vendido",
  price: "$275",
  originalPrice: "$320",
  rating: 5,
  reviews: 127,
  image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/Imagenes_Pagina_Web_1.png?v=1753731242",
  badges: ["Envío gratis", "100% Natural"],
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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
            <p className="text-lg lg:text-xl text-white/85 mb-10 leading-relaxed max-w-lg">
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
              className="relative bg-white/[0.08] backdrop-blur-xl border border-white/15 rounded-3xl p-6 max-w-sm w-full shadow-2xl shadow-black/20 cursor-pointer group"
              onClick={() => navigateTo(`/productos/${featuredProduct.id}`)}
            >
              <div className="absolute -inset-4 bg-emerald-400/5 rounded-[2rem] blur-2xl"></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                    {featuredProduct.tagline}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-200 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    -14%
                  </span>
                </div>

                <div className="relative bg-white/[0.06] rounded-2xl p-4 mb-5 overflow-hidden">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-64 object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-serif">
                  {featuredProduct.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-emerald-300 text-emerald-300" />
                    ))}
                  </div>
                  <span className="text-white/50 text-xs">({featuredProduct.reviews})</span>
                </div>

                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-3xl font-bold text-white">{featuredProduct.price}</span>
                  <span className="text-white/40 line-through text-sm">{featuredProduct.originalPrice}</span>
                  <span className="text-white/60 text-sm">MXN</span>
                </div>

                <div className="flex items-center gap-4 mb-5 text-white/50 text-xs">
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5" />
                    Envío gratis
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    100% Natural
                  </span>
                </div>

                <Button
                  className="w-full bg-white text-primary hover:bg-white/90 font-semibold h-12 gap-2 text-sm shadow-lg"
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
          <div className="lg:hidden animate-fade-in" data-testid="hero-product-square-mobile">
            <div
              className="bg-white/[0.08] backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-xl cursor-pointer"
              onClick={() => navigateTo(`/productos/${featuredProduct.id}`)}
            >
              <div className="flex gap-4 items-center">
                <div className="bg-white/[0.06] rounded-xl p-2 shrink-0">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-24 h-24 object-contain drop-shadow-md"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                    {featuredProduct.tagline}
                  </span>
                  <h3 className="text-base font-bold text-white font-serif mb-1 truncate">
                    {featuredProduct.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-emerald-300 text-emerald-300" />
                      ))}
                    </div>
                    <span className="text-white/50 text-[10px]">({featuredProduct.reviews})</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-white">{featuredProduct.price}</span>
                    <span className="text-white/40 line-through text-xs">{featuredProduct.originalPrice}</span>
                    <span className="text-white/50 text-xs">MXN</span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-white/40 shrink-0" />
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
