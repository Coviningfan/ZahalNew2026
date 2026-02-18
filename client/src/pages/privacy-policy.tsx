import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import { Shield, Database, Cookie, CreditCard, UserCheck, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-privacy-policy">
      <SEO
        title="Pol\u00edtica de Privacidad"
        description="Conoce c\u00f3mo protegemos tus datos personales en Zahal."
        path="/privacidad"
        noindex
      />
      <Navigation />

      <main id="main-content" className="pt-20">
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-4">Legal</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-serif leading-tight" data-testid="text-privacy-title">
                Pol\u00edtica de Privacidad
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Zahal\u00ae, es una marca licenciada a Markvel S.A de C.V.
                <br /><br />
                Respetamos y protegemos la privacidad de nuestros usuarios. Esta pol\u00edtica describe c\u00f3mo recopilamos, usamos y protegemos tu informaci\u00f3n personal.
              </p>
              <p className="text-muted-foreground text-sm">
                \u00daltima actualizaci\u00f3n: Febrero 2026
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-card linen-texture">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-16">

              <div className="flex gap-6" data-testid="section-data-collection">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Informaci\u00f3n que Recopilamos</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Recopilamos informaci\u00f3n personal que nos proporcionas voluntariamente al realizar una compra,
                    registrarte en nuestro bolet\u00edn o ponerte en contacto con nosotros. Esta informaci\u00f3n puede incluir:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Nombre completo y datos de contacto (correo electr\u00f3nico, tel\u00e9fono)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Direcci\u00f3n de env\u00edo para la entrega de productos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Informaci\u00f3n de navegaci\u00f3n y uso del sitio web</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Informaci\u00f3n t\u00e9cnica como direcci\u00f3n IP, tipo de navegador y dispositivo</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-data-use">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Uso de la Informaci\u00f3n</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Utilizamos tu informaci\u00f3n personal para los siguientes fines:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Procesar y gestionar tus pedidos y env\u00edos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Comunicarnos contigo sobre el estado de tus compras</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Enviarte informaci\u00f3n sobre productos, ofertas y novedades (si has dado tu consentimiento)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Mejorar nuestro sitio web y la experiencia de compra</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Cumplir con obligaciones legales y fiscales aplicables en M\u00e9xico</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-cookies">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <Cookie className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Cookies y Tecnolog\u00edas Similares</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Nuestro sitio web utiliza cookies y tecnolog\u00edas similares para mejorar tu experiencia de navegaci\u00f3n.
                    Las cookies nos permiten:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Recordar tus preferencias y el contenido de tu carrito de compras</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Analizar el tr\u00e1fico y uso del sitio para mejorar nuestros servicios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Garantizar la seguridad y el correcto funcionamiento del sitio</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Puedes configurar tu navegador para rechazar cookies, aunque esto podr\u00eda afectar la funcionalidad del sitio.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-third-parties">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Terceros y Procesamiento de Pagos</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Para procesar tus pagos de manera segura, utilizamos Stripe como procesador de pagos.
                    Stripe cumple con los est\u00e1ndares PCI DSS (Payment Card Industry Data Security Standard)
                    y maneja directamente tu informaci\u00f3n financiera.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Zahal no almacena datos de tarjetas de cr\u00e9dito o d\u00e9bito en sus servidores.
                    Toda la informaci\u00f3n de pago es procesada directamente por Stripe bajo sus propias
                    pol\u00edticas de privacidad y seguridad.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    No vendemos, alquilamos ni compartimos tu informaci\u00f3n personal con terceros
                    para fines de marketing sin tu consentimiento expreso.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-user-rights">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Tus Derechos ARCO</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    De acuerdo con la Ley Federal de Protecci\u00f3n de Datos Personales en Posesi\u00f3n de los
                    Particulares (LFPDPPP), tienes derecho a:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span><strong>Acceso:</strong> Conocer qu\u00e9 datos personales tenemos sobre ti</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span><strong>Rectificaci\u00f3n:</strong> Solicitar la correcci\u00f3n de tus datos si son inexactos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span><strong>Cancelaci\u00f3n:</strong> Pedir la eliminaci\u00f3n de tus datos de nuestros registros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span><strong>Oposici\u00f3n:</strong> Oponerte al tratamiento de tus datos para fines espec\u00edficos</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Para ejercer cualquiera de estos derechos, env\u00eda tu solicitud a nuestro correo electr\u00f3nico
                    indicando tu nombre completo y el derecho que deseas ejercer.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-contact">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Contacto</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Si tienes preguntas, comentarios o solicitudes relacionadas con esta Pol\u00edtica de Privacidad
                    o el tratamiento de tus datos personales, puedes contactarnos a trav\u00e9s de:
                  </p>
                  <div className="bg-white rounded-xl p-6 border border-border/40">
                    <p className="text-foreground font-semibold mb-2">Zahal Contacto</p>
                    <p className="text-muted-foreground text-sm mb-1">
                      Correo electr\u00f3nico: <a href="mailto:contacto@zahal.com.mx" className="text-primary hover:underline" data-testid="link-privacy-email">contacto@zahal.com.mx</a>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Ciudad de M\u00e9xico, M\u00e9xico
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mt-6 text-sm">
                    Nos reservamos el derecho de actualizar esta Pol\u00edtica de Privacidad en cualquier momento.
                    Los cambios ser\u00e1n publicados en esta p\u00e1gina con la fecha de actualizaci\u00f3n correspondiente.
                  </p>
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
