import { Pencil, Trash2 } from "lucide-react";

interface CategoryProps {
  id: string;
  name: string;
  description: string;
  total: number;
}

export default function FilaDeCategorias({ id, name, description, total }: CategoryProps) {
  return (
    <tr className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors group">
      <td className="py-4 px-6 font-medium text-gray-900 border-l border-gray-100 rounded-l-xl">{id}</td>
      <td className="py-4 px-6 font-bold text-gray-800">{name}</td>
      <td className="py-4 px-6 text-gray-600">{description}</td>
      <td className="py-4 px-6 text-center">
        <span className="bg-background text-secondary py-1 px-4 rounded-full text-xs font-bold border border-blue-100">
          {total}
        </span>
      </td>
      <td className="py-4 px-6 text-center border-r border-gray-100 rounded-r-xl">
        <div className="flex justify-center gap-2">
          <button className="p-2 text-secondary hover:bg-blue-100 rounded-lg transition-colors"><Pencil size={18} /></button>
          <button className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
        </div>
      </td>
    </tr>
  );
}