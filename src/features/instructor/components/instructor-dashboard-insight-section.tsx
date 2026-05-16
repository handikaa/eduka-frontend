type InstructorDashboardInsightSectionProps = {
    publishedRatio: number;
    averageEnrollmentPerCourse: number;
    averageReviewPerCourse: number;
};

export function InstructorDashboardInsightSection({
    publishedRatio,
    averageEnrollmentPerCourse,
    averageReviewPerCourse,
}: InstructorDashboardInsightSectionProps) {
    return (
        <section className="mt-8 rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                Instructor Summary
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                Ringkasan Performa Course
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                Data berikut dihitung dari ringkasan dashboard instructor.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm font-semibold text-gray-500">
                        Published Ratio
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-gray-950">
                        {publishedRatio}%
                    </p>
                </div>

                <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm font-semibold text-gray-500">
                        Avg Enrollment / Course
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-gray-950">
                        {averageEnrollmentPerCourse}
                    </p>
                </div>

                <div className="rounded-3xl bg-gray-50 p-5">
                    <p className="text-sm font-semibold text-gray-500">
                        Avg Review / Course
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-gray-950">
                        {averageReviewPerCourse}
                    </p>
                </div>
            </div>
        </section>
    );
}
