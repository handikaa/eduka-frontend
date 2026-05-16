import { BookOpenCheck } from "lucide-react";

export function InstructorDashboardHeroSection() {
    return (
        <section className="overflow-hidden rounded-4xl bg-gradient-to-br from-[#06115a] via-[#101f8f] to-[#0d22a8] p-8 text-white shadow-xl lg:p-10">
            <div className="max-w-3xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
                    <BookOpenCheck className="h-4 w-4" />
                    Instructor Dashboard
                </div>

                <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                    Kelola course dan aktivitas mentor kamu
                </h1>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                    Pantau performa course, status publikasi, enrollment, review, dan
                    rating course milikmu.
                </p>
            </div>
        </section>
    );
}