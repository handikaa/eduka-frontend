import { AxiosError } from "axios";

import { api } from "@/lib/api";
import {
  CourseReviewListResponse,
  GetCourseReviewsParams,
} from "@/features/course/types/course-review.type";

type ApiErrorResponse = {
  success: false;
  message: string;
};

function getCourseReviewErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data as ApiErrorResponse | undefined;

    if (responseData?.message) {
      return responseData.message;
    }

    if (error.response?.status) {
      return `Request gagal dengan status ${error.response.status}`;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan saat mengambil data review course.";
}

export const courseReviewService = {
  getCourseReviewsBySlug: async (
    slug: string,
    { page = 1, per_page = 10 }: GetCourseReviewsParams = {}
  ): Promise<CourseReviewListResponse> => {
    try {
      const response = await api.get<CourseReviewListResponse>(
        `/course-reviews/courses/slug/${slug}`,
        {
          params: {
            page,
            per_page,
          },
          headers: {
            Accept: "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(getCourseReviewErrorMessage(error));
    }
  },
};