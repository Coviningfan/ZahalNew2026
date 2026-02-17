import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-10 w-10 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold font-serif text-foreground mb-3" data-testid="text-cancel-title">
              Pago Cancelado
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Tu pago no fue procesado. Los productos siguen en tu carrito — puedes intentarlo de nuevo cuando estés listo.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/productos">
                <Button className="gap-2 bg-primary hover:bg-primary/90" data-testid="button-back-to-shop">
                  <ArrowLeft className="h-4 w-4" />
                  Volver a la tienda
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
