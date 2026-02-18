import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, MessageCircle } from "lucide-react";
import { SiTiktok, SiWhatsapp } from "react-icons/si";
import SEO from "@/components/seo";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Mensaje enviado",
        description: "Gracias por contactarnos. Te responderemos a la brevedad.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contacto"
        description="Contáctanos por WhatsApp o formulario. Estamos aquí para ayudarte con tu pedido."
        path="/contacto"
      />
      <Navigation />
      
      <main id="main-content" className="pt-20">
        <section className="py-14 lg:py-16 bg-card linen-texture">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-4">Contáctanos</p>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-5 font-serif leading-tight" data-testid="text-contact-title">
                ¿Cómo podemos ayudarte?
              </h1>
              <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                Estamos aquí para resolver tus dudas. Escríbenos por WhatsApp para una respuesta rápida, o llena el formulario.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto mb-10">
              <a
                href="https://wa.me/5215545327249?text=Hola, tengo una pregunta sobre los productos Zahal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-[hsl(99,32%,96%)] border border-[hsl(99,25%,80%)]/60 rounded-2xl hover:bg-[hsl(99,32%,90%)]/70 transition-colors group"
                data-testid="link-whatsapp-contact"
              >
                <div className="w-12 h-12 bg-[hsl(99,32%,38%)] rounded-xl flex items-center justify-center flex-shrink-0">
                  <SiWhatsapp className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">Escríbenos por WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Respuesta rápida de lunes a viernes — 55 4532 7249</p>
                </div>
                <span className="text-[hsl(99,32%,38%)] font-medium text-sm hidden sm:block group-hover:underline">Abrir chat →</span>
              </a>
            </div>

            <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-4">Información de Contacto</p>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-0.5">Atención a cliente</p>
                        <a href="tel:5545327249" className="text-sm text-muted-foreground hover:text-primary transition-colors">55 4532 7249</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-0.5">Email general</p>
                        <a href="mailto:contacto@zahal.com.mx" className="text-sm text-muted-foreground hover:text-primary transition-colors">contacto@zahal.com.mx</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-0.5">Problemas con tu pedido</p>
                        <a href="mailto:pedidos@zahal.com.mx" className="text-sm text-muted-foreground hover:text-primary transition-colors">pedidos@zahal.com.mx</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground mb-0.5">Ubicación</p>
                        <p className="text-sm text-muted-foreground">Ciudad de México, México</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Síguenos</p>
                  <div className="flex gap-2.5">
                    <a 
                      href="https://www.facebook.com/CristalZahal" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
                      data-testid="link-contact-facebook"
                    >
                      <Facebook className="h-5 w-5 text-primary" />
                    </a>
                    <a 
                      href="https://www.instagram.com/zahal_mexico/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
                      data-testid="link-contact-instagram"
                    >
                      <Instagram className="h-5 w-5 text-primary" />
                    </a>
                    <a 
                      href="https://www.tiktok.com/@zahaloficial" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/8 rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
                      data-testid="link-contact-tiktok"
                    >
                      <SiTiktok className="h-5 w-5 text-primary" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-card rounded-2xl border border-border/40 p-8">
                  <h2 className="text-xl font-bold text-foreground mb-2 font-serif" data-testid="text-form-title">
                    Envíanos un mensaje
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6">Responderemos a la brevedad.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium text-foreground mb-1.5 block">Nombre</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="h-11 bg-white"
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">Correo electrónico *</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                        className="h-11 bg-white"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-sm font-medium text-foreground mb-1.5 block">Teléfono</label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="55 1234 5678"
                        className="h-11 bg-white"
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="text-sm font-medium text-foreground mb-1.5 block">Comentario</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="¿En qué podemos ayudarte?"
                        rows={4}
                        className="flex w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                        data-testid="input-message"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/90 text-white h-11 gap-2 font-semibold"
                      disabled={isSubmitting}
                      data-testid="button-submit-contact"
                    >
                      <Send className="h-4 w-4" />
                      {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
