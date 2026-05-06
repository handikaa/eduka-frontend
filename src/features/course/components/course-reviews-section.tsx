"use client";

import { RefreshCcw, Star, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { Pagination } from "@/components/ui/pagination";
import { useCourseReviews } from "@/features/course/hooks/use-course-reviews";

type CourseReviewsSectionProps = {
  slug: string;
  ratingAvg: string;
  ratingCount: number;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const isActive = index < rating;

        return (
          <Star
            key={index}
            className={`h-4 w-4 ${
              isActive
                ? "fill-[#F25019] text-[#F25019]"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        );
      })}
    </div>
  );
}

export function CourseReviewsSection({
  slug,
  ratingAvg,
  ratingCount,
}: CourseReviewsSectionProps) {
  const {
    reviews,
    pagination,
    page,
    isLoading,
    errorMessage,
    setPage,
    refetch,
  } = useCourseReviews(slug);

  return (
    <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
            Course Reviews
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
            Review dari Student
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Lihat pengalaman student sebelum mengambil course ini.
          </p>
        </div>

        <div className="rounded-2xl bg-[#0d22a8]/10 px-5 py-4 text-left sm:text-right">
          <p className="text-3xl font-extrabold text-[#0d22a8]">
            {ratingAvg}
          </p>
          <p className="text-sm font-medium text-gray-600">
            {ratingCount} reviews
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <Loading text="Mengambil review course..." />
        </div>
      )}

      {errorMessage && !isLoading && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm font-semibold text-red-700">{errorMessage}</p>

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

      {!isLoading && !errorMessage && reviews.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="font-bold text-gray-950">Belum ada review</p>
          <p className="mt-2 text-sm text-gray-500">
            Review student akan tampil setelah course memiliki review.
          </p>
        </div>
      )}

      {!isLoading && !errorMessage && reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0d22a8]/10 text-[#0d22a8]">
                  <UserRound className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="font-bold text-gray-950">
                        {review.user.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {review.user.email}
                      </p>
                    </div>

                    <p className="text-sm text-gray-500">
                      {formatDate(review.created_at)}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <RatingStars rating={review.rating} />
                    <span className="text-sm font-semibold text-gray-600">
                      {review.rating}/5
                    </span>
                  </div>

                  <p className="mt-3 leading-7 text-gray-600">
                    {review.comment}
                  </p>
                </div>
              </div>
            </article>
          ))}

          {pagination && pagination.last_page > 1 && (
            <div className="pt-4">
              <Pagination
                currentPage={page}
                totalPages={pagination.last_page}
                onPageChange={setPage}
                showPageInput
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}