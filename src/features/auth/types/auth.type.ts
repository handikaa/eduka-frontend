export type UserRole = "student" | "instructor" | "admin";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: UserRole;
};

export type AuthData = {
  user: AuthUser;
  token: string;
  token_type: string;
};

export type AuthSuccessResponse = {
  success: true;
  message: string;
  data: AuthData;
};

export type AuthErrorResponse = {
  success: false;
  message: string;
};

export type AuthResponse = AuthSuccessResponse | AuthErrorResponse;

export type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
};