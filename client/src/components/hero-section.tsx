import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ChevronDown, Leaf } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
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
            <Badge className="inline-flex items-center px-4 py-2 bg-secondary/20 text-primary border-primary/20 mb-6">
              <Leaf className="h-4 w-4 mr-2" />
              100% Natural y Orgánico
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Tu cuidado<br/>
              <span className="text-secondary">PERSONAL</span><br/>
              con esencia natural
            </h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Descubre la protección natural de la piedra de alumbre. 
              Sin químicos agresivos, sin manchas, solo cuidado puro para tu piel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://5b32c9-07.myshopify.com/collections/all" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground transform hover:scale-105 transition-all duration-200"
                  data-testid="button-shop-now"
                >
                  Comprar Ahora
                </Button>
              </a>
              <a href="https://5b32c9-07.myshopify.com/collections/all" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary"
                  data-testid="button-view-catalog"
                >
                  Ver Catálogo
                </Button>
              </a>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
                alt="Natural deodorant stick with minimalist packaging" 
                className="w-full h-auto rounded-2xl shadow-2xl" 
              />
              <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">120g</div>
                  <div className="text-sm opacity-90">Duración extendida</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ChevronDown className="h-8 w-8" />
      </div>
    </section>
  );
}
