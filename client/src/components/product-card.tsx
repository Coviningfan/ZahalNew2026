import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
}

export default function ProductCard({ product, showBadge = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Añadido a favoritos",
      description: `${product.name} se ha añadido a tu lista de deseos`,
    });
  };

  return (
    <Link href={`/productos/${product.id}`}>
      <div className="bg-background rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group" data-testid={`card-product-${product.id}`}>
        <div className="relative overflow-hidden rounded-t-2xl">
          <img 
            src={product.images[0] || "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
            data-testid={`img-product-${product.id}`}
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {showBadge && product.isFeatured && (
              <Badge className="bg-accent text-accent-foreground">
                Bestseller
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground">
                Nuevo
              </Badge>
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleWishlist}
            className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/30"
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart className="h-5 w-5 text-white" />
          </Button>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2" data-testid={`text-product-description-${product.id}`}>
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-foreground" data-testid={`text-product-price-${product.id}`}>
              ${product.price}
            </div>
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              data-testid={`button-add-to-cart-${product.id}`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? "Comprar" : "Sin stock"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
