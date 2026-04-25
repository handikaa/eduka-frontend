"use client";

import { BookOpen, Users } from "lucide-react";

import { ProtectedRoute } from "@/components/common/protected-route";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { UserList } from "@/features/users/components/user-list";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <section className="min-h-[calc(100vh-72px)] bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600">Dashboard</p>

            <h1 className="mt-2 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
              Selamat datang, {user?.name}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Kelola aktivitas belajar dan akses data pengguna dari halaman ini.
            </p>
          </div>

          <div className="mb-8 grid gap-4 sm:gap-6 md:grid-cols-2 lg:mb-10">
            <Card className="p-5 sm:p-6">
              <div className="flex items-start gap-3 sm:items-center">
                <div className="shrink-0 rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                    Data Users
                  </h2>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Lihat daftar user dan pagination dari API.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5 sm:p-6">
              <div className="mb-4 flex items-start gap-3 sm:items-center">
                <div className="shrink-0 rounded-lg bg-blue-50 p-3 text-blue-600">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>

                <div className="min-w-0">
                  <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                    Informasi Akun
                  </h2>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Informasi user yang sedang login.
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <span className="font-medium text-gray-900">Nama:</span>
                  <span className="break-words">{user?.name}</span>
                </p>

                <p className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <span className="font-medium text-gray-900">Email:</span>
                  <span className="break-all">{user?.email}</span>
                </p>

                <p className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <span className="font-medium text-gray-900">Role:</span>
                  <span className="capitalize">{user?.role}</span>
                </p>
              </div>
            </Card>
          </div>

          <div className="rounded-2xl bg-white/60 p-4 shadow-sm backdrop-blur-sm sm:p-6">
            <UserList />
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}