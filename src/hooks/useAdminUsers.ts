import { useQuery } from "@tanstack/react-query";
import { fetchAdminUsers } from "../services/users.service";
import type { AdminUser } from "../api/admin.api";

export function useAdminUsers(page: number) {
  return useQuery({
    queryKey: ["admin-users", page],
    queryFn: () => fetchAdminUsers(page),
    placeholderData: (prev) => prev,
  });
}
