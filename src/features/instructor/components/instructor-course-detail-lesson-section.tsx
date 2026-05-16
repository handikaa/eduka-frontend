import {
    Download,
    FileText,
    Layers,
    PlayCircle,
    Star,
    Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { InstructorCourseLesson } from "@/features/instructor/types/instructor.type";

type InstructorCourseDetailLessonSectionProps = {
    lessons: InstructorCourseLesson[];
};

const lessonTypeConfig = {
    video: {
        label: "Video",
        icon: Video,
        className: "bg-primary/10 text-primary",
    },
    content: {
        label: "Content",
        icon: FileText,
        className: "bg-secondary/10 text-secondary",
    },
    file: {
        label: "File",
        icon: Download,
        className: "bg-gray-100 text-gray-700",
    },
};

export function InstructorCourseDetailLessonSection({
    lessons,
}: InstructorCourseDetailLessonSectionProps) {
    const sortedLessons = [...lessons].sort((a, b) => {
        return (a.position ?? 0) - (b.position ?? 0);
    });

    return (
        <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                        Lesson Management
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                        Daftar Lesson
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        Detail lesson yang sudah terhubung ke course ini.
                    </p>
                </div>

                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                    <Layers className="h-4 w-4" />
                    {lessons.length} Lessons
                </div>
            </div>

            <div className="mt-6 space-y-4">
                {sortedLessons.map((lesson, index) => {
                    const config = lessonTypeConfig[lesson.type];
                    const Icon = config.icon;

                    return (
                        <article
                            key={lesson.id}
                            className="rounded-3xl border border-gray-100 bg-gray-50 p-5"
                        >
                            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                <div className="min-w-0 flex-1">
                                    <div className="mb-3 flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-gray-600 ring-1 ring-gray-200">
                                            Lesson {index + 1}
                                        </span>

                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${config.className}`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {config.label}
                                        </span>

                                        {lesson.is_preview && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-white">
                                                <Star className="h-4 w-4" />
                                                Preview
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-extrabold text-gray-950">
                                        {lesson.title}
                                    </h3>

                                    {lesson.content && (
                                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600">
                                            {lesson.content}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 lg:justify-end">
                                    {lesson.video_url && (
                                        <Button
                                            type="button"
                                            className="rounded-full"
                                            onClick={() => window.open(lesson.video_url!, "_blank")}
                                        >
                                            <PlayCircle className="mr-2 h-4 w-4" />
                                            Lihat Video
                                        </Button>
                                    )}

                                    {lesson.file_url && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="rounded-full"
                                            onClick={() => window.open(lesson.file_url!, "_blank")}
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Download File
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}