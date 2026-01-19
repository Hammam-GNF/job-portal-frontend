import { api } from "./axios";

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "employer" | "applicant";
  is_active: boolean;
  suspended_at: string | null;
};

export type AdminUsersResponse = {
  data: AdminUser[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export const getAdminUsers = (page = 1) => {
  return api.get<AdminUsersResponse>(`/admin/users?page=${page}`);
};

export const suspendUser = (userId: number) => {
  return api.patch(`/admin/users/${userId}/suspend`);
};

export const restoreUser = (userId: number) => {
  return api.patch(`/admin/users/${userId}/restore`);
}
