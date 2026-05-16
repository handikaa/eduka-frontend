import { z } from "zod";

const MAX_THUMBNAIL_SIZE = 2 * 1024 * 1024;
const MAX_VIDEO_SIZE = 100 * 1024 * 1024;
const MAX_FILE_SIZE = 20 * 1024 * 1024;

const imageTypes = ["image/jpeg", "image/jpg", "image/png"];
const videoTypes = ["video/mp4"];

export const instructorLessonSchema = z
    .object({
        title: z.string().min(3, "Judul lesson minimal 3 karakter"),
        type: z.enum(["video", "content", "file"]),
        content: z.string().min(1, "Content wajib diisi"),
        is_preview: z.boolean(),
        video_file: z.instanceof(File).nullable().optional(),
        file: z.instanceof(File).nullable().optional(),
    })
    .superRefine((value, ctx) => {
        if (value.type === "video") {
            if (!value.video_file) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Video lesson wajib diupload.",
                    path: ["video_file"],
                });
            }

            if (value.video_file && !videoTypes.includes(value.video_file.type)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Video harus berformat MP4.",
                    path: ["video_file"],
                });
            }

            if (value.video_file && value.video_file.size > MAX_VIDEO_SIZE) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Ukuran video maksimal 100MB.",
                    path: ["video_file"],
                });
            }
        }

        if (value.type === "content" && value.content.length < 20) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Content content minimal 20 karakter.",
                path: ["content"],
            });
        }

        if (value.type === "file") {
            if (!value.file) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "File lesson wajib diupload.",
                    path: ["file"],
                });
            }

            if (value.file && value.file.size > MAX_FILE_SIZE) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Ukuran file maksimal 20MB.",
                    path: ["file"],
                });
            }
        }
    });

export const instructorCourseSchema = z
    .object({
        title: z.string().min(5, "Judul course minimal 5 karakter"),
        description: z.string().min(20, "Deskripsi course minimal 20 karakter"),
        level: z.enum(["beginner", "intermediate", "advanced"]),
        price: z.number().min(0, "Harga tidak boleh negatif"),
        quota: z.number().min(1, "Kuota minimal 1"),
        thumbnail: z
            .instanceof(File, { message: "Thumbnail wajib diupload." })
            .refine((file) => imageTypes.includes(file.type), {
                message: "Thumbnail harus berupa JPG, JPEG, atau PNG.",
            })
            .refine((file) => file.size <= MAX_THUMBNAIL_SIZE, {
                message: "Ukuran thumbnail maksimal 2MB.",
            }),
        categories: z.array(z.number()).min(1, "Pilih minimal 1 kategori"),
        lessons: z
            .array(instructorLessonSchema)
            .min(1, "Minimal buat 1 lesson"),
    })
    .superRefine((value, ctx) => {
        const previewLessons = value.lessons.filter((lesson) => lesson.is_preview);

        if (previewLessons.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Pilih 1 lesson sebagai preview.",
                path: ["lessons"],
            });
        }

        if (previewLessons.length > 1) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Hanya boleh 1 lesson yang menjadi preview.",
                path: ["lessons"],
            });
        }
    });

export type InstructorCourseFormInput = z.input<
    typeof instructorCourseSchema
>;

export type InstructorCourseFormValues = z.output<
    typeof instructorCourseSchema
>;