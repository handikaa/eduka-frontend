"use client";

import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";

import { instructorService } from "@/features/instructor/services/instructor-service";
import { InstructorCategory } from "@/features/instructor/types/instructor.type";

export function useInstructorCategories() {
    const [categories, setCategories] = useState<InstructorCategory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const data = await instructorService.getCategories();
            setCategories(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(
                    error.response?.data?.message || "Gagal mengambil data kategori."
                );
                return;
            }

            setErrorMessage("Gagal mengambil data kategori.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        isLoading,
        errorMessage,
        refetch: fetchCategories,
    };
}