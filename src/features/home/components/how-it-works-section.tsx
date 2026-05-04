import { learningSteps } from "@/features/home/constants/home-data";

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Top Wave */}
      <div className="absolute left-0 top-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-16 w-full sm:h-20 lg:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,64L60,69.3C120,75,240,85,360,74.7C480,64,600,32,720,32C840,32,960,64,1080,80C1200,96,1320,96,1380,96L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      <div className="relative bg-[#0d22a8]/90 px-4 py-24 text-white sm:px-6 lg:px-8">
        {/* Decorative Blurs */}
        <div className="absolute left-[-80px] top-24 h-64 w-64 rounded-full bg-[#F25019]/20 blur-3xl" />
        <div className="absolute bottom-20 right-[-80px] h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Alur Belajar yang Simple dan Terstruktur
            </h2>

            <p className="mt-4 text-white/70">
              Dari daftar akun sampai menyelesaikan course, semua proses dibuat
              agar mudah diikuti oleh student.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {learningSteps.map((item) => (
              <div
                key={item.step}
                className="group rounded-[1.5rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl"
              >
                <div className="mb-6 text-5xl font-extrabold text-[#F25019] transition-transform duration-300 group-hover:scale-105">
                  {item.step}
                </div>

                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-white/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-16 w-full sm:h-20 lg:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,32L60,37.3C120,43,240,53,360,69.3C480,85,600,107,720,101.3C840,96,960,64,1080,53.3C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}