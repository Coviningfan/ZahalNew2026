import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Leaf, ArrowRight } from "lucide-react";
import heroImage from "@assets/ZAHAL_PROD_012_dfa9fd33-8688-41b6-ac9b-c6ca187d00fa_1759341695530.jpg";

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
    <section id="inicio" className="relative min-h-[75vh] lg:min-h-[80vh] flex items-center overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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

          <div className="relative animate-scale-in hidden lg:flex justify-center" data-testid="hero-product-square">
            <div className="relative">
              <div className="absolute -inset-6 bg-white/5 rounded-3xl blur-xl"></div>
              <img
                src={heroImage}
                alt="Zahal desodorante natural de piedra de alumbre"
                className="relative w-full max-w-md h-auto rounded-2xl shadow-2xl shadow-black/20"
              />
              <div className="absolute -bottom-4 -right-4 bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-xl animate-float">
                <div className="text-center">
                  <div className="text-xs font-medium text-white/60 uppercase tracking-wider">Desde</div>
                  <div className="text-2xl font-bold text-white">$45</div>
                  <div className="text-xs text-white/60">MXN</div>
                </div>
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
