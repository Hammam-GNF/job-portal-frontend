import type { Category } from "../../../types/category";

type Props = {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export function CategoriesTable({ categories, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Slug</th>
            <th className="p-2 text-left w-40">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.slug}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => onEdit(c)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(c)}
                  className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {categories.length === 0 && (
        <div className="p-4 text-center text-gray-500">No categories found</div>
      )}
    </div>
  );
}
