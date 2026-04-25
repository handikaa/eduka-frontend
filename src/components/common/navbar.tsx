"use client";

import Link from "next/link";
import Image from "next/image";
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
    <header className=" bg-[#c8cdf8]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">


<Image
            src="/images/logo.png"
            alt="Eduka Logo"
            width={700}
            height={200}
            priority
            className="relative z-10 h-10 w-40 object-contain "
          />
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Careers
          </Link>
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Blog
          </Link>
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            About Us
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

            <Button onClick={() => router.push("/login")} >
              Login
            </Button>
              
            <Button variant="outline" onClick={() => router.push("/register")} >
              Register
            </Button>
              
            </>
          )}
        </div>
      </nav>
    </header>
  );
}