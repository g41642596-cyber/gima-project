"use client"; 

import { useState } from "react"; 
import { Pencil, Trash2, Plus, Search, Filter } from "lucide-react";
import DeleteAlert from "@/components/ui/alerta";
import { DashboardHeader } from "@/components/ui/dashboard-header";
import Header from "@/components/ui/header";

// Datos ejemplo 
const initialCategories = [
  { id: "CAT-001", name: "COMPUTO", description: "Laptops, Desktops, Servidores y Periféricos", total: 120, },
  { id: "CAT-002", name: "MOBILIARIO", description: "Sillas ergonómicas, Escritorios y Archivos", total: 45, },
  { id: "CAT-003", name: "VEHÍCULOS", description: "Flota de transporte y vehículos de carga", total: 12, },
  { id: "CAT-004", name: "REDES", description: "Routers, Switches y Cableado estructurado", total: 85, },
];

export default function Dashboard() {
  // Lógica de la alerta
  const [categories, setCategories] = useState(initialCategories);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);

  // Función al hacer clic en borrar
  const handleDeleteClick = (id: string) => {
    setIdToDelete(id);
    setIsAlertOpen(true);
  };

  // Función para confirmar borrado
  const confirmDelete = () => {
    setCategories(categories.filter((cat) => cat.id !== idToDelete));
    setIsAlertOpen(false);
    setIdToDelete(null);
  };

  return (
    <div className="font-sans space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-primary font-title tracking-wide">
            CATEGORÍAS
          </h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">
            Clasificación de equipos
          </p>
        </div>

        <div className="flex gap-3">
          {/* Botón Filtro */}
          <button className="p-3 bg-white border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={20} />
          </button>
          
          {/* Botón Principal */}
          <button className="bg-secondary hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2 transform active:scale-95">
            <Plus size={20} strokeWidth={3} />
            <span>NUEVA CATEGORÍA</span>
          </button>
        </div>
      </div>

      {/* Tarjeta de la Tabla */}
      <section className="bg-white rounded-4xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Barra de herramientas de la tabla */}
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white">
          <div className="relative w-72">
            <Search className="absolute left-4 top-3 text-gray-300" size={18} />
            <input 
              type="text" 
              placeholder="Buscar categoría..." 
              className="w-full bg-[#F8FAFC] pl-11 pr-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 outline-none focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Total: {categories.length} Resultados
          </span>
        </div>

        {/* TABLA PRINCIPAL */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background text-primary">
                <th className="py-5 px-8 text-xs font-bold uppercase tracking-widest font-title">ID</th>
                <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest font-title">Nombre</th>
                <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest font-title">Descripción</th>
                <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest font-title text-center">Activos</th>
                <th className="py-5 px-8 text-xs font-bold uppercase tracking-widest font-title text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {categories.map((item) => ( // Usamos categories del estado
                <tr key={item.id} className="hover:bg-blue-50/40 transition-colors group">
                  {/* ID */}
                  <td className="py-5 px-8 font-medium text-primary text-sm">
                    {item.id}
                  </td>
                  
                  {/* Nombre */}
                  <td className="py-5 px-6 font-bold text-gray-800 text-sm">
                    {item.name}
                  </td>
                  
                  {/* Descripción */}
                  <td className="py-5 px-6 text-sm text-gray-500 max-w-xs truncate">
                    {item.description}
                  </td>

                  {/* Total Activos */}
                  <td className="py-5 px-6 text-center">
                    <span className="bg-background text-secondary py-1 px-4 rounded-lg text-xs font-bold border border-blue-100 shadow-sm">
                      {item.total}
                    </span>
                  </td>

                  {/* Botones de Acción */}
                  <td className="py-5 px-8 text-right">
                    <div className="flex justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-secondary hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                        <Pencil size={16} />
                      </button>
                      
                      {/* Botón borrar conectado */}
                      <button 
                        onClick={() => handleDeleteClick(item.id)}
                        className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-50 flex justify-center">
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-primary transition-colors">Anterior</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold shadow-md">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 text-sm font-medium transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 text-sm font-medium transition-colors">3</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-primary transition-colors">Siguiente</button>
          </div>
        </div>

      </section>

      {/* Componente de Alerta */}
      <DeleteAlert 
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={confirmDelete}
        title="¿Eliminar Categoría?"
        description="Esta acción no se puede deshacer."
      />
    </div>
  );
}