"use client";

import { BookOpen } from "lucide-react";

import { useCourse } from "@/features/course/hooks/use-course";

export function CourseCategorySidebar() {
  const { categories, filters, setCategoryId } = useCourse();

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BookOpen className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-bold text-gray-950">Categories</h3>
            <p className="text-sm text-gray-500">Pilih bidang belajar</p>
          </div>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setCategoryId(null)}
            className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${filters.category_id === null
              ? "bg-primary text-white shadow-md"
              : "text-gray-600 hover:bg-gray-50 hover:text-primary"
              }`}
          >
            All Courses
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setCategoryId(category.id)}
              className={`w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${filters.category_id === category.id
                ? "bg-primary text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}