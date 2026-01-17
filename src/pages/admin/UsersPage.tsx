import { useEffect, useState } from "react";
import { fetchAdminUsers, suspendUser, restoreUser } from "../../services/users.service";
import type { AdminUser } from "../../api/admin.api";
import Table from "../../components/table/Table";
import Pagination from "../../components/pagination/Pagination";
import { UserStatusCell } from "../../components/admin/user/UserStatusCell";
import { ConfirmModal } from "../../components/ui/ConfirmModal";

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingAction, setLoadingAction] = useState<number | null>(null);
  const [confirmState, setConfirmState] = useState<{
    user: AdminUser;
    action: "suspend" | "restore";
  } | null>(null);

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
      render: (user: AdminUser) => (
        <UserStatusCell
          isActive={user.is_active}
          isLoading={loadingAction === user.id}
          onRequestAction={(action) => {
            setConfirmState({ user, action });
          }}
        />
      ),
    },
  ];

  const executeAction = async () => {
    if (!confirmState) return;

    const { user, action } = confirmState;
    setLoadingAction(user.id);

    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, is_active: action === "restore" } : u
      )
    );

    try {
      if (action === "suspend") {
        await suspendUser(user.id);
      } else {
        await restoreUser(user.id);
      }
    } catch {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_active: action === "suspend" } : u
        )
      );
      alert("Gagal memproses action");
    } finally {
      setLoadingAction(null);
      setConfirmState(null);
    }
  };


  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;
  if (!loading && users.length === 0) return <div>Tidak ada user</div>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Users</h1>
      <Table columns={columns} data={users} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <ConfirmModal
        open={!!confirmState}
        title="Confirm Action"
        description={`Are you sure you want to ${confirmState?.action} this user?`}
        confirmLabel="Yes"
        onCancel={() => setConfirmState(null)}
        onConfirm={executeAction}
        loading={loadingAction !== null}
      />
    </div>
  );
}
