'use client'

import { useState } from 'react'

export default function IdiomasPage() {
  const [idioma, setIdioma] = useState('es')

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: '#F0FDF4' }}
    >
      {/* Sidebar */}
      <aside
        className="w-64 text-white p-6 flex flex-col"
        style={{ backgroundColor: '#0B2545' }}
      >
        <h1 className="text-2xl font-bold mb-10">AM</h1>

        <nav className="space-y-4 text-slate-200">
          <p>Dashboard</p>
          <p>Activos</p>
          <p>Mantenimiento</p>
          <p>Reportes</p>
          <p className="font-semibold text-white">Configuración</p>
        </nav>

        <div className="mt-auto text-sm text-slate-300">
          Cerrar sesión
        </div>
      </aside>

      {/* Contenido principal */}
      <ma
