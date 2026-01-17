import { useEffect, useState } from "react";
import { fetchAdminUsers } from "../../services/users.service";
import type { AdminUser } from "../../api/admin.api";
import Table from "../../components/table/Table";
import Pagination from "../../components/pagination/Pagination";
import { suspendUser, restoreUser } from "../../services/users.service";

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    setError(null);

    fetchAdminUsers(currentPage)
      .then((res) => {
        if (!isMounted) return;
        setUsers(res.users);
        setTotalPages(res.meta.last_page);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Gagal mengambil data users");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  const handleToggleActive = async (user: AdminUser) => {
    try {
      if (user.is_active) {
        await suspendUser(user.id);
      } else {
        await restoreUser(user.id);
      }

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, is_active: !u.is_active } : u
        )
      );

    } catch {
      alert("Gagal memperbarui status user");
    }
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (user: AdminUser) => user.name,
    },
    {
      key: "email",
      header: "Email",
      render: (user: AdminUser) => user.email,
    },
    {
      key: "role",
      header: "Role",
      render: (user: AdminUser) => user.role,
    },
    {
      key: "status",
      header: "Status",
      render: (user: AdminUser) =>
        user.is_active ? (
          <span className="text-green-600 font-medium">Active</span>
        ) : (
          <span className="text-red-600 font-medium">Inactive</span>
        ),
    },
    {
      key: "action",
      header: "Action",
      render: (user: AdminUser) => (
        <button
          onClick={() => handleToggleActive(user)}
          className={`px-3 py-1 rounded-md font-medium text-white ${
            user.is_active
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {user.is_active ? "Suspend" : "Restore"}
        </button>
      ),
    },
  ];

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (!loading && users.length === 0) {
    return <div>Tidak ada user</div>;
  }

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Users</h1>
      <Table columns={columns} data={users} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
