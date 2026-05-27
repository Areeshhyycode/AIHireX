import { Hero } from "@/components/home/hero";
import { FeatureGrid } from "@/components/home/feature-grid";
import { RoleCards } from "@/components/home/role-cards";
import { TrustBanner } from "@/components/home/trust-banner";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBanner />
      <FeatureGrid />
      <RoleCards />
      <CTASection />
    </>
  );
}
