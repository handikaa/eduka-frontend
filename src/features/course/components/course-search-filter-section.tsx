"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCourse } from "@/features/course/hooks/use-course";
import {
  CourseLevel,
  CourseStatus,
} from "@/features/course/types/course.type";

export function CourseSearchFilterSection() {
  const {
    filters,
    setSearch,
    setLevel,
    setStatus,
    clearFilters,
  } = useCourse();

  const hasActiveFilter =
    filters.search ||
    filters.level !== "all" ||
    filters.status !== "all" ||
    filters.category_id !== null;

  return (
    <section className="bg-white mt-20 p-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className=" rounded-3xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_180px_180px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={filters.search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari course, kategori, atau skill..."
                className="h-12 w-full rounded-full border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#0d22a8] focus:bg-white focus:ring-2 focus:ring-[#0d22a8]/10"
              />
            </div>

            <select
              value={filters.level}
              onChange={(event) =>
                setLevel(event.target.value as CourseLevel | "all")
              }
              className="h-12 rounded-full border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition-colors focus:border-[#0d22a8] focus:bg-white focus:ring-2 focus:ring-[#0d22a8]/10"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {/* <select
              value={filters.status}
              onChange={(event) =>
                setStatus(event.target.value as CourseStatus | "all")
              }
              className="h-12 rounded-full border border-gray-200 bg-gray-50 px-4 text-sm font-medium text-gray-700 outline-none transition-colors focus:border-[#0d22a8] focus:bg-white focus:ring-2 focus:ring-[#0d22a8]/10"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select> */}

            <Button
              type="button"
              variant={hasActiveFilter ? "primary" : "outline"}
              onClick={clearFilters}
              className="h-12 rounded-full px-6"
            >
              {hasActiveFilter ? (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </>
              ) : (
                <>
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filter
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}