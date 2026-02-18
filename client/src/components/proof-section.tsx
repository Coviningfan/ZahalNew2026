import { CheckCircle2, Droplets, Shirt, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const highlights = [
  "Sin Clorhidrato de aluminio, alcohol ni fragancias sintéticas agresivas",
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

          <div className="grid gap-5">
            {proofStats.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.label}
                  className="bg-white rounded-2xl border border-primary/10 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] p-6 flex items-center gap-5 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.12)] transition-all duration-500 group"
                  data-testid="proof-stat"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/[0.03] border border-primary/5 flex items-center justify-center shrink-0 group-hover:bg-primary/5 transition-colors duration-500">
                    <Icon className="h-7 w-7 text-primary/80 group-hover:text-primary transition-colors duration-500" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="text-3xl font-bold text-foreground tracking-tight leading-none">{item.value}</div>
                    <p className="text-[13px] font-medium text-muted-foreground/80 uppercase tracking-widest leading-tight">{item.label}</p>
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
