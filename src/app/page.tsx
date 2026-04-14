import HeroSection from "@/components/landing/hero-section";
import IslamicQuote from "@/components/landing/islamic-quote";
import FeaturesGrid from "@/components/landing/features-grid";
import StatsSection from "@/components/landing/stats-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IslamicQuote />
      <FeaturesGrid />
      <StatsSection />
    </>
  );
}
