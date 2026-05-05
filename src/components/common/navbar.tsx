"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.replace("/login");
  };

  const handleNavigate = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const publicLinks = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Blog", href: "/blog" },
    { label: "About Us", href: "/about-us" },
  ];

  const authLinks = [
    { label: "Users", href: "/users" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const getDesktopLinkClassName = (href: string) => {
    const isActive = isActiveLink(href);

    return `relative font-semibold transition-colors duration-200 ${
      isActive ? "text-[#0d22a8]" : "text-gray-700 hover:text-[#0d22a8]"
    }`;
  };

  const getMobileLinkClassName = (href: string) => {
    const isActive = isActiveLink(href);

    return `rounded-xl px-3 py-2 font-semibold transition-colors duration-200 ${
      isActive
        ? "bg-[#0d22a8] text-white"
        : "text-gray-700 hover:bg-gray-50 hover:text-[#0d22a8]"
    }`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" onClick={closeMenu}>
            <Image
              src="/images/logo.png"
              alt="Eduka Logo"
              width={700}
              height={200}
              priority
              className="h-10 w-32 object-contain sm:w-40"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-6 text-sm lg:flex">
            {publicLinks.map((item) => {
              const isActive = isActiveLink(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={getDesktopLinkClassName(item.href)}
                >
                  {item.label}

                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-[#F25019]" />
                  )}
                </Link>
              );
            })}

            {isAuthenticated ? (
              <>
                {authLinks.map((item) => {
                  const isActive = isActiveLink(item.href);

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={getDesktopLinkClassName(item.href)}
                    >
                      {item.label}

                      {isActive && (
                        <span className="absolute -bottom-2 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-[#F25019]" />
                      )}
                    </Link>
                  );
                })}

                <span className="max-w-40 truncate text-gray-500">
                  {user?.name}
                </span>

                <Button type="button" variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button type="button" onClick={() => handleNavigate("/login")}>
                  Login
                </Button>
{/* 
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleNavigate("/register")}
                >
                  Register
                </Button> */}
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="inline-flex rounded-md p-2 text-gray-700 transition-all duration-200 hover:bg-gray-100 active:scale-95 lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`grid transition-all duration-300 ease-in-out lg:hidden ${
            isMenuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div
              className={`mt-4 rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "translate-y-0 scale-100"
                  : "-translate-y-3 scale-95"
              }`}
            >
              <div className="flex flex-col gap-2 text-sm">
                {publicLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className={getMobileLinkClassName(item.href)}
                  >
                    {item.label}
                  </Link>
                ))}

                {isAuthenticated ? (
                  <>
                    {authLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={closeMenu}
                        className={getMobileLinkClassName(item.href)}
                      >
                        {item.label}
                      </Link>
                    ))}

                    <div className="rounded-xl px-3 py-2 text-sm text-gray-500">
                      {user?.name}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="grid gap-3 pt-2 sm:grid-cols-2">
                    <Button
                      type="button"
                      className="w-full"
                      onClick={() => handleNavigate("/login")}
                    >
                      Login
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleNavigate("/register")}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}