"use client";

import { useCallback, useEffect, useState } from "react";
import { AxiosError } from "axios";

import { useAuth } from "@/features/auth/hooks/use-auth";
import { instructorService } from "@/features/instructor/services/instructor-service";
import {
    InstructorCourse,
    InstructorCourseLevel,
    InstructorCoursesPagination,
    InstructorCourseStatus,
} from "@/features/instructor/types/instructor.type";
import { getApiErrorMessage } from "@/lib/api-error";



type InstructorCoursesState = {
    status: InstructorCourseStatus | "all";
    level: InstructorCourseLevel | "all";
    search: string;
    page: number;
    perPage: number;
};

const initialFilters: InstructorCoursesState = {
    status: "all",
    level: "all",
    search: "",
    page: 1,
    perPage: 5,
};


export function useInstructorCourses() {
    const { user } = useAuth();

    const [courses, setCourses] = useState<InstructorCourse[]>([]);
    const [pagination, setPagination] =
        useState<InstructorCoursesPagination | null>(null);

    const [filters, setFilters] =
        useState<InstructorCoursesState>(initialFilters);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [updatingCourseId, setUpdatingCourseId] = useState<number | null>(null);

    const fetchCourses = useCallback(async () => {
        if (!user?.id) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await instructorService.getInstructorCourses({
                user_id: user.id,
                status: filters.status,
                level: filters.level,
                search: filters.search,
                page: filters.page,
                per_page: filters.perPage,
            });

            setCourses(response.data);
            setPagination(response.pagination);
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(
                    error.response?.data?.message ||
                    "Gagal mengambil list course instructor."
                );
                return;
            }

            setErrorMessage(
                getApiErrorMessage(error, "Gagal mengambil list course instructor.")
            );
        } finally {
            setIsLoading(false);
        }
    }, [user?.id, filters]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const setSearch = (search: string) => {
        setFilters((prev) => ({
            ...prev,
            search,
            page: 1,
        }));
    };

    const setStatus = (status: InstructorCourseStatus | "all") => {
        setFilters((prev) => ({
            ...prev,
            status,
            page: 1,
        }));
    };

    const setLevel = (level: InstructorCourseLevel | "all") => {
        setFilters((prev) => ({
            ...prev,
            level,
            page: 1,
        }));
    };

    const setPage = (page: number) => {
        setFilters((prev) => ({
            ...prev,
            page,
        }));
    };

    const resetFilters = () => {
        setFilters(initialFilters);
    };


    const updateCourseStatus = async (
        courseId: number,
        slug: string,
        status: InstructorCourseStatus
    ) => {
        setUpdatingCourseId(courseId);
        setErrorMessage(null);

        try {
            await instructorService.updateInstructorCourseStatus(slug, status);
            await fetchCourses();
        } catch (error) {
            if (error instanceof AxiosError) {
                setErrorMessage(
                    error.response?.data?.message || "Gagal mengubah status course."
                );
                return;
            }

            setErrorMessage("Gagal mengubah status course.");
        } finally {
            setUpdatingCourseId(null);
        }
    };

    return {
        courses,
        pagination,
        filters,
        isLoading,
        errorMessage,
        refetch: fetchCourses,
        setSearch,
        setStatus,
        setLevel,
        setPage,
        resetFilters,
        updateCourseStatus,
        updatingCourseId
    };
}