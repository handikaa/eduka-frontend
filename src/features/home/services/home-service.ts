import { AxiosError } from "axios";

import { api } from "@/lib/api";
import { CourseListResponse } from "@/features/course/types/course.type";

type ApiErrorResponse = {
  success: false;
  message: string;
};

function getHomeErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data as ApiErrorResponse | undefined;

    if (responseData?.message) {
      return responseData.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan saat mengambil data course.";
}

export const homeService = {
  getPopularCourses: async (): Promise<CourseListResponse> => {
    try {
      const response = await api.get<CourseListResponse>("/courses", {
        params: {
          page: 1,
          per_page: 10,
          status: "published",
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(getHomeErrorMessage(error));
    }
  },
};