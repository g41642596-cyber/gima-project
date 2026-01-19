"use client";
import Image from "next/image";
import { LayoutDashboard, Package, Wrench, FileText, Settings, LogOut, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useSidebar } from './sidebarContext';

export default function Sidebar() {
  const { isOpen, toggle } = useSidebar();

  const menu = [
    { name: 'Dashboard', icon: <LayoutDashboard size={22}/> },
    { name: 'Activos', icon: <Package size={22}/> },
    { name: 'Mantenimiento', icon: <Wrench size={22}/> },
    { name: 'Reportes', icon: <FileText size={22}/> },
    { name: 'Configuración', icon: <Settings size={22}/>, active: true },
  ];

  return (
    <>
      {/* Fondo oscuro para móvil */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggle} 
      />

      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 m-4 rounded-[2.5rem]
          
          /* PC */
          md:relative md:m-4 md:h-[calc(100vh-2rem)]
          
          bg-linear-to-b from-primary via-[#091E3A] to-[#051224]
          text-white shadow-2xl shadow-blue-900/40 border border-white/5
          transition-all duration-300 ease-in-out flex flex-col
          
          /* Anchura Dinámica */
          ${isOpen ? "w-72 translate-x-0" : "-translate-x-[120%] w-72"} 
          md:translate-x-0 
          md:${isOpen ? 'w-72' : 'w-24'}
        `}
      >
        {/* Botón flotante Desktop */}
        <button 
          onClick={toggle}
          className="hidden md:flex absolute -right-3 top-10 bg-white p-1.5 rounded-full text-primary shadow-lg border-[3px] border-[#f1f5f9] z-50 items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        >
          {isOpen ? <ChevronLeft size={14} strokeWidth={3} /> : <ChevronRight size={14} strokeWidth={3} />}
        </button>

        {/* Botón cerrar Móvil */}
        <button onClick={toggle} className="absolute top-6 right-6 text-white/40 md:hidden">
          <X size={24} />
        </button>

        {/* Logo */}
        <div className={`p-8 flex ${isOpen ? 'justify-start' : 'md:justify-center'} items-center transition-all border-b border-white/5 mx-4 mb-4`}>
        <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden shadow-lg border border-white/10 bg-white/10 backdrop-blur-sm flex items-center justify-center">
        <Image 
            src="/Perlado.png" 
            alt="Logo Proyecto"
            fill
            className="object-contain" 
            priority
        />
        </div>
        <div className={`ml-4 overflow-hidden transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 md:hidden'}`}>
        <h1 className="font-title text-xl tracking-wide text-white">GIMA</h1>
        </div>
        </div>
        {/* Menú */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {menu.map((item) => (
            <div 
              key={item.name} 
              className={`
                flex items-center p-3.5 rounded-2xl cursor-pointer transition-all group relative
                ${item.active 
                  ? 'bg-linear-to-r from-secondary to-[#0052CC] text-white shadow-lg' 
                  : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
                } 
                ${isOpen ? '' : 'md:justify-center'}
              `}
            >
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
              <span className={`ml-4 font-medium text-sm whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-100' : 'md:w-0 md:opacity-0 md:hidden'}`}>
                {item.name}
              </span>
              
              {!isOpen && (
                 <div className="hidden md:block absolute left-14 bg-primary text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none whitespace-nowrap shadow-xl border border-white/10">
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 mt-auto">
          <div className={`rounded-2xl bg-white/5 border border-white/5 p-3 flex items-center transition-all duration-300 ${isOpen ? 'justify-between' : 'md:justify-center bg-transparent border-0'}`}>
             <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 md:hidden'}`}>
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">AD</div>
                <div className="flex flex-col"><span className="text-xs font-bold text-white">Admin</span></div>
             </div>
             <button className="text-red-300 hover:text-red-200 p-2"><LogOut size={20} className="shrink-0" /></button>
          </div>
        </div>
      </aside>
    </>
  );
}