"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-blue-800">
          Eduka
        </Link>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/users" className="text-gray-700 hover:text-blue-600">
                Users
              </Link>

              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-blue-600"
              >
                Dashboard
              </Link>

              <span className="hidden text-gray-500 sm:inline">
                {user?.name}
              </span>

              <Button type="button" variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>

              <Link
                href="/register"
                className="text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}