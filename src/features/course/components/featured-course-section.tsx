"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCcw, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/ui/course-card";
import { Loading } from "@/components/ui/loading";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useCourse } from "@/features/course/hooks/use-course";

export function FeaturedCourseSection() {
  const { user } = useAuth();

  const {
    recommendedCourses,
    recommendedPagination,
    isRecommendedLoading,
    recommendedErrorMessage,
    fetchRecommendedCourses,
  } = useCourse();

  useEffect(() => {
    const userId = user?.id ?? 1;

    fetchRecommendedCourses(userId);
  }, [user?.id, fetchRecommendedCourses]);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-bold text-secondary">
              <Sparkles className="h-4 w-4" />
              Recommended For You
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-gray-950 sm:text-4xl">
              Course Rekomendasi Berdasarkan Minatmu
            </h2>

            <p className="mt-4 max-w-2xl text-gray-600">
              Rekomendasi course yang disesuaikan dengan profil dan aktivitas
              belajarmu. Data ini disimulasikan menggunakan parameter user ID.
            </p>
          </div>
        </div>

        {isRecommendedLoading && (
          <div className="rounded-3xl border border-gray-200 bg-white p-8">
            <Loading text="Mengambil recommended course..." />
          </div>
        )}

        {recommendedErrorMessage && !isRecommendedLoading && (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-sm font-semibold text-red-700">
              {recommendedErrorMessage}
            </p>

            {user?.id && (
              <Button
                type="button"
                variant="outline"
                onClick={() => fetchRecommendedCourses(user.id)}
                className="mt-4 rounded-full"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Coba Lagi
              </Button>
            )}
          </div>
        )}

        {!isRecommendedLoading &&
          !recommendedErrorMessage &&
          recommendedCourses.length === 0 && (
            <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-lg font-bold text-gray-950">
                Belum ada rekomendasi course
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Rekomendasi akan tampil setelah data tersedia.
              </p>
            </div>
          )}

        {!isRecommendedLoading &&
          !recommendedErrorMessage &&
          recommendedCourses.length > 0 && (
            <div className="relative">
              <div className="-mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
                {recommendedCourses.map((course) => {
                  const primaryCategory =
                    course.categories[0]?.name || "General";

                  const thumbnailUrl =
                    course.thumbnail_url ||
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop";

                  return (
                    <div
                      key={course.id}
                      className="w-75 shrink-0 snap-start sm:w-85 lg:w-90"
                    >
                      <CourseCard
                        title={course.title}
                        category={primaryCategory}
                        level={course.level}
                        duration="Self-paced"
                        lessons={course.lessons.length}
                        description={course.description}
                        thumbnailUrl={thumbnailUrl}
                        href={`/courses/${course.slug}`}
                      />
                    </div>
                  );
                })}
              </div>

              {recommendedPagination && (
                <p className="mt-3 text-sm text-gray-500">
                  Menampilkan {recommendedCourses.length} dari{" "}
                  {recommendedPagination.total} recommended course.
                </p>
              )}
            </div>
          )}
      </div>
    </section>
  );
}