import { Filter, RefreshCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { Pagination } from "@/components/ui/pagination";
import { InstructorCourseCard } from "@/features/instructor/components/instructor-course-card";
import {
    InstructorCourse,
    InstructorCourseLevel,
    InstructorCoursesPagination,
    InstructorCourseStatus,
} from "@/features/instructor/types/instructor.type";

type InstructorCoursesListSectionProps = {
    courses: InstructorCourse[];
    pagination: InstructorCoursesPagination | null;
    isLoading: boolean;
    errorMessage: string | null;
    updatingCourseId: number | null;
    search: string;
    status: InstructorCourseStatus | "all";
    level: InstructorCourseLevel | "all";
    onSearchChange: (value: string) => void;
    onStatusChange: (value: InstructorCourseStatus | "all") => void;
    onLevelChange: (value: InstructorCourseLevel | "all") => void;
    onPageChange: (page: number) => void;
    onResetFilters: () => void;
    onRetry: () => void;
    onUpdateCourseStatus: (
        courseId: number,
        slug: string,
        status: InstructorCourseStatus
    ) => Promise<void>;
};

export function InstructorCoursesListSection({
    courses,
    pagination,
    isLoading,
    errorMessage,
    updatingCourseId,
    search,
    status,
    level,
    onSearchChange,
    onStatusChange,
    onLevelChange,
    onPageChange,
    onResetFilters,
    onRetry,
    onUpdateCourseStatus,
}: InstructorCoursesListSectionProps) {
    return (
        <section className="mt-8 rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                        Course List
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                        Course Milik Kamu
                    </h2>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(event) => onSearchChange(event.target.value)}
                            placeholder="Cari course..."
                            className="h-11 w-full rounded-full border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-700 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10 lg:w-64"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(event) =>
                            onStatusChange(event.target.value as InstructorCourseStatus | "all")
                        }
                        className="h-11 rounded-full border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                    >
                        <option value="all">Semua Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                    </select>

                    <select
                        value={level}
                        onChange={(event) =>
                            onLevelChange(event.target.value as InstructorCourseLevel | "all")
                        }
                        className="h-11 rounded-full border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                    >
                        <option value="all">Semua Level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>

                    <Button
                        type="button"
                        variant="outline"
                        className="h-11 rounded-full"
                        onClick={onResetFilters}
                    >
                        <Filter className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="mt-6 rounded-3xl border border-gray-100 bg-gray-50 p-8">
                    <Loading text="Mengambil course instructor..." />
                </div>
            ) : errorMessage ? (
                <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
                    <p className="text-sm font-semibold text-red-700">{errorMessage}</p>

                    <Button
                        type="button"
                        variant="outline"
                        className="mt-4 rounded-full"
                        onClick={onRetry}
                    >
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Coba Lagi
                    </Button>
                </div>
            ) : courses.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                    <h3 className="text-lg font-bold text-gray-950">
                        Course tidak ditemukan
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Coba ubah search atau filter yang digunakan.
                    </p>
                </div>
            ) : (
                <>
                    <div className="mt-6 space-y-4">
                        {courses.map((course) => (
                            <InstructorCourseCard
                                key={course.id}
                                course={course}
                                isUpdatingStatus={updatingCourseId === course.id}
                                onUpdateStatus={onUpdateCourseStatus}
                            />
                        ))}
                    </div>

                    {pagination && pagination.last_page > 1 && (
                        <div className="mt-6">
                            <Pagination
                                currentPage={pagination.current_page}
                                totalPages={pagination.last_page}
                                onPageChange={onPageChange}
                                showPageInput
                            />
                        </div>
                    )}
                </>
            )}
        </section>
    );
}