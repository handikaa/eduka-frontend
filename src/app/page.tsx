import { HeroSection } from "@/features/home/components/hero-section";
import { StatsSection } from "@/features/home/components/stats-section";
import { CoursePreviewSection } from "@/features/home/components/course-preview-section";
import { FeaturesSection } from "@/features/home/components/features-section";
import { HowItWorksSection } from "@/features/home/components/how-it-works-section";
import { TestimonialsSection } from "@/features/home/components/testimonials-section";
import { CTASection } from "@/features/home/components/cta-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      {/* <StatsSection/> */}
      <CoursePreviewSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <TestimonialsSection/>
      <CTASection/>
    </main>
  );
}