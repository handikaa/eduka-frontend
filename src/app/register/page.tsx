import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-140px)] max-w-6xl items-center justify-center px-4 py-10">
      <RegisterForm />
    </section>
  );
}