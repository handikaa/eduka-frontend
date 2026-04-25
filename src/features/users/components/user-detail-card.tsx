import Link from "next/link";
import { Mail, ShieldCheck, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserDetail } from "@/features/users/types/user.type";

type UserDetailCardProps = {
  user: UserDetail;
};

export function UserDetailCard({ user }: UserDetailCardProps) {
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <div className="mb-6 flex flex-col items-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-700">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
        <p className="mt-1 text-sm text-gray-500">{user.email}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <UserRound className="h-5 w-5 text-blue-600" />

          <div>
            <p className="text-xs font-medium uppercase text-gray-500">ID User</p>
            <p className="text-sm font-semibold text-gray-900">{user.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <Mail className="h-5 w-5 text-blue-600" />

          <div>
            <p className="text-xs font-medium uppercase text-gray-500">Email</p>
            <p className="text-sm font-semibold text-gray-900">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <ShieldCheck className="h-5 w-5 text-blue-600" />

          <div>
            <p className="text-xs font-medium uppercase text-gray-500">Role</p>
            <p className="text-sm font-semibold capitalize text-gray-900">
              {user.role}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/dashboard">
          <Button type="button" variant="outline" className="w-full">
            Kembali ke Dashboard
          </Button>
        </Link>
      </div>
    </Card>
  );
}