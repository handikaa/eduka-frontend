import { BookOpenCheck, Layers, Star, UsersRound } from "lucide-react";

type InstructorCoursesSummarySectionProps = {
    totalCourses: number;
    totalLessons: number;
    totalStudents: number;
    averageRating: string;
};

export function InstructorCoursesSummarySection({
    totalCourses,
    totalLessons,
    totalStudents,
    averageRating,
}: InstructorCoursesSummarySectionProps) {
    return (
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <BookOpenCheck className="h-6 w-6" />
                </div>
                <p className="text-2xl font-extrabold text-gray-950">
                    {totalCourses}
                </p>
                <p className="mt-1 text-sm text-gray-500">Total Course</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <Layers className="h-6 w-6" />
                </div>
                <p className="text-2xl font-extrabold text-gray-950">
                    {totalLessons}
                </p>
                <p className="mt-1 text-sm text-gray-500">Total Lesson</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <UsersRound className="h-6 w-6" />
                </div>
                <p className="text-2xl font-extrabold text-gray-950">
                    {totalStudents}
                </p>
                <p className="mt-1 text-sm text-gray-500">Total Student</p>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <Star className="h-6 w-6" />
                </div>
                <p className="text-2xl font-extrabold text-gray-950">
                    {averageRating}
                </p>
                <p className="mt-1 text-sm text-gray-500">Rating Rata-rata</p>
            </div>
        </section>
    );
}