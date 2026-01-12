'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  FiArrowLeft, 
  FiGlobe, 
  FiClock, 
  FiCheck, 
  FiSearch, 
  FiBell, 
  FiMenu, 
  FiX, 
  FiHome, 
  FiLayers, 
  FiSettings, 
  FiFileText, 
  FiLogOut,
  FiUser,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiSave
} from 'react-icons/fi'

// Definición de tipos para las props del componente MenuItem
interface MenuItemProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  active?: boolean;
  isExpanded?: boolean;
}

// Componente para los elementos del menú
const MenuItem = ({ children, icon, active = false, isExpanded = true }: MenuItemProps) => (
  <div className={`flex items-center px-2 py-2 text-sm rounded-lg cursor-pointer transition-colors ${
    active 
      ? 'bg-white text-blue-600' 
      : 'text-slate-200 hover:bg-white/10 hover:text-white'
  }`}>
    <span className="mr-3">{icon}</span>
    <span className={`${!isExpanded && 'hidden'}`}>
      {children}
    </span>
  </div>
)

export default function IdiomasPage() {
  const [selectedLanguage, setSelectedLanguage] = useState('es-latam')
  const [dateFormat, setDateFormat] = useState('DD/MM/AAAA')
  const [timezone, setTimezone] = useState('America/Caracas')
  const [timeFormat, setTimeFormat] = useState('12h')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Efecto para manejar el cambio de tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      // Cerrar el menú si se cambia a vista móvil
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false)
      }
    }

    // Verificar el tamaño inicial
    handleResize()

    // Agregar event listener para cambios de tamaño
    window.addEventListener('resize', handleResize)

    // Limpiar el event listener al desmontar
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const languages = [
    { id: 'es-latam', name: 'Español (latinoamérica)', nativeName: 'Español', isDefault: true },
    { id: 'en', name: 'Inglés', nativeName: 'English' },
    { id: 'ja', name: 'Japonés', nativeName: 'Japanese' }
  ]

  const dateFormats = [
    { value: 'DD/MM/AAAA', label: 'DD/MM/AAAA (31/12/2026)' },
    { value: 'MM/DD/AAAA', label: 'MM/DD/AAAA (12/31/2026)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (2026-12-31)' }
  ]

  const timezones = [
    { value: 'America/Caracas', label: 'América/Caracas (GMT-04:00)' },
    { value: 'America/New_York', label: 'America/New_York (GMT-05:00)' },
    { value: 'Europe/Madrid', label: 'Europe/Madrid (GMT+01:00)' }
  ]

  const timeFormats = [
    { value: '12h', label: '12 Horas (2:30PM)' },
    { value: '24h', label: '24 Horas (14:30)' }
  ]

  const handleSave = () => {
    // Lógica para guardar preferencias
    alert('Preferencias guardadas correctamente')
  }

  // Función para alternar la barra lateral
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Clases condicionales para la barra lateral
  const sidebarClasses = `
    fixed md:static inset-y-0 left-0 z-40
    ${isExpanded ? 'w-64' : 'w-20'} 
    bg-[#0B2545] text-white p-4 flex flex-col
    transform transition-all duration-300 ease-in-out
    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    ${isSidebarOpen ? 'shadow-2xl' : ''}
  `

  // Clase para el overlay del menú móvil
  const overlayClasses = `
    fixed inset-0 bg-black bg-opacity-50 z-30
    ${isSidebarOpen ? 'block' : 'hidden'} md:hidden
  `

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Overlay para móvil */}
      {isMobile && isSidebarOpen && (
        <div className={overlayClasses} onClick={toggleSidebar} />
      )}

      {/* Botón de menú hamburguesa */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-700 bg-white shadow-md md:hidden"
        aria-label="Menú"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        <div className="mb-10">
          <div className="relative h-10 w-10 mx-auto mb-8">
            <Image 
              src="/imagenes/logo/logo.svg" 
              alt="Logo" 
              fill
              className="object-contain filter brightness-0 invert"
              priority
            />
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -right-3 top-20 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 z-50"
          >
            {isExpanded ? (
              <FiChevronLeft className="text-gray-600" />
            ) : (
              <FiChevronRight className="text-gray-600" />
            )}
          </button>
        </div>

        <nav className="space-y-1 mt-2">
          <MenuItem icon={<FiHome />} active={false} isExpanded={isExpanded}>
            Dashboard
          </MenuItem>
          <MenuItem icon={<FiLayers />} active={false} isExpanded={isExpanded}>
            Activos
          </MenuItem>
          <MenuItem icon={<FiSettings />} active={false} isExpanded={isExpanded}>
            Mantenimiento
          </MenuItem>
          <MenuItem icon={<FiFileText />} active={false} isExpanded={isExpanded}>
            Reportes
          </MenuItem>
          <MenuItem icon={<FiSettings />} active={true} isExpanded={isExpanded}>
            Configuración
          </MenuItem>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-700">
          <div className="flex items-center p-2 text-slate-300 hover:bg-white/10 rounded-lg cursor-pointer transition-colors">
            <FiLogOut className="mr-3" size={20} />
            <span className={`${!isExpanded && 'hidden'}`}>Cerrar sesión</span>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'} ${isExpanded ? 'md:ml-20' : 'md:ml-20'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Idioma y Región</h1>
              <p className="text-sm text-gray-500 mt-1">Personaliza la experiencia local del sistema</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar"
                  className="pl-8 pr-3 py-2 text-sm text-gray-900 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-48"
                />
                <FiSearch className="absolute left-2.5 top-2.5 text-gray-400" size={16} />
              </div>
              
              {/* Icono de notificaciones */}
              <button className="p-2 text-gray-500 hover:text-gray-700 relative">
                <FiBell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Avatar de usuario */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">UD</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center mb-4">
              <FiGlobe className="text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">IDIOMA DEL SISTEMA</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                    selectedLanguage === lang.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{lang.name}</p>
                      <p className="text-sm text-gray-500">{lang.nativeName}</p>
                      {lang.isDefault && (
                        <span className="text-xs text-blue-600 mt-1 inline-block">
                          Predeterminado
                        </span>
                      )}
                    </div>
                    {selectedLanguage === lang.id && (
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <FiCheck className="text-white text-xs" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center mb-4">
                <FiClock className="text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">FORMATOS REGIONALES</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Formato de fecha</label>
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {dateFormats.map((format) => (
                      <option key={format.value} value={format.value}>
                        {format.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zona horaria</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {timezones.map((zone) => (
                      <option key={zone.value} value={zone.value}>
                        {zone.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Formato de hora</label>
                  <select
                    value={timeFormat}
                    onChange={(e) => setTimeFormat(e.target.value)}
                    className="w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {timeFormats.map((format) => (
                      <option key={format.value} value={format.value}>
                        {format.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-sm font-medium rounded-lg transition-colors"
              >
                <FiSave className="mr-2" />
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
