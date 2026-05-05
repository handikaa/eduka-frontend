export type CourseLevel = "beginner" | "intermediate" | "advanced";

export type CourseStatus = "draft" | "published" | "archived";

export type CourseCategory = {
  id: number;
  name: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
};

export type CourseDetailResponse = {
  success: boolean;
  message: string;
  data: Course;
};

export type GetRecommendedCoursesParams = {
  recommended: number;
  page?: number;
  per_page?: number;
};

export type CourseLesson = {
  id: number;
  title: string;
  type: string;
  content: string;
  video_url: string | null;
  is_preview: boolean;
  position: number | null;
  created_at: string;
};

export type Course = {
  id: number;
  title: string;
  slug: string;
  description: string;
  level: CourseLevel;
  price: number;
  quota: number;
  status: CourseStatus;
  thumbnail_url: string | null;
  rating_count: number;
  rating_avg: string;
  created_at: string;
  categories: CourseCategory[];
  lessons: CourseLesson[];
};

export type CoursePagination = {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
};

export type CourseListResponse = {
  success: boolean;
  message: string;
  data: Course[];
  pagination: CoursePagination;
};

export type CourseCategoryResponse = {
  success: boolean;
  message: string;
  data: CourseCategory[];
};

export type GetCoursesParams = {
  category_id?: number | null;
  level?: CourseLevel | "all";
  search?: string;
  status?: CourseStatus | "all";
  page?: number;
  per_page?: number;
};

export type CourseFilterState = {
  category_id: number | null;
  level: CourseLevel | "all";
  search: string;
  status: CourseStatus | "all";
  page: number;
  per_page: number;
};

export type CourseContextType = {
  courses: Course[];
  recommendedCourses: Course[];
  categories: CourseCategory[];
  pagination: CoursePagination | null;
  recommendedPagination: CoursePagination | null;
  filters: CourseFilterState;
  isLoading: boolean;
  isRecommendedLoading: boolean;
  errorMessage: string | null;
  recommendedErrorMessage: string | null;
  setSearch: (value: string) => void;
  setCategoryId: (categoryId: number | null) => void;
  setLevel: (level: CourseLevel | "all") => void;
  setStatus: (status: CourseStatus | "all") => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
  refetchCourses: () => Promise<void>;
  fetchRecommendedCourses: (userId: number) => Promise<void>;
};