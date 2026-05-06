"use client";

import { useCallback, useEffect, useState } from "react";

import { courseReviewService } from "@/features/course/services/course-review-service";
import {
  CourseReview,
  CourseReviewPagination,
} from "@/features/course/types/course-review.type";

export function useCourseReviews(slug: string) {
  const [reviews, setReviews] = useState<CourseReview[]>([]);
  const [pagination, setPagination] = useState<CourseReviewPagination | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    if (!slug) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await courseReviewService.getCourseReviewsBySlug(slug, {
        page,
        per_page: perPage,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      setReviews(response.data);
      setPagination(response.pagination);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengambil review course.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [slug, page, perPage]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    pagination,
    page,
    isLoading,
    errorMessage,
    setPage,
    refetch: fetchReviews,
  };
}