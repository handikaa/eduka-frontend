"use client";

import { Search, SearchIcon, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GetArticlesParams } from "@/features/blog/types/blog.type";

type BlogSearchFilterProps = {
  searchInput: string;
  sortBy: GetArticlesParams["sortBy"];
  onSearchInputChange: (value: string) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onSortByChange: (value: NonNullable<GetArticlesParams["sortBy"]>) => void;
};

export function BlogSearchFilter({
  searchInput,
  sortBy,
  onSearchInputChange,
  onSearchSubmit,
  onSortByChange,
}: BlogSearchFilterProps) {
  return (
    <section className="bg-white px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[1.5rem] border border-gray-200 bg-white p-4 shadow-xl sm:p-6">
          <form
            onSubmit={onSearchSubmit}
            className="grid items-center gap-4 lg:grid-cols-[1fr_220px_auto]"
          >
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={searchInput}
                onChange={(event) => onSearchInputChange(event.target.value)}
                placeholder="Cari artikel, berita, atau topik edukasi..."
                className="h-12 w-full rounded-full border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#0d22a8] focus:bg-white focus:ring-2 focus:ring-[#0d22a8]/10"
              />
            </div>

            <select
              value={sortBy}
              onChange={(event) =>
                onSortByChange(
                  event.target.value as NonNullable<GetArticlesParams["sortBy"]>
                )
              }
              className="h-12 rounded-full border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition-colors focus:border-[#0d22a8] focus:bg-white focus:ring-2 focus:ring-[#0d22a8]/10"
            >
              <option value="publishedAt">Published At</option>
              <option value="popularity">Popularity</option>
              <option value="relevancy">Relevancy</option>
            </select>

            <Button type="submit" className="h-12 rounded-full px-6">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}