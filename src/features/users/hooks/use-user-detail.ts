"use client";

import { useCallback, useEffect, useState } from "react";

import { userService } from "@/features/users/services/user-service";
import { UserDetail } from "@/features/users/types/user.type";

export function useUserDetail(id: string) {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchUserDetail = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await userService.getUserById(id);

      if (!response.success) {
        throw new Error(response.message);
      }

      setUser(response.data.user);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengambil detail user.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  return {
    user,
    isLoading,
    errorMessage,
    refetch: fetchUserDetail,
  };
}