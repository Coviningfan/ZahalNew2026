import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

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
    <section className="py-16 lg:py-20 bg-primary">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 font-serif">
            Mantente conectado con Zahal
          </h2>
          <p className="text-white/80 text-base mb-8">
            Recibe tips de cuidado natural y ofertas exclusivas directamente en tu correo
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Tu correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/15 backdrop-blur-sm text-white placeholder-white/60 border-white/20 focus:border-white/40 focus:ring-white/30 h-12"
              required
              data-testid="input-email"
            />
            <Button 
              type="submit"
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white font-semibold h-12"
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
