import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "¡Suscripción exitosa!",
        description: "Te has suscrito al newsletter de Zahal",
      });
      setEmail("");
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Mantente conectado con Zahal
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8">
            Recibe tips de cuidado natural y ofertas exclusivas
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Tu correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/20 backdrop-blur-sm text-primary-foreground placeholder-primary-foreground/70 border-white/30 focus:ring-white/50"
              required
              data-testid="input-email"
            />
            <Button 
              type="submit"
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground sm:w-auto"
              data-testid="button-subscribe"
            >
              Suscribirme
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
