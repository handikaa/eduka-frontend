"use client";

import { useCallback, useEffect, useState } from "react";

import { blogService } from "@/features/blog/services/blog-service";
import {
  GetArticlesParams,
  NewsArticle,
} from "@/features/blog/types/blog.type";

const DEFAULT_PARAMS: GetArticlesParams = {
  q: "education technology",
  sortBy: "publishedAt",
  page: 1,
  pageSize: 10,
};

export function useBlogArticles(initialParams: GetArticlesParams = {}) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [params, setParams] = useState<GetArticlesParams>({
    ...DEFAULT_PARAMS,
    ...initialParams,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await blogService.getArticles(params);

      if (response.status === "error") {
        throw new Error(response.message);
      }

      setArticles(response.articles);
      setTotalResults(response.totalResults);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengambil data blog.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const setSearchQuery = (value: string) => {
    setParams((prev) => ({
      ...prev,
      q: value,
      page: 1,
    }));
  };

  const setSortBy = (
    value: NonNullable<GetArticlesParams["sortBy"]>
  ) => {
    setParams((prev) => ({
      ...prev,
      sortBy: value,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setParams((prev) => ({
      ...prev,
      page,
    }));
  };

  return {
    articles,
    totalResults,
    params,
    isLoading,
    errorMessage,
    setSearchQuery,
    setSortBy,
    setPage,
    refetch: fetchArticles,
  };
}