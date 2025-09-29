import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const benefits = [
  "Sin clorhidrato de aluminio",
  "Sin parabenos ni alcohol", 
  "pH neutro y vegano",
  "No mancha la ropa ni la piel"
];

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Piedra de Alumbre
            </h2>
            <h3 className="text-2xl text-primary mb-6">De Origen Natural</h3>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              La piedra de alumbre es un mineral natural que ha sido utilizado durante siglos 
              como desodorante. Su composición única permite una protección efectiva y suave, 
              sin los químicos agresivos de los desodorantes convencionales.
            </p>
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              data-testid="button-learn-more"
            >
              Conoce Más
            </Button>
          </div>

          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Natural alum stone crystal with botanical elements" 
              className="w-full h-auto rounded-2xl shadow-2xl" 
            />
            <div className="absolute -bottom-6 -left-6 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Natural</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
