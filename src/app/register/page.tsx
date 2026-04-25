import { GuestRoute } from "@/components/common/guest-route";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <GuestRoute>
      <section className="min-h-[calc(100vh-73px)] bg-[#c8cdf8] px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-140px)] max-w-7xl items-center gap-10 lg:grid-cols-1">

      <RegisterForm />
      </div>
    </section>
    </GuestRoute>
  );
}