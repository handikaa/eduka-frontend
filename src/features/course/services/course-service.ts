import { AxiosError } from "axios";

import {
  createDummyCourseListResponse,
  dummyCourseCategoryResponse,
  dummyCourses,
} from "@/features/course/constants/course-dummy-data";
import {
  CourseCategoryResponse,
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
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan saat mengambil data course.";
}

function simulateDelay(ms = 400): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const courseService = {
  getCourses: async ({
    category_id = null,
    level = "all",
    search = "",
    status = "all",
    page = 1,
    per_page = 6,
  }: GetCoursesParams): Promise<CourseListResponse> => {
    try {
      /**
       * Simulasi request API.
       *
       * Nanti saat API sudah siap, ganti block dummy ini menjadi:
       *
       * const response = await api.get<CourseListResponse>("/courses", {
       *   params: {
       *     category_id,
       *     level: level === "all" ? undefined : level,
       *     search,
       *     status: status === "all" ? undefined : status,
       *     page,
       *     per_page,
       *   },
       * });
       *
       * return response.data;
       */

      console.log("Simulated GET /courses params:", {
        category_id,
        level,
        search,
        status,
        page,
        per_page,
      });

      await simulateDelay();

      const normalizedSearch = search.trim().toLowerCase();

      const filteredCourses = dummyCourses.filter((course) => {
        const matchCategory =
          !category_id ||
          course.categories.some((category) => category.id === category_id);

        const matchLevel = level === "all" || course.level === level;

        const matchStatus = status === "all" || course.status === status;

        const matchSearch =
          normalizedSearch.length === 0 ||
          course.title.toLowerCase().includes(normalizedSearch) ||
          course.description.toLowerCase().includes(normalizedSearch) ||
          course.categories.some((category) =>
            category.name.toLowerCase().includes(normalizedSearch)
          );

        return matchCategory && matchLevel && matchStatus && matchSearch;
      });

      return createDummyCourseListResponse(filteredCourses, page, per_page);
    } catch (error) {
      throw new Error(getCourseErrorMessage(error));
    }
  },

  getRecommendedCourses: async ({
  recommended,
  page = 1,
  per_page = 10,
}: GetRecommendedCoursesParams): Promise<CourseListResponse> => {
  try {
    /**
     * Simulasi request API recommended course.
     *
     * Nanti saat API sudah siap, ganti menjadi:
     *
     * const response = await api.get<CourseListResponse>("/courses", {
     *   params: {
     *     recomended,
     *     page,
     *     per_page,
     *   },
     * });
     *
     * return response.data;
     */

    console.log("Simulated GET /courses recommended params:", {
      recommended,
      page,
      per_page,
    });

    await simulateDelay();

    const recommendedCourses = dummyCourses.slice(0, per_page);

    return createDummyCourseListResponse(
      recommendedCourses,
      page,
      per_page
    );
  } catch (error) {
    throw new Error(getCourseErrorMessage(error));
  }
},

  getCategories: async (): Promise<CourseCategoryResponse> => {
    try {
      /**
       * Simulasi request API.
       *
       * Nanti saat API sudah siap, ganti menjadi:
       *
       * const response = await api.get<CourseCategoryResponse>("/categories");
       * return response.data;
       */

      console.log("Simulated GET /categories");

      await simulateDelay();

      return dummyCourseCategoryResponse;
    } catch (error) {
      throw new Error(getCourseErrorMessage(error));
    }
  },
};