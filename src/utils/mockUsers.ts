import {User, UserEstado} from '../types/user';

export const mockUsers: User[] = [
    {
        id: '1',
        iniciales: 'FC',
        name: 'Frank Chacon',
        email:'frankManuel1991@gmail.com',
        rol: 'Engineer',
        department: 'frontend',
        status: 'unavailable',

    },
    {
        id: '2',
        iniciales: 'NE',
        name: 'Nour Ehab',
        email: 'NourEhab19@gmail.com',
        rol: 'Doctor',
        department: 'cardiology',
        status: 'available',
    },
    {
        id: '3',
        iniciales: 'YD',
        name: 'Yasmin dos Santos',
        email: 'Yasmin2Santos@gmail.com',
        rol: 'Graduated',
        department: 'Vet',
        status: 'unavailable',
    },
    {
        id: '4',
        iniciales: 'VC',
        name: 'Valeria Castro',
        email: 'ValeriaCastro@gmail.com',
        rol: 'Doctor',
        department: 'pediatrics',
        status: 'available',
    }
];