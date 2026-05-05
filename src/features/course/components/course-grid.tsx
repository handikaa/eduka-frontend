"use client";

import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/ui/course-card";
import { Loading } from "@/components/ui/loading";
import { Pagination } from "@/components/ui/pagination";
import { useCourse } from "@/features/course/hooks/use-course";

const FALLBACK_COURSE_IMAGE = "/images/image-not-available.jpg";

export function CourseGrid() {
  const {
    courses,
    pagination,
    filters,
    isLoading,
    errorMessage,
    setPage,
    refetchCourses,
    clearFilters,
  } = useCourse();

  if (isLoading) {
    return (
      <div className="rounded-[1.5rem] border border-gray-200 bg-white p-8">
        <Loading text="Mengambil data course..." />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-sm font-semibold text-red-700">{errorMessage}</p>

        <Button
          type="button"
          variant="outline"
          onClick={refetchCourses}
          className="mt-4 rounded-full"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Coba Lagi
        </Button>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-gray-200 bg-white p-8 text-center">
        <p className="text-lg font-bold text-gray-950">
          Course tidak ditemukan
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Coba gunakan keyword lain atau reset filter.
        </p>

        <Button
          type="button"
          onClick={clearFilters}
          className="mt-5 rounded-full"
        >
          Reset Filter
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pagination && (
        <div className="flex flex-col justify-between gap-3 rounded-[1.5rem] border border-gray-200 bg-white px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-extrabold text-gray-950">
              Course Catalog
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Menampilkan {pagination.from}-{pagination.to} dari{" "}
              {pagination.total} course
            </p>
          </div>

          <p className="text-sm font-semibold text-gray-500">
            Page {pagination.current_page} of {pagination.last_page}
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => {
          const primaryCategory = course.categories[0]?.name || "General";

          const thumbnailUrl =
            course.thumbnail_url && course.thumbnail_url.trim() !== ""
              ? course.thumbnail_url
              : FALLBACK_COURSE_IMAGE;

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

      {pagination && pagination.last_page > 1 && (
        <Pagination
          currentPage={filters.page}
          totalPages={pagination.last_page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}