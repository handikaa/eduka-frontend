import { statsData } from "@/features/home/constants/home-data";

export function StatsSection() {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-primary px-6 py-8 shadow-xl sm:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl bg-white/30 p-6 text-center backdrop-blur-sm"
            >
              <p className="text-3xl font-extrabold text-white sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm font-medium text-white/75">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}