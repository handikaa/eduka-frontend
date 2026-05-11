import { valuesData } from "@/features/about/constans/about-data";

export function ValuesSection() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-secondary">
              Our Values
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-950 sm:text-4xl">
              Nilai yang Menjadi Dasar Eduka
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Kami membangun Eduka dengan prinsip pembelajaran berkelanjutan,
              kolaborasi, dan kualitas agar pengalaman belajar menjadi lebih
              bermakna.
            </p>
          </div>

          <div className="grid gap-5">
            {valuesData.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="flex gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="text-lg font-extrabold text-gray-950">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}