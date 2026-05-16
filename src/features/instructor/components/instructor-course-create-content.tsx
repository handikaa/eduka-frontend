"use client";

import { ArrowLeft, FilePlus2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { InstructorCourseForm } from "@/features/instructor/components/instructor-course-form";

export function InstructorCourseCreateContent() {
    const router = useRouter();

    return (
        <main className="min-h-[calc(100vh-72px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <section className="overflow-hidden rounded-4xl bg-gradient-to-br from-[#06115a] via-[#101f8f] to-[#0d22a8] p-8 text-white shadow-xl lg:p-10">
                    <Button
                        type="button"
                        variant="outline"
                        className="mb-6 rounded-full border-white/40 bg-white/10 text-white hover:bg-white hover:text-primary"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </Button>

                    <div className="max-w-3xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
                            <FilePlus2 className="h-4 w-4" />
                            Create Course
                        </div>

                        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                            Buat course baru
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                            Lengkapi informasi course, pilih kategori, upload thumbnail, dan
                            susun lesson sesuai urutan pembelajaran.
                        </p>
                    </div>
                </section>

                <InstructorCourseForm />
            </div>
        </main>
    );
}