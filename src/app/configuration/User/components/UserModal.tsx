'use client';

import { useState } from 'react';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: any) => void;
}

export default function UserModal({ isOpen, onClose, onSave }: UserModalProps) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [rol, setRol] = useState('Administrador');
    const [departamento, setDepartamento] = useState('Infraestructura');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevoUsuario = {
            nombre,
            email,
            rol,
            departamento,
            estado: 'Activo' as const,
            iniciales: nombre.substring(0, 2).toUpperCase(),
        };
        onSave(nuevoUsuario);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Nuevo usuario</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Rol</label>
                        <select
                            className="w-full px-3 py-2 border rounded"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                        >
                            <option value="Administrador">Administrador</option>
                            <option value="Técnico">Técnico</option>
                            <option value="Supervisor">Supervisor</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Departamento</label>
                        <select
                            className="w-full px-3 py-2 border rounded"
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
                        >
                            <option value="Infraestructura">Infraestructura</option>
                            <option value="Laboratorios">Laboratorios</option>
                            <option value="Desarrollo">Desarrollo</option>
                            <option value="Soporte">Soporte</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}