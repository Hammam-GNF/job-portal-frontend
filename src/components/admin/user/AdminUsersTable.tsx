import Table from "../../table/Table";
import { UserStatusCell } from "./UserStatusCell";
import type { AdminUser } from "../../../api/admin.api";

type Action = "suspend" | "restore";

interface Props {
  users: AdminUser[];
  loadingAction: number | null;
  onRequestAction: (user: AdminUser, action: Action) => void;
}

export function AdminUsersTable({
  users,
  loadingAction,
  onRequestAction,
}: Props) {
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
          onRequestAction={(action) => onRequestAction(user, action)}
        />
      ),
    },
  ];

  return <Table columns={columns} data={users} />;
}
