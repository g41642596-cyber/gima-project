import { categories } from "@/data/categories";
import FilaDeCategorias from "./filaDeCategorias";

export default function TablaDeCategorias() {
  return (
    <div className="overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-background">
          <tr>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-tl-3xl">ID Categoría</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Descripción</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Total Activos</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center rounded-tr-3xl">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {categories.map((category, index) => (
            <FilaDeCategorias
              key={index}
              id={category.id}
              name={category.name}
              description={category.description}
              total={category.total}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}