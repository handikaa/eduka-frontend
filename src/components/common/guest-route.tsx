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
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <Loading text="Memeriksa sesi login..." />;
  }

  if (isAuthenticated) {
    return <Loading text="Mengarahkan ke dashboard..." />;
  }

  return <>{children}</>;
}