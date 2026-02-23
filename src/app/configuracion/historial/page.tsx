"use client";

import { useEffect, useState } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FilterX,
  LogIn,
  Search,
  ShieldCheck,
  Trash2,
  UserCircle,
  Wrench,
} from "lucide-react";

import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);

interface HistoryRecord {
  id: string;
  userName: string;
  role: string;
  action: string;
  description: string;
  timeAgo: string;
  date: string;
  hour: string;
}

/* Placeholders*/
const nombres = [
  "ELENA RIVAS",
  "CARLOS MENDOZA",
  "JUAN PEREZ",
  "MARIA RIVAS",
  "PEDRO GOMEZ",
  "ANA LOPEZ",
  "LUIS TORRES",
  "SARA MEJIA",
];
const roles = ["Supervisor", "Administrador", "Técnico"];
const acciones = [
  {
    action: "Edición de repuestos",
    desc: "Actualizó stock de Rodamiento ",
    role: "Supervisor",
  },
  {
    action: "Inicio de sesión",
    desc: "Acceso exitoso desde Terminal ",
    role: "Administrador",
  },
  {
    action: "Cierre de Orden",
    desc: "Finalizó mantenimiento en ",
    role: "Técnico",
  },
  {
    action: "Eliminación de Usuario",
    desc: "Eliminó el acceso del ID ",
    role: "Administrador",
  },
  {
    action: "Ajuste de Inventario",
    desc: "Corrigió conteo de ",
    role: "Supervisor",
  },
];

const mockHistory: HistoryRecord[] = Array.from({ length: 50 }, (_, i) => {
  const randomAction = acciones[Math.floor(Math.random() * acciones.length)];
  const randomName = nombres[Math.floor(Math.random() * nombres.length)];
  const dia = Math.floor(Math.random() * 5) + 8;

  return {
    id: (i + 1).toString(),
    userName: randomName,
    role: randomAction.role,
    action: randomAction.action,
    description: `${randomAction.desc} ${
      Math.floor(Math.random() * 9000) + 1000
    }`,
    timeAgo: `Hace ${Math.floor(Math.random() * 59) + 1} min`,
    date: `${dia.toString().padStart(2, "0")}/08/2025`,
    hour: `${Math.floor(Math.random() * 12) + 8}:00:12`,
  };
}).sort((a, b) => b.id.localeCompare(a.id, undefined, { numeric: true }));

function getActionStyle(action: string) {
  if (action.includes("Edición") || action.includes("Cierre")) {
    return { icon: Wrench, color: "bg-blue-50 text-blue-700" };
  }

  if (action.includes("Inicio")) {
    return { icon: LogIn, color: "bg-green-50 text-green-700" };
  }

  if (action.includes("Eliminación")) {
    return { icon: Trash2, color: "bg-red-50 text-red-700" };
  }

  return { icon: ShieldCheck, color: "bg-gray-100 text-gray-700" };
}

export default function HistorialPage() {
  const [busqueda, setBusqueda] = useState("");
  const [rol, setRol] = useState("Todos");
  const [fechaInicio, setFechaInicio] = useState<Date | null>(null);
  const [fechaFin, setFechaFin] = useState<Date | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 5;
  const stringToDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };
  const registrosFiltrados = mockHistory.filter((item) => {
    const cumpleTexto =
      item.userName.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.description.toLowerCase().includes(busqueda.toLowerCase());

    const cumpleRol = rol === "Todos" || item.role === rol;

    const fechaItem = stringToDate(item.date);
    if (fechaInicio) fechaInicio.setHours(0, 0, 0, 0);
    if (fechaFin) fechaFin.setHours(23, 59, 59, 999);

    const cumpleFechaInicio = !fechaInicio || fechaItem >= fechaInicio;
    const cumpleFechaFin = !fechaFin || fechaItem <= fechaFin;

    return cumpleTexto && cumpleRol && cumpleFechaInicio && cumpleFechaFin;
  });

  const ultimoIndice = paginaActual * registrosPorPagina;
  const primerIndice = ultimoIndice - registrosPorPagina;
  const registrosPaginados = registrosFiltrados.slice(
    primerIndice,
    ultimoIndice,
  );
  const totalPaginas = Math.ceil(
    registrosFiltrados.length / registrosPorPagina,
  );

  // Resetear a página 1 cuando se busca algo
  if (paginaActual > totalPaginas && totalPaginas > 0) setPaginaActual(1);

  const exportarCSV = () => {
    const encabezados = ["Usuario,Rol,Accion,Descripcion,Fecha,Hora\n"];
    const filas = registrosFiltrados.map((r) =>
      `${r.userName},${r.role},${r.action},"${
        r.description.replace(/"/g, '""')
      }",${r.date},${r.hour}`
    ).join("\n");

    const blob = new Blob([encabezados + filas], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `historial_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const obtenerPaginasVisibles = () => {
    const maxBotones = 5;
    let inicio = Math.max(1, paginaActual - Math.floor(maxBotones / 2));
    let fin = Math.min(totalPaginas, inicio + maxBotones - 1);

    if (fin - inicio + 1 < maxBotones) {
      inicio = Math.max(1, fin - maxBotones + 1);
    }

    const paginas = [];
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [paginaActual]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6">
        {/* Encabezado */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-gray-900">
            Historial de usuarios
          </h1>
          <p className="text-gray-600">Auditoría y trazabilidad del sistema</p>
        </div>

        {/* BARRA DE FILTROS */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-wrap gap-4 items-end">
          {/* Buscador */}
          <div className="flex-1 min-w-[250px]">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
              Búsqueda rápida
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Usuario o descripción..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>

          {/* Selector de Rol */}
          <div className="w-48">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
              Rol
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="Todos">Todos los roles</option>
              <option value="Administrador">Administrador</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Técnico">Técnico</option>
            </select>
          </div>

          {/* Calendario Fecha Inicio */}
          <div className="w-44">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
              Desde
            </label>
            <div className="relative">
              <CalendarIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                size={16}
              />
              <DatePicker
                selected={fechaInicio}
                onChange={(date) => setFechaInicio(date)}
                placeholderText="DD/MM/YYYY"
                locale="es"
                dateFormat="dd/MM/yyyy"
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Calendario Fecha Fin */}
          <div className="w-44">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1">
              Hasta
            </label>
            <div className="relative">
              <CalendarIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                size={16}
              />
              <DatePicker
                selected={fechaFin}
                onChange={(date) => setFechaFin(date)}
                placeholderText="DD/MM/YYYY"
                locale="es"
                dateFormat="dd/MM/yyyy"
                minDate={fechaInicio || undefined}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Botón Limpiar */}
          <button
            onClick={() => {
              setBusqueda("");
              setRol("Todos");
              setFechaInicio(null);
              setFechaFin(null);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
          >
            <FilterX size={18} />
            Limpiar
          </button>
        </div>

        {/* Mensaje de resultados */}
        <p className="text-sm text-gray-500 mb-4">
          Mostrando{" "}
          <span className="font-bold">{registrosFiltrados.length}</span>{" "}
          registros encontrados
        </p>

        {/*  Contenedor del historial */}
        <div className="bg-gray-100 rounded-xl p-6 space-y-4">
          {registrosPaginados.map((record, index) => {
            const actionStyle = getActionStyle(record.action);
            const ActionIcon = actionStyle.icon;

            return (
              <div
                key={record.id}
                className="flex justify-between items-center bg-white border border-gray-200
                           rounded-lg px-6 py-4 hover:shadow-md hover:-translate-y-0.5
                           transition-all duration-300 ease-out
                           animate-slide-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                {/* Usuario */}
                <div className="flex items-center gap-3 w-1/4">
                  <UserCircle className="text-gray-400" size={34} />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {record.userName}
                    </p>
                    <p className="text-sm text-green-600">{record.role}</p>
                  </div>
                </div>

                {/* Acción */}
                <div className="w-1/5">
                  <span
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${actionStyle.color}`}
                  >
                    <ActionIcon size={16} />
                    {record.action}
                  </span>
                </div>

                {/* Tiempo */}
                <div className="w-1/6 text-sm text-gray-500 flex items-center gap-1">
                  <Clock size={16} />
                  {record.timeAgo}
                </div>

                {/* Descripción */}
                <div className="w-1/3 text-sm text-gray-600 italic">
                  "{record.description}"
                </div>

                {/* Fecha */}
                <div className="text-right text-sm text-gray-500">
                  <div>{record.date}</div>
                  <div>{record.hour}</div>
                </div>
              </div>
            );
          })}

          {/* Control Paginación*/}
          {registrosFiltrados.length > registrosPorPagina && (
            <div className="flex flex-col md:flex-row items-center justify-between mt-6 pt-4 border-t border-gray-200 gap-4">
              <p className="text-sm text-gray-500 order-2 md:order-1">
                Mostrando{" "}
                <span className="font-medium">{primerIndice + 1}</span> a{" "}
                <span className="font-medium">
                  {Math.min(ultimoIndice, registrosFiltrados.length)}
                </span>{" "}
                de{" "}
                <span className="font-medium">{registrosFiltrados.length}</span>
              </p>

              <div className="flex items-center gap-1 order-1 md:order-2">
                {/* Botón Anterior */}
                <button
                  onClick={() =>
                    setPaginaActual((prev) => Math.max(prev - 1, 1))}
                  disabled={paginaActual === 1}
                  className="p-2 rounded-lg border border-gray-300 bg-white disabled:opacity-30 hover:bg-gray-50"
                >
                  <ChevronLeft size={18} />
                </button>

                {obtenerPaginasVisibles().map((numero) => (
                  <button
                    key={numero}
                    onClick={() => setPaginaActual(numero)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                      paginaActual === numero
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "bg-white border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500"
                    }`}
                  >
                    {numero}
                  </button>
                ))}

                {/* Botón Siguiente */}
                <button
                  onClick={() =>
                    setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                  disabled={paginaActual === totalPaginas}
                  className="p-2 rounded-lg border border-gray-300 bg-white disabled:opacity-30 hover:bg-gray-50"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-2 mb-4 print:hidden">
            <button
              onClick={exportarCSV}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
            >
              <Download size={16} className="text-blue-600" />
              Exportar Excel
            </button>
          </div>

          {registrosFiltrados.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              No se encontraron registros.
            </p>
          )}
        </div>
      </div>

      {/* Animaciones */}
      <style jsx>
        {`
        .animate-slide-up {
          opacity: 0;
          transform: translateY(8px);
          animation: slideUp 0.35s ease forwards;
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}
      </style>
    </div>
  );
}
