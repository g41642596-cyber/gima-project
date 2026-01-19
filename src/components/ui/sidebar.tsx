"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Cpu,
  Wrench,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: Cpu,
      label: "Activos",
      href: "/dashboard/activos",
    },
    {
      icon: Wrench,
      label: "Mantenimiento",
      href: "/dashboard/mantenimiento",
    },
    {
      icon: FileText,
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
    <div className="w-64 bg-[#001F3F] text-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-gima.png"
            alt="GIMA Logo"
            width={100}
            height={50}
            className="object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-white text-[#001F3F] font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}
