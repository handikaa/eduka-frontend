import { Quote } from "lucide-react";

import { testimonialsData } from "@/features/home/constants/home-data";

export function TestimonialsSection() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-secondary">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-950 sm:text-4xl">
            Apa Kata Mereka tentang Eduka
          </h2>
          <p className="mt-4 text-gray-600">
            Cerita student yang belajar dan mengembangkan skill digital bersama
            Eduka.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonialsData.map((item) => (
            <article
              key={item.name}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl"
            >
              <Quote className="h-8 w-8 text-secondary " />

              <p className="mt-5 text-sm leading-7 text-gray-600">
                “{item.message}”
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <p className="font-bold text-gray-950">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}