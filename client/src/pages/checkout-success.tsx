import { useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CheckCircle, ArrowRight, ShoppingBag } from "lucide-react";
import SEO from "@/components/seo";

export default function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Pedido Confirmado"
        description="Tu pedido ha sido procesado exitosamente."
        path="/checkout/exito"
      />
      <Navigation />
      <main id="main-content" className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-[hsl(99,32%,90%)] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-[hsl(99,32%,38%)]" />
            </div>
            <h1 className="text-3xl font-bold font-serif text-foreground mb-3" data-testid="text-success-title">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-muted-foreground mb-2 leading-relaxed">
              Gracias por tu compra. Recibirás un correo electrónico con los detalles de tu pedido y la información de envío.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Si tienes alguna pregunta, no dudes en contactarnos por WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/productos">
                <Button className="gap-2 bg-primary hover:bg-primary/90" data-testid="button-continue-shopping">
                  <ShoppingBag className="h-4 w-4" />
                  Seguir comprando
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="gap-2" data-testid="button-go-home">
                  Ir al inicio
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
