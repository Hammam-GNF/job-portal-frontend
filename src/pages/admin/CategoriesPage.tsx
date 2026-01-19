import { useState } from "react";
import { useCategories } from "../../hooks/categories/useCategories";
import { useCreateCategory, useUpdateCategory, useDeleteCategory } from "../../hooks/categories/useCategoryMutation";
import Pagination from "../../components/pagination/Pagination";
import { CategoryFormModal } from "../../components/admin/categories/CategoryFormModal";
import { ConfirmModal } from "../../components/ui/ConfirmModal";
import { CategoriesTable } from "../../components/admin/categories/CategoriesTable";
import type { Category } from "../../types/category";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const { data, isLoading, isError } = useCategories(currentPage);
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const isSubmitting = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const categories = data?.data ?? [];
  const totalPages = data?.meta.last_page ?? 1;

  const [deleting, setDeleting] = useState<Category | null>(null);

  const [formErrors, setFormErrors] = useState<any>({});

  const clearFieldError = (field: string) => {
    setFormErrors((prev: any) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const handleSave = (data: { name: string; slug: string }) => {
    if (editing) {
      updateMutation.mutate(
        { id: editing.id, data },
        {
          onSuccess: () => {
            toast.success("Category updated");
            setFormOpen(false);
            setEditing(null);
            setFormErrors({});
          },
          onError: (err: any) => {
            if (err.response?.status === 422) {
              setFormErrors(err.response.data.errors);
            } else {
              toast.error("Something went wrong");
            }
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Category created");
          setFormOpen(false);
          setFormErrors({});
        },
        onError: (err: any) => {
          if (err.response?.status === 422) {
            setFormErrors(err.response.data.errors);
          } else {
            toast.error("Something went wrong");
          }
        },
      });
    }
  };


  const handleDelete = () => {
    if (!deleting) return;

    deleteMutation.mutate(deleting.id, {
      onSuccess: () => {
        toast.success("Category deleted");
        setDeleting(null);
      },
    });
  };

  if (isLoading) return <div>Loading categories...</div>;
  if (isError) return <div>Failed to load categories</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <button
          onClick={() => setFormOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Category
        </button>
      </div>

      <CategoriesTable
        categories={categories}
        onEdit={(c) => {
          setEditing(c);
          setFormOpen(true);
        }}
        onDelete={(c) => setDeleting(c)}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <CategoryFormModal
        open={formOpen}
        initialData={editing}
        errors={formErrors}
        loading={isSubmitting}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSave}
        onClearError={clearFieldError}
      />

      <ConfirmModal
        open={!!deleting}
        title="Delete Category"
        description={`Are you sure want to delete "${deleting?.name}"?`}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
