import { getCompaniesApi, getCompanyApi } from "../api/admin/categories.api";
import type { Company } from "../types/company";
import type { Paginated } from "../types/category";

export const fetchCompanies = async (page = 1): Promise<Paginated<Company>> => {
  const { data } = await getCompaniesApi(page);
  return data;
};

export const fetchCompany = async (id: number): Promise<Company> => {
  const { data } = await getCompanyApi(id);
  return data.data;
};
