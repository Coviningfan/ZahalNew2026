import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { Menu, ShoppingCart, X, Plus, Minus, ArrowRight, Loader2, Facebook, Instagram } from "lucide-react";
import { SiTiktok, SiWhatsapp } from "react-icons/si";
import zahalLogo from "@assets/Zahal Verde - No fondo_1759182945567.png";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, updateQuantity, removeItem, totalItems, totalPrice, checkout, isCheckingOut } = useCart();

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

          <div className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 relative py-1 ${
                  location === item.href 
                    ? "text-primary" 
                    : "text-foreground/55 hover:text-foreground"
                }`}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                {item.label}
                {location === item.href && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-1 mr-2">
              <a href="https://wa.me/5215545327249" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/8 transition-colors" data-testid="nav-link-whatsapp">
                <SiWhatsapp className="h-4 w-4" />
              </a>
              <a href="https://www.facebook.com/CristalZahal" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/8 transition-colors" data-testid="nav-link-facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/zahal_mexico/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/8 transition-colors" data-testid="nav-link-instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.tiktok.com/@zahaloficial?_t=ZM-8xt99kGDh7F&_r=1" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground/50 hover:text-primary hover:bg-primary/8 transition-colors" data-testid="nav-link-tiktok">
                <SiTiktok className="h-3.5 w-3.5" />
              </a>
            </div>
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
                <div className="mt-6 flex flex-col h-[calc(100vh-8rem)]">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-muted-foreground text-sm">Tu carrito está vacío</p>
                      <Link href="/productos" onClick={() => setIsCartOpen(false)}>
                        <Button variant="outline" size="sm" className="mt-4 gap-1.5" data-testid="button-browse-products">
                          Ver productos
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                        {cartItems.map((item) => (
                          <div key={item.productId} className="flex items-start gap-3 p-3 bg-card rounded-xl border border-border/50" data-testid={`cart-item-${item.productId}`}>
                            <img 
                              src={item.product.images[0] || "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"} 
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm leading-snug truncate">{item.product.name}</h3>
                              <p className="text-sm text-primary font-semibold mt-0.5">${item.product.price} MXN</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                  className="h-7 w-7"
                                  data-testid={`button-decrease-${item.productId}`}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  className="h-7 w-7"
                                  data-testid={`button-increase-${item.productId}`}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeItem(item.productId)}
                              className="h-7 w-7 text-muted-foreground hover:text-destructive flex-shrink-0"
                              data-testid={`button-remove-${item.productId}`}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-border/50 space-y-3 mt-auto">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
                          <span className="text-lg font-bold" data-testid="text-cart-total">${totalPrice.toFixed(2)} MXN</span>
                        </div>
                        <Button
                          className="w-full bg-primary hover:bg-primary/90 text-white h-11 font-semibold gap-2"
                          onClick={checkout}
                          disabled={isCheckingOut}
                          data-testid="button-checkout"
                        >
                          {isCheckingOut ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Procesando...
                            </>
                          ) : (
                            "Proceder al pago"
                          )}
                        </Button>
                      </div>
                    </>
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
