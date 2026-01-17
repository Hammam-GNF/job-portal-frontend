import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { suspendUser, restoreUser } from "../../services/users.service";
import type { AdminUser } from "../../api/admin.api";
import Pagination from "../../components/pagination/Pagination";
import { ConfirmModal } from "../../components/ui/ConfirmModal";
import { useConfirmAction } from "../../hooks/useConfirmAction";
import { AdminUsersTable } from "../../components/admin/user/AdminUsersTable";
import { useAdminUsers } from "../../hooks/useAdminUsers";

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingAction, setLoadingAction] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useAdminUsers(currentPage);

  const users = data?.users ?? [];
  const totalPages = data?.meta.last_page ?? 1;

  const mutation = useMutation({
    mutationFn: async ({
      id,
      action,
    }: {
      id: number;
      action: "suspend" | "restore";
    }) => {
      if (action === "suspend") return suspendUser(id);
      return restoreUser(id);
    },

    onMutate: async ({ id, action }) => {
      setLoadingAction(id);

      await queryClient.cancelQueries({ queryKey: ["admin-users"] });

      const previous = queryClient.getQueryData<any>([
        "admin-users",
        currentPage,
      ]);

      queryClient.setQueryData(
        ["admin-users", currentPage],
        (old: any) => {
          if (!old) return old;
          return {
            ...old,
            users: old.users.map((u: AdminUser) =>
              u.id === id
                ? { ...u, is_active: action === "restore" }
                : u
            ),
          };
        }
      );

      return { previous };
    },

    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          ["admin-users", currentPage],
          context.previous
        );
      }
      toast.error("Action failed");
    },

    onSuccess: (_, variables) => {
      toast.success(
        variables.action === "suspend"
          ? "User suspended"
          : "User restored"
      );
    },

    onSettled: () => {
      setLoadingAction(null);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

  const {
    confirmState,
    loading: confirmLoading,
    requestAction,
    cancel,
    confirm,
  } = useConfirmAction<AdminUser, "suspend" | "restore">({
    onExecute: async (user, action) => {
      mutation.mutate({ id: user.id, action });
    },
  });

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Gagal mengambil data users</div>;
  if (users.length === 0) return <div>Tidak ada user</div>;

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
          confirmState?.action === "suspend"
            ? "Suspend User"
            : "Restore User"
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
