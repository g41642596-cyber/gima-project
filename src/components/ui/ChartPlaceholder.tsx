"use client"

import { useEffect, useState } from "react"

interface ChartPlaceholderProps {
  title: string
  period?: string
}

export function ChartPlaceholder({ title, period = "Últimos 6 meses" }: ChartPlaceholderProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <select className="text-sm text-gray-600 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none">
          <option>{period}</option>
          <option>Últimos 3 meses</option>
          <option>Último mes</option>
          <option>Última semana</option>
        </select>
      </div>

      {/* Simple chart visualization */}
      <div className="h-64 flex items-end justify-around gap-2 mb-6">
        {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((day, idx) => {
          const heights = [65, 72, 58, 80, 75, 68, 85]
          return (
            <div key={day} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-linear-to-t from-blue-400 to-blue-500 rounded-t-lg transition-all duration-500"
                style={{
                  height: isLoaded ? `${heights[idx]}%` : "0%",
                  opacity: isLoaded ? 1 : 0.5,
                }}
              ></div>
              <span className="text-xs text-gray-600">{day}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
