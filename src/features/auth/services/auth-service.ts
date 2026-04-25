import { AxiosError } from "axios";

import { api } from "@/lib/api";

import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/features/auth/types/auth.type";

type ApiErrorResponse = {
  success: false;
  message: string;
};

function getAuthErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data as ApiErrorResponse | undefined;

    if (responseData?.message) {
      return responseData.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Terjadi kesalahan. Silakan coba lagi.";
}

export const authService = {
  login: async (payload: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>("/auth/login", payload);

      return response.data;
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },

  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>("/auth/register", payload);

      return response.data;
    } catch (error) {
      throw new Error(getAuthErrorMessage(error));
    }
  },
};