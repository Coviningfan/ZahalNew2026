import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import { Globe, Shield, CreditCard, UserCheck, Truck, Tag, Copyright, RotateCcw, HelpCircle, Mail } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-terms">
      <SEO
        title="T\u00e9rminos y Condiciones"
        description="T\u00e9rminos y condiciones de uso, pol\u00edticas de env\u00edo, devoluciones y preguntas frecuentes de Zahal."
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
                T\u00e9rminos y Condiciones
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Es muy importante que lea los siguientes t\u00e9rminos y condiciones antes de hacer alguna compra en nuestra tienda.
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

              <div className="flex gap-6" data-testid="section-uso-sitio">
                <div className="flex-shrink-0 hidden md:block">
                  <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Uso del Sitio</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Es muy importante que lea los siguientes t\u00e9rminos y condiciones antes de hacer alguna compra en nuestra tienda. Usando el sitio www.zahal.com.mx el cliente conviene y acepta estos t\u00e9rminos de uso. El uso del sitio www.zahal.com.mx, el cual otorga acceso a productos de cuidado personal, est\u00e1 sujetos a los t\u00e9rminos y condiciones de este acuerdo. www.zahal.com.mx se reserva el derecho de cambiar, modificar, agregar o de quitar porciones de estos t\u00e9rminos y condiciones de uso, en cualquier momento. Los cambios en los t\u00e9rminos de uso ser\u00e1n efectivos cuando se publiquen en el sitio.
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
                    Zahal\u00ae marca licenciada a Markvel s.a de c.v no ser\u00e1 responsable por cualquier da\u00f1o resultante del uso de este sitio, incluyendo, de forma no limitativa: da\u00f1os directos, indirectos, incidentales, comerciales, punitivos y da\u00f1os consecuentes de cualquier clase.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Zahal\u00ae marca licenciada a Markvel s.a de c.v se reserva el derecho a cancelar la cuenta y el servicio a clientes que hagan mal uso o intenten efectuar un acto il\u00edcito.
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
                    Al realizar el registro para uso del servicio de Zahal\u00ae marca licenciada a Markvel s.a de c.v, no se realiza ning\u00fan cargo a la Tarjeta de Cr\u00e9dito o D\u00e9bito del Cliente. Para registrarse en la plataforma, \u00fanicamente se solicita un nombre de usuario y un correo electr\u00f3nico; es responsabilidad del cliente mantener en secreto la informaci\u00f3n de su cuenta privada, incluyendo su contrase\u00f1a, para toda la actividad que ocurra en su cuenta. Usted deber\u00e1 notificar inmediatamente a Zahal\u00ae marca licenciada a Markvel s.a de c.v cualquier uso no autorizado de su cuenta.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Mediante el registro en Zahal\u00ae marca licenciada a Markvel s.a de c.v, el cliente acepta los precios publicados en el sitio. Es obligaci\u00f3n del cliente mantenerse informado de los precios actuales, los cuales estar\u00e1n siempre publicados en la p\u00e1gina correspondiente del sitio. Los cargos en la tarjeta de cr\u00e9dito o d\u00e9bito del cliente se realizar\u00e1n al momento de finalizar la compra, donde se le solicitar\u00e1 ingresar sus datos personales para la entrega de los productos comprados.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Zahal\u00ae marca licenciada a Markvel s.a de c.v nunca solicitar\u00e1 el n\u00famero de Tarjeta de Cr\u00e9dito o D\u00e9bito por correo electr\u00f3nico u otro medio; la informaci\u00f3n proporcionada es confidencial, por lo que no podr\u00e1 ser difundida ni transmitida, salvo por autorizaci\u00f3n del consumidor o requerimiento de la autoridad.
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
                    Zahal\u00ae marca licenciada a Markvel s.a de c.v se compromete a que los precios del servicio que publica en su sitio son los correctos y cobrar\u00e1 de acuerdo a los mismos. Adem\u00e1s, se compromete a observar las pr\u00e1cticas de privacidad y seguridad especificados en esta p\u00e1gina.
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
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Env\u00edos y Entregas</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    La operaci\u00f3n de las entregas de los productos en M\u00e9xico y otros pa\u00edses se realiza con nuestros Aliados Estrat\u00e9gicos. Problemas en la entrega, retrasos, da\u00f1os, p\u00e9rdidas o robo son responsabilidad del operador del env\u00edo.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Tarifa de env\u00edo: La tarifa de env\u00edo se calcula con base en el c\u00f3digo postal destino. Tarifa est\u00e1ndar $99, cubre c\u00f3digos postales dentro de zonas de cobertura.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    El env\u00edo de los productos se har\u00e1 a trav\u00e9s de paqueter\u00eda o mensajer\u00eda privada a su domicilio y/o alguna oficina de dicha paqueter\u00eda o mensajer\u00eda. El tiempo de entrega ser\u00e1 de al menos 15 d\u00edas h\u00e1biles despu\u00e9s de haber procesado la orden. La orden ser\u00e1 procesada en un m\u00e1ximo tres d\u00edas h\u00e1biles, siempre y cuando se cumpla con toda la informaci\u00f3n requerida y el producto no haya sufrido alguna baja por causas ajenas a Zahal\u00ae marca licenciada a Markvel s.a de c.v.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    En el caso de env\u00edos internacionales, si se tienen gastos aduanales y/o de impuestos, estos correr\u00e1n por cuenta del cliente y es su responsabilidad presentar cualquier documento solicitado por la autoridad; si el pedido es regresado a nuestras instalaciones por cuestiones de regulaciones se le reembolsar\u00e1 al cliente \u00fanicamente la cantidad pagada por los productos y no se reembolsar\u00e1 el env\u00edo.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Los horarios de entrega son abiertos y debe de haber alguna persona para recibir el paquete, de no ser as\u00ed es responsabilidad del cliente comunicarse a la paqueter\u00eda y acordar la entrega.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Existe la posibilidad de que los pedidos no puedan ser entregados en ciertas zonas directamente al domicilio por cuestiones de operaci\u00f3n de las paqueter\u00edas; dado el caso, el pedido ser\u00e1 entregado a ocurre y el cliente deber\u00e1 pasar a recogerlo directamente a la sucursal.
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
                    www.zahal.com.mx se reserva el derecho de cambiar los precios de los productos y/o servicios publicados en el sitio. Todos nuestros productos se cobrar\u00e1n en pesos mexicanos; los precios en sus monedas se encuentran sujetos a la compra y venta de divisas que tenga su entidad bancaria. Zahal\u00ae marca licenciada a Markvel s.a de c.v no tiene control en el tipo de cambio que aplique su banco. www.zahal.com.mx se reserva el derecho a publicar precios err\u00f3neos por error de impresi\u00f3n, y, dado el caso, se publicar\u00e1 la correcci\u00f3n del precio lo antes posible. Los precios pueden variar debido al mercado. Todos los productos, ofertas y/o servicios que aparecen publicados estar\u00e1n sujetos a existencias y as\u00ed ser\u00e1 manifestado al momento de la compra.
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
                    Las marcas registradas y todos los nombres de productos y servicios, slogans y gr\u00e1ficos contenidos en este sitio pertenecen a Zahal\u00ae marca licenciada a Markvel s.a de c.v y sus proveedores. Estas marcas no podr\u00e1n ser copiadas, imitadas o usadas parcial o totalmente sin la previa autorizaci\u00f3n de Zahal\u00ae marca licenciada a Markvel s.a de c.v.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Todo el material del sitio de www.zahal.com.mx, incluyendo texto, dise\u00f1os, gr\u00e1ficos o archivos, pertenecen exclusivamente a Zahal\u00ae marca licenciada a Markvel s.a de c.v y est\u00e1 prohibida la reproducci\u00f3n total o parcial de cualquiera de estos materiales.
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
                  <h2 className="text-2xl font-bold text-foreground mb-4 font-serif">Pol\u00edticas de Devoluci\u00f3n</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    En cumplimiento con lo establecido en la Ley Federal del Consumidor y su Reglamento, Zahal\u00ae marca licenciada a Markvel s.a de c.v Tienda Oficial, acepta cambios en la mercanc\u00eda exclusivamente por compras realizadas en www.zahal.com.mx, siempre que no se hubiese alterado el producto por parte del consumidor y contra la entrega del producto adquirido. En los casos en los que el producto llegase da\u00f1ado, se debe notificar inmediatamente a Zahal\u00ae marca licenciada a Markvel s.a de c.v para realizar el proceso de cambio.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    La devoluci\u00f3n deber\u00e1 efectuarse dentro de un plazo m\u00e1ximo de 07 (siete) d\u00edas despu\u00e9s de recibido el producto. Para lo anterior, usted deber\u00e1 dirigir un correo electr\u00f3nico a <a href="mailto:pedidos@zahal.com.mx" className="text-primary hover:underline" data-testid="link-terms-pedidos-email">pedidos@zahal.com.mx</a> solicitando la devoluci\u00f3n y una breve explicaci\u00f3n del motivo por el cual desea una devoluci\u00f3n, o llamar al tel\u00e9fono <a href="tel:5545327249" className="text-primary hover:underline" data-testid="link-terms-pedidos-phone">55 45 32 72 49</a>. Usted (consumidor) tendr\u00e1 la obligaci\u00f3n de devolver el producto en las mismas condiciones en las que lo recibi\u00f3 y sin haberlo utilizado.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    En el caso de que la devoluci\u00f3n sea por un motivo ajeno a Zahal\u00ae marca licenciada a Markvel s.a de c.v, los costos del flete y seguro correr\u00e1n a cargo de usted (el consumidor). Si el producto se encontrase da\u00f1ado al momento de la recepci\u00f3n, Zahal\u00ae marca licenciada a Markvel s.a de c.v correr\u00e1 con los costos de flete y seguro para la reposici\u00f3n del producto.
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
                    Zahal\u00ae marca licenciada a Markvel s.a de c.v Tienda Oficial deber\u00e1 satisfacer la reclamaci\u00f3n en un plazo que no exceder\u00e1 de quince d\u00edas contados a partir de dicha reclamaci\u00f3n. Zahal\u00ae marca licenciada a Markvel s.a de c.v Tienda Oficial podr\u00e1 negarse a satisfacer la reclamaci\u00f3n si \u00e9sta es extemporanea, cuando el producto haya sido usado en condiciones distintas a las recomendadas o propias de su naturaleza o destino o si ha sufrido un deterioro esencial, irreparable y grave por causas imputables al consumidor.
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
                      <p className="text-foreground font-semibold mb-2">\u00bfEs seguro comprar en nuestra Tienda Oficial?</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Comprar es completamente seguro, ya que manejamos cifrado SSL de 256 bits que protege tus datos personales, as\u00ed como los de tus tarjetas bancarias.
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">\u00bfPuedo confiar en que los productos son originales?</p>
                      <p className="text-muted-foreground leading-relaxed">
                        S\u00ed, absolutamente todos, justo este espacio es pensado en ustedes, para que siempre cuenten con los productos originales a los precios que manejamos.
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">\u00bfC\u00f3mo puedo rastrear mi pedido?</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Una vez procesado tu pedido, recibir\u00e1s un n\u00famero de gu\u00eda por correo electr\u00f3nico para rastrear tu env\u00edo. Si tienes dudas, comun\u00edcate al tel\u00e9fono <a href="tel:5545327249" className="text-primary hover:underline" data-testid="link-terms-tracking-phone">5545327249</a>.
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">\u00bfQu\u00e9 hago si mi producto llega da\u00f1ado?</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Notifica inmediatamente a Zahal\u00ae para iniciar el proceso de cambio. Comun\u00edcate al tel\u00e9fono <a href="tel:5545327249" className="text-primary hover:underline" data-testid="link-terms-damaged-phone">5545327249</a> o env\u00eda un correo a <a href="mailto:pedidos@zahal.com.mx" className="text-primary hover:underline" data-testid="link-terms-damaged-email">pedidos@zahal.com.mx</a>.
                      </p>
                    </div>
                    <div>
                      <p className="text-foreground font-semibold mb-2">Facturaci\u00f3n</p>
                      <p className="text-muted-foreground leading-relaxed">
                        Solicita tu factura enviando: n\u00famero de pedido, nombre o raz\u00f3n social, RFC, c\u00f3digo postal, uso CFDI, forma de pago, r\u00e9gimen fiscal, tel\u00e9fono, email, constancia de situaci\u00f3n fiscal al correo <a href="mailto:contacto@zahal.com.mx" className="text-primary hover:underline" data-testid="link-terms-facturacion-email">contacto@zahal.com.mx</a>.
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
                    Si tienes preguntas o comentarios sobre estos T\u00e9rminos y Condiciones, puedes contactarnos a trav\u00e9s de:
                  </p>
                  <div className="bg-white rounded-xl p-6 border border-border/40">
                    <p className="text-foreground font-semibold mb-2">Zahal Contacto</p>
                    <p className="text-muted-foreground text-sm mb-1">
                      Correo electr\u00f3nico: <a href="mailto:contacto@zahal.com.mx" className="text-primary hover:underline" data-testid="link-terms-email">contacto@zahal.com.mx</a>
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Tel\u00e9fono: <a href="tel:5545327249" className="text-primary hover:underline" data-testid="link-terms-phone">5545327249</a>
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
