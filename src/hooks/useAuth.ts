import { useEffect } from "react";
import { useAuth } from "../store/auth.store";

export function useAuthHydrate() {
  const hydrate = useAuth((state) => state.hydrate);

    useEffect(() => {
        hydrate();
    }, []);
}