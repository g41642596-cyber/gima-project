
// app/configuracion/usuarios/components/UserRow.tsx
import { User } from '../types/user';

interface UserRowProps {
    user: User;
    onEliminar: (id: string) => void;
}

export default function UserRow({ user, onEliminar }: UserRowProps) {
    return (
        <tr className="border-b hover:bg-gray-50">
            {/* Columna USUARIO */}
            <td className="p-4">
                <div className="flex items-center">
                    {/* Avatar con iniciales */}
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                        {user.iniciales}
                    </div>
                    <div className="ml-4">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-gray-500">{user.email}</div>
                    </div>
                </div>
            </td>

            {/* Columna ROL */}
            <td className="p-4">{user.rol}</td>

            {/* Columna DEPARTAMENTO */}
            <td className="p-4">{user.department}</td>

            {/* Columna ESTADO */}
            <td className="p-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {user.status}
        </span>
            </td>

            {/* Columna ACCIÓN */}
            <td className="p-4">
                <button className="text-blue-600 hover:text-blue-900 mr-2">
                    Editar
                </button>
                <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => onEliminar(user.id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}