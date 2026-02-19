import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import { Globe, Shield, CreditCard, UserCheck, Truck, Tag, Copyright, RotateCcw, HelpCircle, Mail } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-terms">
      <SEO
        title="Términos y Condiciones"
        description="Términos y condiciones de uso, políticas de envío, devoluciones y preguntas frecuentes de Zahal."
        path="/terminos"
        noindex
      />
      <Navigation />

      <main id="main-content" className="pt-20">
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-4">Legal</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-serif leading-tight" data-testid="text-terms-title">
                Términos y Condiciones
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Es muy importante que lea los siguientes términos y condiciones antes de hacer alguna compra en nuestra tienda.
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

              <div className="flex gap-6" data-testid="section-uso-sitio">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Uso del Sitio</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Es muy importante que lea los siguientes términos y condiciones antes de hacer alguna compra en nuestra tienda. Usando el sitio www.zahal.com.mx el cliente conviene y acepta estos términos de uso. El uso del sitio www.zahal.com.mx, el cual otorga acceso a productos de cuidado personal, está sujetos a los términos y condiciones de este acuerdo. www.zahal.com.mx se reserva el derecho de cambiar, modificar, agregar o de quitar porciones de estos términos y condiciones de uso, en cualquier momento. Los cambios en los términos de uso serán efectivos cuando se publiquen en el sitio.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-general">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">General</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Zahal® marca licenciada a Markvel s.a de c.v no será responsable por cualquier daño resultante del uso de este sitio, incluyendo, de forma no limitativa: daños directos, indirectos, incidentales, comerciales, punitivos y daños consecuentes de cualquier clase.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Zahal® marca licenciada a Markvel s.a de c.v se reserva el derecho a cancelar la cuenta y el servicio a clientes que hagan mal uso o intenten efectuar un acto ilícito.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-registro-cargos">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Registro y Cargos</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Al realizar el registro para uso del servicio de Zahal® marca licenciada a Markvel s.a de c.v, no se realiza ningún cargo a la Tarjeta de Crédito o Débito del Cliente. Para registrarse en la plataforma, únicamente se solicita un nombre de usuario y un correo electrónico; es responsabilidad del cliente mantener en secreto la información de su cuenta privada, incluyendo su contraseña, para toda la actividad que ocurra en su cuenta. Usted deberá notificar inmediatamente a Zahal® marca licenciada a Markvel s.a de c.v cualquier uso no autorizado de su cuenta.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Mediante el registro en Zahal® marca licenciada a Markvel s.a de c.v, el cliente acepta los precios publicados en el sitio. Es obligación del cliente mantenerse informado de los precios actuales, los cuales estarán siempre publicados en la página correspondiente del sitio. Los cargos en la tarjeta de crédito o débito del cliente se realizarán al momento de finalizar la compra, donde se le solicitará ingresar sus datos personales para la entrega de los productos comprados.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Zahal® marca licenciada a Markvel s.a de c.v nunca solicitará el número de Tarjeta de Crédito o Débito por correo electrónico u otro medio; la información proporcionada es confidencial, por lo que no podrá ser difundida ni transmitida, salvo por autorización del consumidor o requerimiento de la autoridad.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-obligaciones">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Obligaciones de Zahal</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Zahal® marca licenciada a Markvel s.a de c.v se compromete a que los precios del servicio que publica en su sitio son los correctos y cobrará de acuerdo a los mismos. Además, se compromete a observar las prácticas de privacidad y seguridad especificados en esta página.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-envios">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Envíos y Entregas</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    La operación de las entregas de los productos en México y otros países se realiza con nuestros Aliados Estratégicos. Problemas en la entrega, retrasos, daños, pérdidas o robo son responsabilidad del operador del envío.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Tarifa de envío: La tarifa de envío se calcula con base en el código postal destino. Tarifa estándar $99, cubre códigos postales dentro de zonas de cobertura.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    El envío de los productos se hará a través de paquetería o mensajería privada a su domicilio y/o alguna oficina de dicha paquetería o mensajería. El tiempo de entrega será de al menos 15 días hábiles después de haber procesado la orden. La orden será procesada en un máximo tres días hábiles, siempre y cuando se cumpla con toda la información requerida y el producto no haya sufrido alguna baja por causas ajenas a Zahal® marca licenciada a Markvel s.a de c.v.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    En el caso de envíos internacionales, si se tienen gastos aduanales y/o de impuestos, estos correrán por cuenta del cliente y es su responsabilidad presentar cualquier documento solicitado por la autoridad; si el pedido es regresado a nuestras instalaciones por cuestiones de regulaciones se le reembolsará al cliente únicamente la cantidad pagada por los productos y no se reembolsará el envío.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Los horarios de entrega son abiertos y debe de haber alguna persona para recibir el paquete, de no ser así es responsabilidad del cliente comunicarse a la paquetería y acordar la entrega.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Existe la posibilidad de que los pedidos no puedan ser entregados en ciertas zonas directamente al domicilio por cuestiones de operación de las paqueterías; dado el caso, el pedido será entregado a ocurre y el cliente deberá pasar a recogerlo directamente a la sucursal.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-precios">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Precios y Existencias</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    www.zahal.com.mx se reserva el derecho de cambiar los precios de los productos y/o servicios publicados en el sitio. Todos nuestros productos se cobrarán en pesos mexicanos; los precios en sus monedas se encuentran sujetos a la compra y venta de divisas que tenga su entidad bancaria. Zahal® marca licenciada a Markvel s.a de c.v no tiene control en el tipo de cambio que aplique su banco. www.zahal.com.mx se reserva el derecho a publicar precios erróneos por error de impresión, y, dado el caso, se publicará la corrección del precio lo antes posible. Los precios pueden variar debido al mercado. Todos los productos, ofertas y/o servicios que aparecen publicados estarán sujetos a existencias y así será manifestado al momento de la compra.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-marcas">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <Copyright className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Marcas y Derechos</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Las marcas registradas y todos los nombres de productos y servicios, slogans y gráficos contenidos en este sitio pertenecen a Zahal® marca licenciada a Markvel s.a de c.v y sus proveedores. Estas marcas no podrán ser copiadas, imitadas o usadas parcial o totalmente sin la previa autorización de Zahal® marca licenciada a Markvel s.a de c.v.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Todo el material del sitio de www.zahal.com.mx, incluyendo texto, diseños, gráficos o archivos, pertenecen exclusivamente a Zahal® marca licenciada a Markvel s.a de c.v y está prohibida la reproducción total o parcial de cualquiera de estos materiales.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-devoluciones">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <RotateCcw className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Políticas de Devolución</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    En cumplimiento con lo establecido en la Ley Federal del Consumidor y su Reglamento, Zahal® marca licenciada a Markvel s.a de c.v Tienda Oficial, acepta cambios en la mercancía exclusivamente por compras realizadas en www.zahal.com.mx, siempre que no se hubiese alterado el producto por parte del consumidor y contra la entrega del producto adquirido. En los casos en los que el producto llegase dañado, se debe notificar inmediatamente a Zahal® marca licenciada a Markvel s.a de c.v para realizar el proceso de cambio.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    La devolución deberá efectuarse dentro de un plazo máximo de 07 (siete) días después de recibido el producto. Para lo anterior, usted deberá dirigir un correo electrónico a <a href="mailto:pedidos@zahal.com.mx" className="text-primary hover:underline" data-testid="link-terms-pedidos-email">pedidos@zahal.com.mx</a> solicitando la devolución y una breve explicación del motivo por el cual desea una devolución, o llamar al teléfono <a href="tel:5545327249" className="text-primary hover:underline" data-testid="link-terms-pedidos-phone">55 45 32 72 49</a>. Usted (consumidor) tendrá la obligación de devolver el producto en las mismas condiciones en las que lo recibió y sin haberlo utilizado.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    En el caso de que la devolución sea por un motivo ajeno a Zahal® marca licenciada a Markvel s.a de c.v, los costos del flete y seguro correrán a cargo de usted (el consumidor). Si el producto se encontrase dañado al momento de la recepción, Zahal® marca licenciada a Markvel s.a de c.v correrá con los costos de flete y seguro para la reposición del producto.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-2 font-semibold">
                    No se aceptan devoluciones en los siguientes casos:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Productos en rebaja o con descuentos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Producto usado o abierto</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Empaque o producto no originales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Empaque con etiquetas no originales o violadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">&bull;</span>
                      <span>Producto rayado, con golpes, sucio o maltratado por causas del cliente</span>
                    </li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed">
                    Zahal® marca licenciada a Markvel s.a de c.v Tienda Oficial deberá satisfacer la reclamación en un plazo que no excederá de quince días contados a partir de dicha reclamación. Zahal® marca licenciada a Markvel s.a de c.v Tienda Oficial podrá negarse a satisfacer la reclamación si ésta es extemporanea, cuando el producto haya sido usado en condiciones distintas a las recomendadas o propias de su naturaleza o destino o si ha sufrido un deterioro esencial, irreparable y grave por causas imputables al consumidor.
                  </p>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-faq">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Preguntas Frecuentes</h2>
                  <div className="space-y-6">
                    <div>
                      <p className="text-foreground font-semibold mb-2">¿Es seguro comprar en nuestra Tienda Oficial?</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Comprar es completamente seguro, ya que manejamos cifrado SSL de 256 bits que protege tus datos personales, así como los de tus tarjetas bancarias.
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">¿Puedo confiar en que los productos son originales?</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Sí, absolutamente todos, justo este espacio es pensado en ustedes, para que siempre cuenten con los productos originales a los precios que manejamos.
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">¿Cómo puedo rastrear mi pedido?</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Una vez procesado tu pedido, recibirás un número de guía por correo electrónico para rastrear tu envío. Si tienes dudas, comunícate al teléfono <a href="tel:5545327249" className="text-primary hover:underline" data-testid="link-terms-tracking-phone">5545327249</a>.
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">¿Qué hago si mi producto llega dañado?</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Notifica inmediatamente a Zahal® para iniciar el proceso de cambio. Comunícate al teléfono <a href="tel:5545327249" className="text-primary hover:underline" data-testid="link-terms-damaged-phone">5545327249</a> o envía un correo a <a href="mailto:pedidos@zahal.com.mx" className="text-primary hover:underline" data-testid="link-terms-damaged-email">pedidos@zahal.com.mx</a>.
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">Facturación</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Solicita tu factura enviando: número de pedido, nombre o razón social, RFC, código postal, uso CFDI, forma de pago, régimen fiscal, teléfono, email, constancia de situación fiscal al correo <a href="mailto:contacto@zahal.com.mx" className="text-primary hover:underline" data-testid="link-terms-facturacion-email">contacto@zahal.com.mx</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6" data-testid="section-contacto">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Contacto</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Si tienes preguntas o comentarios sobre estos Términos y Condiciones, puedes contactarnos a través de:
                  </p>
                  <div className="bg-white rounded-xl p-6 border border-border/40">
                    <p className="text-foreground font-semibold mb-2">Zahal Contacto</p>
                    <p className="text-muted-foreground text-sm mb-1">
                      Correo electrónico: <a href="mailto:contacto@zahal.com.mx" className="text-primary hover:underline" data-testid="link-terms-email">contacto@zahal.com.mx</a>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Teléfono: <a href="tel:5545327249" className="text-primary hover:underline" data-testid="link-terms-phone">5545327249</a>
                    </p>
                  </div>
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
