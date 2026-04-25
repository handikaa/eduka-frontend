"use client";

import { createContext, ReactNode, useState } from "react";

import { STORAGE_KEYS } from "@/lib/constans";
import { storage } from "@/lib/storage";

import { authService } from "@/features/auth/services/auth-service";
import {
  AuthContextType,
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "@/features/auth/types/auth.type";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

function getStoredUser(): AuthUser | null {
  const storedUser = storage.getItem(STORAGE_KEYS.USER);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    storage.removeItem(STORAGE_KEYS.USER);
    return null;
  }
}

function getStoredToken(): string | null {
  return storage.getItem(STORAGE_KEYS.TOKEN);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = Boolean(token && user);

  const login = async (payload: LoginRequest): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await authService.login(payload);

      if (!response.success) {
        throw new Error(response.message);
      }

      const authUser = response.data.user;
      const authToken = response.data.token;

      setUser(authUser);
      setToken(authToken);

      storage.setItem(STORAGE_KEYS.USER, JSON.stringify(authUser));
      storage.setItem(STORAGE_KEYS.TOKEN, authToken);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterRequest): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await authService.register(payload);

      if (!response.success) {
        throw new Error(response.message);
      }

      const authUser = response.data.user;
      const authToken = response.data.token;

      setUser(authUser);
      setToken(authToken);

      storage.setItem(STORAGE_KEYS.USER, JSON.stringify(authUser));
      storage.setItem(STORAGE_KEYS.TOKEN, authToken);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);

    storage.removeItem(STORAGE_KEYS.USER);
    storage.removeItem(STORAGE_KEYS.TOKEN);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}