"use client";

import { useCallback, useEffect, useState } from "react";

import { courseService } from "@/features/course/services/course-service";
import { Course } from "@/features/course/types/course.type";

export function useCourseDetail(slug: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchCourseDetail = useCallback(async () => {
    if (!slug) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await courseService.getCourseDetailBySlug(slug);

      if (!response.success) {
        throw new Error(response.message);
      }

      setCourse(response.data);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengambil detail course.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchCourseDetail();
  }, [fetchCourseDetail]);

  return {
    course,
    isLoading,
    errorMessage,
    refetch: fetchCourseDetail,
  };
}