import {
  GetArticlesParams,
  NewsApiResponse,
} from "@/features/blog/types/blog.type";

function createQueryString(params: GetArticlesParams) {
  const searchParams = new URLSearchParams();

  if (params.q) {
    searchParams.set("q", params.q);
  }

  if (params.from) {
    searchParams.set("from", params.from);
  }

  if (params.sortBy) {
    searchParams.set("sortBy", params.sortBy);
  }

  if (params.page) {
    searchParams.set("page", String(params.page));
  }

  if (params.pageSize) {
    searchParams.set("pageSize", String(params.pageSize));
  }

  return searchParams.toString();
}

export const blogService = {
  getArticles: async (
    params: GetArticlesParams = {}
  ): Promise<NewsApiResponse> => {
    const queryString = createQueryString(params);
    const endpoint = queryString ? `/api/news?${queryString}` : "/api/news";

    const response = await fetch(endpoint, {
      method: "GET",
      cache: "no-store",
    });

    const data = (await response.json()) as NewsApiResponse;

    if (!response.ok) {
      const message =
        data.status === "error"
          ? data.message
          : "Gagal mengambil data blog.";

      throw new Error(message);
    }

    return data;
  },
};