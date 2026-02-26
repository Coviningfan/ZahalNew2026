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
      url: `${BASE_URL}/og-image.png`,
    },
    description:
      "Desodorantes naturales de piedra de alumbre. Sin aluminio, sin químicos. Protección 24h. Envío a todo México.",
    sameAs: [
      "https://www.facebook.com/zahalnatural",
      "https://www.instagram.com/zahalnatural",
      "https://www.tiktok.com/@zahalnatural",
      "https://wa.me/5215545327249",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "MX",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+52-55-4532-7249",
      email: "contacto@zahal.com.mx",
      availableLanguage: "Spanish",
    },
  },
  {
    "@type": "WebSite",
    name: "Zahal Productos Naturales",
    url: BASE_URL,
    description:
      "Tienda en línea de desodorantes naturales de piedra de alumbre para toda la familia.",
    inLanguage: "es-MX",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/productos?buscar={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Zahal - Desodorantes de Alumbre Naturales: Protección 24h"
        description="Desodorantes de piedra de alumbre para toda la familia. 24h de protección natural, sin aluminio, sin parabenos y sin químicos dañinos. Envío a todo México."
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
