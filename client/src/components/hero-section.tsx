import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Leaf, ArrowRight } from "lucide-react";
import heroImage from "@assets/ZAHAL_PROD_012_dfa9fd33-8688-41b6-ac9b-c6ca187d00fa_1759341695530.jpg";

export default function HeroSection() {
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

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <Badge className="inline-flex items-center px-4 py-2 bg-white/15 backdrop-blur-md text-white border border-white/25 mb-6 font-medium" data-testid="badge-natural">
              <Leaf className="h-4 w-4 mr-2" />
              100% Natural y Orgánico
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6 font-serif">
              Tu cuidado<br/>
              <span className="text-amber-300">personal</span><br/>
              con esencia natural
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
              Descubre la protección natural de la piedra de alumbre. 
              Sin químicos agresivos, sin manchas, solo cuidado puro para tu piel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://5b32c9-07.myshopify.com/collections/all" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg shadow-accent/30 gap-2"
                  data-testid="button-shop-now"
                >
                  Comprar Ahora
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="https://5b32c9-07.myshopify.com/collections/all" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-primary font-semibold"
                  data-testid="button-view-catalog"
                >
                  Ver Catálogo
                </Button>
              </a>
            </div>
          </div>

          <div className="relative animate-scale-in hidden lg:block">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Zahal desodorante natural roll-on con piedra de alumbre y aloe vera" 
                className="w-full h-auto rounded-2xl shadow-2xl" 
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                <div className="text-primary text-center">
                  <div className="text-2xl font-bold">30ml</div>
                  <div className="text-sm text-muted-foreground">Roll-On</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
}
