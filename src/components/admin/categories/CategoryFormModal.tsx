import { useEffect, useRef, useState } from "react";
import type { Category } from "../../../types/category";
import { useCheckCategorySlug } from "../../../hooks/categories/useCheckCategorySlug";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type Props = {
  open: boolean;
  initialData: Category | null;
  errors: any;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; slug: string }) => void;
  onClearError: (field: string) => void;
};

export function CategoryFormModal({
  open,
  initialData,
  errors,
  loading,
  onClose,
  onSubmit,
  onClearError,
}: Props) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  const { data: slugAvailable = true, isFetching } = useCheckCategorySlug(
    slug,
    open && !!slug && (!initialData || slug !== initialData.slug)
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setName("");
      setSlug("");
      setSlugTouched(false);
      return;
    }

    if (initialData) {
      setName(initialData.name);
      setSlug(initialData.slug);
      setSlugTouched(true);
    } else {
      setName("");
      setSlug("");
      setSlugTouched(false);
    }
  }, [open, initialData]);

  useEffect(() => {
    if (errors?.name) nameRef.current?.focus();
    else if (errors?.slug) slugRef.current?.focus();
  }, [errors]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") {
        if (!loading) {
          onSubmit({
            name: nameRef.current?.value || "",
            slug: slugRef.current?.value || "",
          });
        }
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [name, slug, loading]);



  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded p-4 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-3">
          {initialData ? "Edit Category" : "Add Category"}
        </h3>

        <div className="mb-3">
          <label className="block text-sm mb-1">Name</label>
          <input
            ref={nameRef}
            className="w-full border rounded px-2 py-1"
            value={name}
            onChange={(e) => {
              const val = e.target.value;
              setName(val);
              onClearError("name");

              if (!initialData && !slugTouched) {
                setSlug(generateSlug(val));
              }
            }}
          />
          {errors?.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Slug</label>
          <input
            ref={slugRef}
            className="w-full border rounded px-2 py-1"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
              onClearError("slug");
            }}
          />
          {(errors?.slug || !slugAvailable) && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.slug || "Slug already used"}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            disabled={!name || !slug || loading || !slugAvailable || isFetching}
            onClick={() =>
              onSubmit({
                name: nameRef.current?.value || "",
                slug: slugRef.current?.value || "",
              })
            }
            className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
          >
           {isFetching ? "Checking..." : loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}