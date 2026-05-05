"use client";

import Link from "next/link";
import { ArrowRight, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/ui/course-card";
import { Loading } from "@/components/ui/loading";
import { usePopularCourses } from "@/features/home/hooks/use-popular-courses";

export function CoursePreviewSection() {
  const { courses, isLoading, errorMessage, refetch } = usePopularCourses();

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

          <Link href="/courses" className="self-start md:self-auto">
            <Button
              variant="outline"
              className="rounded-full border-[#0d22a8]/20 px-6 py-3 text-[#0d22a8]"
            >
              Lihat Semua
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading && (
          <div className="rounded-[1.5rem] border border-gray-200 bg-white p-8">
            <Loading text="Mengambil popular course..." />
          </div>
        )}

        {errorMessage && !isLoading && (
          <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-sm font-semibold text-red-700">
              {errorMessage}
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={refetch}
              className="mt-4 rounded-full"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Coba Lagi
            </Button>
          </div>
        )}

        {!isLoading && !errorMessage && courses.length === 0 && (
          <div className="rounded-[1.5rem] border border-gray-200 bg-white p-8 text-center">
            <p className="text-lg font-bold text-gray-950">
              Course belum tersedia
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Data course akan tampil setelah tersedia dari server.
            </p>
          </div>
        )}

        {!isLoading && !errorMessage && courses.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const primaryCategory = course.categories[0]?.name || "General";

              const thumbnailUrl =
                course.thumbnail_url ||
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop";

              return (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  category={primaryCategory}
                  level={course.level}
                  duration="Self-paced"                  
                  lessons={course.lessons.length}
                  description={course.description}
                  thumbnailUrl={thumbnailUrl}
                  href={`/courses/${course.slug}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}