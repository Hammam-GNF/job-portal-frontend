import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categories.service";
import toast from "react-hot-toast";
import { categoryKeys } from "./queryKeys";

export function useCreateCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: (newCategory) => {
      qc.setQueriesData({ queryKey: categoryKeys.all, exact: false }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.meta?.current_page === 1
            ? [newCategory, ...old.data]
            : old.data,
          meta: {
            ...old.meta,
            total: old.meta.total + 1,
          },
        };
      });
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) => updateCategory(id, data),
    onSuccess: (updated) => {
      qc.setQueriesData({ queryKey: categoryKeys.all, exact: false }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((c: any) =>
            (c.id === updated.id ? updated : c)),
        };
      });
    },
    onError: (err: any) => toast.error(err.message),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: (_, id) => {
      qc.setQueriesData({ queryKey: categoryKeys.all, exact: false }, (old: any) => {
        if (!old) return old;
         return {
           ...old,
           data: old.data.filter((c: any) => c.id !== id),
           meta: {
             ...old.meta,
             total: old.meta.total - 1,
           },
         };
      });
    },
    onError: (err: any) => toast.error(err.message),
  });
}