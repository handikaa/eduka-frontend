"use client";

import { useState } from "react";
import { RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { Pagination } from "@/components/ui/pagination";
import { BlogCard } from "@/features/blog/components/blog-card";
import { BlogSearchFilter } from "@/features/blog/components/blog-search-filter";
import { useBlogArticles } from "@/features/blog/hooks/use-blog-articles";

export default function BlogPage() {
  const {
    articles,
    totalResults,
    params,
    isLoading,
    errorMessage,
    setSearchQuery,
    setSortBy,
    setPage,
    refetch,
  } = useBlogArticles();

  const [searchInput, setSearchInput] = useState(params.q || "");

  const currentPage = params.page || 1;
  const pageSize = params.pageSize || 10;
  const totalPages = Math.max(Math.ceil(totalResults / pageSize), 1);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchQuery(searchInput);
  };

  return (
    <main className="bg-gray-50">
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
              Eduka Blog
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-gray-950 sm:text-5xl">
              Insight, Berita, dan Artikel Seputar Edukasi Digital
            </h1>

            <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
              Temukan artikel terbaru seputar teknologi, pendidikan, karier
              digital, dan tren pembelajaran online.
            </p>
          </div>
        </div>
      </section>

      <BlogSearchFilter
        searchInput={searchInput}
        sortBy={params.sortBy}
        onSearchInputChange={setSearchInput}
        onSearchSubmit={handleSearchSubmit}
        onSortByChange={setSortBy}
      />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {isLoading && (
            <div className="rounded-[1.5rem] border border-gray-200 bg-white p-8">
              <Loading text="Mengambil artikel blog..." />
            </div>
          )}

          {errorMessage && !isLoading && (
            <div className="rounded-[1.5rem] border border-red-200 bg-red-50 p-8 text-center">
              <p className="text-sm font-semibold text-red-700">
                {errorMessage}
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={refetch}
                className="mt-4 rounded-full"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Coba Lagi
              </Button>
            </div>
          )}

          {!isLoading && !errorMessage && articles.length === 0 && (
            <div className="rounded-[1.5rem] border border-gray-200 bg-white p-8 text-center">
              <p className="text-lg font-bold text-gray-950">
                Artikel tidak ditemukan
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Coba gunakan keyword lain untuk mencari artikel.
              </p>
            </div>
          )}

          {!isLoading && !errorMessage && articles.length > 0 && (
            <div className="space-y-8">
              <div className="flex flex-col justify-between gap-3 rounded-[1.5rem] border border-gray-200 bg-white px-5 py-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-xl font-extrabold text-gray-950">
                    Latest Articles
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Menampilkan {articles.length} artikel dari {totalResults}{" "}
                    hasil.
                  </p>
                </div>

                <p className="text-sm font-semibold text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {articles.map((article) => (
                  <BlogCard key={article.url} article={article} />
                ))}
              </div>

              {totalPages > 1 && (
            <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setPage}
  showPageInput
/>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}