import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/seo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Página No Encontrada"
        description="La página que buscas no existe."
        path=""
        noindex
      />
      <Navigation />
      <main id="main-content" className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold font-serif text-foreground mb-3" data-testid="text-404-title">
              Página no encontrada
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
            <Link href="/">
              <Button className="gap-2 bg-primary hover:bg-primary/90" data-testid="button-go-home-404">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
