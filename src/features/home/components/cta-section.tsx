import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="realtive mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0d22a8] to-[#06115a] px-6 py-12 text-center shadow-2xl sm:px-10 lg:py-16">
        <div className="absolute left-[-80px] top-24 h-64 w-64 rounded-full bg-[#F25019]/20 blur-3xl" />
        <div className="absolute bottom-20 right-[-80px] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <p className="text-sm font-bold uppercase tracking-wide ">
          Start Learning Today
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          Siap Membangun Skill Digitalmu Bersama Eduka?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-white/70">
          Buat akun gratis, pilih course yang sesuai, dan mulai perjalanan
          belajar kamu hari ini.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/register">
         <Button 
  variant="primary"
  className="w-full rounded-full border-none px-8 py-3 hover:border-transparent sm:w-auto"
>
  Daftar Sekarang
  <ArrowUpRight className="ml-2 h-4 w-4" />
</Button>
          </Link>

          <Link href="/courses">
            <Button
              variant="outline"
              className="w-full rounded-full border-noneÍ bg-white text-[#0d22a8] px-8 py-3 text-base font-bold hover:[#F25019] hover:text-white sm:w-auto"
            >
              Lihat Course
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}