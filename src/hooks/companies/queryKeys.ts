export const companyKeys = {
  all: ["companies"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (page: number) => [...companyKeys.lists(), page] as const,
  detail: (id: number) => [...companyKeys.all, "detail", id] as const,
};
