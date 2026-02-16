import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from "wouter";
import { Eye } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
}

export default function ProductCard({ product, showBadge = false }: ProductCardProps) {
  const [, setLocation] = useLocation();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocation(`/productos/${product.id}`);
  };

  return (
    <Link href={`/productos/${product.id}`} data-testid={`card-product-${product.id}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-400 transform hover:-translate-y-1 group border border-border/50 overflow-hidden">
        <div className="relative overflow-hidden">
          <img 
            src={product.images[0] || "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
            data-testid={`img-product-${product.id}`}
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {showBadge && product.isFeatured && (
              <Badge className="bg-accent text-white text-xs font-semibold px-3 py-1">
                Popular
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1">
                Nuevo
              </Badge>
            )}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-foreground mb-1.5" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed" data-testid={`text-product-description-${product.id}`}>
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-foreground" data-testid={`text-product-price-${product.id}`}>
              ${product.price} <span className="text-xs font-normal text-muted-foreground">MXN</span>
            </div>
            <Button
              onClick={handleViewDetails}
              disabled={!product.inStock}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-1.5"
              data-testid={`button-view-details-${product.id}`}
            >
              <Eye className="h-3.5 w-3.5" />
              {product.inStock ? "Ver Detalles" : "Sin stock"}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
