import { BookOpenCheck, FilePlus2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export function InstructorCoursesHeroSection() {
    const router = useRouter();
    return (
        <section className="overflow-hidden rounded-4xl bg-gradient-to-br from-[#06115a] via-[#101f8f] to-[#0d22a8] p-8 text-white shadow-xl lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20">
                        <BookOpenCheck className="h-4 w-4" />
                        Instructor Courses
                    </div>

                    <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                        Kelola course yang kamu buat
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                        Lihat daftar course milikmu, pantau status publikasi, dan siapkan
                        materi sebelum course ditampilkan ke student.
                    </p>
                </div>

                <Button
                    type="button"
                    variant="primary"
                    className="w-fit rounded-full"
                    onClick={() => router.push("/instructor/courses/create")}
                >
                    <FilePlus2 className="mr-2 h-4 w-4" />
                    Buat Course
                </Button>
            </div>
        </section>
    );
}