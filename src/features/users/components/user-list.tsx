"use client";

import { Loading } from "@/components/ui/loading";
import { Pagination } from "@/components/ui/pagination";
import { useUsers } from "@/features/users/hooks/use-users";
import { UserCard } from "@/features/users/components/user-card";

export function UserList() {
  const {
    users,
    pagination,
    page,
    isLoading,
    errorMessage,
    handlePageChange,
    refetch,
  } = useUsers();

  if (isLoading) {
    return <Loading text="Mengambil data user..." />;
  }

  if (errorMessage) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm font-medium text-red-700">{errorMessage}</p>

        <button
          type="button"
          onClick={refetch}
          className="mt-3 text-sm font-semibold text-red-700 hover:underline"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
        <p className="text-sm text-gray-500">Data user belum tersedia.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pagination && (
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Daftar User</h2>
            <p className="text-sm text-gray-500">
              Total {pagination.total} user ditemukan.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            Page {pagination.current_page} of {pagination.last_page}
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {pagination && (
        <Pagination
          currentPage={page}
          totalPages={pagination.last_page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}