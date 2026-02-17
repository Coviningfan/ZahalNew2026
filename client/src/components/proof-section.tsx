import { CheckCircle2, Droplets, Shirt, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const highlights = [
  "Sin aluminio clorohidratado, alcohol ni fragancias sintéticas agresivas",
  "Apto para piel sensible y para uso diario después del afeitado",
  "No deja residuos blancos ni manchas amarillas en la ropa",
];

const proofStats = [
  {
    icon: ShieldCheck,
    value: "24h",
    label: "protección antibacteriana natural",
  },
  {
    icon: Droplets,
    value: "0%",
    label: "alcohol y parabenos",
  },
  {
    icon: Shirt,
    value: "100%",
    label: "libre de manchas en ropa",
  },
];

export default function ProofSection() {
  const [, setLocation] = useLocation();

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-primary/5 to-background linen-texture">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary uppercase mb-3">
              ¿Por qué cambiarte a ZAHAL?
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4 font-serif">
              Menos químicos, más tranquilidad en tu rutina diaria
            </h2>
            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
              Diseñamos nuestros desodorantes con piedra de alumbre para que te sientas
              protegido sin comprometer la salud de tu piel ni arriesgar tu ropa.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3" data-testid="proof-highlight">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/90">{item}</span>
                </li>
              ))}
            </ul>

            <Button
              className="bg-primary hover:bg-primary/90 text-white gap-2"
              onClick={() => setLocation("/productos")}
              data-testid="button-proof-shop"
            >
              Quiero probarlo
            </Button>
          </div>

          <div className="grid gap-4">
            {proofStats.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.label}
                  className="bg-white rounded-2xl border border-primary/10 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow duration-300"
                  data-testid="proof-stat"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{item.value}</div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
