"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, UserRoundCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/hooks/use-auth";
import {
  LoginFormValues,
  loginSchema,
} from "@/features/auth/validations/auth-schema";

type LoginVariant = "student" | "instructor";

type LoginFormProps = {
  variant?: LoginVariant;
};

const loginContent = {
  student: {
    title: "Login Student",
    description:
      "Masuk ke akun student untuk melanjutkan belajar dan mengakses course kamu.",
    icon: GraduationCap,
    registerHref: "/register/student",
    registerText: "Daftar sebagai Student",
  },
  instructor: {
    title: "Login Instructor",
    description:
      "Masuk ke akun instructor untuk mengelola course, lesson, dan aktivitas belajar student.",
    icon: UserRoundCheck,
    registerHref: "/register/instructor",
    registerText: "Daftar sebagai Instructor",
  },
};

export function LoginForm({ variant = "student" }: LoginFormProps) {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const content = loginContent[variant];
  const Icon = content.icon;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setErrorMessage(null);

    try {
      const authUser = await login(values);

      if (authUser.role === "instructor") {
        router.push("/dashboard/instructor");
        return;
      }

      router.push("/dashboard/student");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Login gagal. Silakan coba lagi.";

      setErrorMessage(message);
    }
  };

  return (
    <Card className="w-full max-w-md border border-white/60 bg-white/80 p-6 shadow-2xl backdrop-blur sm:p-8">
      <div className="mb-8 space-y-3 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0d22a8] text-white shadow-lg">
          <Icon className="h-7 w-7" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{content.title}</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            {content.description}
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="Masukkan email"
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

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          disabled={isLoading || !isValid}
        >
          Login
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Belum punya akun?{" "}
        <Link
          href={content.registerHref}
          className="font-medium text-[#F25019] hover:underline"
        >
          {content.registerText}
        </Link>
      </p>
    </Card>
  );
}