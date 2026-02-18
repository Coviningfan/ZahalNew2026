import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "¡Suscripción exitosa!",
        description: "Te has suscrito al newsletter de Zahal",
      });
      setEmail("");
    } catch {
      toast({
        title: "Error al suscribir",
        description: "No pudimos registrar tu correo. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
              disabled={isSubmitting}
              data-testid="button-subscribe"
            >
              {isSubmitting ? "Suscribiendo..." : "Suscribirme"}
            </Button>
          </form>
          <p className="text-white/35 text-xs mt-4">Sin spam. Solo tips y ofertas. Cancela cuando quieras.</p>
        </div>
      </div>
    </section>
  );
}
