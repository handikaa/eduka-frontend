import Link from "next/link";
import { ArrowUpRight, BookOpen, Search, Sparkles, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CourseHeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#0d22a8]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#F25019]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0d22a8]/15 bg-[#0d22a8]/5 px-4 py-2 text-sm font-bold text-[#0d22a8]">
              <Sparkles className="h-4 w-4 text-[#F25019]" />
              <span>Explore Courses</span>
            </div>

            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Temukan Course Terbaik untuk{" "}
              <span className="text-[#0d22a8]">Meningkatkan Skill</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
              Pilih course sesuai tujuan kariermu. Mulai dari frontend,
              backend, mobile development, UI/UX, hingga data analytics dengan
              materi yang terstruktur dan mudah diikuti.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="#course-catalog">
                <Button className="w-full rounded-full  px-7 py-3 text-base font-bold sm:w-auto">
                  Jelajahi Course
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-[#0d22a8]/20 px-7 py-3 text-base font-bold text-[#0d22a8] hover:bg-[#0d22a8] hover:text-white sm:w-auto"
                >
                  Mulai Belajar
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <BookOpen className="mb-3 h-6 w-6 text-[#0d22a8]" />
                <p className="text-2xl font-extrabold text-gray-950">120+</p>
                <p className="mt-1 text-sm text-gray-500">Online Courses</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <Users className="mb-3 h-6 w-6 text-[#0d22a8]" />
                <p className="text-2xl font-extrabold text-gray-950">30K+</p>
                <p className="mt-1 text-sm text-gray-500">Active Students</p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <Search className="mb-3 h-6 w-6 text-[#0d22a8]" />
                <p className="text-2xl font-extrabold text-gray-950">6</p>
                <p className="mt-1 text-sm text-gray-500">Categories</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="rounded-[2rem] bg-gradient-to-br from-[#0d22a8] to-[#06115a] p-6 shadow-2xl">
              <div className="rounded-[1.5rem] bg-white p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#F25019]">
                      Recommended
                    </p>
                    <h2 className="mt-1 text-2xl font-extrabold text-gray-950">
                      Fullstack Web Development
                    </h2>
                  </div>

                  <div className="rounded-full bg-[#0d22a8]/10 px-4 py-2 text-sm font-bold text-[#0d22a8]">
                    Popular
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-3 h-3 w-32 rounded-full bg-[#0d22a8]/20" />
                    <div className="h-3 w-full rounded-full bg-gray-200">
                      <div className="h-3 w-[78%] rounded-full bg-[#F25019]" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-gray-600">
                      78% learning progress
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-[#0d22a8]/5 p-4">
                      <p className="text-2xl font-extrabold text-[#0d22a8]">
                        40
                      </p>
                      <p className="text-sm text-gray-500">Lessons</p>
                    </div>

                    <div className="rounded-2xl bg-[#F25019]/10 p-4">
                      <p className="text-2xl font-extrabold text-[#F25019]">
                        10
                      </p>
                      <p className="text-sm text-gray-500">Weeks</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 p-4">
                    <p className="text-sm font-bold text-gray-950">
                      What you will learn
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["React", "Next.js", "API", "Auth", "Dashboard"].map(
                        (item) => (
                          <span
                            key={item}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
                          >
                            {item}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white px-5 py-4 shadow-xl">
              <p className="text-sm font-medium text-gray-500">
                Completion Rate
              </p>
              <p className="text-3xl font-extrabold text-[#0d22a8]">95%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}