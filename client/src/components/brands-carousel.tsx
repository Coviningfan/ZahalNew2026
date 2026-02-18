import nutrisaLogo from "@assets/Nutrisa_logo_1771350421137.jpg";
import chedrauiLogo from "@assets/chedraui-logo-png_seeklogo-29285_1771350421227.png";
import hebLogo from "@assets/HEB_180x_1771434503355.avif";
import searsLogo from "@assets/Sears_Mexico_Logo.svg_1771350421240.png";
import sanbornsLogo from "@assets/sanborns-logo-png__1771350421241.png";
import walmartLogo from "@assets/WALMART_e7e3f2bf-c140-4087-9005-94a3fb231765_180x_1771434503363.avif";
import superNaturistaLogo from "@assets/SUPER_NATURISTA_180x_1771434503354.webp";
import getmeLogo from "@assets/getme_by_ola_logo_1771350421244.webp";
import amazonLogo from "@assets/AMAZON_180x_1771434503364.avif";
import mercadoLibreLogo from "@assets/MERCADO_LIBRE_180x_1771434503366.avif";
import sorianaLogo from "@assets/soriana-logo-png_seeklogo-284960_1771350650256.png";
import pronasoyaLogo from "@assets/PRONASOYA_180x_1771434503308.webp";
import superSoyaLogo from "@assets/SUPER_SOYA_e83b6911-92aa-4a85-814b-b15f65d7750d_180x_1771434503346.png";

const brands = [
  { name: "Walmart", logo: walmartLogo, height: "h-16 md:h-20" },
  { name: "Amazon", logo: amazonLogo, height: "h-16 md:h-24" },
  { name: "Mercado Libre", logo: mercadoLibreLogo, height: "h-16 md:h-24" },
  { name: "H-E-B", logo: hebLogo, height: "h-16 md:h-20" },
  { name: "Chedraui", logo: chedrauiLogo, height: "h-16 md:h-24" },
  { name: "Soriana", logo: sorianaLogo, height: "h-16 md:h-24" },
  { name: "Sears", logo: searsLogo, height: "h-8 md:h-10" },
  { name: "Sanborns", logo: sanbornsLogo, height: "h-16 md:h-24" },
  { name: "Nutrisa", logo: nutrisaLogo, height: "h-16 md:h-24" },
  { name: "Super Naturista", logo: superNaturistaLogo, height: "h-20 md:h-28" },
  { name: "Pronasoya", logo: pronasoyaLogo, height: "h-16 md:h-20" },
  { name: "Super Soya", logo: superSoyaLogo, height: "h-16 md:h-20" },
  { name: "Get Me by Ola", logo: getmeLogo, height: "h-16 md:h-20" },
];

function BrandItem({ brand, index }: { brand: typeof brands[0]; index: number }) {
  return (
    <div
      className="flex-shrink-0 w-[160px] md:w-[200px] flex items-center justify-center px-4"
      data-testid={`brand-logo-${brand.name.toLowerCase().replace(/ /g, "-")}`}
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className={`${brand.height} w-auto max-w-[130px] md:max-w-[170px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300`}
      />
    </div>
  );
}

export default function BrandsCarousel() {
  return (
    <section className="py-12 lg:py-16 bg-background overflow-hidden" data-testid="brands-carousel">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-2">Nos encuentras en</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif">
            Puntos de venta
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-scroll-brands" style={{ width: "fit-content" }}>
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <BrandItem key={`brand-${i}`} brand={brand} index={i} />
          ))}
        </div>
      </div>

      <p className="text-muted-foreground/40 text-[10px] text-center mt-6 px-4">
        Las marcas mostradas se usan solo para identificar puntos de venta y pertenecen a sus respectivos propietarios.
      </p>
    </section>
  );
}
