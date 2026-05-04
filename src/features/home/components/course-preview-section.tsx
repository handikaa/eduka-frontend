import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/ui/course-card";
import { featuredCourses } from "@/features/home/constants/home-data";

export function CoursePreviewSection() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
              Popular Courses
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-950 sm:text-4xl">
              Course Pilihan untuk Mulai Belajar
            </h2>

            <p className="mt-4 max-w-2xl text-gray-600">
              Pilih course yang sesuai dengan tujuan karier kamu dan mulai
              belajar dengan materi terstruktur.
            </p>
          </div>

          <Link href="/courses">
            <Button
              variant="outline"
              className="rounded-full border-[#0d22a8]/20 px-6 py-3 text-[#0d22a8]"
            >
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard
              key={course.title}
              title={course.title}
              category={course.category}
              level={course.level}
              duration={course.duration}
              lessons={course.lessons}
              description={course.description}
              thumbnailUrl={course.thumbnailUrl}
              href="/course"
            />
          ))}
        </div>
      </div>
    </section>
  );
}