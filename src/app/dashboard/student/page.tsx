import {
    BookOpen,
    Clock,
    GraduationCap,
    PlayCircle,
    Star,
    Trophy,
} from "lucide-react";

import { ProtectedRoute } from "@/components/common/protected-route";

export default function StudentDashboardPage() {
    return (
        <ProtectedRoute>
            <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <section className="overflow-hidden rounded-4xl bg-gradient-to-br from-[#0d22a8] via-[#101f8f] to-[#06115a] p-8 text-white shadow-xl lg:p-10">
                        <div className="max-w-3xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
                                <GraduationCap className="h-4 w-4" />
                                Student Dashboard
                            </div>

                            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                                Selamat datang kembali di Eduka
                            </h1>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                                Lanjutkan pembelajaran, pantau progress course, dan akses materi
                                yang sudah kamu ikuti.
                            </p>
                        </div>
                    </section>

                    <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <p className="text-2xl font-extrabold text-gray-950">4</p>
                            <p className="mt-1 text-sm text-gray-500">Course Diikuti</p>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                <PlayCircle className="h-6 w-6" />
                            </div>
                            <p className="text-2xl font-extrabold text-gray-950">18</p>
                            <p className="mt-1 text-sm text-gray-500">Lesson Selesai</p>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <Clock className="h-6 w-6" />
                            </div>
                            <p className="text-2xl font-extrabold text-gray-950">12 Jam</p>
                            <p className="mt-1 text-sm text-gray-500">Total Belajar</p>
                        </div>

                        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                                <Trophy className="h-6 w-6" />
                            </div>
                            <p className="text-2xl font-extrabold text-gray-950">76%</p>
                            <p className="mt-1 text-sm text-gray-500">Progress Rata-rata</p>
                        </div>
                    </section>

                    <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
                        <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                                        Continue Learning
                                    </p>
                                    <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                                        Course Terakhir Dipelajari
                                    </h2>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    {
                                        title: "Flutter Mobile Development",
                                        lesson: "Welcome to Flutter",
                                        progress: "68%",
                                    },
                                    {
                                        title: "React Frontend Fundamental",
                                        lesson: "Component dan Props",
                                        progress: "42%",
                                    },
                                    {
                                        title: "Laravel REST API",
                                        lesson: "Authentication dengan Token",
                                        progress: "25%",
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
                                                    Lesson terakhir: {course.lesson}
                                                </p>
                                            </div>

                                            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                                                {course.progress}
                                            </span>
                                        </div>

                                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
                                            <div
                                                className="h-full rounded-full bg-secondary"
                                                style={{ width: course.progress }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <aside className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-bold uppercase tracking-wide text-secondary">
                                Student Activity
                            </p>
                            <h2 className="mt-2 text-2xl font-extrabold text-gray-950">
                                Ringkasan Belajar
                            </h2>

                            <div className="mt-6 space-y-4">
                                <div className="rounded-3xl bg-primary/10 p-5">
                                    <Star className="h-6 w-6 fill-secondary text-secondary" />
                                    <p className="mt-3 text-sm font-semibold text-gray-950">
                                        Kamu hampir menyelesaikan course Flutter.
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Lanjutkan 3 lesson lagi untuk menyelesaikan course.
                                    </p>
                                </div>

                                <div className="rounded-3xl bg-gray-50 p-5">
                                    <p className="text-sm font-bold text-gray-950">
                                        Target minggu ini
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Selesaikan minimal 5 lesson untuk menjaga progress belajar.
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