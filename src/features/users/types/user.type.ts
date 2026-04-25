export type UserRole = "student" | "instructor" | "admin";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type UsersPagination = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type UsersResponse = {
  success: boolean;
  message: string;
  data: User[];
  pagination: UsersPagination;
};

export type GetUsersParams = {
  page: number;
  per_page: number;
};

export type UserDetail = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

export type UserDetailResponse = {
  success: boolean;
  message: string;
  data: {
    user: UserDetail;
  };
};