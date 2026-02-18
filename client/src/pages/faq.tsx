import { useState } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSection {
  title: string;
  icon: string;
  items: FAQItem[];
}

const faqSections: FAQSection[] = [
  {
    title: "Compra y disponibilidad",
    icon: "🛒",
    items: [
      {
        question: "¿Dónde puedo comprar productos ZAHAL?",
        answer: <span>Consulta todos nuestros puntos de venta en la página <a href="/donde-encontrarnos" className="text-primary font-semibold underline underline-offset-2 hover:text-primary/80 transition-colors">Dónde Encontrarnos</a>.</span>
      }
    ]
  },
  {
    title: "Sobre los productos ZAHAL",
    icon: "🌿",
    items: [
      {
        question: "¿De qué están hechos los productos ZAHAL?",
        answer: "Están hechos a base de piedra de alumbre, un mineral 100% natural que se extrae directamente de la tierra. No usamos químicos agresivos ni ingredientes raros: lo natural funciona mejor."
      },
      {
        question: "¿Qué es la piedra de alumbre?",
        answer: "Es un mineral natural que ayuda a evitar el mal olor sin bloquear el sudor. Su molécula es más grande que el poro de la piel, por eso no se absorbe ni entra al cuerpo."
      },
      {
        question: "¿De dónde sale la piedra de alumbre?",
        answer: "Se encuentra en yacimientos naturales alrededor del mundo. En ZAHAL usamos alumbre puro, sin químicos añadidos."
      },
      {
        question: "¿Para qué sirve la piedra de alumbre?",
        answer: "Sirve como desodorante natural: elimina bacterias, controla el mal olor, reduce la sudoración y deja la piel fresca todo el día. ¡Sin irritaciones ni residuos!"
      },
      {
        question: "¿Dónde puedo usar el desodorante?",
        answer: "No solo en las axilas. También puedes aplicarlo en manos, pies, espalda, pecho, cara e ingles. Es seguro y efectivo para todo el cuerpo."
      }
    ]
  },
  {
    title: "¿Qué NO tienen los productos ZAHAL?",
    icon: "🚫",
    items: [
      {
        question: "¿Por qué ZAHAL no usa parabenos?",
        answer: "Porque son conservadores sintéticos que pueden alterar el equilibrio natural del cuerpo. Se han relacionado con problemas hormonales y, en algunos estudios, hasta con cáncer de mama. Por eso, preferimos lo natural."
      },
      {
        question: "¿Qué es el clorhidrato de aluminio?",
        answer: "Es un químico que usan muchos antitranspirantes para tapar los poros y evitar que sudes. Se han encontrado residuos de este compuesto en tejidos mamarios. En ZAHAL no usamos este ingrediente."
      },
      {
        question: "¿ZAHAL es seguro para personas con cáncer?",
        answer: "Sí. Por no contener clorhidrato de aluminio ni parabenos, es una opción segura durante tratamientos como quimioterapias o mastografías."
      }
    ]
  },
  {
    title: "Beneficios de usar ZAHAL",
    icon: "💚",
    items: [
      {
        question: "¿Qué beneficios tiene usar los desodorantes ZAHAL?",
        answer: "Evita el mal olor sin tapar los poros, es suave con la piel (incluso sensible), no mancha la ropa y respeta el equilibrio natural del cuerpo."
      },
      {
        question: "¿ZAHAL ayuda a purificar el cuerpo?",
        answer: "Sí. Al no bloquear los poros, tu cuerpo puede eliminar toxinas naturalmente a través del sudor. Así, el hígado y los riñones no tienen que trabajar de más."
      },
      {
        question: "¿Qué diferencia hay entre un desodorante y un antitranspirante?",
        answer: "Los antitranspirantes bloquean el sudor, lo cual impide que el cuerpo libere toxinas. El desodorante ZAHAL deja que tu cuerpo respire y elimina las bacterias que causan mal olor."
      }
    ]
  },
  {
    title: "Aplicación y duración",
    icon: "🧴",
    items: [
      {
        question: "¿Cómo se usa el desodorante en piedra o en stick?",
        answer: "Solo humedece la piedra con un poco de agua y frótala suavemente sobre la piel limpia."
      },
      {
        question: "¿Cómo aplicar el spray recargable?",
        answer: "Aplica directamente en la zona deseada. Si se tapa, enjuaga el dispensador con agua tibia y presiona unas cuantas veces para destaparlo."
      },
      {
        question: "¿En qué partes del cuerpo puedo usar el spray?",
        answer: "En axilas, pecho, espalda y pies. Es fresco y cómodo de usar."
      },
      {
        question: "¿Cuánto dura la protección?",
        answer: "Hasta 24 horas de frescura natural."
      }
    ]
  },
  {
    title: "Duración de cada producto",
    icon: "⏳",
    items: [
      {
        question: "¿Cuánto dura cada producto ZAHAL?",
        answer: "Stick 120g: hasta 4 años. Stick 60g en corcho: alrededor de 2 años. Roll-on: como un desodorante convencional, unos 2 meses. Spray Eco3: puedes rellenarlo hasta 3 veces. ¡Después de eso, reutiliza el envase para otra cosa útil!"
      }
    ]
  },
  {
    title: "Efecto y adaptación",
    icon: "🧪",
    items: [
      {
        question: "¿Cuánto tiempo tarda en hacer efecto?",
        answer: "Normalmente entre 2 y 3 días. Si haces mucho ejercicio o comes mucha carne roja, podría tardar un poco más."
      },
      {
        question: "¿Quita el mal olor?",
        answer: "Sí. Elimina el mal olor tanto en la piel como en la ropa."
      },
      {
        question: "¿Por qué sudamos y a qué se debe el mal olor?",
        answer: "Sudamos para regular la temperatura y eliminar toxinas. El sudor en sí no huele mal, pero cuando se mezcla con bacterias en la piel, aparece el mal olor. ZAHAL controla las bacterias sin tapar los poros."
      }
    ]
  }
];

// Plain-text Q&A pairs for FAQPage JSON-LD structured data
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "¿Dónde puedo comprar productos ZAHAL?", acceptedAnswer: { "@type": "Answer", text: "Consulta todos nuestros puntos de venta en la sección Dónde Encontrarnos de nuestro sitio web." } },
    { "@type": "Question", name: "¿De qué están hechos los productos ZAHAL?", acceptedAnswer: { "@type": "Answer", text: "Están hechos a base de piedra de alumbre, un mineral 100% natural que se extrae directamente de la tierra. No usamos químicos agresivos ni ingredientes raros: lo natural funciona mejor." } },
    { "@type": "Question", name: "¿Qué es la piedra de alumbre?", acceptedAnswer: { "@type": "Answer", text: "Es un mineral natural que ayuda a evitar el mal olor sin bloquear el sudor. Su molécula es más grande que el poro de la piel, por eso no se absorbe ni entra al cuerpo." } },
    { "@type": "Question", name: "¿De dónde sale la piedra de alumbre?", acceptedAnswer: { "@type": "Answer", text: "Se encuentra en yacimientos naturales alrededor del mundo. En ZAHAL usamos alumbre puro, sin químicos añadidos." } },
    { "@type": "Question", name: "¿Para qué sirve la piedra de alumbre?", acceptedAnswer: { "@type": "Answer", text: "Sirve como desodorante natural: elimina bacterias, controla el mal olor, reduce la sudoración y deja la piel fresca todo el día. Sin irritaciones ni residuos." } },
    { "@type": "Question", name: "¿Dónde puedo usar el desodorante?", acceptedAnswer: { "@type": "Answer", text: "No solo en las axilas. También puedes aplicarlo en manos, pies, espalda, pecho, cara e ingles. Es seguro y efectivo para todo el cuerpo." } },
    { "@type": "Question", name: "¿Por qué ZAHAL no usa parabenos?", acceptedAnswer: { "@type": "Answer", text: "Porque son conservadores sintéticos que pueden alterar el equilibrio natural del cuerpo. Se han relacionado con problemas hormonales y, en algunos estudios, hasta con cáncer de mama. Por eso, preferimos lo natural." } },
    { "@type": "Question", name: "¿Qué es el clorhidrato de aluminio?", acceptedAnswer: { "@type": "Answer", text: "Es un químico que usan muchos antitranspirantes para tapar los poros y evitar que sudes. Se han encontrado residuos de este compuesto en tejidos mamarios. En ZAHAL no usamos este ingrediente." } },
    { "@type": "Question", name: "¿ZAHAL es seguro para personas con cáncer?", acceptedAnswer: { "@type": "Answer", text: "Sí. Por no contener clorhidrato de aluminio ni parabenos, es una opción segura durante tratamientos como quimioterapias o mastografías." } },
    { "@type": "Question", name: "¿Qué beneficios tiene usar los desodorantes ZAHAL?", acceptedAnswer: { "@type": "Answer", text: "Evita el mal olor sin tapar los poros, es suave con la piel incluso sensible, no mancha la ropa y respeta el equilibrio natural del cuerpo." } },
    { "@type": "Question", name: "¿ZAHAL ayuda a purificar el cuerpo?", acceptedAnswer: { "@type": "Answer", text: "Sí. Al no bloquear los poros, tu cuerpo puede eliminar toxinas naturalmente a través del sudor. Así, el hígado y los riñones no tienen que trabajar de más." } },
    { "@type": "Question", name: "¿Qué diferencia hay entre un desodorante y un antitranspirante?", acceptedAnswer: { "@type": "Answer", text: "Los antitranspirantes bloquean el sudor, lo cual impide que el cuerpo libere toxinas. El desodorante ZAHAL deja que tu cuerpo respire y elimina las bacterias que causan mal olor." } },
    { "@type": "Question", name: "¿Cómo se usa el desodorante en piedra o en stick?", acceptedAnswer: { "@type": "Answer", text: "Solo humedece la piedra con un poco de agua y frótala suavemente sobre la piel limpia." } },
    { "@type": "Question", name: "¿Cómo aplicar el spray recargable?", acceptedAnswer: { "@type": "Answer", text: "Aplica directamente en la zona deseada. Si se tapa, enjuaga el dispensador con agua tibia y presiona unas cuantas veces para destaparlo." } },
    { "@type": "Question", name: "¿En qué partes del cuerpo puedo usar el spray?", acceptedAnswer: { "@type": "Answer", text: "En axilas, pecho, espalda y pies. Es fresco y cómodo de usar." } },
    { "@type": "Question", name: "¿Cuánto dura la protección?", acceptedAnswer: { "@type": "Answer", text: "Hasta 24 horas de frescura natural." } },
    { "@type": "Question", name: "¿Cuánto dura cada producto ZAHAL?", acceptedAnswer: { "@type": "Answer", text: "Stick 120g: hasta 4 años. Stick 60g en corcho: alrededor de 2 años. Roll-on: como un desodorante convencional, unos 2 meses. Spray Eco3: puedes rellenarlo hasta 3 veces." } },
    { "@type": "Question", name: "¿Cuánto tiempo tarda en hacer efecto?", acceptedAnswer: { "@type": "Answer", text: "Normalmente entre 2 y 3 días. Si haces mucho ejercicio o comes mucha carne roja, podría tardar un poco más." } },
    { "@type": "Question", name: "¿Quita el mal olor?", acceptedAnswer: { "@type": "Answer", text: "Sí. Elimina el mal olor tanto en la piel como en la ropa." } },
    { "@type": "Question", name: "¿Por qué sudamos y a qué se debe el mal olor?", acceptedAnswer: { "@type": "Answer", text: "Sudamos para regular la temperatura y eliminar toxinas. El sudor en sí no huele mal, pero cuando se mezcla con bacterias en la piel, aparece el mal olor. ZAHAL controla las bacterias sin tapar los poros." } },
  ],
};

function FAQAccordion({ item, index }: { item: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-border/40 last:border-0" data-testid={`faq-item-${index}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left hover:text-primary transition-colors duration-200"
        data-testid={`button-faq-${index}`}
      >
        <span className="text-base font-medium text-foreground pr-4">{item.question}</span>
        <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <div className="text-muted-foreground text-sm leading-relaxed">{item.answer}</div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Preguntas Frecuentes"
        description="Resuelve tus dudas sobre desodorantes naturales de piedra de alumbre Zahal."
        path="/preguntas-frecuentes"
        jsonLd={faqJsonLd}
      />
      <Navigation />
      
      <main id="main-content" className="pt-20">
        <section className="relative py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://cdn.shopify.com/s/files/1/0622/1004/8065/articles/ZAHAL_Shopify_17_0cf49831-3460-4132-9add-19bbeb41a922_1100x.jpg?v=1753817454" 
              alt="Desodorantes naturales ZAHAL" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/92 to-primary/75"></div>
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-2xl">
              <p className="text-white/60 font-semibold text-sm tracking-wider uppercase mb-4">Ayuda</p>
              <h1 className="text-3xl lg:text-5xl font-bold text-white mb-5 font-serif leading-tight" data-testid="text-faq-title">
                Preguntas Frecuentes
              </h1>
              <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                Todo lo que necesitas saber sobre los desodorantes naturales de piedra de alumbre ZAHAL.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-10">
              {faqSections.map((section, sectionIndex) => (
                <div key={sectionIndex} data-testid={`faq-section-${sectionIndex}`}>
                  <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3 font-serif">
                    <span className="text-xl">{section.icon}</span>
                    {section.title}
                  </h2>
                  <div className="bg-card rounded-2xl border border-border/40 px-6">
                    {section.items.map((item, itemIndex) => (
                      <FAQAccordion key={itemIndex} item={item} index={sectionIndex * 10 + itemIndex} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
