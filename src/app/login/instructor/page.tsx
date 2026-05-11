import Image from "next/image";
import { BookOpenCheck, Presentation, UsersRound } from "lucide-react";

import { GuestRoute } from "@/components/common/guest-route";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginInstructorPage() {
    return (
        <GuestRoute>
            <section className="min-h-[calc(100vh-72px)] overflow-hidden bg-[#06115a] px-4">
                <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 lg:grid-cols-2">
                    <div className="order-2 flex w-full justify-center py-10 lg:order-1 lg:justify-start lg:py-0">
                        <div className="w-full max-w-md">
                            <LoginForm variant="instructor" />
                        </div>
                    </div>

                    <div className="relative order-1 hidden h-[calc(100vh-72px)] overflow-hidden lg:order-2 lg:block">
                        <div className="absolute right-10 top-12 z-20 rounded-3xl border border-white/20 bg-white/10 px-6 py-5 text-white shadow-2xl backdrop-blur">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F25019]">
                                <Presentation className="h-6 w-6" />
                            </div>
                            <p className="text-3xl font-bold">Mentor</p>
                            <p className="mt-1 text-sm text-white/75">
                                Kelola course dan lesson
                            </p>
                        </div>

                        <div className="absolute bottom-20 left-0 z-20 grid gap-4">
                            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white shadow-xl backdrop-blur">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0d22a8]">
                                    <BookOpenCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">Course Management</p>
                                    <p className="text-xs text-white/70">Create, edit, publish</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white shadow-xl backdrop-blur">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0d22a8]">
                                    <UsersRound className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-semibold">Student Insight</p>
                                    <p className="text-xs text-white/70">
                                        Pantau aktivitas belajar
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-[#F25019]/30 blur-3xl" />
                        <div className="absolute -bottom-32 left-10 h-96 w-96 rounded-full bg-white/20 blur-3xl" />

                        <Image
                            src="/images/instructor-login.png"
                            alt="Instructor teaching illustration"
                            width={720}
                            height={720}
                            priority
                            className="absolute bottom-0 left-1/2 z-10 h-[86vh] w-auto max-w-none -translate-x-1/2 object-contain"
                        />
                    </div>
                </div>
            </section>
        </GuestRoute>
    );
}