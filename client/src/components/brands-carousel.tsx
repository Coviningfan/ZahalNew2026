import nutrisaLogo from "@assets/Nutrisa+logotipo+_1_-removebg-preview_1771434664253.png";
import chedrauiLogo from "@assets/chedraui-seeklogobueno-fotor-bg-remover-2026021893334_1771436026327.png";
import hebLogo from "@assets/HEB_180x_1771434503355.avif";
import searsLogo from "@assets/Sears_Mexico_Logo.svg_1771350421240.png";
import sanbornsLogo from "@assets/Sanbornspng_1771434929637.png";
import walmartLogo from "@assets/WALMART_e7e3f2bf-c140-4087-9005-94a3fb231765_180x_1771434503363.avif";
import superNaturistaLogo from "@assets/SUPER_NATURISTA_180x_1771434503354.webp";
import getmeLogo from "@assets/logo_getmepng_1771435262525.png";
import amazonLogo from "@assets/AMAZON_180x_1771434503364.avif";
import mercadoLibreLogo from "@assets/MERCADO_LIBRE_180x_1771434503366.avif";
import sorianaLogo from "@assets/soriana-logopng_1771435365592.png";
import pronasoyaLogo from "@assets/PRONASOYA_180x_1771434503308.webp";
import superSoyaLogo from "@assets/SUPER_SOYA_e83b6911-92aa-4a85-814b-b15f65d7750d_180x_1771434503346.png";
import daxLogo from "@assets/DaxLogo_1771437463517.png";
import laComerLogo from "@assets/la-comer-logo-png_seeklogo-299203-fotor-bg-remover-20260218102_1771437783061.png";
import tiendaUnamLogo from "@assets/tienda_unam_1771437690744.jpg";
import caalfrabetLogo from "@assets/Logo_CAALFRA_Oficial_1771437792297.avif";
import sheinLogo from "@assets/shein-seeklogo_1771437844496.png";
import ultrasoyaLogo from "@assets/logo-ultrasoya_1771437873164.png";

const brands = [
  { name: "Walmart", logo: walmartLogo, style: "h-7 md:h-9", width: "w-[145px] md:w-[175px]" },
  { name: "Amazon", logo: amazonLogo, style: "h-6 md:h-7", width: "w-[130px] md:w-[155px]" },
  { name: "Mercado Libre", logo: mercadoLibreLogo, style: "h-7 md:h-8", width: "w-[145px] md:w-[170px]" },
  { name: "H-E-B", logo: hebLogo, style: "h-7 md:h-9", width: "w-[120px] md:w-[145px]" },
  { name: "Chedraui", logo: chedrauiLogo, style: "h-11 md:h-14", width: "w-[105px] md:w-[125px]" },
  { name: "Soriana", logo: sorianaLogo, style: "h-7 md:h-9", width: "w-[145px] md:w-[175px]" },
  { name: "Sears", logo: searsLogo, style: "h-5 md:h-7", width: "w-[110px] md:w-[130px]" },
  { name: "Sanborns", logo: sanbornsLogo, style: "h-8 md:h-10", width: "w-[130px] md:w-[155px]" },
  { name: "Nutrisa", logo: nutrisaLogo, style: "h-6 md:h-7", width: "w-[115px] md:w-[135px]" },
  { name: "Super Naturista", logo: superNaturistaLogo, style: "h-8 md:h-10", width: "w-[105px] md:w-[125px]" },
  { name: "Pronasoya", logo: pronasoyaLogo, style: "h-8 md:h-10", width: "w-[100px] md:w-[115px]" },
  { name: "Super Soya", logo: superSoyaLogo, style: "h-8 md:h-10", width: "w-[105px] md:w-[125px]" },
  { name: "Get Me by Ola", logo: getmeLogo, style: "h-6 md:h-7", width: "w-[120px] md:w-[140px]" },
  { name: "La Comer", logo: laComerLogo, style: "h-9 md:h-11", width: "w-[150px] md:w-[180px]" },
  { name: "Dax", logo: daxLogo, style: "h-5 md:h-6", width: "w-[100px] md:w-[115px]", invert: true },
  { name: "Tienda UNAM", logo: tiendaUnamLogo, style: "h-7 md:h-8", width: "w-[90px] md:w-[105px]" },
  { name: "Caalfrabet", logo: caalfrabetLogo, style: "h-8 md:h-10", width: "w-[105px] md:w-[125px]" },
  { name: "SheIn", logo: sheinLogo, style: "h-5 md:h-6", width: "w-[125px] md:w-[145px]" },
  { name: "Ultrasoya", logo: ultrasoyaLogo, style: "h-6 md:h-8", width: "w-[130px] md:w-[150px]" },
];

function BrandItem({ brand }: { brand: typeof brands[0] }) {
  return (
    <div
      className={`flex-shrink-0 ${brand.width} h-14 md:h-18 flex items-center justify-center px-2`}
      data-testid={`brand-logo-${brand.name.toLowerCase().replace(/ /g, "-")}`}
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className={`${brand.style} w-auto max-w-[120px] md:max-w-[155px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${brand.invert ? "invert" : ""}`}
      />
    </div>
  );
}

export default function BrandsCarousel() {
  return (
    <section className="py-12 lg:py-16 bg-primary/[0.04] overflow-hidden" data-testid="brands-carousel">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-2">Nos encuentras en</p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-serif">
            Puntos de venta
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-primary/[0.04] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-primary/[0.04] to-transparent z-10" />

        <div className="flex animate-scroll-brands items-center" style={{ width: "fit-content" }}>
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <BrandItem key={`brand-${i}`} brand={brand} />
          ))}
        </div>
      </div>

      <p className="text-muted-foreground/40 text-[10px] text-center mt-6 px-4">
        Las marcas mostradas se usan solo para identificar puntos de venta y pertenecen a sus respectivos propietarios.
      </p>
    </section>
  );
}
