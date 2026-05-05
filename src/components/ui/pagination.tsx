"use client";

import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageInput?: boolean;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageInput = false,
}: PaginationProps) {
  const [pageInput, setPageInput] = useState(String(currentPage));

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  useEffect(() => {
    setPageInput(String(currentPage));
  }, [currentPage]);

  if (totalPages <= 1) {
    return null;
  }

  const handleSubmitPage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const targetPage = Number(pageInput);

    if (Number.isNaN(targetPage)) {
      return;
    }

    if (targetPage < 1) {
      onPageChange(1);
      return;
    }

    if (targetPage > totalPages) {
      onPageChange(totalPages);
      return;
    }

    onPageChange(targetPage);
  };

  return (
    <div className="w-full rounded-[1.25rem] border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Button
          variant="outline"
          disabled={isFirstPage}
          onClick={() => onPageChange(currentPage - 1)}
          className="w-full rounded-full md:w-auto"
        >
          Previous
        </Button>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <span className="text-center text-sm font-medium text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          {showPageInput && (
            <form
              onSubmit={handleSubmitPage}
              className="flex w-full items-center justify-center gap-2 sm:w-auto"
            >
              <input
                type="number"
                min={1}
                max={totalPages}
                value={pageInput}
                onChange={(event) => setPageInput(event.target.value)}
                className="h-10 w-full min-w-0 rounded-full border border-gray-200 bg-white px-3 text-center text-sm text-gray-900 outline-none transition-colors focus:border-[#0d22a8] focus:ring-2 focus:ring-[#0d22a8]/10 sm:w-24"
                placeholder="Page"
              />

              <Button
                type="submit"
                variant="outline"
                className="h-10 shrink-0 rounded-full px-5"
              >
                Go
              </Button>
            </form>
          )}
        </div>

        <Button
          variant="outline"
          disabled={isLastPage}
          onClick={() => onPageChange(currentPage + 1)}
          className="w-full rounded-full md:w-auto"
        >
          Next
        </Button>
      </div>
    </div>
  );
}