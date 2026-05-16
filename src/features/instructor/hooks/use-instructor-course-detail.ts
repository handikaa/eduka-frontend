"use client";

import { useCallback, useEffect, useState } from "react";

import { getApiErrorMessage } from "@/lib/api-error";
import { instructorService } from "@/features/instructor/services/instructor-service";
import {
    InstructorCourse,
    UpdateInstructorCoursePayload,
} from "@/features/instructor/types/instructor.type";

export function useInstructorCourseDetail(courseId: number) {
    const [course, setCourse] = useState<InstructorCourse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchCourseDetail = useCallback(async () => {
        if (!courseId) {
            setErrorMessage("Course id tidak valid.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await instructorService.getInstructorCourseDetail(courseId);
            setCourse(response.data);
        } catch (error) {
            setErrorMessage(
                getApiErrorMessage(error, "Gagal mengambil detail course.")
            );
        } finally {
            setIsLoading(false);
        }
    }, [courseId]);

    const updateCourse = async (payload: UpdateInstructorCoursePayload) => {
        setIsUpdating(true);

        try {
            const response = await instructorService.updateInstructorCourse(
                courseId,
                payload
            );

            setCourse(response.data);
            return response.data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Gagal mengupdate course."));
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        fetchCourseDetail();
    }, [fetchCourseDetail]);

    return {
        course,
        isLoading,
        isUpdating,
        errorMessage,
        refetch: fetchCourseDetail,
        updateCourse,
    };
}