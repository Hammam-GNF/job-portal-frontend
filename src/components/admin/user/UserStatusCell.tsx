import { USER_STATUS_CONFIG, getUserStatus } from "./UserStatus.config";

type Props = {
  isActive: boolean;
  isLoading: boolean;
  onRequestAction: (action: "suspend" | "restore") => void;
};

export function UserStatusCell({
  isActive,
  isLoading,
  onRequestAction,
}: Props) {
  const status = getUserStatus(isActive);
  const config = USER_STATUS_CONFIG[status];

  const handleClick = () => {
    onRequestAction(config.actionType);
  };

  return (
    <div className="flex items-center gap-3">
      <span className={`px-2 py-1 rounded text-xs ${config.badgeClass}`}>
        {config.label}
      </span>

      <button
        disabled={isLoading}
        onClick={handleClick}
        className="text-sm text-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Processing..." : config.actionLabel}
      </button>
    </div>
  );
}
