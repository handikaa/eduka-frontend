"use client";

import Link from "next/link";
import { BookOpen, Users } from "lucide-react";

import { ProtectedRoute } from "@/components/common/protected-route";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Selamat datang, {user?.name}
          </h1>
          <p className="mt-2 text-gray-600">
            Kelola aktivitas belajar dan akses data pengguna dari halaman ini.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <Users className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Data Users
                </h2>
                <p className="text-sm text-gray-500">
                  Lihat daftar user dan detail user dari API.
                </p>
              </div>
            </div>

            <Link href="/users">
              <Button type="button">Lihat Users</Button>
            </Link>
          </Card>

          <Card>
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <BookOpen className="h-6 w-6" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Informasi Akun
                </h2>
                <p className="text-sm text-gray-500">
                  Informasi user yang sedang login.
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-medium">Nama:</span> {user?.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p>
                <span className="font-medium">Role:</span> {user?.role}
              </p>
            </div>
          </Card>
        </div>
      </section>
    </ProtectedRoute>
  );
}