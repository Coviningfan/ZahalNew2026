import { Leaf, Shield, Shirt, Recycle } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Sin químicos agresivos ni parabenos"
  },
  {
    icon: Shield,
    title: "Protección Duradera",
    description: "24 horas de frescura natural"
  },
  {
    icon: Shirt,
    title: "No Mancha",
    description: "Cuida tu ropa y tu piel"
  },
  {
    icon: Recycle,
    title: "Eco-Friendly",
    description: "Empaque sostenible y biodegradable"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            ¿Por qué elegir Zahal?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nuestros productos están formulados con la pureza de la naturaleza
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-200">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
