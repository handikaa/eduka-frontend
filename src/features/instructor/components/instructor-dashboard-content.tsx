"use client";

import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { InstructorCoursePerformanceSection } from "@/features/instructor/components/instructor-course-performance-section";
import { InstructorDashboardHeroSection } from "@/features/instructor/components/instructor-dashboard-hero-section";
import { InstructorDashboardInsightSection } from "@/features/instructor/components/instructor-dashboard-insight-section";
import { InstructorDashboardStatusSection } from "@/features/instructor/components/instructor-dashboard-status-section";
import { InstructorDashboardSummarySection } from "@/features/instructor/components/instructor-dashboard-summary-section";
import { useInstructorDashboardSummary } from "@/features/instructor/hooks/use-instructor-dashboard-summary";

export function InstructorDashboardContent() {
    const { summary, isLoading, errorMessage, refetch } =
        useInstructorDashboardSummary();

    if (isLoading) {
        return (
            <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <Loading text="Mengambil ringkasan dashboard instructor..." />
                </div>
            </main>
        );
    }

    if (errorMessage) {
        return (
            <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl rounded-4xl border border-red-200 bg-red-50 p-8 text-center">
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
                </div>
            </main>
        );
    }

    const totalCourses = summary?.total_courses ?? 0;
    const totalPublishedCourses = summary?.total_published_courses ?? 0;
    const totalDraftCourses = summary?.total_draft_courses ?? 0;
    const totalArchivedCourses = summary?.total_archived_courses ?? 0;
    const totalEnrollments = summary?.total_enrollments ?? 0;
    const totalReviews = summary?.total_reviews ?? 0;
    const averageRating = summary?.average_rating ?? 0;

    const publishedRatio =
        totalCourses > 0
            ? Math.round((totalPublishedCourses / totalCourses) * 100)
            : 0;

    const averageEnrollmentPerCourse =
        totalCourses > 0 ? Math.round(totalEnrollments / totalCourses) : 0;

    const averageReviewPerCourse =
        totalCourses > 0 ? Math.round(totalReviews / totalCourses) : 0;

    return (
        <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <InstructorDashboardHeroSection />

                <InstructorDashboardSummarySection
                    totalCourses={totalCourses}
                    totalPublishedCourses={totalPublishedCourses}
                    totalEnrollments={totalEnrollments}
                    averageRating={averageRating}
                />

                <InstructorDashboardStatusSection
                    totalDraftCourses={totalDraftCourses}
                    totalArchivedCourses={totalArchivedCourses}
                    totalReviews={totalReviews}
                />

                <InstructorDashboardInsightSection
                    publishedRatio={publishedRatio}
                    averageEnrollmentPerCourse={averageEnrollmentPerCourse}
                    averageReviewPerCourse={averageReviewPerCourse}
                />

                <InstructorCoursePerformanceSection />
            </div>
        </main>
    );
}