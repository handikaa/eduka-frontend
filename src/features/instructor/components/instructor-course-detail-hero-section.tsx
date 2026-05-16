import Image from "next/image";
import { BookOpenCheck, CalendarDays, Layers, Star } from "lucide-react";

import { getProxiedMediaUrl } from "@/lib/media-url";
import { InstructorCourse } from "@/features/instructor/types/instructor.type";

type InstructorCourseDetailHeroSectionProps = {
    course: InstructorCourse;
    isEditMode: boolean;
};

const statusClassName = {
    published: "bg-primary/10 text-primary",
    draft: "bg-yellow-100 text-yellow-700",
    archived: "bg-gray-100 text-gray-600",
};

function formatRupiah(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);
}

export function InstructorCourseDetailHeroSection({
    course,
    isEditMode,
}: InstructorCourseDetailHeroSectionProps) {
    const thumbnailUrl = getProxiedMediaUrl(course.thumbnail_url);
    const primaryCategory = course.categories[0]?.name ?? "Uncategorized";

    const statusStyle =
        statusClassName[course.status] ?? "bg-gray-100 text-gray-600";

    return (
        <section className="overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-sm">
            <div className="grid lg:grid-cols-[420px_1fr]">
                <div className="relative min-h-72 overflow-hidden bg-gray-200">
                    <Image
                        src={thumbnailUrl}
                        alt={course.title}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                    <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-sm">
                        {primaryCategory}
                    </span>
                </div>

                <div className="p-6 lg:p-8">
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span
                            className={`rounded-full px-4 py-2 text-xs font-bold capitalize ${statusStyle}`}
                        >
                            {course.status}
                        </span>

                        <span className="rounded-full bg-gray-100 px-4 py-2 text-xs font-bold capitalize text-gray-700">
                            {course.level}
                        </span>

                        <span className="rounded-full bg-secondary/10 px-4 py-2 text-xs font-bold text-secondary">
                            {isEditMode ? "Edit Mode" : "Detail Mode"}
                        </span>
                    </div>

                    <h1 className="text-3xl font-extrabold leading-tight text-gray-950 sm:text-4xl">
                        {course.title}
                    </h1>

                    <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600">
                        {course.description}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-3xl bg-gray-50 p-4">
                            <BookOpenCheck className="h-5 w-5 text-primary" />
                            <p className="mt-2 text-sm font-semibold text-gray-500">Harga</p>
                            <p className="mt-1 font-extrabold text-gray-950">
                                {formatRupiah(course.price)}
                            </p>
                        </div>

                        <div className="rounded-3xl bg-gray-50 p-4">
                            <Layers className="h-5 w-5 text-primary" />
                            <p className="mt-2 text-sm font-semibold text-gray-500">
                                Lessons
                            </p>
                            <p className="mt-1 font-extrabold text-gray-950">
                                {course.lessons.length}
                            </p>
                        </div>

                        <div className="rounded-3xl bg-gray-50 p-4">
                            <Star className="h-5 w-5 text-secondary" />
                            <p className="mt-2 text-sm font-semibold text-gray-500">
                                Rating
                            </p>
                            <p className="mt-1 font-extrabold text-gray-950">
                                {course.rating_avg} ({course.rating_count})
                            </p>
                        </div>

                        <div className="rounded-3xl bg-gray-50 p-4">
                            <CalendarDays className="h-5 w-5 text-primary" />
                            <p className="mt-2 text-sm font-semibold text-gray-500">
                                Dibuat
                            </p>
                            <p className="mt-1 font-extrabold text-gray-950">
                                {new Date(course.created_at).toLocaleDateString("id-ID")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}