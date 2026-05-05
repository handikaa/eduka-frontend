"use client";

import { useRouter } from "next/navigation";
import { BookOpenCheck, CreditCard, Star, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { Course } from "@/features/course/types/course.type";

type CourseCheckoutCardProps = {
  course: Course;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function CourseCheckoutCard({ course }: CourseCheckoutCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/checkout/${course.slug}`);
      return;
    }

    router.push(`/checkout/${course.slug}`);
  };

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-xl">
        <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
          Checkout Course
        </p>

        <div className="mt-4">
          <p className="text-sm text-gray-500">Harga Course</p>
          <p className="mt-1 text-3xl font-extrabold text-[#0d22a8]">
            {formatPrice(course.price)}
          </p>
        </div>

        <div className="mt-6 space-y-4 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <BookOpenCheck className="h-5 w-5 text-[#0d22a8]" />
            <span>{course.lessons.length} lessons tersedia</span>
          </div>

          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-[#0d22a8]" />
            <span>Kuota {course.quota} student</span>
          </div>

          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-[#F25019]" />
            <span>
              Rating {course.rating_avg} dari {course.rating_count} review
            </span>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleCheckout}
          className="mt-6 w-full rounded-full py-3 text-base font-bold"
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Checkout Sekarang
        </Button>

        {!isAuthenticated && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Kamu perlu login atau register sebelum melakukan checkout.
          </p>
        )}
      </div>
    </aside>
  );
}