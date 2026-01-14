import { useEffect, useState } from "react";
import { getAdminUsers, type AdminUser } from "../../api/admin.users.api";

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminUsers()
      .then((res) => {
        setUsers(res.data.data);
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

  return (
    <div>
      <h1>Users</h1>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email} — {user.role} —{" "}
            {user.is_active ? "Active" : "Inactive"}
          </li>
        ))}
      </ul>
    </div>
  );
}
