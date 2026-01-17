export type UserStatus = "active" | "suspended";

export function getUserStatus(isActive: boolean): UserStatus {
  return isActive ? "active" : "suspended";
}

export const USER_STATUS_CONFIG = {
  active: {
    label: "Active",
    badgeClass: "bg-green-100 text-green-700",
    actionLabel: "Suspend",
    actionType: "suspend",
  },
  suspended: {
    label: "Suspended",
    badgeClass: "bg-red-100 text-red-700",
    actionLabel: "Restore",
    actionType: "restore",
  },
} as const;
