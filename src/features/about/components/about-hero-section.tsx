import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#0d22a8]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#F25019]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0d22a8]/15 bg-[#0d22a8]/5 px-4 py-2 text-sm font-bold text-[#0d22a8]">
            <Sparkles className="h-4 w-4 text-[#F25019]" />
            About Eduka
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
            Membangun Platform Belajar Digital yang{" "}
            <span className="text-[#0d22a8]">Terarah dan Relevan</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Eduka adalah platform e-learning yang dirancang untuk membantu
            student belajar teknologi, mengembangkan skill digital, dan
            mempersiapkan diri menghadapi kebutuhan industri.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/course">
              <Button className="w-full rounded-full px-8 py-3 text-base font-bold sm:w-auto">
                Jelajahi Course
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/register">
              <Button
                variant="outline"
                className="w-full rounded-full px-8 py-3 text-base font-bold text-[#0d22a8] hover:bg-[#0d22a8] hover:text-white sm:w-auto"
              >
                Mulai Belajar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}