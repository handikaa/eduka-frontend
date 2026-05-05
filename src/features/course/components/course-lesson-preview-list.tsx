"use client";

import { Lock, PlayCircle } from "lucide-react";

import { CourseLesson } from "@/features/course/types/course.type";

type CourseLessonPreviewListProps = {
  lessons: CourseLesson[];
  selectedLessonId?: number;
  onSelectPreviewLesson: (lesson: CourseLesson) => void;
};

export function CourseLessonPreviewList({
  lessons,
  selectedLessonId,
  onSelectPreviewLesson,
}: CourseLessonPreviewListProps) {
  return (
    <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
          Course Lessons
        </p>
        <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
          Materi yang Akan Dipelajari
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Guest hanya dapat memutar lesson yang memiliki label preview.
        </p>
      </div>

      <div className="space-y-3">
        {lessons.map((lesson, index) => {
          const isSelected = selectedLessonId === lesson.id;
          const isPreview = lesson.is_preview;

          return (
            <button
              key={lesson.id}
              type="button"
              disabled={!isPreview}
              onClick={() => onSelectPreviewLesson(lesson)}
              className={`w-full rounded-2xl border p-4 text-left transition-all ${
                isSelected
                  ? "border-[#0d22a8] bg-[#0d22a8]/5"
                  : "border-gray-200 bg-white"
              } ${
                isPreview
                  ? "hover:border-[#0d22a8] hover:bg-[#0d22a8]/5"
                  : "cursor-not-allowed opacity-70"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    isPreview
                      ? "bg-[#0d22a8]/10 text-[#0d22a8]"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isPreview ? (
                    <PlayCircle className="h-5 w-5" />
                  ) : (
                    <Lock className="h-5 w-5" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-gray-950">
                      Lesson {index + 1}
                    </p>

                    {isPreview ? (
                      <span className="rounded-full bg-[#F25019]/10 px-3 py-1 text-xs font-bold text-[#F25019]">
                        Preview
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500">
                        Locked
                      </span>
                    )}
                  </div>

                  <h3 className="mt-1 font-semibold text-gray-900">
                    {lesson.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {lesson.content}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}