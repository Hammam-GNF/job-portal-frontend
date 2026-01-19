import {
  getCategoriesApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  checkCategorySlugApi,
} from "../api/admin/categories.api";
import type { Category, Paginated } from "../types/category";

export const fetchCategories = async (
  page = 1
): Promise<Paginated<Category>> => {
  const { data } = await getCategoriesApi(page);
  return data;
};

export const createCategory = async (
  data: { name: string; slug: string }
) => {
  const { data: res } = await createCategoryApi(data);
  return res.data;

};

export const updateCategory = async (
  id: number,
  data: { name: string; slug: string }
) => {
  const { data: res } = await updateCategoryApi(id, data);
  return res.data;
};

export const deleteCategory = async (id: number) => {
  const { data: res } = await deleteCategoryApi(id);
  return res.data;
};

export const checkSlug = async (slug: string): Promise<boolean> => {
  const { data } = await checkCategorySlugApi(slug);

  return Boolean(!data?.exists);
};
