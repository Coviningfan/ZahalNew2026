import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import { Shield, Database, Cookie, CreditCard, UserCheck, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-privacy-policy">
      <SEO
        title="Política de Privacidad"
        description="Conoce cómo protegemos tus datos personales en Zahal."
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
                Política de Privacidad
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Zahal®, es una marca licenciada a Markvel S.A de C.V.
                <br /><br />
                Respetamos y protegemos la privacidad de nuestros usuarios. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.
              </p>
              <p className="text-muted-foreground text-sm">
                Última actualización: Febrero 2026
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
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Información que Recopilamos</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Recopilamos información personal que nos proporcionas voluntariamente al realizar una compra,
                    registrarte en nuestro boletín o ponerte en contacto con nosotros. Esta información puede incluir:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Nombre completo y datos de contacto (correo electrónico, teléfono)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Dirección de envío para la entrega de productos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Información de navegación y uso del sitio web</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Información técnica como dirección IP, tipo de navegador y dispositivo</span>
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
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Uso de la Información</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Utilizamos tu información personal para los siguientes fines:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Procesar y gestionar tus pedidos y envíos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Comunicarnos contigo sobre el estado de tus compras</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Enviarte información sobre productos, ofertas y novedades (si has dado tu consentimiento)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Mejorar nuestro sitio web y la experiencia de compra</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Cumplir con obligaciones legales y fiscales aplicables en México</span>
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
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Cookies y Tecnologías Similares</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Nuestro sitio web utiliza cookies y tecnologías similares para mejorar tu experiencia de navegación.
                    Las cookies nos permiten:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Recordar tus preferencias y el contenido de tu carrito de compras</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Analizar el tráfico y uso del sitio para mejorar nuestros servicios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Garantizar la seguridad y el correcto funcionamiento del sitio</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Puedes configurar tu navegador para rechazar cookies, aunque esto podría afectar la funcionalidad del sitio.
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
                    Stripe cumple con los estándares PCI DSS (Payment Card Industry Data Security Standard)
                    y maneja directamente tu información financiera.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Zahal no almacena datos de tarjetas de crédito o débito en sus servidores.
                    Toda la información de pago es procesada directamente por Stripe bajo sus propias
                    políticas de privacidad y seguridad.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    No vendemos, alquilamos ni compartimos tu información personal con terceros
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
                    De acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los
                    Particulares (LFPDPPP), tienes derecho a:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span><strong>Acceso:</strong> Conocer qué datos personales tenemos sobre ti</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span><strong>Rectificación:</strong> Solicitar la corrección de tus datos si son inexactos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span><strong>Cancelación:</strong> Pedir la eliminación de tus datos de nuestros registros</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span><strong>Oposición:</strong> Oponerte al tratamiento de tus datos para fines específicos</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Para ejercer cualquiera de estos derechos, envía tu solicitud a nuestro correo electrónico
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
                    Si tienes preguntas, comentarios o solicitudes relacionadas con esta Política de Privacidad
                    o el tratamiento de tus datos personales, puedes contactarnos a través de:
                  </p>
                  <div className="bg-white rounded-xl p-6 border border-border/40">
                    <p className="text-foreground font-semibold mb-2">Zahal Contacto</p>
                    <p className="text-muted-foreground text-sm mb-1">
                      Correo electrónico: <a href="mailto:contacto@zahal.com.mx" className="text-primary hover:underline" data-testid="link-privacy-email">contacto@zahal.com.mx</a>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Ciudad de México, México
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mt-6 text-sm">
                    Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento.
                    Los cambios serán publicados en esta página con la fecha de actualización correspondiente.
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
