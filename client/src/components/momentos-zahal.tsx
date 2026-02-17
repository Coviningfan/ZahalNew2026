import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Momento {
  name: string;
  location: string;
  product: string;
  text: string;
  rating: number;
  avatar: string;
  timeAgo: string;
}

const momentos: Momento[] = [
  {
    name: "Mariana G.",
    location: "CDMX",
    product: "Stick Natural 120g",
    text: "Llevaba años buscando algo que no me irritara la piel después de depilarme. Con ZAHAL puedo aplicarlo al instante, sin ardor. Mi esposo también se cambió y ya van 8 meses sin volver a lo convencional.",
    rating: 5,
    avatar: "MG",
    timeAgo: "hace 2 semanas"
  },
  {
    name: "Roberto L.",
    location: "Monterrey",
    product: "Roll On For Men 90ml",
    text: "Trabajo en obra y sudaba mucho. Me daba pena el olor. Un compa me recomendó ZAHAL y la neta no mancha mis camisas y aguanta todo el turno. Ya no me preocupo.",
    rating: 5,
    avatar: "RL",
    timeAgo: "hace 1 mes"
  },
  {
    name: "Sofía T.",
    location: "Guadalajara",
    product: "Spray Corporal 240ml",
    text: "Lo uso después del gym y me encanta la sensación de frescura. No tiene olor artificial, simplemente te deja limpia. Mis amigas ya me preguntan qué uso y les paso el dato.",
    rating: 5,
    avatar: "ST",
    timeAgo: "hace 3 semanas"
  },
  {
    name: "Ana P.",
    location: "Puebla",
    product: "Roll On Teens con Aroma 30ml",
    text: "Se lo compré a mi hija de 14 años. Al principio no quería porque decía que los naturales no funcionan. A la semana me pidió que le comprara otro para dejar en la escuela. ¡Éxito total!",
    rating: 5,
    avatar: "AP",
    timeAgo: "hace 1 semana"
  },
  {
    name: "Carlos M.",
    location: "Querétaro",
    product: "Kit Eco Viajero",
    text: "Viajo mucho por trabajo y el kit es perfecto. Cabe en cualquier maleta, no se derrama, y me dura semanas. Ya no cargo botes enormes. Práctico y efectivo.",
    rating: 5,
    avatar: "CM",
    timeAgo: "hace 2 meses"
  },
  {
    name: "Valentina R.",
    location: "Mérida",
    product: "Pack Dúo Stick + Spray",
    text: "Con el calor de acá pensé que nada natural iba a funcionar. Me equivoqué completamente. El stick para las mañanas y el spray para refrescarme en la tarde. Combinación ganadora.",
    rating: 5,
    avatar: "VR",
    timeAgo: "hace 3 semanas"
  },
  {
    name: "Diego H.",
    location: "León",
    product: "Roll On Sport 90ml",
    text: "Corro maratones y el Sport es mi aliado. Antes terminaba con irritación horrible. Ahora nada de nada. Mis compañeros de equipo ya están cambiándose también.",
    rating: 5,
    avatar: "DH",
    timeAgo: "hace 1 mes"
  },
  {
    name: "Lucía F.",
    location: "Oaxaca",
    product: "Desodorante Spray 15ml",
    text: "Empecé con el chiquito para probar. Al tercer día ya estaba convencida. Ahora tengo uno en la bolsa, otro en el baño y otro en la oficina. Es adictivo lo bien que funciona.",
    rating: 5,
    avatar: "LF",
    timeAgo: "hace 2 semanas"
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

function MomentoCard({ momento, index }: { momento: Momento; index: number }) {
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
      <div className="flex items-center gap-3 pt-4 border-t border-border/30">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
          {momento.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{momento.name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {momento.location} · {momento.product}
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
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

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
