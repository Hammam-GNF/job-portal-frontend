import { useState } from "react";

export type ConfirmAction<T, A extends string> = {
  target: T;
  action: A;
};

interface UseConfirmActionOptions<T, A extends string> {
  onExecute: (target: T, action: A) => Promise<void>;
}

export function useConfirmAction<T, A extends string>({
  onExecute,
}: UseConfirmActionOptions<T, A>) {
  const [confirmState, setConfirmState] = useState<ConfirmAction<T, A> | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  const requestAction = (target: T, action: A) => {
    setConfirmState({ target, action });
  };

  const cancel = () => {
    setConfirmState(null);
  };

  const confirm = async () => {
    if (!confirmState) return;

    setLoading(true);
    try {
      await onExecute(confirmState.target, confirmState.action);
    } finally {
      setLoading(false);
      setConfirmState(null);
    }
  };

  return {
    confirmState,
    loading,
    requestAction,
    cancel,
    confirm,
  };
}
