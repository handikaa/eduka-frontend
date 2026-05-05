"use client";

import { useCallback, useEffect, useState } from "react";

import { homeService } from "@/features/home/services/home-service";
import { Course } from "@/features/course/types/course.type";

export function usePopularCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchPopularCourses = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await homeService.getPopularCourses();

      if (!response.success) {
        throw new Error(response.message);
      }

      setCourses(response.data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengambil data popular course.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopularCourses();
  }, [fetchPopularCourses]);

  return {
    courses,
    isLoading,
    errorMessage,
    refetch: fetchPopularCourses,
  };
}