import { Leaf, Shield, Shirt, Recycle } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Piedra de alumbre pura, sin químicos agresivos ni parabenos"
  },
  {
    icon: Shield,
    title: "Protección 24hrs",
    description: "Frescura antibacterial natural que dura todo el día"
  },
  {
    icon: Shirt,
    title: "No Mancha",
    description: "Cuida tu ropa y tu piel sin dejar residuos"
  },
  {
    icon: Recycle,
    title: "Eco-Friendly",
    description: "Empaque sostenible y biodegradable, libre de crueldad"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group" data-testid={`feature-${index}`}>
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1.5">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
