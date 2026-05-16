import { api } from "@/lib/api";
import {
    CreateInstructorCoursePayload,
    CreateInstructorCourseResponse,
    InstructorCoursePerformance,
    InstructorCoursesFilters,
    InstructorCoursesResponse,
    InstructorDashboardSummary,
    InstructorCategoryResponse,
    InstructorCourseStatus,
    UpdateInstructorCourseStatusResponse,
    InstructorCourseDetailResponse,
    UpdateInstructorCoursePayload,
    UpdateInstructorCourseResponse,
    InstructorDashboardSummaryResponse
} from "@/features/instructor/types/instructor.type";

function buildUpdateCourseFormData(payload: UpdateInstructorCoursePayload) {
    const formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("level", payload.level);
    formData.append("price", String(payload.price));
    formData.append("quota", String(payload.quota));
    formData.append("status", payload.status);

    if (payload.thumbnail_url) {
        formData.append("thumbnail_url", payload.thumbnail_url);
    }

    if (payload.thumbnail) {
        formData.append("thumbnail", payload.thumbnail);
    }

    payload.lessons.forEach((lesson, index) => {
        if (lesson.id) {
            formData.append(`lessons[${index}][id]`, String(lesson.id));
        }

        formData.append(`lessons[${index}][title]`, lesson.title);
        formData.append(`lessons[${index}][type]`, lesson.type);
        formData.append(`lessons[${index}][content]`, lesson.content);
        formData.append(
            `lessons[${index}][is_preview]`,
            lesson.is_preview ? "1" : "0"
        );
        formData.append(`lessons[${index}][position]`, String(index + 1));

        if (lesson.type === "video") {
            if (lesson.video_url) {
                formData.append(`lessons[${index}][video_url]`, lesson.video_url);
            }

            if (lesson.video_file) {
                formData.append(`lessons[${index}][video_file]`, lesson.video_file);
            }
        }

        if (lesson.type === "file") {
            if (lesson.file_url) {
                formData.append(`lessons[${index}][file_url]`, lesson.file_url);
            }

            if (lesson.file) {
                formData.append(`lessons[${index}][file]`, lesson.file);
            }
        }
    });

    return formData;
}


function buildCreateCourseFormData(payload: CreateInstructorCoursePayload) {
    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("level", payload.level);
    formData.append("price", String(payload.price));
    formData.append("quota", String(payload.quota));
    formData.append("thumbnail", payload.thumbnail);

    payload.categories.forEach((categoryId) => {
        formData.append("categories[]", String(categoryId));
    });

    payload.lessons.forEach((lesson, index) => {
        formData.append(`lessons[${index}][title]`, lesson.title);
        formData.append(`lessons[${index}][type]`, lesson.type);
        formData.append(`lessons[${index}][content]`, lesson.content);
        formData.append(
            `lessons[${index}][is_preview]`,
            lesson.is_preview ? "1" : "0"
        );

        if (lesson.type === "video" && lesson.video_file) {
            formData.append(`lessons[${index}][video_file]`, lesson.video_file);
        }

        if (lesson.type === "file" && lesson.file) {
            formData.append(`lessons[${index}][file]`, lesson.file);
        }
    });

    return formData;
}
export const instructorService = {
    async getInstructorDashboardSummary(): Promise<InstructorDashboardSummary> {
        const response = await api.get<InstructorDashboardSummaryResponse>(
            "/dashboard/instructor/summary"
        );

        return response.data.data;
    },

    async updateInstructorCourseStatus(
        slug: string,
        status: InstructorCourseStatus
    ): Promise<UpdateInstructorCourseStatusResponse> {
        const response = await api.patch<UpdateInstructorCourseStatusResponse>(
            `/courses/${slug}/status`,
            {
                status,
            }
        );

        return response.data;
    },

    async getInstructorCoursePerformance(): Promise<
        InstructorCoursePerformance[]
    > {
        const response = await api.get<{
            success: boolean;
            message: string;
            data: {
                courses: InstructorCoursePerformance[];
            };
        }>("/dashboard/instructor/course-performance");

        return response.data.data.courses;
    },

    async getInstructorCourses(
        filters: InstructorCoursesFilters
    ): Promise<InstructorCoursesResponse> {
        const params = {
            user_id: filters.user_id,
            search: filters.search || "",
            page: filters.page ?? 1,
            per_page: filters.per_page ?? 5,
            status:
                filters.status && filters.status !== "all" ? filters.status : undefined,
            level:
                filters.level && filters.level !== "all" ? filters.level : undefined,
        };

        const response = await api.get<InstructorCoursesResponse>("/courses", {
            params,
        });

        return response.data;
    },

    async updateInstructorCourse(
        courseId: number,
        payload: UpdateInstructorCoursePayload
    ): Promise<UpdateInstructorCourseResponse> {
        const formData = buildUpdateCourseFormData(payload);

        const response = await api.post<UpdateInstructorCourseResponse>(
            `/courses/${courseId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    },

    async getCategories() {
        const response = await api.get<InstructorCategoryResponse>("/categories");
        return response.data.data;
    },

    async createInstructorCourse(
        payload: CreateInstructorCoursePayload
    ): Promise<CreateInstructorCourseResponse> {
        const formData = buildCreateCourseFormData(payload);

        const response = await api.post<CreateInstructorCourseResponse>(
            "/courses",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    },

    async getInstructorCourseDetail(
        courseId: number
    ): Promise<InstructorCourseDetailResponse> {
        const response = await api.get<InstructorCourseDetailResponse>(
            `/courses/${courseId}`
        );

        return response.data;
    },

};