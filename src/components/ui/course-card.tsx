import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Star, BookOpen } from "lucide-react";

type CourseCardProps = {
  title: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  description: string;
  thumbnailUrl: string;
  href?: string;
};

export function CourseCard({
  title,
  category,
  level,
  duration,
  lessons,
  description,
  thumbnailUrl,
  href = "/course",
}: CourseCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0d22a8] shadow-sm">
          {category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-950">{title}</h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 text-[#F25019]" />
            {level}
          </span>

          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4 text-[#0d22a8]" />
            {duration}
          </span>

          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-[#0d22a8]" />
            {lessons} Lessons
          </span>
        </div>

        <Link
          href={href}
          className="mt-6 inline-flex items-center text-sm font-bold text-[#0d22a8]"
        >
          Lihat Detail
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}