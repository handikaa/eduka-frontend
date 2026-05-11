"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookOpen, GraduationCap, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/hooks/use-auth";
import {
  RegisterFormValues,
  registerSchema,
} from "@/features/auth/validations/auth-schema";

type RegisterRole = "student" | "instructor";
type RegisterVariant = "student" | "instructor";

type RegisterFormProps = {
  role?: RegisterRole;
  variant?: RegisterVariant;
};

const registerContent = {
  student: {
    title: "Daftar sebagai Student",
    description:
      "Mulai perjalanan belajar kamu bersama Eduka dan akses berbagai course berkualitas.",
    badge: "Student Account",
    image: "/images/student-register.png",
    icon: GraduationCap,
    benefitTitle: "Belajar lebih terarah",
    benefits: [
      "Akses course sesuai kebutuhan belajar",
      "Tonton preview lesson sebelum enroll",
      "Pantau progress belajar secara bertahap",
    ],
    switchLabel: "Ingin menjadi mentor?",
    switchHref: "/register/instructor",
    switchText: "Daftar sebagai Instructor",
  },
  instructor: {
    title: "Daftar sebagai Instructor",
    description:
      "Bergabung sebagai mentor Eduka untuk membuat course dan membagikan keahlianmu.",
    badge: "Instructor Account",
    image: "/images/instructor-register.png",
    icon: Users,
    benefitTitle: "Bangun kelas digitalmu",
    benefits: [
      "Kelola course milikmu sendiri",
      "Buat materi dan lesson untuk student",
      "Kembangkan personal brand sebagai mentor",
    ],
    switchLabel: "Ingin belajar sebagai student?",
    switchHref: "/register/student",
    switchText: "Daftar sebagai Student",
  },
};

export function RegisterForm({
  role = "student",
  variant = "student",
}: RegisterFormProps) {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const content = registerContent[variant];
  const Icon = content.icon;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role,
    },
  });

  const password = watch("password");
  const passwordConfirmation = watch("password_confirmation");

  const isPasswordMismatch = useMemo(() => {
    return (
      password.length > 0 &&
      passwordConfirmation.length > 0 &&
      password !== passwordConfirmation
    );
  }, [password, passwordConfirmation]);

  const isSubmitDisabled = isLoading || !isValid || isPasswordMismatch;

  const onSubmit = async (values: RegisterFormValues) => {
    setErrorMessage(null);

    if (values.password !== values.password_confirmation) {
      setErrorMessage("Password tidak sama.");
      return;
    }

    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        role,
      });

      router.push(role === "instructor" ? "/login/instructor" : "/login/student");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Register gagal. Silakan coba lagi.";

      setErrorMessage(message);
    }
  };

  return (
    <Card className="grid w-full max-w-5xl overflow-hidden border border-white/50 bg-white/80 p-0 shadow-2xl backdrop-blur md:grid-cols-2">
      <div className="relative hidden min-h-[620px] overflow-hidden bg-gradient-to-br from-[#0d22a8] via-[#101f8f] to-[#06115a] p-8 text-white md:block">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#F25019]/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/20 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/20">
              <Icon className="h-4 w-4" />
              {content.badge}
            </div>

            <h2 className="max-w-sm text-3xl font-bold leading-tight">
              {content.title}
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">
              {content.description}
            </p>
          </div>

          <div className="relative my-8 flex justify-center">
            <div className="absolute inset-x-8 bottom-0 h-24 rounded-full bg-black/20 blur-2xl" />

            <Image
              src={content.image}
              alt={content.title}
              width={360}
              height={360}
              className="relative z-10 max-h-[280px] w-auto object-contain"
              priority
            />
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F25019]">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{content.benefitTitle}</h3>
            </div>

            <ul className="space-y-3 text-sm text-white/80">
              {content.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#F25019]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="mb-8 space-y-2 text-center md:text-left">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d22a8] text-white md:mx-0">
            <Icon className="h-6 w-6" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">{content.title}</h1>

          <p className="text-sm leading-6 text-gray-500">
            {content.description}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            id="name"
            type="text"
            label="Nama"
            placeholder="Masukkan nama lengkap"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Masukkan email aktif"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Masukkan password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            id="password_confirmation"
            type="password"
            label="Konfirmasi Password"
            placeholder="Ulangi password"
            error={
              isPasswordMismatch
                ? "Password tidak sama."
                : errors.password_confirmation?.message
            }
            {...register("password_confirmation")}
          />

          <input type="hidden" value={role} {...register("role")} />

          <Button
            type="submit"
            className="w-full disabled:cursor-not-allowed disabled:opacity-60"
            isLoading={isLoading}
            disabled={isSubmitDisabled}
          >
            Daftar sebagai {variant === "instructor" ? "Instructor" : "Student"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            href={role === "instructor" ? "/login/instructor" : "/login/student"}
            className="font-medium text-[#0d22a8] hover:underline"
          >
            Login
          </Link>
        </p>

        <p className="mt-3 text-center text-sm text-gray-600">
          {content.switchLabel}{" "}
          <Link
            href={content.switchHref}
            className="font-medium text-[#F25019] hover:underline"
          >
            {content.switchText}
          </Link>
        </p>
      </div>
    </Card>
  );
}