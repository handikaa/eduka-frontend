"use client";

import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";

import { instructorService } from "@/features/instructor/services/instructor-service";
import { InstructorCoursePerformance } from "@/features/instructor/types/instructor.type";

export function useInstructorCoursePerformance() {
    const [courses, setCourses] = useState<InstructorCoursePerformance[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchCoursePerformance = useCallback(async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const data = await instructorService.getInstructorCoursePerformance();
            setCourses(data);
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(
                    error.response?.data?.message ||
                    "Gagal mengambil performa course instructor."
                );
                return;
            }

            setErrorMessage("Gagal mengambil performa course instructor.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCoursePerformance();
    }, [fetchCoursePerformance]);

    return {
        courses,
        isLoading,
        errorMessage,
        refetch: fetchCoursePerformance,
    };
}