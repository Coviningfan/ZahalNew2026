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

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ProofSection />
      <BrandsCarousel />
      <MomentosZahal />
      <FeaturedProducts />
      <AboutSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
