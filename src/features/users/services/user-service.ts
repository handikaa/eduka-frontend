import { AxiosError } from "axios";

import { api } from "@/lib/api";
import {
  GetUsersParams,
  UsersResponse,
  UserDetailResponse,
} from "@/features/users/types/user.type";

type ApiErrorResponse = {
  success: false;
  message: string;
};

function getUserErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data as ApiErrorResponse | undefined;

    if (responseData?.message) {
      return responseData.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan saat mengambil data user.";
}

export const userService = {
  getUsers: async ({
    page,
    per_page,
  }: GetUsersParams): Promise<UsersResponse> => {
    try {
      const response = await api.get<UsersResponse>("/users", {
        params: {
          page,
          per_page,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(getUserErrorMessage(error));
    }
  },

   getUserById: async (id: string | number): Promise<UserDetailResponse> => {
    try {
      const response = await api.get<UserDetailResponse>(`/auth/user/${id}`);

      return response.data;
    } catch (error) {
      throw new Error(getUserErrorMessage(error));
    }
  },
};