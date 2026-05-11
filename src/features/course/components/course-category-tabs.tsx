"use client";

import { useCourse } from "@/features/course/hooks/use-course";

export function CourseCategoryTabs() {
  const { categories, filters, setCategoryId } = useCourse();

  return (
    <div className="lg:hidden">
      <div className="mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-secondary">
          Categories
        </h3>
      </div>

      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
        <button
          type="button"
          onClick={() => setCategoryId(null)}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${filters.category_id === null
            ? "bg-primary text-white shadow-md"
            : "bg-white text-gray-600 ring-1 ring-gray-200"
            }`}
        >
          All Courses
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setCategoryId(category.id)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${filters.category_id === category.id
              ? "bg-primary text-white shadow-md"
              : "bg-white text-gray-600 ring-1 ring-gray-200"
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}