import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import type { Product } from "@shared/schema";

export default function FeaturedProducts() {
  const [, setLocation] = useLocation();
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredSlugs = [
    "zahal-limpiador-de-manos-natural-30-ml",
    "desodorante-natural-de-piedra-de-alumbre-roll-on-unisex-90-ml",
    "zahal-desodorante-natural-stik-120-g",
  ];
  const featuredProducts = featuredSlugs
    .map(slug => products?.find(p => p.id === slug))
    .filter(Boolean) as Product[];

  const handleNavigate = () => {
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;background:hsl(80 20% 98%);opacity:0;z-index:9999;transition:opacity 150ms ease;pointer-events:none;backdrop-filter:blur(4px);";
    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.opacity = "1"; });
    setTimeout(() => {
      window.scrollTo(0, 0);
      setLocation("/productos");
      setTimeout(() => {
        overlay.style.opacity = "0";
        overlay.addEventListener("transitionend", () => overlay.remove());
      }, 50);
    }, 150);
  };

  return (
    <section id="productos" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Catálogo</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif">
            Nuestros Más Vendidos
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Los favoritos de nuestra comunidad — protección natural para toda la familia
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border/40 overflow-hidden">
                <Skeleton className="w-full h-64" />
                <div className="p-5">
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-destructive">Error al cargar los productos</p>
            </div>
          ) : (
            featuredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} showBadge />
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary hover:text-white font-semibold gap-2 h-12 px-8"
            data-testid="button-view-all-products"
            onClick={handleNavigate}
          >
            Ver Tienda Completa
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
