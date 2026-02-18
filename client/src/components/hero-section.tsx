import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Leaf, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";


const slides = [
  {
    badge: "Productos naturales",
    title: (
      <>
        Cuida tu piel,{" "}
        <span className="italic text-[hsl(99,30%,80%)]">respeta</span>{" "}
        tu cuerpo
      </>
    ),
    description:
      "Desodorantes de piedra de alumbre: protección natural que dura 24 horas, sin químicos que dañen tu piel ni tu ropa.",
    cta: { label: "Ver Productos", href: "/productos" },
    ctaSecondary: { label: "Nuestra Historia", href: "/nosotros" },
    bgImage:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080",
  },
  {
    badge: "100% Natural",
    title: (
      <>
        Piedra de alumbre{" "}
        <span className="italic text-[hsl(99,30%,80%)]">auténtica</span>
      </>
    ),
    description:
      "Mineral volcánico con propiedades antibacteriales. Sin parabenos, sin alcohol, sin aluminio procesado.",
    cta: { label: "Explorar Catálogo", href: "/productos" },
    ctaSecondary: { label: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
    bgImage:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
  },
  {
    badge: "Hecho en México",
    title: (
      <>
        Protección que{" "}
        <span className="italic text-[hsl(99,30%,80%)]">dura</span>{" "}
        todo el día
      </>
    ),
    description:
      "Hasta 24 horas de frescura sin irritar tu piel. Ideal para pieles sensibles y para toda la familia.",
    cta: { label: "Comprar Ahora", href: "/productos" },
    ctaSecondary: { label: "Contáctanos", href: "/contacto" },
    bgImage:
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
  },
];

const AUTOPLAY_INTERVAL = 6000;

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateTo = (path: string) => {
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;background:hsl(99 20% 98%);opacity:0;z-index:9999;transition:opacity 150ms ease;pointer-events:none;";
    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.opacity = "1"; });
    setTimeout(() => {
      window.scrollTo(0, 0);
      setLocation(path);
      setTimeout(() => {
        overlay.style.opacity = "0";
        overlay.addEventListener("transitionend", () => overlay.remove());
      }, 50);
    }, 150);
  };

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section id="inicio" className="relative min-h-[75vh] lg:min-h-[80vh] flex items-center overflow-hidden" data-testid="hero-carousel">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.bgImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>
      ))}

      <div className="absolute inset-0 z-[1] opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div key={current} className="animate-carousel-fade">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md text-white/90 border border-white/15 rounded-full mb-8 text-sm font-medium tracking-wide" data-testid="badge-natural">
              <Leaf className="h-4 w-4 mr-2 text-[hsl(99,30%,65%)]" />
              {slide.badge}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 font-serif text-balance">
              {slide.title}
            </h1>
            <p className="text-lg lg:text-xl text-white/85 mb-10 leading-relaxed max-w-lg">
              {slide.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg shadow-black/10 gap-2 h-14 px-8 text-base"
                onClick={() => navigateTo(slide.cta.href)}
                data-testid="button-shop-now"
              >
                {slide.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 font-semibold h-14 px-8 text-base"
                onClick={() => navigateTo(slide.ctaSecondary.href)}
                data-testid="button-view-catalog"
              >
                {slide.ctaSecondary.label}
              </Button>
              <Link href="/productos" className="group flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-full transition-all ml-0 sm:ml-2" data-testid="link-hero-catalog">
                <span className="text-sm font-semibold text-white/90 tracking-wide border-b border-white/30 group-hover:border-white transition-all">Elige tu favorito</span>
                <ArrowRight className="h-3.5 w-3.5 text-white/70 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            {/* Espacio reservado para balance visual */}
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        data-testid="button-carousel-prev"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        data-testid="button-carousel-next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-8 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
            }`}
            data-testid={`button-slide-${i}`}
          />
        ))}
      </div>
    </section>
  );
}
