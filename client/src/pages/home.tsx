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

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Zahal - Desodorantes Naturales de Alumbre"
        description="Desodorantes naturales de piedra de alumbre. Sin aluminio, sin químicos. Protección 24h. Envío a todo México."
        path="/"
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
