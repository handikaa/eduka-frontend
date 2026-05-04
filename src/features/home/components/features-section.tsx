import {
  BookOpenCheck,
  ChartNoAxesCombined,
  Laptop,
  Medal,
  MonitorPlay,
  UsersRound,
} from "lucide-react";

import { featuresData } from "@/features/home/constants/home-data";

const icons = [
  BookOpenCheck,
  UsersRound,
  ChartNoAxesCombined,
  Laptop,
  MonitorPlay,
  Medal,
];

export function FeaturesSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-[#F25019]">
            Why Eduka
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-gray-950 sm:text-4xl">
            Belajar Lebih Terarah dengan Fitur LMS Modern
          </h2>
          <p className="mt-4 text-gray-600">
            Eduka dirancang untuk membantu student belajar secara fleksibel,
            terukur, dan relevan dengan kebutuhan industri.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, index) => {
            const Icon = icons[index];

            return (
              <div
                key={feature.title}
                className="rounded-[1.5rem] border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#0d22a8]/30 hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d22a8]/10 text-[#0d22a8]">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold text-gray-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}