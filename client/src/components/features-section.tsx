import { Leaf, Shield, Shirt, Recycle } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Natural",
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
    description: "Cuida tu ropa y tu piel sin dejar residuos ni manchas"
  },
  {
    icon: Recycle,
    title: "Eco-Friendly",
    description: "Empaque sostenible y biodegradable, libre de crueldad"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-14 lg:py-16 bg-white border-b border-border/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group" data-testid={`feature-${index}`}>
                <div className="w-14 h-14 bg-primary/8 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-all duration-300">
                  <Icon className="h-6 w-6 text-primary transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1 uppercase tracking-wide">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
