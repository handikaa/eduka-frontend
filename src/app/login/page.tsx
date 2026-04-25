import Image from "next/image";

import { GuestRoute } from "@/components/common/guest-route";
import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <GuestRoute>
      <section className="min-h-[calc(100vh-72px)] overflow-hidden bg-[#c8cdf8] px-4">
        <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="flex w-full justify-center py-10 lg:justify-start lg:py-0">
            <LoginForm />
          </div>

          <div className="relative hidden h-[calc(100vh-72px)] overflow-hidden lg:block">
            <Image
              src="/images/login-hero.png"
              alt="Student learning illustration"
              width={700}
              height={700}
              priority
              className="absolute bottom-0 left-1/2 z-10 h-[88vh] w-auto max-w-none -translate-x-1/2 object-contain"
            />

            <div className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-2xl border-2 border-dashed border-blue-900 bg-white px-6 py-5 shadow-xl xl:left-10 xl:px-8 xl:py-6">
              <p className="text-4xl font-bold text-blue-950 xl:text-5xl">
                250k
              </p>
              <p className="mt-2 text-xl font-medium text-blue-950 xl:text-2xl">
                Assisted Student
              </p>
            </div>
          </div>
        </div>
      </section>
    </GuestRoute>
  );
}