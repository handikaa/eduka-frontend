"use client";

import { CourseCategorySidebar } from "@/features/course/components/course-category-sidebar";
import { CourseCategoryTabs } from "@/features/course/components/course-category-tabs";
import { CourseGrid } from "@/features/course/components/course-grid";

export function CourseCatalogSection() {
  return (
    <section
      id="course-catalog"
      className="bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
            Course Catalog
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-950 sm:text-4xl">
            Pilih Course Berdasarkan Kebutuhanmu
          </h2>

          <p className="mt-4 max-w-2xl text-gray-600">
            Gunakan kategori, level, status, dan pencarian untuk menemukan
            course yang paling sesuai.
          </p>
        </div>

        <CourseCategoryTabs />

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          <CourseCategorySidebar />
          <CourseGrid />
        </div>
      </div>
    </section>
  );
}