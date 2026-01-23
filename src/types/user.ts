export type UserEstado = 'available' | 'unavailable';

export interface User {
    id: string;
    iniciales: string;
    name: string;
    email: string;
    rol: string;
    department: string;
    status: UserEstado;
}