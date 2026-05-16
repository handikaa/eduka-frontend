"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { InstructorCoursesHeroSection } from "@/features/instructor/components/instructor-courses-hero-section";
import { InstructorCoursesListSection } from "@/features/instructor/components/instructor-courses-list-section";
import { InstructorCoursesSummarySection } from "@/features/instructor/components/instructor-courses-summary-section";
import { useInstructorCourses } from "@/features/instructor/hooks/use-instructor-courses";

export function InstructorCoursesContent() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSuccessSnackbarOpen, setIsSuccessSnackbarOpen] = useState(false);

    const {
        courses,
        pagination,
        filters,
        isLoading,
        errorMessage,
        updatingCourseId,
        refetch,
        setSearch,
        setStatus,
        setLevel,
        setPage,
        resetFilters,
        updateCourseStatus,
    } = useInstructorCourses();

    const totalCourses = pagination?.total ?? courses.length;

    const totalLessons = courses.reduce(
        (total, course) => total + course.lessons.length,
        0
    );

    useEffect(() => {
        const message = sessionStorage.getItem(
            "instructor_course_success_message"
        );

        if (!message) {
            return;
        }

        setSuccessMessage(message);
        setIsSuccessSnackbarOpen(true);
        sessionStorage.removeItem("instructor_course_success_message");

        const timer = window.setTimeout(() => {
            setIsSuccessSnackbarOpen(false);
        }, 5000);

        return () => {
            window.clearTimeout(timer);
        };
    }, []);

    const averageRating =
        courses.length > 0
            ? (
                courses.reduce(
                    (total, course) => total + Number(course.rating_avg || 0),
                    0
                ) / courses.length
            ).toFixed(2)
            : "0.00";

    return (
        <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            {isSuccessSnackbarOpen && successMessage && (
                <div className="fixed right-4 top-24 z-50 w-[calc(100%-2rem)] max-w-md rounded-3xl border border-green-200 bg-green-50 p-4 text-green-700 shadow-2xl sm:right-6">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-extrabold">
                                Course berhasil dibuat
                            </p>

                            <p className="mt-1 text-sm leading-6">
                                {successMessage}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsSuccessSnackbarOpen(false)}
                            className="rounded-full px-2 text-lg font-bold leading-none text-green-600 hover:bg-green-100"
                            aria-label="Tutup pesan sukses"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-7xl">
                <InstructorCoursesHeroSection />

                <InstructorCoursesSummarySection
                    totalCourses={totalCourses}
                    totalLessons={totalLessons}
                    totalStudents={0}
                    averageRating={averageRating}
                />
                <InstructorCoursesListSection
                    courses={courses}
                    pagination={pagination}
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    updatingCourseId={updatingCourseId}
                    search={filters.search}
                    status={filters.status}
                    level={filters.level}
                    onSearchChange={setSearch}
                    onStatusChange={setStatus}
                    onLevelChange={setLevel}
                    onPageChange={setPage}
                    onResetFilters={resetFilters}
                    onRetry={refetch}
                    onUpdateCourseStatus={updateCourseStatus}
                />
            </div>
        </main>
    );
}