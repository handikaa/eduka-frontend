import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-140px)] max-w-6xl items-center justify-center px-4 py-10">
      <LoginForm />
    </section>
  );
}