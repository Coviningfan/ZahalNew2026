import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

export default function FeaturedProducts() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: () => fetch("/api/products?featured=true").then(res => res.json()),
  });

  return (
    <section id="productos" className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Los más comprados
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubre nuestros productos más populares
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-background rounded-2xl shadow-lg p-6">
                <Skeleton className="w-full h-48 mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-8">
              <p className="text-destructive">Error al cargar los productos destacados</p>
            </div>
          ) : (
            products?.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} showBadge />
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <Link href="/productos">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-black font-semibold"
              data-testid="button-view-all-products"
            >
              Ver Todos los Productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
