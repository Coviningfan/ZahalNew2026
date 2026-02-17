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
    <section className="py-16 lg:py-20 bg-primary linen-texture">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 bg-white/12 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 font-serif">
            Únete a la comunidad Zahal
          </h2>
          <p className="text-white/75 text-base mb-8">
            Recibe tips de cuidado natural y ofertas exclusivas directamente en tu correo
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Tu correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/12 backdrop-blur-sm text-white placeholder-white/50 border-white/15 focus:border-white/30 focus:ring-white/20 h-12"
              required
              data-testid="input-email"
            />
            <Button 
              type="submit"
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold h-12"
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
