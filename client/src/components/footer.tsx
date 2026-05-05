import { Link, useLocation } from "wouter";
import { Facebook, Instagram, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { SiTiktok, SiWhatsapp } from "react-icons/si";
import zahalLogo from "@assets/Zahal_Verde_-_No_fondo_1771455710794.webp";
import { openCookieConsent } from "@/components/cookie-consent";

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
  { href: "/donde-encontrarnos", label: "Donde encontrarnos" },
  { href: "/blog", label: "Blog" },
  { href: "/privacidad", label: "Politica de Privacidad" },
  { href: "/terminos", label: "Terminos y Condiciones" },
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
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
          <div className="lg:col-span-1">
            <div className="mb-5">
              <div
                role="img"
                aria-label="Zahal Natural"
                className="pointer-events-none h-10 w-28 select-none brightness-0 invert"
                style={{
                  backgroundImage: `url(${zahalLogo})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "left center",
                }}
              />
            </div>
            <p className="mb-6 text-sm leading-relaxed text-white/60">
              Marca comprometida con tu bienestar y el medio ambiente. Cuidado natural con la pureza de la piedra de alumbre.
            </p>
            <div className="flex space-x-2.5">
              <a
                href="https://wa.me/5215545327249"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/8 transition-colors duration-200 hover:bg-[hsl(99,32%,38%)]"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/CristalZahal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/8 transition-colors duration-200 hover:bg-primary"
                data-testid="link-facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/zahal_mexico/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/8 transition-colors duration-200 hover:bg-primary"
                data-testid="link-instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@zahaloficial?_t=ZM-8xt99kGDh7F&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/8 transition-colors duration-200 hover:bg-primary"
                data-testid="link-tiktok"
              >
                <SiTiktok className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">Productos</h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      handleProductLink(link.href);
                    }}
                    className="cursor-pointer text-sm text-white/60 transition-colors duration-200 hover:text-white"
                    data-testid={`link-product-${link.label.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">Informacion</h3>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
                    data-testid={`link-info-${link.label.toLowerCase().replace(/ /g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-white/40">Contacto</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <a
                  href="https://wa.me/5215545327249"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 flex-shrink-0 text-[hsl(99,30%,55%)]" />
                  <span>WhatsApp: 55 4532 7249</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary/70" />
                <span>contacto@zahal.com.mx</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary/70" />
                <span>55 4532 7249</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 flex-shrink-0 text-primary/70" />
                <span>Ciudad de Mexico, Mexico</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-white/8 py-6">
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/60">
            Powered by JABVLabs
          </p>
          <p className="text-xs text-white/40">
            &copy; 2026 Zahal Productos Naturales. Todos los derechos reservados.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-white/40">
            <Link href="/privacidad" className="cursor-pointer transition-colors hover:text-white/70">
              Privacidad
            </Link>
            <Link href="/terminos" className="cursor-pointer transition-colors hover:text-white/70">
              Terminos
            </Link>
            <button
              type="button"
              onClick={() => openCookieConsent(true)}
              className="cursor-pointer transition-colors hover:text-white/70"
              data-testid="button-footer-cookie-settings"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
