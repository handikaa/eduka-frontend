import Image from "next/image";
import { CalendarDays, Layers, Star } from "lucide-react";

import { getProxiedMediaUrl } from "@/lib/media-url";
import { Course } from "@/features/course/types/course.type";

type CourseDetailHeroProps = {
  course: Course;
  thumbnailUrl: string;
};

export function CourseDetailHero({
  course,
  thumbnailUrl,
}: CourseDetailHeroProps) {
  const primaryCategory = course.categories[0]?.name || "General";
  const safeThumbnailUrl = getProxiedMediaUrl(thumbnailUrl);

  return (
    <section className="relative overflow-hidden px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <Image
        src={safeThumbnailUrl}
        alt={course.title}
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-br from-primary/15 via-primary-medium/55 to-primary-dark/95" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <div className="mb-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-primary shadow-sm">
              {primaryCategory}
            </span>

            <span className="rounded-full bg-secondary px-4 py-2 text-sm font-bold capitalize text-white shadow-sm">
              {course.level}
            </span>

            {/* <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold capitalize text-white backdrop-blur-md">
              {course.status}
            </span> */}
          </div>

          <h1 className="text-4xl font-extrabold leading-tight drop-shadow-sm sm:text-5xl lg:text-6xl">
            {course.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            {course.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/85">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
              <Layers className="h-5 w-5 text-secondary" />
              {course.lessons.length} Lessons
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
              <Star className="h-5 w-5 fill-secondary text-secondary" />
              {course.rating_avg} Rating
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
              <CalendarDays className="h-5 w-5 text-secondary" />
              {new Date(course.created_at).toLocaleDateString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}