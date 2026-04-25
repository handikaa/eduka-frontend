"use client";

import { useCallback, useEffect, useState } from "react";

import {
  User,
  UsersPagination,
} from "@/features/users/types/user.type";
import { userService } from "@/features/users/services/user-service";

const DEFAULT_PER_PAGE = 10;

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<UsersPagination | null>(null);
  const [page, setPage] = useState(1);
  const [perPage] = useState(DEFAULT_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await userService.getUsers({
        page,
        per_page: perPage,
      });

      if (!response.success) {
        throw new Error(response.message);
      }

      setUsers(response.data);
      setPagination(response.pagination);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengambil data user.";

      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [page, perPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePageChange = (nextPage: number) => {
    if (!pagination) return;

    if (nextPage < 1 || nextPage > pagination.last_page) {
      return;
    }

    setPage(nextPage);
  };

  return {
    users,
    pagination,
    page,
    perPage,
    isLoading,
    errorMessage,
    handlePageChange,
    refetch: fetchUsers,
  };
}