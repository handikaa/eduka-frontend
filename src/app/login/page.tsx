import Image from "next/image";

import { LoginForm } from "@/features/auth/components/login-form";
import { GuestRoute } from "@/components/common/guest-route";

export default function LoginPage() {
  return (
    <GuestRoute>
<section className="min-h-screen overflow-hidden bg-[#c8cdf8] px-4">
      <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="flex justify-center lg:justify-start">
          <LoginForm />
        </div>

        <div className="relative hidden h-screen overflow-hidden lg:block">
          <Image
            src="/images/login-hero.png"
            alt="Student learning illustration"
            width={700}
            height={700}
            priority
            className="absolute bottom-0 left-1/2 z-10 h-[92vh] w-auto max-w-none -translate-x-1/2 object-contain"
          />

          <div className="absolute left-10 top-1/2 z-20 rounded-2xl border-2 border-dashed border-blue-900 bg-white px-8 py-6 shadow-xl">
            <p className="text-5xl font-bold text-blue-950">250k</p>
            <p className="mt-2 text-2xl font-medium text-blue-950">
              Assisted Student
            </p>
          </div>
        </div>
      </div>
    </section>

    </GuestRoute>
  );
}