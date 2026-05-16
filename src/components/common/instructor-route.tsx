"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Loading } from "@/components/ui/loading";
import { useAuth } from "@/features/auth/hooks/use-auth";

type InstructorRouteProps = {
    children: ReactNode;
};

export function InstructorRoute({ children }: InstructorRouteProps) {
    const router = useRouter();
    const { user, isAuthenticated, isLoading } = useAuth();
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (!hasMounted || isLoading) {
            return;
        }

        if (!isAuthenticated) {
            router.replace("/login/instructor");
            return;
        }

        if (user && user.role !== "instructor") {
            router.replace("/dashboard/student");
        }
    }, [hasMounted, isLoading, isAuthenticated, user, router]);

    if (!hasMounted || isLoading) {
        return <Loading text="Memeriksa akses mentor..." />;
    }

    if (!isAuthenticated) {
        return <Loading text="Mengarahkan ke login mentor..." />;
    }

    if (!user) {
        return <Loading text="Memuat data user..." />;
    }

    if (user.role !== "instructor") {
        return <Loading text="Mengarahkan ke dashboard student..." />;
    }

    return <>{children}</>;
}