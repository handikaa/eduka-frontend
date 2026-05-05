export type NewsSource = {
  id: string | null;
  name: string;
};

export type NewsArticle = {
  source: NewsSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export type NewsApiSuccessResponse = {
  status: "ok";
  totalResults: number;
  articles: NewsArticle[];
};

export type NewsApiErrorResponse = {
  status: "error";
  code?: string;
  message: string;
};

export type NewsApiResponse = NewsApiSuccessResponse | NewsApiErrorResponse;

export type GetArticlesParams = {
  q?: string;
  from?: string;
  sortBy?: "relevancy" | "popularity" | "publishedAt";
  page?: number;
  pageSize?: number;
};