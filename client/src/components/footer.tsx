import { Link } from "wouter";
import { Facebook, Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import zahalLogo from "@assets/Zahal Verde - No fondo_1759182945567.png";

const productLinks = [
  { href: "https://5b32c9-07.myshopify.com/collections/unisex", label: "Unisex", external: true },
  { href: "https://5b32c9-07.myshopify.com/collections/sport", label: "Sport", external: true },
  { href: "https://5b32c9-07.myshopify.com/collections/tamano-viaje", label: "Travel", external: true },
  { href: "https://5b32c9-07.myshopify.com/collections/teens", label: "Teens", external: true },
];

const infoLinks = [
  { href: "#sobre-nosotros", label: "Sobre Nosotros" },
  { href: "#contacto", label: "Contacto" },
  { href: "#envios", label: "Envíos" },
  { href: "#devoluciones", label: "Devoluciones" },
];

export default function Footer() {
  return (
    <footer id="contacto" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <img 
                src={zahalLogo} 
                alt="Zahal Natural" 
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-background/80 mb-4">
              Cuidado natural para tu piel con la pureza de la piedra de alumbre.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/CristalZahal" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors duration-200"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5 text-background" />
              </a>
              <a 
                href="https://www.instagram.com/zahal_mexico/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors duration-200"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5 text-background" />
              </a>
              <a 
                href="https://www.tiktok.com/@zahaloficial?_t=ZM-8xt99kGDh7F&_r=1" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors duration-200"
                data-testid="link-tiktok"
              >
                <SiTiktok className="h-5 w-5 text-background" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Productos</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a 
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-background/80 hover:text-background transition-colors duration-200"
                      data-testid={`link-product-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link 
                      href={link.href} 
                      className="text-background/80 hover:text-background transition-colors duration-200"
                      data-testid={`link-product-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Información</h3>
            <ul className="space-y-2">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-background/80 hover:text-background transition-colors duration-200"
                    data-testid={`link-info-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-background/80">
              <li className="flex items-center">
                <span className="mr-2">✉</span>
                <span>info@zahal.com.mx</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>+52 55 1234 5678</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📍</span>
                <span>México, CDMX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-background/60">
            &copy; 2024 Zahal. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
