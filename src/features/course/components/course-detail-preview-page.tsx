"use client";

import { useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { CourseCheckoutCard } from "@/features/course/components/course-checkout-card";
import { CourseDetailHero } from "@/features/course/components/course-detail-hero";
import { CourseLessonPreviewList } from "@/features/course/components/course-lesson-preview-list";
import { CoursePreviewPlayer } from "@/features/course/components/course-preview-player";
import { useCourseDetail } from "@/features/course/hooks/use-course-detail";
import { CourseLesson } from "@/features/course/types/course.type";

type CourseDetailPreviewPageProps = {
  slug: string;
};

export function CourseDetailPreviewPage({ slug }: CourseDetailPreviewPageProps) {
  const { course, isLoading, errorMessage, refetch } = useCourseDetail(slug);
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson | null>(
    null
  );

  const thumbnailUrl =
  course?.thumbnail_url && course.thumbnail_url.trim() !== ""
    ? course.thumbnail_url
    : "/images/image-not-available.png";

  const defaultPreviewLesson = useMemo(() => {
    return course?.lessons.find((lesson) => lesson.is_preview) || null;
  }, [course]);

  const activeLesson = selectedLesson || defaultPreviewLesson;

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-72px)] bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Loading text="Mengambil detail course..." />
        </div>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-red-200 bg-red-50 p-8 text-center">
          <p className="text-sm font-semibold text-red-700">{errorMessage}</p>

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
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-gray-200 bg-white p-8 text-center">
          <p className="text-lg font-bold text-gray-950">
            Course tidak ditemukan
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50">
<CourseDetailHero course={course} thumbnailUrl={thumbnailUrl} />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <CoursePreviewPlayer
              selectedLesson={activeLesson}
              thumbnailUrl={thumbnailUrl}
            />

            <CourseLessonPreviewList
              lessons={course.lessons}
              selectedLessonId={activeLesson?.id}
              onSelectPreviewLesson={setSelectedLesson}
            />

            <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
                About This Course
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                Deskripsi Course
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {course.categories.map((category) => (
                  <span
                    key={category.id}
                    className="rounded-full bg-[#0d22a8]/10 px-4 py-2 text-sm font-bold text-[#0d22a8]"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <CourseCheckoutCard course={course} />
        </div>
      </section>
    </main>
  );
}