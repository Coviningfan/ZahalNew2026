import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Star, ChevronLeft, ChevronRight, Quote, ArrowRight } from "lucide-react";

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
  {
    name: "Ana P.",
    location: "Puebla",
    text: "Se lo compré a mi hija de 14 años. Al principio no quería porque decía que los naturales no funcionan. A la semana me pidió que le comprara otro para dejar en la escuela.",
    rating: 5,
    avatar: "AP",
    timeAgo: "hace 1 semana",
    relatedProduct: {
      id: "zahal-desodorante-natural-roll-on-teens-con-aroma-30-ml",
      name: "Roll On Teens con Aroma 30ml",
      price: "$66",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/ZAHAL_Shopify_14.jpg?v=1729193010&width=200"
    }
  },
  {
    name: "Carlos M.",
    location: "Querétaro",
    text: "Viajo mucho por trabajo y el kit es perfecto. Cabe en cualquier maleta, no se derrama y me dura semanas. Ya no cargo botes enormes. Práctico y efectivo.",
    rating: 5,
    avatar: "CM",
    timeAgo: "hace 2 meses",
    relatedProduct: {
      id: "eco-traveler-kit-de-viaje-natural-desodorantes-limpiador-de-manos-jabon",
      name: "Kit Eco Viajero",
      price: "$150",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/ZAHAL_Shopify_13_959e9a9d-14fb-4d0b-bf05-9df00ec8fe20.jpg?v=1729194974&width=200"
    }
  },
  {
    name: "Valentina R.",
    location: "Mérida",
    text: "Con el calor de acá pensé que nada natural iba a funcionar. Me equivoqué completamente. El stick para las mañanas y el spray para refrescarme en la tarde. Combinación ganadora.",
    rating: 5,
    avatar: "VR",
    timeAgo: "hace 3 semanas",
    relatedProduct: {
      id: "zahal-blister-duo-de-desodorante-natural-mini-stick-60-g-spray-corporal-15ml",
      name: "Pack Dúo Stick + Spray",
      price: "$130",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/ZAHAL_Shopify_1.jpg?v=1729191478&width=200"
    }
  },
  {
    name: "Diego H.",
    location: "León",
    text: "Corro maratones y el Sport es mi aliado. Antes terminaba con irritación horrible. Ahora nada de nada. Mis compañeros de equipo ya están cambiándose también.",
    rating: 5,
    avatar: "DH",
    timeAgo: "hace 1 mes",
    relatedProduct: {
      id: "zahal-desodorante-natural-roll-on-sport-con-carbon-activado-90-ml",
      name: "Roll On Sport 90ml",
      price: "$120",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/22_ff2e0357-efb6-461e-afc0-46f05cc19f51_533x.png?v=1753751451"
    }
  },
  {
    name: "Lucía F.",
    location: "Oaxaca",
    text: "Empecé con el chiquito para probar. Al tercer día ya estaba convencida. Ahora tengo uno en la bolsa, otro en el baño y otro en la oficina. Es adictivo lo bien que funciona.",
    rating: 5,
    avatar: "LF",
    timeAgo: "hace 2 semanas",
    relatedProduct: {
      id: "desodorante-corporal-de-piedra-de-alumbre-sales-naturales-en-spray-240-ml-copia",
      name: "Desodorante Spray 15ml",
      price: "$45",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/ZAHAL_Shopify_12_d3f065e2-e2ed-47ce-b2d5-3e90a108f64a.jpg?v=1729194975&width=200"
    }
  },
  {
    name: "Patricia N.",
    location: "Tijuana",
    text: "Después de mi mastografía el doctor me dijo que dejara los antitranspirantes con aluminio. Encontré ZAHAL y es justo lo que necesitaba: sin químicos agresivos y funciona de verdad.",
    rating: 5,
    avatar: "PN",
    timeAgo: "hace 1 mes",
    relatedProduct: {
      id: "zahal-desodorante-natural-stick-60-g",
      name: "Stick Natural 60g",
      price: "$189",
      image: "https://cdn.shopify.com/s/files/1/0622/1004/8065/files/ZAHAL_Shopify_1.jpg?v=1729191478&width=200"
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
      data-testid={`momento-card-${index}`}
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
        data-testid={`link-momento-product-${index}`}
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
          <p className="text-xs text-muted-foreground truncate">
            {momento.location}
          </p>
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
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-primary/[0.03] linen-texture">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">
            Comunidad
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-serif" data-testid="text-momentos-title">
            Momentos ZAHAL
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Historias reales de quienes ya hicieron el cambio a lo natural
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
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
              data-testid="button-momentos-prev"
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
                  data-testid={`button-momentos-dot-${i}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors duration-200"
              aria-label="Siguiente"
              data-testid="button-momentos-next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
