import { useState } from "react";
import { suspendUser, restoreUser } from "../../services/users.service";
import type { AdminUser } from "../../api/admin.api";
import Pagination from "../../components/pagination/Pagination";
import { ConfirmModal } from "../../components/ui/ConfirmModal";
import toast from "react-hot-toast";
import { useConfirmAction } from "../../hooks/useConfirmAction";
import { AdminUsersTable } from "../../components/admin/user/AdminUsersTable";
import { useAdminUsers } from "../../hooks/useAdminUsers";

export default function UsersPage() {
  const {
    users,
    setUsers,
    loading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useAdminUsers();

  const [loadingAction, setLoadingAction] = useState<number | null>(null);

  const {
    confirmState,
    loading: confirmLoading,
    requestAction,
    cancel,
    confirm,
  } = useConfirmAction<AdminUser, "suspend" | "restore">({
    onExecute: async (user, action) => {
      setLoadingAction(user.id);

      try {
        if (action === "suspend") {
          await suspendUser(user.id);
          toast.success("User suspended");
        } else {
          await restoreUser(user.id);
          toast.success("User restored");
        }

        setUsers((prev) =>
          prev.map((u) =>
            u.id === user.id ? { ...u, is_active: action === "restore" } : u
          )
        );
      } catch {
        toast.error("Action failed");
        throw new Error();
      } finally {
        setLoadingAction(null);
      }
    },
  });

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;
  if (!loading && users.length === 0) return <div>Tidak ada user</div>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Users</h1>

      <AdminUsersTable
        users={users}
        loadingAction={loadingAction}
        onRequestAction={requestAction}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmModal
        open={!!confirmState}
        title={
          confirmState?.action === "suspend" ? "Suspend User" : "Restore User"
        }
        description={`Are you sure you want to ${confirmState?.action} this user?`}
        confirmLabel="Yes"
        cancelLabel="Cancel"
        variant="danger"
        loading={confirmLoading}
        onCancel={cancel}
        onConfirm={confirm}
      />
    </div>
  );
}