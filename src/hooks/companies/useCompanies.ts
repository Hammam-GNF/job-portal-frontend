import { useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../../services/companies.service";
import { companyKeys } from "./queryKeys";

export function useCompanies(page: number) {
  return useQuery({
    queryKey: companyKeys.list(page),
    queryFn: () => fetchCompanies(page),
    placeholderData: (prev) => prev,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });
}
