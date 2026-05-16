import { Tag, UsersRound } from "lucide-react";

import { InstructorCourse } from "@/features/instructor/types/instructor.type";

type InstructorCourseDetailInfoSectionProps = {
    course: InstructorCourse;
};

export function InstructorCourseDetailInfoSection({
    course,
}: InstructorCourseDetailInfoSectionProps) {
    return (
        <aside className="space-y-6">
            <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                    Course Info
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                    Informasi Course
                </h2>

                <div className="mt-6 space-y-4">
                    <div className="rounded-3xl bg-gray-50 p-4">
                        <p className="text-sm font-semibold text-gray-500">Slug</p>
                        <p className="mt-1 break-all text-sm font-bold text-gray-950">
                            {course.slug}
                        </p>
                    </div>

                    <div className="rounded-3xl bg-gray-50 p-4">
                        <p className="text-sm font-semibold text-gray-500">Quota</p>
                        <p className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-gray-950">
                            <UsersRound className="h-4 w-4 text-primary" />
                            {course.quota} students
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                    Categories
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                    Kategori
                </h2>

                <div className="mt-5 flex flex-wrap gap-2">
                    {course.categories.map((category) => (
                        <span
                            key={category.id}
                            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary"
                        >
                            <Tag className="h-4 w-4" />
                            {category.name}
                        </span>
                    ))}
                </div>
            </section>
        </aside>
    );
}