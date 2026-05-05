import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Circle } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute left-0 top-30 h-72 w-72 rounded-full bg-[#0d22a8]/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#F25019]/30 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-16">
        <div>                
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#0d22a8]/20 bg-[#0d22a8]/5 px-5 py-3 text-sm font-semibold text-[#0d22a8]">
            <Circle className="h-3 w-3 fill-[#0d22a8] text-[#0d22a8]" />
            <span>Learn. Build. Grow.</span>          
          </div>
          
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            Bangun Skill Digitalmu Bersama{" "}
            <span className="text-[#0d22a8]">Eduka</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
            Platform e-learning modern untuk membantu kamu belajar teknologi,
            mengikuti course terstruktur, dan mempersiapkan karier digital.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/register">
              <Button className="w-full rounded-full  px-7 py-3 text-base font-bold sm:w-auto">
                Mulai Belajar
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/courses">
              <Button
                variant="outline"
                className="w-full rounded-full border-[#0d22a8]/20 bg-white px-7 py-3 text-base font-bold text-[#0d22a8] hover:bg-[#0d22a8]/5 sm:w-auto"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Lihat Course
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-5xl font-extrabold leading-none text-gray-950">
                95%
              </p>
              <p className="mt-2 text-base text-gray-500">Completion Rate</p>
            </div>

            <div className="flex w-full items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm sm:w-auto">
              <div className="flex -space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-xs font-bold text-[#0d22a8]">
                  A
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-orange-100 text-xs font-bold text-[#F25019]">
                  B
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-green-100 text-xs font-bold text-green-700">
                  C
                </div>
              </div>

              <p className="text-sm text-gray-500 sm:text-base">
                <span className="font-bold text-[#0d22a8]">30K+</span> Active
                Students
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="relative mx-auto max-w-md lg:max-w-xl">
            <div className="overflow-hidden rounded-[120rem] shadow-2xl">
              <Image
                src="/images/hero.png"
                alt="Eduka learning environment"
                width={700}
                height={800}
                priority
                className="h-[420px] w-full object-cover sm:h-[520px] lg:h-[620px]"
              />
            </div>

            <div className="absolute -bottom-8 -left-8 z-20 hidden rounded-[1.5rem] border-1 border-white bg-white p-1 shadow-2xl lg:block">
              <Image
                src="/images/hero-small.jpg"
                alt="Online learning preview"
                width={280}
                height={200}
                className="h-[170px] w-[240px] rounded-[1.25rem] object-cover"
              />
            </div>

            <div className="absolute -right-5 top-10 hidden rounded-2xl bg-white px-5 py-4 shadow-xl lg:block">
              <p className="text-sm font-medium text-gray-500">Course Ready</p>
              <p className="text-2xl font-extrabold text-[#0d22a8]">120+</p>
            </div>
            <div className="absolute -left-5 top-0 hidden rounded-2xl bg-white px-5 py-4 shadow-xl lg:block">
              <p className="text-sm font-medium text-gray-500">Mentor Expert</p>
              <p className="text-2xl font-extrabold text-[#0d22a8]">50+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}