'use client''use client'

import { useState } from 'react'

export default function IdiomasPage() {
  const [idioma, setIdioma] = useState('es')

  return (
    <div style={{ backgroundColor: '#F0FDF4', minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '16rem',
          backgroundColor: '#0B2545',
          color: 'white',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2.5rem' }}>
          AM
        </h1>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#C0C0C0' }}>
          <p>Dashboard</p>
          <p>Activos</p>
          <p>Mantenimiento</p>
          <p>Reportes</p>
          <p style={{ color: 'white', fontWeight: 600 }}>Configuración</p>
        </nav>

        <div style={{ marginTop: 'auto', fontSize: '0.875rem', color: '#C0C0C0' }}>
          Cerrar sesión
        </div>
      </aside>

      {/* Contenido principal */}
      <main style={{ flex: 1, padding: '2.5rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#0B2545', marginBottom: '1.5rem' }}>
          Configuración / Idiomas
        </h2>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', maxWidth: '64rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0B2545' }}>
            Idioma y Región
          </h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>
            Personaliza la experiencia local del sistema
          </p>

          {/* Idiomas */}
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontWeight: 600, color: '#0B2545', marginBottom: '1rem' }}>
              Idioma del sistema
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <IdiomaCard
                activo={idioma === 'es'}
                titulo="Español (Latinoamérica)"
                subtitulo="Predeterminado"
                onClick={() => setIdioma('es')}
              />
              <IdiomaCard
                activo={idioma === 'en'}
                titulo="Inglés"
                subtitulo="English"
                onClick={() => setIdioma('en')}
              />
              <IdiomaCard
                activo={idioma === 'jp'}
                titulo="Japonés"
                subtitulo="Japanese"
                onClick={() => setIdioma('jp')}
              />
            </div>
          </div>

          <button
            style={{
              backgroundColor: '#0066FF',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 500
            }}
          >
            Guardar preferencias
          </button>
        </div>
      </main>
    </div>
  )
}

function IdiomaCard({ activo, titulo, subtitulo, onClick }: any) {
  return (
    <div
      onClick={onClick}
      style={{
        border: `2px solid ${activo ? '#0066FF' : '#C0C0C0'}`,
        borderRadius: '12px',
        padding: '1rem',
        cursor: 'pointer'
      }}
    >
      <p style={{ fontWeight: 500, color: '#0B2545' }}>{titulo}</p>
      <p style={{ fontSize: '0.875rem', color: '#666' }}>{subtitulo}</p>
    </div>
  )
}


