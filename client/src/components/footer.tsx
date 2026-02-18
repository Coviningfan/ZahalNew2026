import { Link, useLocation } from "wouter";
import { Facebook, Instagram, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { SiTiktok, SiWhatsapp } from "react-icons/si";
import zahalLogo from "@assets/Zahal_Verde_-_No_fondo_1771455710794.webp";

const productLinks = [
  { href: "/productos", label: "Todos los productos" },
  { href: "/productos?categoria=unisex", label: "Unisex" },
  { href: "/productos?categoria=sport", label: "Sport" },
  { href: "/productos?categoria=teens", label: "Teens" },
  { href: "/productos/eco-traveler-kit-de-viaje-natural-desodorantes-limpiador-de-manos-jabon", label: "Kit Eco Viajero" },
];

const infoLinks = [
  { href: "/nosotros", label: "Sobre Nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes" },
  { href: "/donde-encontrarnos", label: "¿Dónde encontrarnos?" },
  { href: "/privacidad", label: "Política de Privacidad" },
  { href: "/terminos", label: "Términos y Condiciones" },
];

export default function Footer() {
  const [, setLocation] = useLocation();

  const handleProductLink = (href: string) => {
    setLocation(href);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="py-14 lg:py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="mb-5">
              <img 
                src={zahalLogo} 
                alt="Zahal Natural" 
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Marca comprometida con tu bienestar y el medio ambiente. Cuidado natural con la pureza de la piedra de alumbre.
            </p>
            <div className="flex space-x-2.5">
              <a 
                href="https://wa.me/5215545327249"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center hover:bg-[hsl(99,32%,38%)] transition-colors duration-200"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="h-4 w-4" />
              </a>
              <a 
                href="https://www.facebook.com/CristalZahal" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                data-testid="link-facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/zahal_mexico/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                data-testid="link-instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@zahaloficial?_t=ZM-8xt99kGDh7F&_r=1" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                data-testid="link-tiktok"
              >
                <SiTiktok className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Productos</h3>
            <ul className="space-y-2.5">
              {productLinks.map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleProductLink(link.href);
                    }}
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200 cursor-pointer"
                    data-testid={`link-product-${link.label.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Información</h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-white/60 hover:text-white text-sm transition-colors duration-200"
                    data-testid={`link-info-${link.label.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-5">Contacto</h3>
            <ul className="space-y-3 text-white/60 text-sm">
              <li>
                <a href="https://wa.me/5215545327249" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <MessageCircle className="h-4 w-4 text-[hsl(99,30%,55%)] flex-shrink-0" />
                  <span>WhatsApp: 55 4532 7249</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary/70 flex-shrink-0" />
                <span>contacto@zahal.com.mx</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary/70 flex-shrink-0" />
                <span>55 4532 7249</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-primary/70 flex-shrink-0" />
                <span>Ciudad de México, México</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 py-6 flex flex-col items-center gap-2">
          <p className="text-white/60 text-[10px] font-medium tracking-widest uppercase">
            Powered by JABVLabs
          </p>
          <p className="text-white/40 text-xs">
            &copy; 2026 Zahal Productos Naturales. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-white/40 text-xs mt-2">
            <Link href="/privacidad" className="hover:text-white/70 transition-colors cursor-pointer">Privacidad</Link>
            <Link href="/terminos" className="hover:text-white/70 transition-colors cursor-pointer">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
