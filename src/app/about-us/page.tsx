
import { AboutHeroSection } from "@/features/about/components/about-hero-section";
import { MissionVisionSection } from "@/features/about/components/mission-vision-section";
import { ValuesSection } from "@/features/about/components/values-section";
import { WhyEdukaSection } from "@/features/about/components/why-eduka-section";
import { CTASection } from "@/features/home/components/cta-section";

export default function AboutUsPage() {
  return (
    <main>
      <AboutHeroSection />
      <MissionVisionSection />
      <WhyEdukaSection />
      <ValuesSection />
      <CTASection />
    </main>
  );
}