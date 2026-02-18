import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, ArrowRight } from "lucide-react";
import alumbreNatural from "@assets/image_16_1771348502523.png";

const benefits = [
  "Sin clorhidrato de aluminio",
  "Sin parabenos ni alcohol", 
  "Vegano",
  "No mancha la ropa ni la piel"
];

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-10 lg:py-14 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">Nuestra Esencia</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif">
              Piedra de Alumbre
            </h2>
            <h3 className="text-xl text-primary/70 mb-6 font-medium italic font-serif">De Origen Natural</h3>
            <p className="text-muted-foreground text-base mb-8 leading-relaxed">
              La piedra de alumbre es un mineral natural que ha sido utilizado durante siglos 
              como desodorante. Su composición única permite una protección efectiva y suave, 
              sin los químicos agresivos de los desodorantes convencionales.
            </p>
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-foreground">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
            <Link href="/nosotros">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                data-testid="button-learn-more"
              >
                Conoce Más
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl -z-10"></div>
            <img 
              src={alumbreNatural} 
              alt="Piedra de Alumbre Natural Zahal" 
              className="w-full h-auto rounded-2xl shadow-lg" 
            />
            <div className="absolute -bottom-5 -left-5 bg-primary rounded-xl p-5 shadow-xl">
              <div className="text-center text-white">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm opacity-90">Natural</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
