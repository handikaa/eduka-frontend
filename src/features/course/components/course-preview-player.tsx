"use client";

import { CourseLesson } from "@/features/course/types/course.type";

type CoursePreviewPlayerProps = {
  selectedLesson: CourseLesson | null;
  thumbnailUrl: string;
};

export function CoursePreviewPlayer({
  selectedLesson,
  thumbnailUrl,
}: CoursePreviewPlayerProps) {
  if (!selectedLesson) {
    return (
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[2rem] bg-gray-900">
        <img
          src={thumbnailUrl}
          alt="Course thumbnail"
          className="h-full w-full object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute text-center text-white">
          <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
            Course Preview
          </p>
          <h2 className="mt-2 text-2xl font-extrabold">
            Pilih lesson preview untuk mulai melihat materi
          </h2>
        </div>
      </div>
    );
  }

  if (!selectedLesson.video_url) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-[2rem] bg-gray-900 px-6 text-center text-white">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
            Preview Tidak Tersedia
          </p>
          <h2 className="mt-2 text-2xl font-extrabold">
            Video untuk lesson ini belum tersedia.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] bg-black shadow-xl">
      <video
        key={selectedLesson.id}
        controls
        className="aspect-video w-full"
      >
        <source src={selectedLesson.video_url} type="video/mp4" />
        Browser kamu tidak mendukung pemutar video.
      </video>
    </div>
  );
}