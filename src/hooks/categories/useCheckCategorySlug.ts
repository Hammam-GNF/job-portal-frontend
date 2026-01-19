import { useQuery } from "@tanstack/react-query";
import { checkSlug } from "../../services/categories.service";
import { useDebounce } from "../useDebounce";

export function useCheckCategorySlug(slug: string, enabled: boolean) {
  const debouncedSlug = useDebounce(slug, 600);

  return useQuery({
    queryKey: ["check-slug", debouncedSlug],
    queryFn: async () => {
      if (!debouncedSlug) return true;
      return checkSlug(debouncedSlug);
    },
    enabled: Boolean(enabled && debouncedSlug),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
