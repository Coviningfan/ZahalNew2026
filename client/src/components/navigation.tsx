import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { Menu, ShoppingCart, X, Plus, Minus, ArrowRight } from "lucide-react";
import zahalLogo from "@assets/Zahal Verde - No fondo_1759182945567.png";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, updateQuantity, removeItem } = useCart();

  const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/preguntas-frecuentes", label: "FAQ" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <Link href="/" className="flex items-center" data-testid="link-home">
            <img 
              src={zahalLogo} 
              alt="Zahal Natural" 
              className="h-9 lg:h-11 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 relative ${
                  location === item.href 
                    ? "text-primary" 
                    : "text-foreground/60 hover:text-foreground"
                }`}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                {item.label}
                {location === item.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/productos">
              <Button
                size="sm"
                variant="outline"
                className="hidden lg:inline-flex border-primary/25 text-primary hover:bg-primary hover:text-white font-medium h-9 px-5 text-sm gap-1.5 transition-colors duration-200"
                data-testid="button-nav-shop"
              >
                Tienda
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-primary/8 relative h-9 w-9"
                  data-testid="button-cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center p-0">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="font-serif">Carrito de Compras</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">Tu carrito está vacío</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item: any) => (
                        <div key={item.productId} className="flex items-center space-x-4 p-4 bg-card rounded-xl border border-border/50">
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{item.productName || item.productId}</h3>
                            <p className="text-sm text-muted-foreground">${item.price || '0.00'} MXN</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                              className="h-7 w-7"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="h-7 w-7"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeItem(item.id)}
                              className="h-7 w-7 text-destructive hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t border-border/50">
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90 text-white h-11 font-semibold" 
                          onClick={() => {
                            const items = cartItems.map((item: any) => 
                              `${item.productId}:${item.quantity}`
                            ).join(',');
                            const shopifyCartUrl = `https://5b32c9-07.myshopify.com/cart/${items}`;
                            window.open(shopifyCartUrl, '_blank', 'noopener,noreferrer');
                          }}
                          data-testid="button-checkout"
                        >
                          Proceder al Checkout
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="lg:hidden hover:bg-primary/8 h-9 w-9"
                  data-testid="button-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <SheetHeader>
                  <SheetTitle className="font-serif text-left">Menú</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-1 mt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-base py-3 px-3 rounded-lg transition-colors duration-200 ${
                        location === item.href 
                          ? "text-primary bg-primary/5 font-medium" 
                          : "text-foreground/60 hover:text-foreground hover:bg-muted"
                      }`}
                      onClick={() => setIsOpen(false)}
                      data-testid={`link-mobile-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
