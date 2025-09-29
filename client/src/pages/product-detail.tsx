import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Heart, Shield, Leaf, Award } from "lucide-react";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", id],
  });

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart(product.id, 1);
      toast({
        title: "Producto añadido",
        description: `${product.name} se ha añadido al carrito`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo añadir el producto al carrito",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-16">
            <div className="grid lg:grid-cols-2 gap-12">
              <Skeleton className="w-full h-96 lg:h-[500px]" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-12 w-48" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-16 text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Producto no encontrado</h1>
            <p className="text-muted-foreground mb-8">El producto que buscas no existe o ha sido eliminado.</p>
            <Button onClick={() => history.back()} data-testid="button-back">
              Volver atrás
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryLabels = {
    unisex: "Unisex",
    sport: "Sport",
    travel: "Travel",
    teens: "Teens",
    soap: "Jabón",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.images[0] || "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"}
                alt={product.name}
                className="w-full h-auto rounded-2xl shadow-lg"
                data-testid="img-product"
              />
              {product.isNew && (
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                  Nuevo
                </Badge>
              )}
              <Button
                size="icon"
                variant="outline"
                className="absolute top-4 left-4 bg-white/90 hover:bg-white"
                data-testid="button-wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {categoryLabels[product.category as keyof typeof categoryLabels] || product.category}
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2" data-testid="text-product-name">
                  {product.name}
                </h1>
                <p className="text-muted-foreground text-lg" data-testid="text-product-description">
                  {product.description}
                </p>
              </div>

              <div className="text-3xl font-bold text-foreground" data-testid="text-product-price">
                ${product.price}
              </div>

              {product.weight && (
                <div className="flex items-center text-muted-foreground">
                  <Award className="h-5 w-5 mr-2" />
                  <span>Contenido: {product.weight}</span>
                </div>
              )}

              {/* Features */}
              {product.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Características
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-muted-foreground">
                        <Leaf className="h-4 w-4 mr-2 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1"
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock ? "Añadir al carrito" : "Sin stock"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="sm:w-auto"
                  data-testid="button-buy-now"
                >
                  Comprar ahora
                </Button>
              </div>

              {!product.inStock && (
                <p className="text-destructive text-sm">
                  Este producto no está disponible actualmente
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
