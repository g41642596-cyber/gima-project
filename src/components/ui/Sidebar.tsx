"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  Wrench,
  ClipboardList,
  Settings,
  Menu,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Definimos los items aquí para mantener el código limpio
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Box,
      label: "Activos",
      href: "/dashboard/activos",
    },
    {
      icon: Wrench,
      label: "Mantenimiento",
      href: "/dashboard/mantenimiento",
    },
    {
      icon: ClipboardList,
      label: "Reportes",
      href: "/dashboard/reportes",
    },
    {
      icon: Settings,
      label: "Configuración",
      href: "/dashboard/configuracion",
    },
  ];

  const handleLogout = () => {
    router.push("/auth/login");
  };

  return (
    <aside
      className={cn(
        // ESTILOS VISUALES DEL CÓDIGO QUE TE GUSTA:
        // Usamos #001F3F en lugar de 'bg-gima-navy' para asegurar que se vea azul y no blanco
        "bg-[#001F3F] text-white flex flex-col p-4 rounded-r-3xl h-screen sticky top-0 shadow-2xl z-50",
        "transition-all duration-300 ease-in-out shrink-0",
        isOpen ? "w-64" : "w-24"
      )}
    >
      {/* Header: Logo + Toggle */}
      <div className="mb-8 px-1 flex items-center justify-between">
        <div
          className={cn(
            "relative h-12 transition-opacity duration-200",
            isOpen ? "opacity-100 w-28" : "opacity-0 w-0 hidden"
          )}
        >
          <Image
            src="/logo-gima.png"
            alt="GIMA Logo"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Lógica robusta para detectar si está activo (incluye sub-rutas)
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer transition-all whitespace-nowrap overflow-hidden",
                  !isOpen && "justify-center px-2",
                  // AQUÍ ESTÁN TUS ESTILOS DE "ACTIVO" (Blanco, azul, shadow, scale)
                  isActive
                    ? "bg-white text-[#001F3F] shadow-lg font-bold transform scale-105"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                )}
              >
                <div className="min-w-[20px]">
                  <Icon size={20} />
                </div>
                <span
                  className={cn(
                    "transition-opacity duration-200",
                    isOpen ? "opacity-100" : "opacity-0 w-0"
                  )}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer: Salir */}
      <div className="mt-auto pt-6 border-t border-white/10 overflow-hidden">
        <button
          onClick={handleLogout}
          className={cn(
            "text-slate-300 hover:text-white transition-colors text-sm flex items-center gap-3 whitespace-nowrap w-full p-2 rounded-lg hover:bg-white/5",
            !isOpen && "justify-center"
          )}
        >
           <LogOut size={20} />
           <span className={cn(isOpen ? "block" : "hidden")}>
             {isOpen ? "Cerrar sesión" : ""}
           </span>
        </button>
      </div>
    </aside>
  );
}