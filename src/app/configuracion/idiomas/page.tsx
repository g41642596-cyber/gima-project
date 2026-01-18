'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Componente para mostrar iconos SVG
const SVGIcon = ({ name, className = 'w-5 h-5', white = false }: { name: string; className?: string; white?: boolean }) => {
  // Si es el ícono de check, forzamos el color blanco
  const isCheck = name === 'check';
  
  // Clases condicionales
  const iconClasses = [
    'inline-block',
    className,
    (white || isCheck) ? 'filter brightness-0 invert' : ''
  ].filter(Boolean).join(' ');
  
  return (
    <span className={iconClasses}>
      {name === 'logo' ? (
        <Image 
          src="/imagenes/logo/logo.svg" 
          alt="" 
          width={20} 
          height={20} 
          className="w-full h-full"
        />
      ) : (
        <Image 
          src={`/imagenes/iconos/${name}.svg`} 
          alt="" 
          width={20} 
          height={20} 
          className="w-full h-full"
        />
      )}
    </span>
  )
}
// Los íconos se pueden implementar usando etiquetas <img> o componentes de imagen de Next.js
// Ejemplo: <img src="/ruta/al/icono.svg" alt="Descripción" className="w-6 h-6" />

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
      ? 'bg-white text-[#0066FF]' 
      : 'text-white hover:bg-white/10 hover:text-white'
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
  `

  // Clase para el overlay del menú móvil
  const overlayClasses = `
    fixed inset-0 bg-[#0B2545] bg-opacity-50 z-30
    ${isSidebarOpen ? 'block' : 'hidden'} md:hidden
  `

  return (
    <div className="min-h-screen bg-white flex">
      {/* Overlay para móvil */}
      {isMobile && isSidebarOpen && (
        <div className={overlayClasses} onClick={toggleSidebar} />
      )}

      {/* Botón de menú hamburguesa */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-4 left-4 z-50 p-2 rounded-md text-[#0B2545] bg-white shadow-md md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside 
        className={sidebarClasses}
      >
        {/* Botón para cerrar en móviles */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white hover:text-gray-300"
          aria-label="Cerrar menú"
        >
          ✕
        </button>

        <div className="mb-10">
          <div className="relative h-10 w-10 mx-auto mb-8">
            <Image 
              src="/imagenes/logo/logo.svg" 
              alt="Logo" 
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -right-3 top-20 bg-white rounded-full p-1 shadow-md hover:bg-white/90 z-50"
          >
            {isExpanded ? (
              <SVGIcon name="flecha-pequena-izquierda" className="w-4 h-4" />
            ) : (
              <SVGIcon name="flecha-pequena-derecha" className="w-4 h-4" />
            )}
          </button>
        </div>

        <nav className="space-y-1 mt-2">
          <MenuItem icon={<SVGIcon name="dashboard" white />} active={false} isExpanded={isExpanded}>
            Dashboard
          </MenuItem>
          <MenuItem icon={<SVGIcon name="activos" white />} active={false} isExpanded={isExpanded}>
            Activos
          </MenuItem>
          <MenuItem icon={<SVGIcon name="mantenimiento" white />} active={false} isExpanded={isExpanded}>
            Mantenimiento
          </MenuItem>
          <MenuItem icon={<SVGIcon name="reportes" white />} active={false} isExpanded={isExpanded}>
            Reportes
          </MenuItem>
          <MenuItem icon={<SVGIcon name="configuracion" className="w-5 h-5 text-black" />} active={true} isExpanded={isExpanded}>
            Configuración
          </MenuItem>
        </nav>

        <div className="mt-auto pt-4 border-t border-[#0B2545]/20">
          <div className="flex items-center p-2 text-white hover:bg-white/10 rounded-lg cursor-pointer transition-colors">
            <SVGIcon name="salida" white />
            <span className={`${!isExpanded && 'hidden'} ml-2`}>Cerrar sesión</span>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-0' : 'ml-0'} ${isExpanded ? 'md:ml-20' : 'md:ml-20'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-[#0B2545]">Idioma y Región</h1>
              <p className="text-sm text-[#0B2545]/70 mt-1">Personaliza la experiencia local del sistema</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar"
                  className="pl-8 pr-3 py-2 text-sm text-[#0B2545] border border-[#0B2545]/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] w-48"
                />
                <span className="absolute left-2.5 top-2.5">
                  <SVGIcon name="busqueda" className="w-4 h-4 text-[#0B2545]/50" />
                </span>
              </div>
              
              {/* Icono de notificaciones */}
              <button className="p-2 text-[#0B2545] hover:text-[#0066FF] relative">
                <SVGIcon name="notificacion-de-campana" className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#0066FF] rounded-full"></span>
              </button>
              
              {/* Avatar de usuario */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#0B2545]/10 flex items-center justify-center">
                  <SVGIcon name="circulo-de-usuario" className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-[#0B2545]/10">
            <div className="flex items-center mb-4">
              <span className="mr-2">
                <SVGIcon name="globo" className="w-5 h-5" />
              </span>
              <span className="text-sm font-medium text-[#0B2545]">IDIOMA DEL SISTEMA</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`p-4 border rounded-xl cursor-pointer transition-colors ${
                    selectedLanguage === lang.id
                      ? 'border-[#0066FF] bg-[#0066FF]/10'
                      : 'border-[#0B2545]/20 hover:border-[#0B2545]/40'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-[#0B2545]">{lang.name}</p>
                      <p className="text-sm text-[#0B2545]/70">{lang.nativeName}</p>
                      {lang.isDefault && (
                        <span className="text-xs text-[#0066FF] mt-1 inline-block">
                          Predeterminado
                        </span>
                      )}
                    </div>
                    {selectedLanguage === lang.id && (
                      <div className="w-5 h-5 rounded-full bg-[#0066FF] flex items-center justify-center">
                        <SVGIcon name="check" white={true} className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#0B2545]/20 pt-6">
              <div className="flex items-center mb-4">
                <span className="text-[#0066FF] mr-2">
                <SVGIcon name="formato_regionales" className="w-5 h-5" />
              </span>
                <span className="text-sm font-medium text-[#0B2545]">FORMATOS REGIONALES</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0B2545] mb-1">Formato de fecha</label>
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full p-2.5 text-sm text-[#0B2545] border border-[#0B2545]/30 rounded-lg focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
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
                    className="w-full p-2.5 text-sm text-[#0B2545] border border-[#0B2545]/30 rounded-lg focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
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
                    className="w-full p-2.5 text-sm text-[#0B2545] border border-[#0B2545]/30 rounded-lg focus:ring-2 focus:ring-[#0066FF] focus:border-transparent"
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
                className="flex items-center bg-[#0066FF] hover:bg-[#0B2545] text-white px-6 py-2.5 text-sm font-medium rounded-lg transition-colors"
              >
                <SVGIcon name="check" className="w-4 h-4 mr-2" />
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
