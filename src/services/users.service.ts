import { getAdminUsers, type AdminUser } from "../api/admin.api";
import { api } from "../api/axios";

export type FetchAdminUsersResult = {
    users: AdminUser[];
};

export const fetchAdminUsers = async (page = 1) => {
    const res = await getAdminUsers(page);

    return {
        users: res.data.data,
        meta: res.data.meta,
    };
}

export const suspendUser = (userId: number) => {
  return api.patch(`/admin/users/${userId}/suspend`);
};

export const restoreUser = (userId: number) => {
  return api.patch(`/admin/users/${userId}/restore`);
}