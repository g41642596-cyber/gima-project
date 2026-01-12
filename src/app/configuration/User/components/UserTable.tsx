// app/configuracion/usuarios/components/UserTable.tsx
'use client'; // ¡IMPORTANTE! Esto va en la primera línea

import { useState } from 'react';
import { User } from '../types/user';
import { mockUsers } from '../utils/mockUsers';
import UserRow from './UserRow';

export default function UserTable() {
    // 1. ESTADO: Guardar la lista de usuarios
    const [users, setUsers] = useState<User[]>(mockUsers);

    // 2. ESTADO: Guardar el texto de búsqueda
    const [busqueda, setBusqueda] = useState('');

    // 3. FUNCIÓN: Eliminar usuario por ID
    const eliminarUsuario = (id: string) => {
        const nuevosUsuarios = users.filter(user => user.id !== id);
        setUsers(nuevosUsuarios);
    };

    // 4. FILTRAR usuarios según búsqueda
    const usuariosFiltrados = users.filter(user =>
        user.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        user.email.toLowerCase().includes(busqueda.toLowerCase()) ||
        user.departamento.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="p-6">
            {/* Título y descripción */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de usuarios</h1>
                <p className="text-gray-600">Administración de permisos y personal</p>
            </div>

            {/* Barra de búsqueda y botón */}
            <div className="flex justify-between items-center mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar usuario..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                    {/* Icono de lupa (pueden instalar lucide-react después) */}
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        🔍
                    </div>
                </div>

                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    + Nuevo usuario
                </button>
            </div>

            {/* Tabla de usuarios */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            USUARIO
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ROL/CARGO
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            DEPARTAMENTO
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ESTADO
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ACCIÓN
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {usuariosFiltrados.map(user => (
                        <UserRow
                            key={user.id}
                            user={user}
                            onEliminar={eliminarUsuario}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}