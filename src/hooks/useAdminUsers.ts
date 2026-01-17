import { useEffect, useState } from "react";
import { fetchAdminUsers } from "../services/users.service";
import type { AdminUser } from "../api/admin.api";

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    setError(null);

    fetchAdminUsers(currentPage)
      .then((res) => {
        if (!mounted) return;
        setUsers(res.users);
        setTotalPages(res.meta.last_page);
      })
      .catch(() => {
        if (!mounted) return;
        setError("Gagal mengambil data users");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [currentPage]);

  return {
    users,
    setUsers,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}