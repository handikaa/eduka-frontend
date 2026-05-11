import Link from "next/link";
import { ArrowUpRight, BookOpenCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CourseCTASection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl bg-linear-to-br from-primary via-primary-medium to-primary-dark px-6 py-12 text-center shadow-2xl sm:px-10 lg:py-16">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
          <BookOpenCheck className="h-8 w-8 text-white" />
        </div>

        <p className="mt-6 text-sm font-bold uppercase tracking-wide text-white">
          Start Your Learning Journey
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
          Siap Memilih Course dan Mulai Meningkatkan Skill?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
          Temukan course yang sesuai dengan tujuan kariermu, pelajari materi
          secara bertahap, dan bangun skill digital yang siap digunakan di dunia
          industri.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/register">
            <Button className="border-none">
              Daftar Sekarang
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="#course-catalog">
            <Button
              variant="outline"
              className="text-white border border-white hover:border-secondary"
            >
              Lihat Course
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}