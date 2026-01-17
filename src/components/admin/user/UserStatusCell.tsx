import { USER_STATUS_CONFIG, getUserStatus } from "./UserStatus.config";

export type UserStatusAction = "suspend" | "restore";

interface UserStatusCellProps {
  isActive: boolean;
  isLoading?: boolean;
  onRequestAction: (action: UserStatusAction) => void;
}


export function UserStatusCell({
  isActive,
  isLoading = false,
  onRequestAction,
}: UserStatusCellProps) {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {isActive ? "Active" : "Suspended"}
      </span>

      <button
        disabled={isLoading}
        onClick={() => onRequestAction(isActive ? "suspend" : "restore")}
        className={`px-3 py-1 rounded-md text-xs font-medium text-white
          ${
            isActive
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isLoading ? "Processing..." : isActive ? "Suspend" : "Restore"}
      </button>
    </div>
  );
}

