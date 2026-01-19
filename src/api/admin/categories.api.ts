import { api } from "../axios";
import type { Category, Paginated } from "../../types/category";

export type CategoriesResponse = {
  data: Category[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export const getCategoriesApi = (page = 1) =>
  api.get<Paginated<Category>>(`/admin/categories?page=${page}`);

export const createCategoryApi = (data: Partial<Category>) =>
  api.post<{ data: Category }>("/admin/categories", data);

export const updateCategoryApi = (id: number, data: Partial<Category>) =>
  api.put<{ data: Category }>(`/admin/categories/${id}`, data);

export const deleteCategoryApi = (id: number) =>
  api.delete<{ data: Category }>(`/admin/categories/${id}`);

export const checkCategorySlugApi = (slug: string) =>
  api.get<{ slug: string; exists: boolean }>(`/admin/categories/check-slug?slug=${slug}`);
