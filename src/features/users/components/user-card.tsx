import Link from "next/link";

import { Button } from "@/components/ui/button";
import { User } from "@/features/users/types/user.type";

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-bold text-gray-900">
              {user.name}
            </h3>

            <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium capitalize text-blue-700">
              {user.role}
            </span>
          </div>

          <p className="mt-1 truncate text-sm text-gray-500">{user.email}</p>

          <div className="mt-3 flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                user.is_active ? "bg-green-500" : "bg-gray-400"
              }`}
            />

            <span className="text-xs text-gray-500">
              {user.is_active ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="mt-4">
            <Link href={`/users/${user.id}`}>
              <Button type="button" variant="outline" className="w-full">
                Lihat Detail
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}