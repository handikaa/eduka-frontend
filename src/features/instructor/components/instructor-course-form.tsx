"use client";

import { useMemo, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ArrowDown,
    ArrowUp,
    FileText,
    Plus,
    RefreshCcw,
    Trash2,
    Upload,
    Video,
    XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getApiErrorMessage } from "@/lib/api-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loading } from "@/components/ui/loading";
import { instructorService } from "@/features/instructor/services/instructor-service";
import { useInstructorCategories } from "@/features/instructor/hooks/use-instructor-categories";
import {
    InstructorCourseFormValues,
    instructorCourseSchema,
} from "@/features/instructor/validations/instructor-course-schema";

const defaultLesson = {
    title: "",
    type: "video" as const,
    content: "",
    is_preview: false,
    video_file: null,
    file: null,
};

export function InstructorCourseForm() {
    const router = useRouter();
    const {
        categories,
        isLoading: isLoadingCategories,
        errorMessage: categoryErrorMessage,
        refetch: refetchCategories,
    } = useInstructorCategories();

    const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(
        null
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submitErrorRef = useRef<HTMLDivElement | null>(null);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const scrollToSubmitError = () => {
        window.requestAnimationFrame(() => {
            submitErrorRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        });
    };

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: { errors, isValid },
    } = useForm<InstructorCourseFormValues>({
        resolver: zodResolver(instructorCourseSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: "",
            level: "beginner",
            price: 0,
            quota: 1,
            thumbnail: undefined,
            categories: [],
            lessons: [
                {
                    ...defaultLesson,
                    is_preview: true,
                },
            ],
        },
    });

    const { fields, append, remove, move } = useFieldArray({
        control,
        name: "lessons",
    });

    const selectedCategories = watch("categories");
    const lessons = watch("lessons");
    const priceValue = watch("price");

    const selectedCategorySet = useMemo(() => {
        return new Set(selectedCategories);
    }, [selectedCategories]);

    const handleToggleCategory = (categoryId: number) => {
        const nextCategories = selectedCategorySet.has(categoryId)
            ? selectedCategories.filter((id) => id !== categoryId)
            : [...selectedCategories, categoryId];

        setValue("categories", nextCategories, {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    const handleSetPreviewLesson = (lessonIndex: number) => {
        lessons.forEach((_, index) => {
            setValue(`lessons.${index}.is_preview`, index === lessonIndex, {
                shouldDirty: true,
                shouldValidate: true,
            });
        });
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




    const handleThumbnailChange = (fileList: FileList | null) => {
        const file = fileList?.[0];

        if (!file) {
            return;
        }

        setValue("thumbnail", file, {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    const handleLessonVideoChange = (
        lessonIndex: number,
        fileList: FileList | null
    ) => {
        const file = fileList?.[0];

        if (!file) {
            return;
        }

        setValue(`lessons.${lessonIndex}.video_file`, file, {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    const handleLessonFileChange = (
        lessonIndex: number,
        fileList: FileList | null
    ) => {
        const file = fileList?.[0];

        if (!file) {
            return;
        }

        setValue(`lessons.${lessonIndex}.file`, file, {
            shouldDirty: true,
            shouldValidate: true,
        });
    };

    const handleAddLesson = () => {
        append(defaultLesson);
    };

    const onSubmit = async (values: InstructorCourseFormValues) => {
        setSubmitErrorMessage(null);
        setIsSubmitting(true);

        try {
            await instructorService.createInstructorCourse({
                title: values.title,
                description: values.description,
                level: values.level,
                price: values.price,
                quota: values.quota,
                thumbnail: values.thumbnail,
                categories: values.categories,
                lessons: values.lessons,
            });

            sessionStorage.setItem(
                "instructor_course_success_message",
                "Course berhasil dibuat. Data course sudah diperbarui."
            );

            router.push("/instructor/courses");
        } catch (error) {
            const message = getApiErrorMessage(error, "Gagal membuat course.");

            setSubmitErrorMessage(message);
            setIsSnackbarOpen(true);

            scrollToSubmitError();

            setTimeout(() => {
                setIsSnackbarOpen(false);
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoadingCategories) {
        return (
            <section className="mt-8 rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                <Loading text="Mengambil kategori..." />
            </section>
        );
    }

    if (categoryErrorMessage) {
        return (
            <section className="mt-8 rounded-4xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
                <p className="text-sm font-semibold text-red-700">
                    {categoryErrorMessage}
                </p>

                <Button
                    type="button"
                    variant="outline"
                    className="mt-4 rounded-full"
                    onClick={refetchCategories}
                >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Coba Lagi
                </Button>
            </section>
        );
    }

    return (
        <>
            {isSnackbarOpen && submitErrorMessage && (
                <div className="fixed right-4 top-24 z-50 w-[calc(100%-2rem)] max-w-md rounded-3xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-2xl sm:right-6">
                    <div className="flex items-start gap-3">
                        <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-extrabold">
                                Gagal membuat course
                            </p>

                            <p className="mt-1 line-clamp-3 whitespace-pre-line text-sm leading-6">
                                {submitErrorMessage}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsSnackbarOpen(false)}
                            className="rounded-full px-2 text-lg font-bold leading-none text-red-500 hover:bg-red-100"
                            aria-label="Tutup pesan error"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}


            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
                {submitErrorMessage && (
                    <div
                        ref={submitErrorRef}
                        className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700"
                    >
                        <p className="whitespace-pre-line">{submitErrorMessage}</p>
                    </div>
                )}

                <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                        Course Information
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                        Informasi Course
                    </h2>

                    <div className="mt-6 grid gap-5 lg:grid-cols-2">
                        <Input
                            id="title"
                            label="Judul Course"
                            placeholder="Contoh: Flutter Mobile Development"
                            error={errors.title?.message}
                            {...register("title")}
                        />

                        <div>
                            <label
                                htmlFor="level"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Level
                            </label>

                            <select
                                id="level"
                                className="h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                                {...register("level")}
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>

                            {errors.level?.message && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.level.message}
                                </p>
                            )}
                        </div>

                        <Input
                            id="price"
                            type="text"
                            inputMode="numeric"
                            label="Harga"
                            placeholder="150.000"
                            value={formatCurrencyInput(priceValue)}
                            error={errors.price?.message}
                            onChange={(event) => {
                                const numericValue = parseCurrencyInput(event.target.value);

                                setValue("price", numericValue, {
                                    shouldDirty: true,
                                    shouldValidate: true,
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
                                setValueAs: (value) => {
                                    if (value === "" || value === null || value === undefined) {
                                        return 1;
                                    }

                                    return Number(value);
                                },
                            })}
                        />
                    </div>

                    <div className="mt-5">
                        <label
                            htmlFor="description"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Deskripsi Course
                        </label>

                        <textarea
                            id="description"
                            rows={5}
                            placeholder="Tuliskan deskripsi course..."
                            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                            {...register("description")}
                        />

                        {errors.description?.message && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="mt-5">
                        <label
                            htmlFor="thumbnail"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Thumbnail Course
                        </label>

                        <label
                            htmlFor="thumbnail"
                            className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition-colors hover:border-primary hover:bg-primary/5"
                        >
                            <Upload className="h-8 w-8 text-primary" />
                            <span className="mt-3 text-sm font-bold text-gray-950">
                                Upload thumbnail
                            </span>
                            <span className="mt-1 text-xs text-gray-500">
                                JPG, JPEG, atau PNG. Maksimal 2MB.
                            </span>
                        </label>

                        <input
                            id="thumbnail"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            className="hidden"
                            onChange={(event) => handleThumbnailChange(event.target.files)}
                        />

                        {watch("thumbnail") && (
                            <p className="mt-2 text-sm font-semibold text-primary">
                                File dipilih: {watch("thumbnail").name}
                            </p>
                        )}

                        {errors.thumbnail?.message && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.thumbnail.message}
                            </p>
                        )}
                    </div>
                </section>

                <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                        Categories
                    </p>

                    <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                        Pilih Kategori
                    </h2>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {categories.map((category) => {
                            const isSelected = selectedCategorySet.has(category.id);

                            return (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => handleToggleCategory(category.id)}
                                    className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${isSelected
                                        ? "border-primary bg-primary text-white"
                                        : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>

                    {errors.categories?.message && (
                        <p className="mt-3 text-sm text-red-600">
                            {errors.categories.message}
                        </p>
                    )}
                </section>

                <section className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                                Lessons
                            </p>

                            <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                                Susun Lesson
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Hanya 1 lesson yang boleh menjadi preview.
                            </p>
                        </div>


                    </div>

                    {errors.lessons?.message && (
                        <p className="mt-3 text-sm text-red-600">{errors.lessons.message}</p>
                    )}

                    <div className="mt-6 space-y-5">
                        {fields.map((field, index) => {
                            const lessonType = watch(`lessons.${index}.type`);
                            const isPreview = watch(`lessons.${index}.is_preview`);

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
                                            <p className="mt-1 text-xs text-gray-500">
                                                Atur title, tipe lesson, content, dan file sesuai tipe.
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="h-9 w-9 rounded-full px-0 py-0 text-secondary disabled:opacity-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200"
                                                disabled={index === 0}
                                                onClick={() => move(index, index - 1)}
                                                aria-label="Pindahkan lesson ke atas"
                                            >
                                                <ArrowUp className="h-5 w-5 stroke-current" />
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="h-9 w-9 rounded-full px-0 py-0 text-secondary disabled:opacity-100 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200"
                                                disabled={index === fields.length - 1}
                                                onClick={() => move(index, index + 1)}
                                                aria-label="Pindahkan lesson ke bawah"
                                            >
                                                <ArrowDown className="h-5 w-5 stroke-current" />
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="danger"
                                                className="h-9 w-9 rounded-full px-0 py-0 text-white disabled:opacity-100 disabled:bg-red-300 disabled:text-white"
                                                disabled={fields.length === 1}
                                                onClick={() => remove(index)}
                                                aria-label="Hapus lesson"
                                            >
                                                <Trash2 className="h-5 w-5 stroke-current" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid gap-5 lg:grid-cols-2">
                                        <Input
                                            id={`lesson-title-${index}`}
                                            label="Judul Lesson"
                                            placeholder="Contoh: Welcome to Flutter"
                                            error={errors.lessons?.[index]?.title?.message}
                                            {...register(`lessons.${index}.title`)}
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
                                            placeholder={
                                                lessonType === "content"
                                                    ? "Tulis materi panjang seperti artikel..."
                                                    : "Tuliskan ringkasan atau deskripsi lesson..."
                                            }
                                            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/10"
                                            {...register(`lessons.${index}.content`)}
                                        />

                                        {errors.lessons?.[index]?.content?.message && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.lessons[index]?.content?.message}
                                            </p>
                                        )}
                                    </div>

                                    {lessonType === "video" && (
                                        <div className="mt-5">
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                Video File
                                            </label>

                                            <label
                                                htmlFor={`lesson-video-${index}`}
                                                className="flex cursor-pointer items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-6 text-center transition-colors hover:border-primary hover:bg-primary/5"
                                            >
                                                <Video className="mr-2 h-5 w-5 text-primary" />
                                                <span className="text-sm font-bold text-gray-950">
                                                    Upload video MP4
                                                </span>
                                            </label>

                                            <input
                                                id={`lesson-video-${index}`}
                                                type="file"
                                                accept="video/mp4"
                                                className="hidden"
                                                onChange={(event) =>
                                                    handleLessonVideoChange(index, event.target.files)
                                                }
                                            />

                                            {watch(`lessons.${index}.video_file`) && (
                                                <p className="mt-2 text-sm font-semibold text-primary">
                                                    File dipilih:{" "}
                                                    {watch(`lessons.${index}.video_file`)?.name}
                                                </p>
                                            )}

                                            {errors.lessons?.[index]?.video_file?.message && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.lessons[index]?.video_file?.message}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {lessonType === "file" && (
                                        <div className="mt-5">
                                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                                File Materi
                                            </label>

                                            <label
                                                htmlFor={`lesson-file-${index}`}
                                                className="flex cursor-pointer items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-6 text-center transition-colors hover:border-primary hover:bg-primary/5"
                                            >
                                                <FileText className="mr-2 h-5 w-5 text-primary" />
                                                <span className="text-sm font-bold text-gray-950">
                                                    Upload file materi
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

                                            {watch(`lessons.${index}.file`) && (
                                                <p className="mt-2 text-sm font-semibold text-primary">
                                                    File dipilih: {watch(`lessons.${index}.file`)?.name}
                                                </p>
                                            )}

                                            {errors.lessons?.[index]?.file?.message && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.lessons[index]?.file?.message}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <div className="mt-5 flex flex-wrap items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleSetPreviewLesson(index)}
                                            className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${isPreview
                                                ? "border-secondary bg-secondary text-white"
                                                : "border-gray-200 bg-white text-gray-700 hover:border-secondary hover:text-secondary"
                                                }`}
                                        >
                                            {isPreview ? "Preview Lesson" : "Set as Preview"}
                                        </button>
                                    </div>


                                </article>
                            );
                        })}

                        <div className="mt-5 flex items-center justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-fit rounded-full"
                                onClick={handleAddLesson}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Lesson
                            </Button>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end gap-3">
                    <Button
                        type="button"
                        variant="outline"
                        className="rounded-full"
                        onClick={() => router.push("/instructor/courses")}
                    >
                        Batal
                    </Button>

                    <Button
                        type="submit"
                        className="rounded-full"
                        isLoading={isSubmitting}
                        disabled={isSubmitting || !isValid}
                    >
                        Simpan Course
                    </Button>
                </div>
            </form>
        </>
    );
}