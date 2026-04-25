"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/features/auth/hooks/use-auth";
import {
  RegisterFormValues,
  registerSchema,
} from "@/features/auth/validations/auth-schema";

export function RegisterForm() {
  const router = useRouter();
  const { register: registerUser, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "student",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setErrorMessage(null);

    try {
      await registerUser(values);
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Register gagal. Silakan coba lagi.";

      setErrorMessage(message);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md bg-white/30">
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Register</h1>
        <p className="text-sm text-gray-500">
          Buat akun baru untuk mulai menggunakan Eduka.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="name"
          type="text"
          label="Nama"
          placeholder="Masukkan nama"
          error={errors.name?.message}
          {...register("name")}
        />

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

        <Input
          id="password_confirmation"
          type="password"
          label="Konfirmasi Password"
          placeholder="Ulangi password"
          error={errors.password_confirmation?.message}
          {...register("password_confirmation")}
        />

        {/* <input type="hidden" {...register("role")} /> */}

          <select
    id="role"
    className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
      errors.role ? "border-red-500 focus:border-red-500 focus:ring-red-100" : ""
    }`}
    {...register("role")}
  >
    <option value="student">Student</option>
    <option value="instructor">Instructor</option>
    <option value="admin">Admin</option>
  </select>Í

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Register
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </Card>
  );
}
