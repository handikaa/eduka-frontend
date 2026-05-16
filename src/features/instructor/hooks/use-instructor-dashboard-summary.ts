"use client";

import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";

import { instructorService } from "@/features/instructor/services/instructor-service";
import { InstructorDashboardSummary } from "@/features/instructor/types/instructor.type";

export function useInstructorDashboardSummary() {
    const [summary, setSummary] = useState<InstructorDashboardSummary | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchSummary = useCallback(async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const data = await instructorService.getInstructorDashboardSummary();
            setSummary(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(
                    error.response?.data?.message ||
                    "Gagal mengambil ringkasan dashboard instructor."
                );
                return;
            }

            setErrorMessage("Gagal mengambil ringkasan dashboard instructor.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary]);

    return {
        summary,
        isLoading,
        errorMessage,
        refetch: fetchSummary,
    };
}