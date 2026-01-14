import { getAdminUsers, type AdminUser } from "../api/admin.api";

export type FetchAdminUsersResult = {
    users: AdminUser[];
};

export const fetchAdminUsers = async (): Promise<FetchAdminUsersResult> => {
    const res = await getAdminUsers();

    const filteredUsers = res.data.data.filter(
        (user) => user.role !== "admin"
    );

    return {
        users: filteredUsers
    };
};