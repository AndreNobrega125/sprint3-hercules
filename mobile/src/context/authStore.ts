import { create } from 'zustand';
import { User } from '../types';
import { getMockUserByMatricula, getUserRole } from '../mocks';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (matricula: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (matricula: string) => {
    const role = getUserRole(matricula);

    if (!role) {
      return false;
    }

    const mockUser = getMockUserByMatricula(matricula);
    const user: User = mockUser || {
      id: matricula,
      matricula,
      nome: role === 'gestor' ? 'Gestor' : role === 'fiscal' ? 'Fiscal' : 'Trabalhador',
      role,
      regional: 'Regional Oeste',
      email: `user${matricula}@motiva.com.br`
    };

    set({ user, isAuthenticated: true });
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));
