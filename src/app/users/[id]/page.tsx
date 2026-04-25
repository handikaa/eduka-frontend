"use client";

import { useParams } from "next/navigation";

import { ProtectedRoute } from "@/components/common/protected-route";
import { Loading } from "@/components/ui/loading";
import { useUserDetail } from "@/features/users/hooks/use-user-detail";
import { UserDetailCard } from "@/features/users/components/user-detail-card";

export default function UserDetailPage() {
  const params = useParams<{ id: string }>();
  const { user, isLoading, errorMessage, refetch } = useUserDetail(params.id);

  return (
    <ProtectedRoute>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">User Detail</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Detail User
          </h1>
          <p className="mt-2 text-gray-600">
            Informasi detail user berdasarkan data dari API.
          </p>
        </div>

        {isLoading && <Loading text="Mengambil detail user..." />}

        {errorMessage && !isLoading && (
          <div className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-red-700">{errorMessage}</p>

            <button
              type="button"
              onClick={refetch}
              className="mt-3 text-sm font-semibold text-red-700 hover:underline"
            >
              Coba lagi
            </button>
          </div>
        )}

        {user && !isLoading && !errorMessage && <UserDetailCard user={user} />}
      </section>
    </ProtectedRoute>
  );
}