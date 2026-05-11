import { whyEdukaData } from "@/features/about/constans/about-data";

export function WhyEdukaSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-wide text-secondary">
            Why Eduka
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-950 sm:text-4xl">
            Kenapa Eduka Dibangun?
          </h2>

          <p className="mt-4 text-gray-600">
            Eduka dibuat untuk menjawab kebutuhan belajar digital yang lebih
            terarah, fleksibel, dan mudah dikembangkan.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {whyEdukaData.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-lg font-extrabold text-gray-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}