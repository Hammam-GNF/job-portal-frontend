import { useEffect, useState } from "react";
import { fetchAdminUsers } from "../../services/users.service";
import type { AdminUser } from "../../api/admin.api";
import Table from "../../components/table/Table";

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminUsers()
      .then((res) => {
        setUsers(res.users);
      })
      .catch(() => {
        setError("Gagal mengambil data users");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  const columns = [
    { 
      key: "name", 
      header: "Name", 
      render: (user: AdminUser) => user.name 
    },
    { 
      key: "email", 
      header: "Email", 
      render: (user: AdminUser) => user.email 
    },
    { 
      key: "role", 
      header: "Role", 
      render: (user: AdminUser) => user.role 
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
  ];
  
  return (
    <div>
      {" "}
      <h1 className="text-xl font-semibold mb-4">Users</h1>{" "}
      <Table columns={columns} data={users} />{" "}
    </div>
  );
}
