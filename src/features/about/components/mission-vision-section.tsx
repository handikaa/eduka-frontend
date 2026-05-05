import { Target, Telescope } from "lucide-react";

export function MissionVisionSection() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <article className="rounded-4xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d22a8]/10 text-[#0d22a8]">
            <Telescope className="h-7 w-7" />
          </div>

          <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
            Our Vision
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-950">
            Menjadi ruang belajar digital yang membantu student tumbuh.
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            Kami ingin menghadirkan pengalaman belajar yang mudah diakses,
            terstruktur, dan relevan agar lebih banyak orang dapat membangun
            skill digital secara mandiri dan berkelanjutan.
          </p>
        </article>

        <article className="rounded-4xl border border-gray-200 bg-[#0d22a8] p-8 text-white shadow-xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#F25019]">
            <Target className="h-7 w-7" />
          </div>

          <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
            Our Mission
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Membuat pembelajaran teknologi lebih jelas, praktis, dan terukur.
          </h2>

          <p className="mt-4 leading-7 text-white/75">
            Eduka berfokus pada materi yang aplikatif, progress belajar yang
            mudah dipantau, serta course yang dapat membantu student
            mempersiapkan karier digital.
          </p>
        </article>
      </div>
    </section>
  );
}