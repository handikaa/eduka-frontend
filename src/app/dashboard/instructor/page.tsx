import {
    BarChart3,
    BookOpenCheck,
    FileEdit,
    Layers,
    Presentation,
    UsersRound,
} from "lucide-react";

import { ProtectedRoute } from "@/components/common/protected-route";

export default function InstructorDashboardPage() {
    return (
        <ProtectedRoute>
            <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <section className="overflow-hidden rounded-4xl bg-gradient-to-br from-[#06115a] via-[#101f8f] to-[#0d22a8] p-8 text-white shadow-xl lg:p-10">
                        <div className="max-w-3xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
                                <Presentation className="h-4 w-4" />
                                Dashboard Mentor
                            </div>

                            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                                Kelola course dan aktivitas mentor kamu
                            </h1>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                                Pantau performa course, kelola materi pembelajaran, dan siapkan
                                lesson baru untuk student Eduka.
                            </p>
                        </div>
                    </section>

                    <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <BookOpenCheck className="h-6 w-6" />
                            </div>
                            <p className="text-2xl font-extrabold text-gray-950">6</p>
                            <p className="mt-1 text-sm text-gray-500">Total Course</p>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                <Layers className="h-6 w-6" />
                            </div>
                            <p className="text-2xl font-extrabold text-gray-950">34</p>
                            <p className="mt-1 text-sm text-gray-500">Total Lesson</p>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <UsersRound className="h-6 w-6" />
                            </div>
                            <p className="text-2xl font-extrabold text-gray-950">128</p>
                            <p className="mt-1 text-sm text-gray-500">Total Student</p>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <p className="text-2xl font-extrabold text-gray-950">4.7</p>
                            <p className="mt-1 text-sm text-gray-500">Rating Rata-rata</p>
                        </div>
                    </section>

                    <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                                        Course Management
                                    </p>
                                    <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                                        Course Milik Kamu
                                    </h2>
                                </div>

                                <button className="rounded-full bg-secondary px-5 py-2 text-sm font-extrabold text-white transition-colors hover:bg-white hover:text-secondary hover:ring-1 hover:ring-secondary">
                                    Buat Course
                                </button>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Flutter Mobile Development",
                                        status: "published",
                                        lessons: 12,
                                        students: 46,
                                    },
                                    {
                                        title: "React Frontend Fundamental",
                                        status: "draft",
                                        lessons: 8,
                                        students: 0,
                                    },
                                    {
                                        title: "Laravel REST API",
                                        status: "published",
                                        lessons: 14,
                                        students: 82,
                                    },
                                ].map((course) => (
                                    <div
                                        key={course.title}
                                        className="rounded-3xl border border-gray-100 bg-gray-50 p-5"
                                    >
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <h3 className="font-bold text-gray-950">
                                                    {course.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {course.lessons} lessons • {course.students} students
                                                </p>
                                            </div>

                                            <span
                                                className={`w-fit rounded-full px-4 py-2 text-xs font-bold capitalize ${course.status === "published"
                                                    ? "bg-primary/10 text-primary"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {course.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <aside className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                                Instructor Task
                            </p>
                            <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                                Aktivitas Mentor
                            </h2>

                            <div className="mt-6 space-y-4">
                                <div className="rounded-3xl bg-primary/10 p-5">
                                    <FileEdit className="h-6 w-6 text-primary" />
                                    <p className="mt-3 text-sm font-semibold text-gray-950">
                                        1 course masih draft.
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Lengkapi lesson dan publish saat materi sudah siap.
                                    </p>
                                </div>

                                <div className="rounded-3xl bg-gray-50 p-5">
                                    <p className="text-sm font-bold text-gray-950">
                                        Rekomendasi berikutnya
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Tambahkan preview lesson agar student bisa melihat kualitas
                                        course sebelum enroll.
                                    </p>
                                </div>
                            </div>
                        </aside>
                    </section>
                </div>
            </main>
        </ProtectedRoute>
    );
}