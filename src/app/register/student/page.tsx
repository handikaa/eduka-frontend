import { GuestRoute } from "@/components/common/guest-route";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterStudentPage() {
    return (
        <GuestRoute>
            <section className="min-h-[calc(100vh-72px)] bg-[#c8cdf8] px-4 py-10">
                <div className="mx-auto flex min-h-[calc(100vh-152px)] max-w-7xl items-center justify-center">
                    <RegisterForm role="student" variant="student" />
                </div>
            </section>
        </GuestRoute>
    );
}