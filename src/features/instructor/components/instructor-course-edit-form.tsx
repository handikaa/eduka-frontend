"use client";

import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import {
    ArrowDown,
    ArrowUp,
    FileText,
    Plus,
    Star,
    Trash2,
    Upload,
    Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProxiedMediaUrl } from "@/lib/media-url";
import {
    InstructorCourse,
    InstructorCourseStatus,
    UpdateInstructorCoursePayload,
    InstructorLessonType,
} from "@/features/instructor/types/instructor.type";
import { InstructorLessonVideoPreview } from "@/features/instructor/components/instructor-lesson-video-preview";
import { InstructorLessonFilePreview } from "@/features/instructor/components/instructor-lesson-file-preview";

type InstructorCourseEditFormValues = {
    title: string;
    description: string;
    level: "beginner" | "intermediate" | "advanced";
    price: number;
    quota: number;
    status: InstructorCourseStatus;
    thumbnail_url: string;
    thumbnail: File | null;
    lessons: {
        id?: number;
        title: string;
        type: InstructorLessonType;
        content: string;
        video_url: string;
        file_url: string;
        video_file: File | null;
        file: File | null;
        is_preview: boolean;
    }[];
};

type InstructorCourseEditFormProps = {
    course: InstructorCourse;
    isUpdating: boolean;
    onSubmit: (payload: UpdateInstructorCoursePayload) => Promise<void>;
};

function formatCurrencyInput(value: number | string | undefined | null) {
    if (value === undefined || value === null || value === 0 || value === "0") {
        return "";
    }

    const numericValue = String(value).replace(/\D/g, "");

    if (numericValue === "") {
        return "";
    }

    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseCurrencyInput(value: string) {
    const numericValue = value.replace(/\D/g, "");
    return Number(numericValue || 0);
}

export function InstructorCourseEditForm({
    course,
    isUpdating,
    onSubmit,
}: InstructorCourseEditFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<InstructorCourseEditFormValues>({

        defaultValues: {
            title: course.title,
            description: course.description,
            level: course.level,
            price: course.price,
            quota: course.quota,
            status: course.status,
            thumbnail_url: course.thumbnail_url ?? "",
            thumbnail: null,

            lessons: course.lessons
                .slice()
                .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                .map((lesson) => ({
                    id: lesson.id,
                    title: lesson.title,
                    type: lesson.type,
                    content: lesson.content ?? "",
                    video_url: lesson.video_url ?? "",
                    file_url: lesson.file_url ?? "",
                    video_file: null,
                    file: null,
                    is_preview: lesson.is_preview,
                })),
        },
    });

    const { fields, append, move, remove } = useFieldArray({
        control,
        name: "lessons",
    });

    const lessons = watch("lessons");
    const priceValue = watch("price");
    const thumbnailFile = watch("thumbnail");
    const thumbnailUrl = watch("thumbnail_url");

    const safeThumbnailUrl = getProxiedMediaUrl(thumbnailUrl);

    const handleSetPreviewLesson = (lessonIndex: number) => {
        lessons.forEach((_, index) => {
            setValue(`lessons.${index}.is_preview`, index === lessonIndex, {
                shouldDirty: true,
            });
        });
    };

    const handleThumbnailChange = (fileList: FileList | null) => {
        const file = fileList?.[0] ?? null;

        setValue("thumbnail", file, {
            shouldDirty: true,
        });
    };

    const handleLessonVideoChange = (
        lessonIndex: number,
        fileList: FileList | null
    ) => {
        const file = fileList?.[0] ?? null;

        setValue(`lessons.${lessonIndex}.video_file`, file, {
            shouldDirty: true,
        });
    };

    const handleLessonFileChange = (
        lessonIndex: number,
        fileList: FileList | null
    ) => {
        const file = fileList?.[0] ?? null;

        setValue(`lessons.${lessonIndex}.file`, file, {
            shouldDirty: true,
        });
    };

    const handleAddLesson = (type: InstructorLessonType = "content") => {
        append({
            title: "",
            type,
            content: "",
            video_url: "",
            file_url: "",
            video_file: null,
            file: null,
            is_preview: false,
        });
    };

    const submitForm = async (values: InstructorCourseEditFormValues) => {
        const payload: UpdateInstructorCoursePayload = {
            title: values.title,
            description: values.description,
            level: values.level,
            price: values.price,
            quota: values.quota,
            status: values.status,
            thumbnail_url: values.thumbnail_url || null,
            thumbnail: values.thumbnail,
            lessons: values.lessons.map((lesson, index) => ({
                id: lesson.id,
                title: lesson.title,
                type: lesson.type,
                content: lesson.content,
                video_url: lesson.video_url || null,
                file_url: lesson.file_url || null,
                video_file: lesson.video_file,
                file: lesson.file,
                is_preview: lesson.is_preview,
                position: index + 1,
            })),
        };

        await onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit(submitForm)} className="space-y-8">
            <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                    Edit Course
                </p>

                <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                    Informasi Course
                </h2>

                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    <Input
                        id="title"
                        label="Judul Course"
                        placeholder="Masukkan judul course"
                        error={errors.title?.message}
                        {...register("title", {
                            required: "Judul course wajib diisi.",
                        })}
                    />

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Level
                        </label>

                        <select
                            className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                            {...register("level")}
                        >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <Input
                        id="price"
                        type="text"
                        inputMode="numeric"
                        label="Harga"
                        placeholder="299.000"
                        value={formatCurrencyInput(priceValue)}
                        error={errors.price?.message}
                        onChange={(event) => {
                            setValue("price", parseCurrencyInput(event.target.value), {
                                shouldDirty: true,
                            });
                        }}
                    />

                    <Input
                        id="quota"
                        type="number"
                        label="Kuota"
                        placeholder="50"
                        error={errors.quota?.message}
                        {...register("quota", {
                            valueAsNumber: true,
                            min: {
                                value: 1,
                                message: "Kuota minimal 1.",
                            },
                        })}
                    />

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Status
                        </label>

                        <select
                            className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                            {...register("status")}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>

                    {/* <Input
                        id="thumbnail_url"
                        label="Thumbnail URL Lama"
                        placeholder="Thumbnail lama"
                        error={errors.thumbnail_url?.message}
                        {...register("thumbnail_url")}
                    /> */}
                </div>

                <div className="mt-5">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Deskripsi Course
                    </label>

                    <textarea
                        rows={5}
                        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                        placeholder="Masukkan deskripsi course"
                        {...register("description", {
                            required: "Deskripsi course wajib diisi.",
                        })}
                    />

                    {errors.description?.message && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[260px_1fr]">
                    <div className="relative min-h-48 overflow-hidden rounded-3xl bg-gray-200">
                        <Image
                            src={safeThumbnailUrl}
                            alt={course.title}
                            fill
                            unoptimized
                            sizes="260px"
                            className="object-cover"
                        />
                    </div>

                    <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-6">
                        <label
                            htmlFor="thumbnail"
                            className="flex cursor-pointer flex-col items-center justify-center text-center"
                        >
                            <Upload className="h-8 w-8 text-primary" />
                            <span className="mt-3 text-sm font-bold text-gray-950">
                                Ganti thumbnail
                            </span>
                            <span className="mt-1 text-xs text-gray-500">
                                JPG, JPEG, PNG, atau WEBP. Kosongkan jika tidak ingin mengganti.
                            </span>
                        </label>

                        <input
                            id="thumbnail"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            className="hidden"
                            onChange={(event) => handleThumbnailChange(event.target.files)}
                        />

                        {thumbnailFile && (
                            <p className="mt-3 text-sm font-semibold text-primary">
                                File baru: {thumbnailFile.name}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                            Lessons
                        </p>

                        <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                            Edit Lessons
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Existing lesson tidak bisa dihapus. Kamu bisa mengubah urutan dan
                            menambahkan lesson baru.
                        </p>
                    </div>
                </div>

                <div className="mt-6 space-y-5">
                    {fields.map((field, index) => {
                        const lessonType = watch(`lessons.${index}.type`);
                        const isPreview = watch(`lessons.${index}.is_preview`);
                        const lessonId = watch(`lessons.${index}.id`);
                        const videoFile = watch(`lessons.${index}.video_file`);
                        const file = watch(`lessons.${index}.file`);

                        const lessonTitle = watch(`lessons.${index}.title`);
                        const lessonVideoUrl = watch(`lessons.${index}.video_url`);
                        const lessonFileUrl = watch(`lessons.${index}.file_url`);

                        const isExistingLesson = Boolean(lessonId);

                        return (
                            <article
                                key={field.id}
                                className="rounded-3xl border border-gray-200 bg-gray-50 p-5"
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    <div>
                                        <p className="text-sm font-extrabold text-gray-950">
                                            Lesson {index + 1}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-9 w-9 rounded-full px-0 py-0 text-secondary"
                                            disabled={index === 0}
                                            onClick={() => move(index, index - 1)}
                                        >
                                            <ArrowUp className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-9 w-9 rounded-full px-0 py-0 text-secondary"
                                            disabled={index === fields.length - 1}
                                            onClick={() => move(index, index + 1)}
                                        >
                                            <ArrowDown className="h-4 w-4" />
                                        </Button>

                                        {!isExistingLesson && (
                                            <Button
                                                type="button"
                                                variant="danger"
                                                className="h-9 w-9 rounded-full px-0 py-0"
                                                onClick={() => remove(index)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-2 grid gap-5 lg:grid-cols-2">
                                    <Input
                                        id={`lesson-title-${index}`}
                                        label="Judul Lesson"
                                        placeholder="Judul lesson"
                                        {...register(`lessons.${index}.title`, {
                                            required: "Judul lesson wajib diisi.",
                                        })}
                                    />

                                    <div>
                                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                                            Tipe Lesson
                                        </label>

                                        <select
                                            className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                                            {...register(`lessons.${index}.type`)}
                                        >
                                            <option value="video">Video</option>
                                            <option value="content">Content</option>
                                            <option value="file">File</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                                        Content
                                    </label>

                                    <textarea
                                        rows={lessonType === "content" ? 8 : 4}
                                        className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                                        placeholder={
                                            lessonType === "content"
                                                ? "Tulis materi content..."
                                                : "Tuliskan deskripsi lesson..."
                                        }
                                        {...register(`lessons.${index}.content`, {
                                            required: "Content lesson wajib diisi.",
                                        })}
                                    />
                                </div>

                                {lessonType === "video" && (
                                    <div className="mt-5 space-y-4">
                                        {isExistingLesson && (
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                    Video Saat Ini
                                                </label>

                                                <InstructorLessonVideoPreview
                                                    videoUrl={lessonVideoUrl}
                                                    title={lessonTitle || `Lesson ${index + 1}`}
                                                />

                                                <input type="hidden" {...register(`lessons.${index}.video_url`)} />
                                            </div>
                                        )}

                                        <div>
                                            <label
                                                htmlFor={`lesson-video-file-${index}`}
                                                className="flex cursor-pointer items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-6 text-center transition-colors hover:border-primary hover:bg-primary/5"
                                            >
                                                <Video className="mr-2 h-5 w-5 text-primary" />
                                                <span className="text-sm font-bold text-gray-950">
                                                    {isExistingLesson ? "Ganti video MP4" : "Upload video MP4"}
                                                </span>
                                            </label>

                                            <input
                                                id={`lesson-video-file-${index}`}
                                                type="file"
                                                accept="video/mp4"
                                                className="hidden"
                                                onChange={(event) =>
                                                    handleLessonVideoChange(index, event.target.files)
                                                }
                                            />

                                            {videoFile && (
                                                <p className="mt-2 text-sm font-semibold text-primary">
                                                    File video baru: {videoFile.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {lessonType === "file" && (
                                    <div className="mt-5 space-y-4">
                                        {isExistingLesson && (
                                            <div>
                                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                    File Saat Ini
                                                </label>

                                                <InstructorLessonFilePreview
                                                    fileUrl={lessonFileUrl}
                                                    title={lessonTitle || `Lesson ${index + 1}`}
                                                />

                                                <input type="hidden" {...register(`lessons.${index}.file_url`)} />
                                            </div>
                                        )}

                                        <div>
                                            <label
                                                htmlFor={`lesson-file-${index}`}
                                                className="flex cursor-pointer items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-6 text-center transition-colors hover:border-primary hover:bg-primary/5"
                                            >
                                                <FileText className="mr-2 h-5 w-5 text-primary" />
                                                <span className="text-sm font-bold text-gray-950">
                                                    {isExistingLesson ? "Ganti file materi" : "Upload file materi"}
                                                </span>
                                            </label>

                                            <input
                                                id={`lesson-file-${index}`}
                                                type="file"
                                                className="hidden"
                                                onChange={(event) =>
                                                    handleLessonFileChange(index, event.target.files)
                                                }
                                            />

                                            {file && (
                                                <p className="mt-2 text-sm font-semibold text-primary">
                                                    File baru: {file.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="mt-5 flex flex-wrap items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleSetPreviewLesson(index)}
                                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors ${isPreview
                                            ? "border-secondary bg-secondary text-white"
                                            : "border-gray-200 bg-white text-gray-700 hover:border-secondary hover:text-secondary"
                                            }`}
                                    >
                                        <Star className="h-4 w-4" />
                                        {isPreview ? "Preview Lesson" : "Set as Preview"}
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>

                <div className="flex flex-wrap gap-2 mt-4 justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        className="rounded-full"
                        onClick={() => handleAddLesson("content")}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Content
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="rounded-full"
                        onClick={() => handleAddLesson("video")}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Video
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        className="rounded-full"
                        onClick={() => handleAddLesson("file")}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        File
                    </Button>
                </div>
            </section>

            <div className="flex justify-end gap-3">
                <Button type="submit" className="rounded-full" isLoading={isUpdating}>
                    Simpan Perubahan
                </Button>
            </div>
        </form>
    );
}