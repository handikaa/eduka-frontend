import { AxiosError } from "axios";

import { api } from "@/lib/api";
import {
  CourseCategoryResponse,
  CourseDetailResponse,
  CourseListResponse,
  GetCoursesParams,
  GetRecommendedCoursesParams,
} from "@/features/course/types/course.type";

type ApiErrorResponse = {
  success: false;
  message: string;
};

function getCourseErrorMessage(error: unknown): string {
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

  return "Terjadi kesalahan saat mengambil data course.";
}

export const courseService = {
  getCourses: async ({
    category_id = null,
    level = "all",
    search = "",
    status = "published",
    page = 1,
    per_page = 5,
  }: GetCoursesParams): Promise<CourseListResponse> => {
    try {
      const response = await api.get<CourseListResponse>("/courses", {
        params: {
          category_id: category_id ?? "",
          level: level === "all" ? "" : level,
          search,
          page,
          per_page,
          status: status === "all" ? "" : status,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(getCourseErrorMessage(error));
    }
  },

  getRecommendedCourses: async ({
    // recommended,
    page = 1,
    per_page = 10,
  }: GetRecommendedCoursesParams): Promise<CourseListResponse> => {
    try {
      const response = await api.get<CourseListResponse>("/courses", {
        params: {
          // recommended,
          page,
          per_page,
          status: "published",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(getCourseErrorMessage(error));
    }
  },

  getCategories: async (): Promise<CourseCategoryResponse> => {
    try {
      const response = await api.get<CourseCategoryResponse>("/categories");

      return response.data;
    } catch (error) {
      throw new Error(getCourseErrorMessage(error));
    }
  },

  getCourseDetailBySlug: async (slug: string): Promise<CourseDetailResponse> => {
    try {
      const response = await api.get<CourseDetailResponse>(
        `/courses/slug/${slug}`
      );

      return response.data;
    } catch (error) {
      throw new Error(getCourseErrorMessage(error));
    }
  },
};