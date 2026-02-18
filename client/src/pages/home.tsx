import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import ProofSection from "@/components/proof-section";
import FeaturedProducts from "@/components/featured-products";
import BrandsCarousel from "@/components/brands-carousel";
import MomentosZahal from "@/components/momentos-zahal";
import AboutSection from "@/components/about-section";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";
import SEO from "@/components/seo";
import { BASE_URL } from "@/lib/config";

const homeJsonLd = [
  {
    "@type": "Organization",
    name: "Zahal Productos Naturales",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/favicon.svg`,
    },
    description:
      "Desodorantes naturales de piedra de alumbre. Sin aluminio, sin qu\u00edmicos. Protecci\u00f3n 24h. Env\u00edo a todo M\u00e9xico.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MX",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
  },
  {
    "@type": "WebSite",
    name: "Zahal Productos Naturales",
    url: BASE_URL,
    description:
      "Tienda en l\u00ednea de desodorantes naturales de piedra de alumbre para toda la familia.",
    inLanguage: "es-MX",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Zahal - Desodorantes Naturales de Alumbre"
        description="Desodorantes naturales de piedra de alumbre. Sin aluminio, sin qu\u00edmicos. Protecci\u00f3n 24h. Env\u00edo a todo M\u00e9xico."
        path="/"
        jsonLd={homeJsonLd}
      />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <FeaturesSection />
        <ProofSection />
        <BrandsCarousel />
        <MomentosZahal />
        <FeaturedProducts />
        <AboutSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
