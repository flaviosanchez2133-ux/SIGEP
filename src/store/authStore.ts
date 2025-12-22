import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

// Definición de usuarios del sistema
export const USUARIOS_SISTEMA: Record<
  string,
  { password: string; user: User }
> = {
  d1_admin: {
    password: 'D1_2024',
    user: {
      id: 'd1',
      username: 'd1_admin',
      nombre: 'Administrador D-1',
      departamento: 'Departamento Personal (D-1)',
      rol: 'admin',
      color: '#1e3a5f',
      permisos: ['d1', 'read', 'write', 'export'],
    },
  },
  d2_admin: {
    password: 'D2_2024',
    user: {
      id: 'd2',
      username: 'd2_admin',
      nombre: 'Administrador D-2',
      departamento: 'Departamento Inteligencia Criminal (D-2)',
      rol: 'admin',
      color: '#8B4513',
      permisos: ['d2', 'read', 'write', 'export'],
    },
  },
  d3_admin: {
    password: 'D3_2024',
    user: {
      id: 'd3',
      username: 'd3_admin',
      nombre: 'Administrador D-3',
      departamento: 'Departamento Operaciones Policiales (D-3)',
      rol: 'admin',
      color: '#0ea5e9',
      permisos: ['d3', 'read', 'write', 'export'],
    },
  },
  d4_admin: {
    password: 'D4_2024',
    user: {
      id: 'd4',
      username: 'd4_admin',
      nombre: 'Administrador D-4',
      departamento: 'Departamento Logística (D-4)',
      rol: 'admin',
      color: '#2563eb',
      permisos: ['d4', 'read', 'write', 'export'],
    },
  },
  d5_admin: {
    password: 'D5_2024',
    user: {
      id: 'd5',
      username: 'd5_admin',
      nombre: 'Administrador D-5',
      departamento: 'Departamento Judicial (D-5)',
      rol: 'admin',
      color: '#d69e2e',
      permisos: ['d5', 'read', 'write', 'export'],
    },
  },
  asuntos_admin: {
    password: 'AI_2024',
    user: {
      id: 'asuntos',
      username: 'asuntos_admin',
      nombre: 'Administrador Asuntos Internos',
      departamento: 'Dirección General Asuntos Internos',
      rol: 'admin',
      color: '#1e40af',
      permisos: ['asuntos', 'read', 'write', 'export'],
    },
  },
  rurales_admin: {
    password: 'DR_2024',
    user: {
      id: 'rurales',
      username: 'rurales_admin',
      nombre: 'Administrador Delitos Rurales',
      departamento: 'Dirección General de Delitos Rurales y Ambientales',
      rol: 'admin',
      color: '#166534',
      permisos: ['rurales', 'read', 'write', 'export'],
    },
  },
  digedrop_admin: {
    password: 'DG_2024',
    user: {
      id: 'digedrop',
      username: 'digedrop_admin',
      nombre: 'Administrador DIGEDROP',
      departamento: 'Dirección General de Drogas Peligrosas',
      rol: 'admin',
      color: '#dc2626',
      permisos: ['digedrop', 'read', 'write', 'export'],
    },
  },
  prevencion_admin: {
    password: 'PC_2024',
    user: {
      id: 'prevencion',
      username: 'prevencion_admin',
      nombre: 'Administrador Prevención Ciudadana',
      departamento: 'Dirección General de Prevención Ciudadana',
      rol: 'admin',
      color: '#22c55e',
      permisos: ['prevencion', 'read', 'write', 'export'],
    },
  },
  especiales_admin: {
    password: 'UE_2024',
    user: {
      id: 'especiales',
      username: 'especiales_admin',
      nombre: 'Administrador Unidades Especiales',
      departamento: 'Dirección General de Unidades Especiales',
      rol: 'admin',
      color: '#ea580c',
      permisos: ['especiales', 'read', 'write', 'export'],
    },
  },
  institutos_admin: {
    password: 'II_2024',
    user: {
      id: 'institutos',
      username: 'institutos_admin',
      nombre: 'Administrador Institutos',
      departamento: 'Dirección General de Institutos e Instrucción',
      rol: 'admin',
      color: '#7c3aed',
      permisos: ['institutos', 'read', 'write', 'export'],
    },
  },
  ur_capital: {
    password: 'URC_2024',
    user: {
      id: 'ur_capital',
      username: 'ur_capital',
      nombre: 'Administrador UR Capital',
      departamento: 'Unidad Regional Capital',
      rol: 'admin',
      color: '#3b82f6',
      permisos: ['ur_capital', 'read', 'write', 'export'],
    },
  },
  ur_norte: {
    password: 'URN_2024',
    user: {
      id: 'ur_norte',
      username: 'ur_norte',
      nombre: 'Administrador UR Norte',
      departamento: 'Unidad Regional Norte',
      rol: 'admin',
      color: '#10b981',
      permisos: ['ur_norte', 'read', 'write', 'export'],
    },
  },
  ur_sur: {
    password: 'URS_2024',
    user: {
      id: 'ur_sur',
      username: 'ur_sur',
      nombre: 'Administrador UR Sur',
      departamento: 'Unidad Regional Sur',
      rol: 'admin',
      color: '#f97316',
      permisos: ['ur_sur', 'read', 'write', 'export'],
    },
  },
  ur_este: {
    password: 'URE_2024',
    user: {
      id: 'ur_este',
      username: 'ur_este',
      nombre: 'Administrador UR Este',
      departamento: 'Unidad Regional Este',
      rol: 'admin',
      color: '#8b5cf6',
      permisos: ['ur_este', 'read', 'write', 'export'],
    },
  },
  ur_oeste: {
    password: 'URO_2024',
    user: {
      id: 'ur_oeste',
      username: 'ur_oeste',
      nombre: 'Administrador UR Oeste',
      departamento: 'Unidad Regional Oeste',
      rol: 'admin',
      color: '#ef4444',
      permisos: ['ur_oeste', 'read', 'write', 'export'],
    },
  },
  superadmin: {
    password: 'SIGEP_2024',
    user: {
      id: 'superadmin',
      username: 'superadmin',
      nombre: 'Super Administrador',
      departamento: 'Departamento Inteligencia Criminal - Análisis Delictual',
      rol: 'admin',
      color: '#1e3a5f',
      permisos: ['all', 'read', 'write', 'export', 'admin'],
    },
  },
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (username: string, password: string) => {
        const userConfig = USUARIOS_SISTEMA[username];

        if (userConfig && userConfig.password === password) {
          set({
            user: userConfig.user,
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;
        if (user.permisos.includes('all')) return true;
        return user.permisos.includes(permission);
      },
    }),
    {
      name: 'sigep-auth-storage',
    }
  )
);
