import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { Menu, Search, ShoppingCart, X, Plus, Minus } from "lucide-react";
import zahalLogo from "@assets/Zahal Verde - No fondo_1759182945567.png";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, updateQuantity, removeItem } = useCart();

  const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Catálogo" },
    { href: "#categorias", label: "Categorías" },
    { href: "#sobre-nosotros", label: "Nosotros" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center" data-testid="link-home">
            <img 
              src={zahalLogo} 
              alt="Zahal Natural" 
              className="h-10 lg:h-14 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-foreground hover:text-primary transition-colors duration-200 ${
                  location === item.href ? "text-primary font-medium" : ""
                }`}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-muted"
              data-testid="button-search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hover:bg-muted relative"
                  data-testid="button-cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Carrito de Compras</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Tu carrito está vacío</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item: any) => (
                        <div key={item.productId} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-medium">{item.productName || item.productId}</h3>
                            <p className="text-sm text-muted-foreground">${item.price || '0.00'}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                              className="h-8 w-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeItem(item.id)}
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4 border-t">
                        <Button 
                          className="w-full" 
                          onClick={() => {
                            // Build Shopify cart URL with products
                            const items = cartItems.map((item: any) => 
                              `${item.productId}:${item.quantity}`
                            ).join(',');
                            const shopifyCartUrl = `https://5b32c9-07.myshopify.com/cart/${items}`;
                            window.open(shopifyCartUrl, '_blank', 'noopener,noreferrer');
                          }}
                        >
                          Proceder al Checkout
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            
            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="lg:hidden hover:bg-muted"
                  data-testid="button-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-lg py-2 text-foreground hover:text-primary transition-colors duration-200 ${
                        location === item.href ? "text-primary font-medium" : ""
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
