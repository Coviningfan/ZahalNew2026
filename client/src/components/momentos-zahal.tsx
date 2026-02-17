import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Star, ChevronLeft, ChevronRight, Quote, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "unisex",
    title: "Unisex",
    description: "Para toda la familia",
    image: "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_12_d3f065e2-e2ed-47ce-b2d5-3e90a108f64a.jpg?v=1729194975&width=800",
    featuredProduct: {
      id: "zahal-desodorante-natural-stik-120-g",
      name: "Stick Natural 120g",
      description: "Nuestra pieza estrella. Piedra de alumbre pura en formato stick de 120g. Protección total por 24 horas. Sin manchas, sin olor, sin químicos.",
      price: "$275",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/Imagenes_Pagina_Web_1.png?v=1753731242"
    }
  },
  {
    id: "sport",
    title: "Sport",
    description: "Protección intensa",
    image: "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_15_39055246-6ec5-49ef-87a0-7e1de3b85b9a.jpg?v=1730323398&width=800",
    featuredProduct: {
      id: "zahal-desodorante-natural-roll-on-sport-con-carbon-activado-90-ml",
      name: "Roll On Sport 90ml",
      description: "Diseñado para el movimiento. Con carbón activado y aloe vera para una absorción y frescura superior durante el ejercicio intenso.",
      price: "$120",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/22_ff2e0357-efb6-461e-afc0-46f05cc19f51.png?v=1753751451"
    }
  },
  {
    id: "travel",
    title: "Travel",
    description: "Tamaño perfecto",
    image: "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_13_959e9a9d-14fb-4d0b-bf05-9df00ec8fe20.jpg?v=1729194974&width=800",
    featuredProduct: {
      id: "eco-traveler-kit-de-viaje-natural-desodorantes-limpiador-de-manos-jabon",
      name: "Kit Eco Viajero",
      description: "Todo lo que necesitas en tu maleta. Incluye mini desodorantes, jabón y limpiador. Cumple con normativas de aeropuerto y es 100% biodegradable.",
      price: "$150",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/ZAHAL_momento_2.jpg?v=1753740213"
    }
  },
  {
    id: "teens",
    title: "Teens",
    description: "Suave y efectivo",
    image: "https://5b32c9-07.myshopify.com/cdn/shop/files/ZAHAL_Shopify_14.jpg?v=1729193010&width=800",
    featuredProduct: {
      id: "zahal-desodorante-natural-roll-on-teens-con-aroma-30-ml",
      name: "Roll On Teens con Aroma 30ml",
      description: "La introducción perfecta al cuidado natural. Aroma fresco y fórmula ultra suave para pieles jóvenes en desarrollo.",
      price: "$66",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/24.png?v=1753740898"
    }
  },
];

interface Momento {
  name: string;
  location: string;
  text: string;
  rating: number;
  avatar: string;
  timeAgo: string;
  relatedProduct: {
    id: string;
    name: string;
    price: string;
    image: string;
  };
}

const momentos: Momento[] = [
  {
    name: "Mariana G.",
    location: "CDMX",
    text: "Llevaba años buscando algo que no me irritara la piel después de depilarme. Con ZAHAL puedo aplicarlo al instante, sin ardor. Mi esposo también se cambió y ya van 8 meses sin volver a lo convencional.",
    rating: 5,
    avatar: "MG",
    timeAgo: "hace 2 semanas",
    relatedProduct: {
      id: "zahal-desodorante-natural-stik-120-g",
      name: "Stick Natural 120g",
      price: "$275",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/ZAHAL_Shopify_3_299bbd31-41a7-48db-84b3-6d1dd4b99721.jpg?v=1729192268&width=200"
    }
  },
  {
    name: "Roberto L.",
    location: "Monterrey",
    text: "Trabajo en obra y sudaba mucho. Me daba pena el olor. Un compa me recomendó ZAHAL y la neta no mancha mis camisas y aguanta todo el turno. Ya no me preocupo.",
    rating: 5,
    avatar: "RL",
    timeAgo: "hace 1 mes",
    relatedProduct: {
      id: "zahal-desodorante-natural-roll-on-men-90-ml",
      name: "Roll On For Men 90ml",
      price: "$115",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/18_b12bb71f-34f5-474a-b9dc-9bd50802f32c_533x.png?v=1753750893"
    }
  },
  {
    name: "Sofía T.",
    location: "Guadalajara",
    text: "Lo uso después del gym y me encanta la sensación de frescura. No tiene olor artificial, simplemente te deja limpia. Mis amigas ya me preguntan qué uso y les paso el dato.",
    rating: 5,
    avatar: "ST",
    timeAgo: "hace 3 semanas",
    relatedProduct: {
      id: "zahal-desodorante-corporal-natural-en-spray-240-ml",
      name: "Spray Corporal 240ml",
      price: "$131",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/ZAHAL_Shopify_17_0cf49831-3460-4132-9add-19bbeb41a922_1100x.jpg?v=1753817454"
    }
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? "fill-primary text-primary" : "text-border"}`}
        />
      ))}
    </div>
  );
}

function MomentoCard({ momento, index, onNavigate }: { momento: Momento; index: number; onNavigate: (path: string) => void }) {
  return (
    <article
      className="bg-white rounded-2xl border border-border/40 p-6 flex flex-col justify-between h-full hover:shadow-md transition-shadow duration-300 min-w-0"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <Quote className="h-6 w-6 text-primary/20" />
          <StarRating rating={momento.rating} />
        </div>
        <p className="text-foreground/85 text-sm leading-relaxed mb-5">
          "{momento.text}"
        </p>
      </div>

      <div
        className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border/30 mb-4 cursor-pointer hover:border-primary/30 transition-colors duration-200 group"
        onClick={() => onNavigate(`/productos/${momento.relatedProduct.id}`)}
      >
        <img
          src={momento.relatedProduct.image}
          alt={momento.relatedProduct.name}
          className="w-12 h-12 rounded-lg object-cover shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-foreground truncate">{momento.relatedProduct.name}</p>
          <p className="text-sm font-bold text-primary">{momento.relatedProduct.price} MXN</p>
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-border/30">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
          {momento.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{momento.name}</p>
          <p className="text-xs text-muted-foreground truncate">{momento.location}</p>
        </div>
        <span className="text-[11px] text-muted-foreground/70 ml-auto whitespace-nowrap shrink-0">
          {momento.timeAgo}
        </span>
      </div>
    </article>
  );
}

export default function MomentosZahal() {
  const [, setLocation] = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);

  const navigateTo = (path: string) => {
    const overlay = document.createElement("div");
    overlay.style.cssText = "position:fixed;inset:0;background:hsl(80 20% 98%);opacity:0;z-index:9999;transition:opacity 150ms ease;pointer-events:none;";
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

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) setCardsPerPage(1);
      else if (window.innerWidth < 1024) setCardsPerPage(2);
      else setCardsPerPage(3);
    };
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(momentos.length / cardsPerPage);

  const next = useCallback(() => {
    setCurrentPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const prev = useCallback(() => {
    setCurrentPage((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const visibleMomentos = momentos.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  return (
    <section className="py-16 lg:py-24 bg-card linen-texture overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">
            Elige tu momento
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif">
            Momentos ZAHAL
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Una opción natural que se adapta a tu estilo de vida
          </p>
        </div>

        <div className="relative mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className={`group cursor-pointer text-left transition-all duration-300 ${
                  selectedCategory && selectedCategory.id !== category.id ? "opacity-40 grayscale" : ""
                }`}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-400 transform hover:-translate-y-1">
                  <img
                    src={category.image}
                    alt={`${category.title} lifestyle`}
                    className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-bold text-white mb-0.5 tracking-wide">{category.title}</h3>
                    <p className="text-white/75 text-sm">{category.description}</p>
                  </div>
                  {selectedCategory?.id === category.id && (
                    <div className="absolute top-4 right-4 bg-primary text-white p-1 rounded-full">
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Expanded Product View */}
          <div 
            className={`mt-8 overflow-hidden transition-all duration-500 ease-in-out ${
              selectedCategory ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {selectedCategory && (
              <div className="bg-white rounded-3xl p-8 lg:p-12 border border-primary/10 shadow-xl relative overflow-hidden">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted transition-colors z-10"
                >
                  <X className="h-6 w-6 text-muted-foreground" />
                </button>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="relative order-2 lg:order-1">
                    <div className="absolute -inset-4 bg-primary/5 rounded-full blur-3xl"></div>
                    <img 
                      src={selectedCategory.featuredProduct.image} 
                      alt={selectedCategory.featuredProduct.name}
                      className="relative w-full max-w-sm mx-auto h-auto rounded-2xl drop-shadow-2xl"
                    />
                  </div>
                  
                  <div className="order-1 lg:order-2">
                    <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">
                      Recomendado para momento {selectedCategory.title}
                    </p>
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 font-serif">
                      {selectedCategory.featuredProduct.name}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {selectedCategory.featuredProduct.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-6 mb-10">
                      <div className="text-3xl font-bold text-primary">
                        {selectedCategory.featuredProduct.price} <span className="text-lg font-normal text-muted-foreground">MXN</span>
                      </div>
                      <div className="flex gap-1">
                        <StarRating rating={5} />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        size="lg" 
                        className="bg-primary hover:bg-primary/90 text-white font-semibold h-13 px-8 gap-2"
                        onClick={() => navigateTo(`/productos/${selectedCategory.featuredProduct.id}`)}
                      >
                        Ver Detalles
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="border-primary/20 hover:bg-primary/5 text-primary font-semibold h-13 px-8"
                        onClick={() => setSelectedCategory(null)}
                      >
                        Cerrar Momentos
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-5xl mx-auto pt-8">
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-sm font-medium">
              Lo que dicen quienes ya hicieron el cambio
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleMomentos.map((momento, i) => (
              <MomentoCard
                key={currentPage * cardsPerPage + i}
                momento={momento}
                index={currentPage * cardsPerPage + i}
                onNavigate={navigateTo}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-200"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentPage
                      ? "w-6 bg-primary"
                      : "w-2 bg-border hover:bg-primary/40"
                  }`}
                  aria-label={`Página ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-200"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
