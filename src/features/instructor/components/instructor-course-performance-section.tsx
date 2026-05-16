"use client";

import { useRouter } from "next/navigation";
import {
    BookOpenCheck,
    CalendarDays,
    Eye,
    Layers,
    Pencil,
    RefreshCcw,
    Star,
    UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useInstructorCoursePerformance } from "@/features/instructor/hooks/use-instructor-course-performance";

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

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function InstructorCoursePerformanceSection() {
    const router = useRouter();

    const { courses, isLoading, errorMessage, refetch } =
        useInstructorCoursePerformance();

    if (isLoading) {
        return (
            <section className="mt-8 rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                <Loading text="Mengambil performa course..." />
            </section>
        );
    }

    if (errorMessage) {
        return (
            <section className="mt-8 rounded-4xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
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
            </section>
        );
    }

    return (
        <section className="mt-8 rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                        Course Performance
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                        Performa Course Instructor
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        Pantau enrollment, rating, jumlah lesson, dan status publikasi dari
                        setiap course milikmu.
                    </p>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    onClick={() => router.push("/instructor/courses")}
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    Kelola Course
                </Button>
            </div>

            {courses.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                    <BookOpenCheck className="mx-auto h-10 w-10 text-gray-400" />
                    <h3 className="mt-4 text-lg font-bold text-gray-950">
                        Belum ada course
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Course yang kamu buat akan tampil di bagian ini.
                    </p>
                </div>
            ) : (
                <div className="mt-6 space-y-4">
                    {courses.map((course) => (
                        <article
                            key={course.course_id}
                            className="rounded-3xl border border-gray-100 bg-gray-50 p-5 transition-all duration-200 hover:border-primary/20 hover:bg-white hover:shadow-md"
                        >
                            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                <div className="min-w-0 flex-1">
                                    <div className="mb-3 flex flex-wrap items-center gap-2">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusClassName[course.status]
                                                }`}
                                        >
                                            {course.status}
                                        </span>

                                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-600 ring-1 ring-gray-200">
                                            {formatRupiah(course.price)}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-extrabold text-gray-950">
                                        {course.title}
                                    </h3>

                                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                                        <span className="inline-flex items-center gap-1">
                                            <UsersRound className="h-4 w-4 text-primary" />
                                            {course.enrolled_count} Enrolled
                                        </span>

                                        <span className="inline-flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-secondary text-secondary" />
                                            {course.rating_avg} ({course.rating_count} reviews)
                                        </span>

                                        <span className="inline-flex items-center gap-1">
                                            <Layers className="h-4 w-4 text-primary" />
                                            {course.total_lessons} Lessons
                                        </span>

                                        <span className="inline-flex items-center gap-1">
                                            <CalendarDays className="h-4 w-4 text-primary" />
                                            {formatDate(course.created_at)}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 lg:justify-end">
                                    <Button
                                        type="button"
                                        className="rounded-ful"
                                        onClick={() =>
                                            router.push(`/instructor/courses/detail/${course.course_id}`)
                                        }
                                    >
                                        <Eye className="mr-2 h-4 w-4" />
                                        Detail
                                    </Button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}