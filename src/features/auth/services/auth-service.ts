import { api } from "@/lib/api";

import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/features/auth/types/auth.type";

export const authService = {
  login: async (payload: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/login", payload);

    return response.data;
  },

  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/register", payload);

    return response.data;
  },
};