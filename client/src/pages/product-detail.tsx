import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { Shield, Leaf, Award, ArrowLeft, Check, Truck, ShieldCheck, ShoppingCart, Zap } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";
import { useState } from "react";
import type { Product } from "@shared/schema";
import SEO from "@/components/seo";

import { BASE_URL } from "@/lib/config";

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const { addToCart, buyNow, isCheckingOut } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", id],
  });

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    toast({
      title: "Producto agregado",
      description: `${product.name} se ha agregado a tu carrito.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main id="main-content" className="pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-16">
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <Skeleton className="w-full aspect-square rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-10 w-3/4" />
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
        <main id="main-content" className="pt-20">
          <div className="container mx-auto px-4 lg:px-8 py-16 text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Producto no encontrado</h1>
            <p className="text-muted-foreground mb-8">El producto que buscas no existe o ha sido eliminado.</p>
            <Link href="/productos">
              <Button data-testid="button-back" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Ver productos
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    unisex: "Unisex",
    hombre: "Hombre",
    sport: "Sport",
    travel: "Travel",
    teens: "Teens",
    soap: "Jabón",
  };

  const productJsonLd = [
    {
      "@type": "Product",
      name: product.name,
      description: product.description,
      image: product.images,
      sku: String(product.id),
      brand: {
        "@type": "Brand",
        name: "Zahal",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "MXN",
        price: String(product.price),
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        url: `${BASE_URL}/productos/${product.id}`,
        seller: {
          "@type": "Organization",
          name: "Zahal Productos Naturales",
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Productos", item: `${BASE_URL}/productos` },
        { "@type": "ListItem", position: 3, name: product.name, item: `${BASE_URL}/productos/${product.id}` },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={product.name}
        description={product.description?.slice(0, 155)}
        path={`/productos/${product.id}`}
        ogImage={product.images[0]}
        ogType="product"
        jsonLd={productJsonLd}
      />
      <Navigation />
      
      <main id="main-content" className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <Link href="/productos" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 gap-1.5" data-testid="link-back">
            <ArrowLeft className="h-4 w-4" />
            Volver a productos
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto">
            <div className="relative">
              <div className="bg-card/50 rounded-2xl overflow-hidden">
                <img
                  src={product.images[selectedImage] || product.images[0] || "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                  data-testid="img-product"
                />
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                {product.isNew && (
                  <Badge className="bg-[hsl(99,32%,38%)]/90 backdrop-blur-sm text-white px-3 py-1">Nuevo</Badge>
                )}
                {product.isFeatured && (
                  <Badge className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1">Popular</Badge>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {product.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className={`w-20 h-20 object-cover rounded-xl border-2 cursor-pointer transition-colors ${selectedImage === i ? "border-primary" : "border-border/50 hover:border-primary/60"}`}
                      onClick={() => setSelectedImage(i)}
                      data-testid={`img-thumbnail-${i}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3 text-xs font-medium">
                  {categoryLabels[product.category] || product.category}
                </Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 font-serif" data-testid="text-product-name">
                  {product.name}
                </h1>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
                  {product.description}
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-foreground" data-testid="text-product-price">${product.price}</span>
                <span className="text-sm text-muted-foreground">MXN</span>
              </div>

              {product.weight && (
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span>Contenido: {product.weight}</span>
                </div>
              )}

              {product.features.length > 0 && (
                <div className="bg-card rounded-xl p-5 border border-border/40">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Características
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground gap-2">
                        <Check className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={() => product && buyNow(product)}
                  disabled={!product.inStock || isCheckingOut}
                  className="w-full bg-primary hover:bg-primary/90 text-white h-12 gap-2 font-semibold"
                  data-testid="button-buy-now"
                >
                  <Zap className="h-4 w-4" />
                  {product.inStock ? "Comprar Ahora" : "Sin stock"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full h-12 gap-2 border-primary/30 text-primary hover:bg-primary/5"
                  data-testid="button-add-to-cart"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Agregar al Carrito
                </Button>
                <a
                  href={`https://wa.me/5215545327249?text=Hola, me interesa el producto: ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-12 gap-2 border-[hsl(99,32%,38%)]/30 text-[hsl(99,32%,30%)] hover:bg-[hsl(99,32%,96%)]"
                    data-testid="button-whatsapp"
                  >
                    <SiWhatsapp className="h-4 w-4" />
                    Preguntar por WhatsApp
                  </Button>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="text-center p-3 bg-card rounded-xl border border-border/30">
                  <Truck className="h-4 w-4 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Envío a todo México</p>
                </div>
                <div className="text-center p-3 bg-card rounded-xl border border-border/30">
                  <ShieldCheck className="h-4 w-4 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Pago seguro</p>
                </div>
                <div className="text-center p-3 bg-card rounded-xl border border-border/30">
                  <Leaf className="h-4 w-4 text-primary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">100% Natural</p>
                </div>
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
