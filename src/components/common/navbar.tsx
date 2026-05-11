"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, UserCircle, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/use-auth";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dashboardHref =
    user?.role === "instructor" ? "/dashboard/instructor" : "/dashboard/student";

  const accountSettingsHref =
    user?.role === "instructor"
      ? "/account/instructor"
      : "/account/student";

  const loginHref = "/login/student";

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    router.replace(loginHref);
  };

  const handleNavigate = (path: string) => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
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

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const getDesktopLinkClassName = (href: string) => {
    const isActive = isActiveLink(href);

    return `relative font-semibold transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-700 hover:text-primary"
      }`;
  };

  const getMobileLinkClassName = (href: string) => {
    const isActive = isActiveLink(href);

    return `rounded-xl px-3 py-2 font-semibold transition-colors duration-200 ${isActive
        ? "bg-primary text-white"
        : "text-gray-700 hover:bg-gray-50 hover:text-primary"
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
                    <span className="absolute -bottom-2 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-secondary" />
                  )}
                </Link>
              );
            })}

            {isAuthenticated ? (
              <div
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-primary shadow-sm transition-all duration-200 hover:border-secondary hover:bg-secondary hover:text-white"
                  aria-label="Open profile menu"
                  aria-expanded={isProfileOpen}
                >
                  <UserCircle className="h-7 w-7" />
                </button>

                <div
                  className={`absolute right-0 top-14 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl transition-all duration-200 ${isProfileOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                    }`}
                >
                  <div className="border-b border-gray-100 px-4 py-3">
                    <p className="text-sm font-bold text-gray-900">
                      {user?.role === "instructor" ? "Instructor" : "Student"}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  <div className="p-2">
                    <button
                      type="button"
                      onClick={() => handleNavigate(dashboardHref)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigate(accountSettingsHref)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary"
                    >
                      <Settings className="h-4 w-4" />
                      Pengaturan Akun
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button type="button" onClick={() => handleNavigate("/login/student")}>
                Login
              </Button>
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
              className={`transition-transform duration-300 ease-in-out ${isMenuOpen ? "rotate-180" : "rotate-0"
                }`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`grid transition-all duration-300 ease-in-out lg:hidden ${isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
        >
          <div className="overflow-hidden">
            <div
              className={`mt-4 rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? "translate-y-0 scale-100" : "-translate-y-3 scale-95"
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
                    <div className="mt-2 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                          <UserCircle className="h-7 w-7" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-bold capitalize text-gray-900">
                            {user?.role}
                          </p>
                          <p className="truncate text-xs text-gray-500">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleNavigate(dashboardHref)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigate(accountSettingsHref)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-primary"
                    >
                      <Settings className="h-4 w-4" />
                      Pengaturan Akun
                    </button>

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
                      onClick={() => handleNavigate("/login/student")}
                    >
                      Login Student
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleNavigate("/login/instructor")}
                    >
                      Login Instructor
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