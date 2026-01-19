"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { 
  LayoutDashboard, Box, Wrench, ClipboardList, Settings, Menu 
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname(); 

  return (
    <aside 
      className={`
        bg-gima-navy text-white flex flex-col p-4 rounded-r-3xl h-screen sticky top-0 shadow-2xl z-50 
        transition-all duration-300 ease-in-out shrink-0
        ${isOpen ? 'w-64' : 'w-24'} 
      `}
    >
      <div className="mb-8 px-1 flex items-center justify-between">
        <div className={`relative w-28 h-12 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
           <Image src="/logo-gima.png" alt="GIMA Logo" fill className="object-contain object-left" />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
          <Menu size={24} />
        </button>
      </div>

      <nav className="flex-1 space-y-4">
        {/* link es para un Dashboard general */}
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" isOpen={isOpen} href="/dashboard" isActive={pathname === '/dashboard'} />
        
        <SidebarItem icon={<Box size={20} />} label="Activos" isOpen={isOpen} href="/activos" isActive={pathname === '/activos'} />
        
        <SidebarItem icon={<Wrench size={20} />} label="Mantenimiento" isOpen={isOpen} href="/mantenimiento" isActive={pathname === '/mantenimiento'} />
        
        {/* linkeo a la carpeta Reportes */}
        <SidebarItem 
          icon={<ClipboardList size={20} />} 
          label="Reportes" 
          isOpen={isOpen} 
          href="/reportes" 
          isActive={pathname === '/reportes' || pathname === '/asistencia'} 
        />

        <SidebarItem icon={<Settings size={20} />} label="Configuración" isOpen={isOpen} href="/configuracion" isActive={pathname === '/configuracion'} />
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10 overflow-hidden">
        <button className="text-gima-gray hover:text-white transition-colors text-sm flex items-center gap-3 whitespace-nowrap">
           {isOpen ? "Cerrar sesión" : "Salir"}
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, isOpen, href, isActive }: any) {
  return (
    <Link href={href}>
      <div className={`
        flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer transition-all whitespace-nowrap overflow-hidden
        ${!isOpen && 'justify-center px-2'}
        ${isActive 
           ? "bg-white text-gima-blue shadow-lg font-bold transform scale-105" 
           : "text-slate-300 hover:text-white hover:bg-white/10"
        }
      `}>
        <div className="min-w-[20px]">{icon}</div>
        <span className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>
          {label}
        </span>
      </div>
    </Link>
  );
}