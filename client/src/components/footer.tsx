import { Link } from "wouter";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import zahalLogo from "@assets/Zahal Verde - No fondo_1759182945567.png";

const productLinks = [
  { href: "https://5b32c9-07.myshopify.com/collections/unisex", label: "Unisex", external: true },
  { href: "https://5b32c9-07.myshopify.com/collections/sport", label: "Sport", external: true },
  { href: "https://5b32c9-07.myshopify.com/collections/tamano-viaje", label: "Travel", external: true },
  { href: "https://5b32c9-07.myshopify.com/collections/teens", label: "Teens", external: true },
];

const infoLinks = [
  { href: "/nosotros", label: "Sobre Nosotros" },
  { href: "/contacto", label: "Contacto" },
  { href: "/preguntas-frecuentes", label: "Preguntas Frecuentes" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="mb-5">
              <img 
                src={zahalLogo} 
                alt="Zahal Natural" 
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Marca mexicana comprometida con la salud, el bienestar y el medio ambiente. Cuidado natural con la pureza de la piedra de alumbre.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/CristalZahal" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                data-testid="link-facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://www.instagram.com/zahal_mexico/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                data-testid="link-instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@zahaloficial?_t=ZM-8xt99kGDh7F&_r=1" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200"
                data-testid="link-tiktok"
              >
                <SiTiktok className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Productos</h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                    data-testid={`link-product-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Información</h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                    data-testid={`link-info-${link.label.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Contacto</h3>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>contacto@zahal.com.mx</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>55 4532 7249</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>México</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Zahal. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-white/50 text-sm">
            <a href="https://5b32c9-07.myshopify.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacidad</a>
            <a href="https://5b32c9-07.myshopify.com/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
