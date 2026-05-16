import { Archive, BarChart3, FileEdit } from "lucide-react";

type InstructorDashboardStatusSectionProps = {
    totalDraftCourses: number;
    totalArchivedCourses: number;
    totalReviews: number;
};

export function InstructorDashboardStatusSection({
    totalDraftCourses,
    totalArchivedCourses,
    totalReviews,
}: InstructorDashboardStatusSectionProps) {
    return (
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                    Draft
                </p>

                <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-2xl font-extrabold text-gray-950">
                            {totalDraftCourses}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">Course Draft</p>
                    </div>

                    <FileEdit className="h-8 w-8 text-primary" />
                </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                    Archived
                </p>

                <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-2xl font-extrabold text-gray-950">
                            {totalArchivedCourses}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">Course Archived</p>
                    </div>

                    <Archive className="h-8 w-8 text-primary" />
                </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:col-span-2">
                <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                    Reviews
                </p>

                <div className="mt-4 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-2xl font-extrabold text-gray-950">
                            {totalReviews}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            Total review dari semua course.
                        </p>
                    </div>

                    <BarChart3 className="h-8 w-8 text-primary" />
                </div>
            </div>
        </section>
    );
}