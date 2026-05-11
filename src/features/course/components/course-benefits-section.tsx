import {
  BadgeCheck,
  BookOpenCheck,
  ChartNoAxesCombined,
  Clock,
  GraduationCap,
  UsersRound,
} from "lucide-react";

const benefits = [
  {
    title: "Materi Terstruktur",
    description:
      "Setiap course disusun secara bertahap agar kamu bisa belajar dari dasar hingga memahami konsep yang lebih advanced.",
    icon: BookOpenCheck,
  },
  {
    title: "Belajar Fleksibel",
    description:
      "Akses materi kapan saja dan belajar sesuai ritme kamu tanpa terbatas tempat dan waktu.",
    icon: Clock,
  },
  {
    title: "Project Based Learning",
    description:
      "Latihan dan studi kasus membantu kamu membangun portfolio nyata yang relevan dengan kebutuhan industri.",
    icon: GraduationCap,
  },
  {
    title: "Progress Tracking",
    description:
      "Pantau perkembangan belajar dan lanjutkan materi dari posisi terakhir melalui dashboard.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Mentor Berpengalaman",
    description:
      "Materi dan alur belajar dirancang dengan pendekatan yang sesuai dengan praktik kerja profesional.",
    icon: UsersRound,
  },
  {
    title: "Skill Siap Industri",
    description:
      "Bangun skill teknis dan problem solving yang bisa digunakan untuk mempersiapkan karier digital.",
    icon: BadgeCheck,
  },
];

export function CourseBenefitsSection() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-secondary">
            Learning Benefits
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-950 sm:text-4xl">
            Kenapa Belajar Course di Eduka?
          </h2>

          <p className="mt-4 text-gray-600">
            Eduka membantu kamu belajar lebih terarah melalui materi yang
            terstruktur, fleksibel, dan relevan dengan kebutuhan industri.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="group rounded-[1.5rem] border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-lg font-extrabold text-gray-950">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}