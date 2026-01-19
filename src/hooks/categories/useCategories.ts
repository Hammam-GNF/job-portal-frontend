import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../services/categories.service";
import { categoryKeys } from "./queryKeys";

export function useCategories(page: number) {
  return useQuery({
    queryKey: categoryKeys.list(page),
    queryFn: () => fetchCategories(page),
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
}
