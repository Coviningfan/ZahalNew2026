import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Leaf, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import banner1 from "@assets/BANNER_Febrero_2_1771433657500.png";
import banner2 from "@assets/BANNER_Febrero_1771433657501.png";
import banner3 from "@assets/Banners_enature_1771436433184.png";
import enatureLogo from "@assets/LOGO-ENATURE_340x_1771436603136.avif";
import zahalLogo from "@assets/Zahal Verde - No fondo_1759182945567.png";


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
    mobileTitle: (
      <>
        Cuida tu piel,{" "}
        <span className="italic text-[hsl(99,30%,80%)]">respeta</span>{" "}
        tu cuerpo
      </>
    ),
    description:
      "Desodorantes de piedra de alumbre: protección natural que dura 24 horas, sin químicos que dañen tu piel ni tu ropa.",
    mobileDescription: "Protección natural 24h sin químicos.",
    cta: { label: "Ver Productos", href: "/productos" },
    ctaSecondary: { label: "Nuestra Historia", href: "/nosotros" },
    bgImage: banner1,
  },
  {
    badge: "100% Natural",
    title: (
      <>
        Piedra de alumbre{" "}
        <span className="italic text-[hsl(99,30%,80%)]">auténtica</span>
      </>
    ),
    mobileTitle: (
      <>
        Piedra de alumbre{" "}
        <span className="italic text-[hsl(99,30%,80%)]">auténtica</span>
      </>
    ),
    description:
      "Mineral volcánico con propiedades antibacteriales. Sin parabenos, sin alcohol, sin aluminio procesado.",
    mobileDescription: "Mineral volcánico antibacterial. Sin parabenos ni alcohol.",
    cta: { label: "Explorar Catálogo", href: "/productos" },
    ctaSecondary: { label: "Preguntas Frecuentes", href: "/preguntas-frecuentes" },
    bgImage: banner2,
  },
  {
    badge: "Zahal x eNature",
    title: (
      <>
        Bienestar que acompaña{" "}
        <span className="italic text-[hsl(99,30%,80%)]">cada momento</span>{" "}
        de tu rutina.
      </>
    ),
    mobileTitle: (
      <>
        Bienestar en{" "}
        <span className="italic text-[hsl(99,30%,80%)]">cada momento</span>
      </>
    ),
    description: "",
    mobileDescription: "",
    cta: { label: "Visita eNature", href: "https://enature.com.mx/" },
    ctaSecondary: null,
    bgImage: banner3,
    alignRight: true,
    showLogos: true,
    hideBadge: true,
  },
];

const AUTOPLAY_INTERVAL = 8500;

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
    <>
      {/* ===== MOBILE HERO (< 640px) ===== */}
      <section className="sm:hidden bg-background" data-testid="hero-carousel-mobile">
        <div className="relative w-full overflow-hidden">
          {slides.map((s, i) => (
            <div
              key={i}
              className="transition-opacity duration-700 ease-in-out"
              style={{
                opacity: i === current ? 1 : 0,
                position: i === 0 ? "relative" : "absolute",
                top: 0,
                left: 0,
                width: "100%",
              }}
            >
              <img
                src={s.bgImage}
                alt=""
                className="w-full h-auto block"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 py-4 bg-background">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            data-testid="button-carousel-prev-mobile"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? "w-3 h-3 bg-primary"
                  : "w-3 h-3 bg-border hover:bg-muted-foreground"
              }`}
              data-testid={`button-slide-mobile-${i}`}
            />
          ))}
          <button
            onClick={next}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            data-testid="button-carousel-next-mobile"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* ===== DESKTOP HERO (>= 640px) ===== */}
      <section id="inicio" className="relative min-h-[75vh] lg:min-h-[80vh] hidden sm:flex items-center overflow-hidden" data-testid="hero-carousel">
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

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {slide.alignRight && (
              <div className="hidden lg:block" />
            )}
            <div key={current} className={`animate-carousel-fade ${slide.alignRight ? "lg:text-right lg:ml-auto" : ""}`}>
              {!slide.hideBadge && (
                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md text-white/90 border border-white/15 rounded-full mb-8 text-sm font-medium tracking-wide" data-testid="badge-natural">
                  <Leaf className="h-4 w-4 mr-2 text-[hsl(99,30%,65%)]" />
                  {slide.badge}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6 font-serif text-balance">
                {slide.title}
              </h1>
              {slide.description && (
                <p className="text-lg lg:text-xl text-white/85 mb-10 leading-relaxed max-w-lg">
                  {slide.description}
                </p>
              )}
              <div className={`flex flex-row gap-4 items-center ${slide.alignRight ? "justify-end" : ""}`}>
                {slide.alignRight ? (
                  <a
                    href={slide.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-full transition-all"
                    data-testid="link-visita-enature"
                  >
                    <span className="text-sm font-semibold text-white/90 tracking-wide border-b border-white/30 group-hover:border-white transition-all">{slide.cta.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-white/70 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg shadow-black/10 gap-2 h-14 px-8 text-base"
                      onClick={() => navigateTo(slide.cta.href)}
                      data-testid="button-shop-now"
                    >
                      {slide.cta.label}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                    {slide.ctaSecondary && (
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 font-semibold h-14 px-8 text-base"
                        onClick={() => slide.ctaSecondary && navigateTo(slide.ctaSecondary.href)}
                        data-testid="button-view-catalog"
                      >
                        {slide.ctaSecondary?.label}
                      </Button>
                    )}
                    <Link href="/productos" className="group flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-full transition-all ml-2" data-testid="link-hero-catalog">
                      <span className="text-sm font-semibold text-white/90 tracking-wide border-b border-white/30 group-hover:border-white transition-all">Elige tu favorito</span>
                      <ArrowRight className="h-3.5 w-3.5 text-white/70 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </>
                )}
              </div>
            </div>

            {!slide.alignRight && (
              <div className="hidden lg:block" />
            )}
          </div>
        </div>

        {slide.showLogos && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
            <img src={zahalLogo} alt="Zahal" className="h-12 md:h-16 w-auto object-contain brightness-0 invert" />
            <span className="text-white/80 text-2xl font-bold">×</span>
            <img src={enatureLogo} alt="eNature" className="h-12 md:h-16 w-auto object-contain" />
          </div>
        )}

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
    </>
  );
}
