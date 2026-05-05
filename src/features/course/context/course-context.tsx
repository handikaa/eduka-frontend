"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { courseService } from "@/features/course/services/course-service";
import {
  Course,
  CourseCategory,
  CourseContextType,
  CourseFilterState,
  CourseLevel,
  CoursePagination,
  CourseStatus,
} from "@/features/course/types/course.type";

export const CourseContext = createContext<CourseContextType | undefined>(
  undefined
);

type CourseProviderProps = {
  children: ReactNode;
};

const initialFilters: CourseFilterState = {
  category_id: null,
  level: "all",
  search: "",
  status: "published",
  page: 1,
  per_page: 6,
};

export function CourseProvider({ children }: CourseProviderProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CourseCategory[]>([]);
  const [pagination, setPagination] = useState<CoursePagination | null>(null);
  const [filters, setFilters] = useState<CourseFilterState>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [recommendedPagination, setRecommendedPagination] = useState<CoursePagination | null>(null);
  const [isRecommendedLoading, setIsRecommendedLoading] = useState(false);
  const [recommendedErrorMessage, setRecommendedErrorMessage] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await courseService.getCategories();

      if (!response.success) {
        throw new Error(response.message);
      }

      setCategories(response.data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengambil data category.";

      setErrorMessage(message);
    }
  }, []);

  const fetchRecommendedCourses = useCallback(async (userId: number) => {
  setIsRecommendedLoading(true);
  setRecommendedErrorMessage(null);

  try {
    const response = await courseService.getRecommendedCourses({
      recommended: userId,
      page: 1,
      per_page: 10,
    });

    console.log("Recommended Courses Response:", response);

    if (!response.success) {
      throw new Error(response.message);
    }

    setRecommendedCourses(response.data);
    setRecommendedPagination(response.pagination);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Gagal mengambil data recommended course.";

    setRecommendedErrorMessage(message);
  } finally {
    setIsRecommendedLoading(false);
  }
}, []);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await courseService.getCourses(filters);

      if (!response.success) {
        throw new Error(response.message);
      }

      setCourses(response.data);
      setPagination(response.pagination);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengambil data course.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const setSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const setCategoryId = (categoryId: number | null) => {
    setFilters((prev) => ({
      ...prev,
      category_id: categoryId,
      page: 1,
    }));
  };

  const setLevel = (level: CourseLevel | "all") => {
    setFilters((prev) => ({
      ...prev,
      level,
      page: 1,
    }));
  };

  const setStatus = (status: CourseStatus | "all") => {
    setFilters((prev) => ({
      ...prev,
      status,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return (
   <CourseContext.Provider
    value={{
    courses,
    recommendedCourses,
    categories,
    pagination,
    recommendedPagination,
    filters,
    isLoading,
    isRecommendedLoading,
    errorMessage,
    recommendedErrorMessage,
    setSearch,
    setCategoryId,
    setLevel,
    setStatus,
    setPage,
    clearFilters,
    refetchCourses: fetchCourses,
    fetchRecommendedCourses,
  }}
>
  {children}
</CourseContext.Provider>
  );
}