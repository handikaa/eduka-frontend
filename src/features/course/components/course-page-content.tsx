"use client";

import { CourseProvider } from "@/features/course/context/course-context";
import { CourseHeroSection } from "@/features/course/components/course-hero-section";
import { CourseSearchFilterSection } from "./course-search-filter-section";
import { CourseCatalogSection } from "./course-catalog-section";
import { FeaturedCourseSection } from "@/features/course/components/featured-course-section";
import { CourseBenefitsSection } from "@/features/course/components/course-benefits-section";
import { CourseCTASection } from "@/features/course/components/course-cta-section";

export function CoursePageContent() {
  return (
    <CourseProvider>
      <CourseHeroSection />
      <CourseSearchFilterSection />
      <CourseCatalogSection />
      <FeaturedCourseSection />
      <CourseBenefitsSection/>
      <CourseCTASection/>
      {/* 
      */}
    </CourseProvider>
  );
}