export type CourseReviewUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type CourseReview = {
  id: number;
  course_id: number;
  user_id: number;
  rating: number;
  comment: string;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
  user: CourseReviewUser;
};

export type CourseReviewPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type CourseReviewListResponse = {
  success: boolean;
  message: string;
  data: CourseReview[];
  pagination: CourseReviewPagination;
};

export type GetCourseReviewsParams = {
  page?: number;
  per_page?: number;
};