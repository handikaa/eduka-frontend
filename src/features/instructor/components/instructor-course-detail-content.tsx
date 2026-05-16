"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Pencil, RefreshCcw, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useInstructorCourseDetail } from "@/features/instructor/hooks/use-instructor-course-detail";
import { InstructorCourseDetailHeroSection } from "@/features/instructor/components/instructor-course-detail-hero-section";
import { InstructorCourseDetailInfoSection } from "@/features/instructor/components/instructor-course-detail-info-section";
import { InstructorCourseDetailLessonSection } from "@/features/instructor/components/instructor-course-detail-lesson-section";
import { InstructorCourseEditForm } from "@/features/instructor/components/instructor-course-edit-form";
import { UpdateInstructorCoursePayload } from "@/features/instructor/types/instructor.type";

type InstructorCourseDetailContentProps = {
    courseId: number;
    isEditMode: boolean;
};

export function InstructorCourseDetailContent({
    courseId,
    isEditMode,
}: InstructorCourseDetailContentProps) {
    const router = useRouter();

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorSnackbarMessage, setErrorSnackbarMessage] = useState<string | null>(
        null
    );

    const {
        course,
        isLoading,
        isUpdating,
        errorMessage,
        refetch,
        updateCourse,
    } = useInstructorCourseDetail(courseId);

    if (isLoading) {
        return (
            <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <Loading text="Mengambil detail course..." />
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
                        className="mt-4 rounded-full"
                        onClick={refetch}
                    >
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Coba Lagi
                    </Button>
                </div>
            </main>
        );
    }

    if (!course) {
        return (
            <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl rounded-4xl border border-gray-200 bg-white p-8 text-center">
                    <p className="text-lg font-bold text-gray-950">
                        Course tidak ditemukan
                    </p>
                </div>
            </main>
        );
    }

    const editHref = `/instructor/courses/detail/${course.id}?edit=true`;
    const detailHref = `/instructor/courses/detail/${course.id}`;

    const handleUpdateCourse = async (payload: UpdateInstructorCoursePayload) => {
        try {
            await updateCourse(payload);

            setSuccessMessage("Course berhasil diperbarui.");
            setErrorSnackbarMessage(null);

            await refetch();

            router.push(detailHref);

            window.setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Gagal mengupdate course.";

            setErrorSnackbarMessage(message);

            window.setTimeout(() => {
                setErrorSnackbarMessage(null);
            }, 5000);
        }
    };

    return (
        <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">

            {successMessage && (
                <div className="fixed right-4 top-24 z-50 w-[calc(100%-2rem)] max-w-md rounded-3xl border border-green-200 bg-green-50 p-4 text-green-700 shadow-2xl sm:right-6">
                    <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-extrabold">Berhasil</p>
                            <p className="mt-1 text-sm leading-6">{successMessage}</p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setSuccessMessage(null)}
                            className="rounded-full px-2 text-lg font-bold leading-none text-green-600 hover:bg-green-100"
                            aria-label="Tutup pesan sukses"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}

            {errorSnackbarMessage && (
                <div className="fixed right-4 top-24 z-50 w-[calc(100%-2rem)] max-w-md rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-2xl sm:right-6">
                    <div className="flex items-start gap-3">
                        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-extrabold">Gagal</p>
                            <p className="mt-1 line-clamp-4 whitespace-pre-line text-sm leading-6">
                                {errorSnackbarMessage}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setErrorSnackbarMessage(null)}
                            className="rounded-full px-2 text-lg font-bold leading-none text-red-500 hover:bg-red-100"
                            aria-label="Tutup pesan error"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-fit rounded-full"
                        onClick={() => router.push("/instructor/courses")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke Course
                    </Button>

                    {isEditMode ? (
                        <Button
                            type="button"
                            variant="outline"
                            className="w-fit rounded-full"
                            onClick={() => router.push(detailHref)}
                        >
                            Batal Edit
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="outline"
                            className="w-fit rounded-full"
                            onClick={() => router.push(editHref)}
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Course
                        </Button>
                    )}
                </div>

                <InstructorCourseDetailHeroSection
                    course={course}
                    isEditMode={isEditMode}
                />

                {isEditMode ? (
                    <div className="mt-8">
                        <InstructorCourseEditForm
                            course={course}
                            isUpdating={isUpdating}
                            onSubmit={handleUpdateCourse}
                        />
                    </div>
                ) : (
                    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
                        <InstructorCourseDetailLessonSection lessons={course.lessons} />
                        <InstructorCourseDetailInfoSection course={course} />
                    </div>
                )}
            </div>
        </main>
    );
}