
export type InstructorLessonType = "video" | "content" | "file";
export type InstructorCourseStatus = "draft" | "published" | "archived";
export type InstructorCourseLevel = "beginner" | "intermediate" | "advanced";


export type UpdateInstructorCourseLessonPayload = {
    id?: number;
    title: string;
    type: InstructorLessonType;
    content: string;
    video_url?: string | null;
    file_url?: string | null;
    video_file?: File | null;
    file?: File | null;
    is_preview: boolean;
    position: number;
};

export type UpdateInstructorCoursePayload = {
    title: string;
    description: string;
    level: InstructorCourseLevel;
    price: number;
    quota: number;
    status: InstructorCourseStatus;
    thumbnail_url: string | null;
    thumbnail?: File | null;
    lessons: UpdateInstructorCourseLessonPayload[];
};

export type UpdateInstructorCourseResponse = {
    success: boolean;
    message: string;
    data: InstructorCourse;
};


export type InstructorDashboardSummary = {
    total_courses: number;
    total_published_courses: number;
    total_draft_courses: number;
    total_archived_courses: number;
    total_enrollments: number;
    total_reviews: number;
    average_rating: number;
};

export type InstructorDashboardSummaryResponse = {
    success: boolean;
    message: string;
    data: InstructorDashboardSummary;
};

export type UpdateInstructorCourseStatusPayload = {
    status: InstructorCourseStatus;
};

export type UpdateInstructorCourseStatusResponse = {
    success: boolean;
    message: string;
    data: InstructorCourse;
};

export type InstructorCoursePerformance = {
    course_id: number;
    title: string;
    slug: string;
    status: InstructorCourseStatus;
    price: number;
    enrolled_count: number;
    rating_count: number;
    rating_avg: string;
    total_lessons: number;
    created_at: string;
};

export type InstructorCourseCategory = {
    id: number;
    name: string;
    slug: string;
};

export type InstructorCourseLesson = {
    id: number;
    title: string;
    type: InstructorLessonType;
    content: string | null;
    video_url: string | null;
    file_url: string | null;
    is_preview: boolean;
    position: number | null;
    created_at: string;
};

export type InstructorCourseDetailResponse = {
    success: boolean;
    message: string;
    data: InstructorCourse;
};

export type InstructorCourse = {
    id: number;
    title: string;
    slug: string;
    description: string;
    level: InstructorCourseLevel;
    price: number;
    quota: number;
    status: InstructorCourseStatus;
    thumbnail_url: string | null;
    rating_count: number;
    rating_avg: string;
    created_at: string;
    categories: InstructorCourseCategory[];
    lessons: InstructorCourseLesson[];
    file_url: string | null;
    type: "video" | "content" | "file";
};

export type InstructorCoursesPagination = {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
    from: number | null;
    to: number | null;
};

export type InstructorCoursesResponse = {
    success: boolean;
    message: string;
    data: InstructorCourse[];
    pagination: InstructorCoursesPagination;
};

export type InstructorCoursesFilters = {
    user_id: number;
    status?: InstructorCourseStatus | "all";
    level?: InstructorCourseLevel | "all";
    search?: string;
    page?: number;
    per_page?: number;
};



export type InstructorCategory = {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
};

export type InstructorCategoryResponse = {
    success: boolean;
    message: string;
    data: InstructorCategory[];
};

export type CreateInstructorLessonPayload = {
    title: string;
    type: InstructorLessonType;
    content: string;
    is_preview: boolean;
    video_file?: File | null;
    file?: File | null;
};

export type CreateInstructorCoursePayload = {
    title: string;
    description: string;
    level: InstructorCourseLevel;
    price: number;
    quota: number;
    thumbnail: File;
    categories: number[];
    lessons: CreateInstructorLessonPayload[];
};

export type CreateInstructorCourseResponse = {
    success: boolean;
    message: string;
    data: {
        id: number;
        title: string;
        slug: string;
        description: string;
        level: InstructorCourseLevel;
        price: number;
        quota: number;
        status: string;
        thumbnail_url: string | null;
        rating_count: number;
        rating_avg: string;
        created_at: string;
    };
};