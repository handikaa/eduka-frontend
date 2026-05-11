"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Loading } from "@/components/ui/loading";
import { useAuth } from "@/features/auth/hooks/use-auth";

type GuestRouteProps = {
  children: ReactNode;
};

export function GuestRoute({ children }: GuestRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === "instructor") {
        router.replace("/dashboard/instructor");
        return;
      }

      router.replace("/dashboard/student");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return <Loading text="Memeriksa sesi login..." />;
  }

  if (isAuthenticated) {
    return <Loading text="Mengarahkan ke dashboard..." />;
  }

  return <>{children}</>;
}