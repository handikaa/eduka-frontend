"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Archive,
    CheckCircle2,
    FileEdit,
    Layers,
    MoreHorizontal,
    Pencil,
    Star,
    UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProxiedMediaUrl } from "@/lib/media-url";
import {
    InstructorCourse,
    InstructorCourseStatus,
} from "@/features/instructor/types/instructor.type";

type InstructorCourseCardProps = {
    course: InstructorCourse;
    isUpdatingStatus?: boolean;
    onUpdateStatus: (
        courseId: number,
        slug: string,
        status: InstructorCourseStatus
    ) => Promise<void>;
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

const statusActionConfig = {
    published: {
        label: "Published",
        icon: CheckCircle2,
    },
    draft: {
        label: "Draft",
        icon: FileEdit,
    },
    archived: {
        label: "Archive",
        icon: Archive,
    },
};

function getAvailableStatusActions(currentStatus: InstructorCourseStatus) {
    const allStatuses: InstructorCourseStatus[] = [
        "published",
        "draft",
        "archived",
    ];

    return allStatuses.filter((status) => status !== currentStatus);
}

export function InstructorCourseCard({
    course,
    isUpdatingStatus = false,
    onUpdateStatus,
}: InstructorCourseCardProps) {
    const router = useRouter();

    const [isActionOpen, setIsActionOpen] = useState(false);

    const courseStatusClassName =
        statusClassName[course.status] ?? "bg-gray-100 text-gray-600";

    const thumbnailUrl = getProxiedMediaUrl(course.thumbnail_url);
    const categoryLabel = course.categories[0]?.name ?? "Uncategorized";
    const availableStatusActions = getAvailableStatusActions(course.status);

    const handleUpdateStatus = async (status: InstructorCourseStatus) => {
        setIsActionOpen(false);
        await onUpdateStatus(course.id, course.slug, status);
    };

    return (
        <article className={`relative overflow-visible rounded-3xl border border-gray-100 bg-gray-50 transition-all duration-200 hover:border-primary/20 hover:bg-white hover:shadow-md ${isActionOpen ? "z-50" : "z-0"
            }`}
        >
            {isUpdatingStatus && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                    <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-primary shadow">
                        Mengubah status...
                    </div>
                </div>
            )}

            <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
                <div className="relative min-h-56 overflow-hidden bg-gray-200 lg:min-h-full">
                    <Image
                        src={thumbnailUrl}
                        alt={course.title}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 260px"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary shadow-sm">
                        {categoryLabel}
                    </span>
                </div>

                <div className="p-5">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0 flex-1">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${courseStatusClassName}`}
                                >
                                    {course.status}
                                </span>

                                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold capitalize text-gray-600 ring-1 ring-gray-200">
                                    {course.level}
                                </span>

                                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-600 ring-1 ring-gray-200">
                                    {formatRupiah(course.price)}
                                </span>
                            </div>

                            <h3 className="text-lg font-extrabold text-gray-950">
                                {course.title}
                            </h3>

                            <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-gray-500">
                                {course.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                                <span className="inline-flex items-center gap-1">
                                    <Layers className="h-4 w-4 text-primary" />
                                    {course.lessons.length} Lessons
                                </span>

                                <span className="inline-flex items-center gap-1">
                                    <UsersRound className="h-4 w-4 text-primary" />
                                    Quota {course.quota}
                                </span>

                                <span className="inline-flex items-center gap-1">
                                    <Star className="h-4 w-4 text-secondary" />
                                    {course.rating_avg} ({course.rating_count} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 lg:justify-end">
                            <Button
                                type="button"
                                variant="primary"
                                className="rounded-full"
                                onClick={() => router.push(`/instructor/courses/detail/${course.id}`)}
                            >
                                Detail
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                className="rounded-full px-4 py-2 text-sm"
                                onClick={() =>
                                    router.push(`/instructor/courses/detail/${course.id}?edit=true`)
                                }
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Button>

                            <div className="relative">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-10 w-10 rounded-full border-gray-200 px-0 py-0 text-gray-600 hover:border-secondary"
                                    aria-label="More actions"
                                    disabled={isUpdatingStatus}
                                    onClick={() => setIsActionOpen((prev) => !prev)}
                                >
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>

                                {isActionOpen && (
                                    <div className="absolute right-0 z-40 mt-2 w-52 overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                                        <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-400">
                                            Update Status
                                        </p>

                                        {availableStatusActions.map((status) => {
                                            const config = statusActionConfig[status];
                                            const Icon = config.icon;

                                            return (
                                                <button
                                                    key={status}
                                                    type="button"
                                                    onClick={() => handleUpdateStatus(status)}
                                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary"
                                                >
                                                    <Icon className="h-4 w-4" />
                                                    {config.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}