import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { authService, getAccessToken, clearTokens, Usuario } from '../services/api';
import { socketService } from '../services/socket';

// Flag para usar API real o simulada
const USE_API = true; // Cambiar a false para usar usuarios locales

// Usuarios locales de respaldo (para desarrollo sin backend)
export const USUARIOS_SISTEMA: Record<string, { password: string; user: User }> = {
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
};

// Convertir usuario de API a tipo local
function apiUserToLocal(apiUser: Usuario): User {
  return {
    id: apiUser.id,
    username: apiUser.username,
    nombre: apiUser.nombre,
    departamento: apiUser.departamento?.nombre || 'Sin departamento',
    rol: apiUser.rol.toLowerCase() as 'admin' | 'editor' | 'viewer',
    color: apiUser.color,
    permisos: apiUser.permisos.map(p => p.tipo),
  };
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });

        if (USE_API) {
          try {
            const apiUser = await authService.login({ username, password });
            const user = apiUserToLocal(apiUser);
            
            // Conectar Socket.IO después del login
            socketService.connect();
            
            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return true;
          } catch (error: any) {
            const message = error.response?.data?.message || 'Credenciales inválidas';
            set({
              isLoading: false,
              error: message,
            });
            return false;
          }
        } else {
          // Modo local (sin backend)
          const userConfig = USUARIOS_SISTEMA[username];
          if (userConfig && userConfig.password === password) {
            set({
              user: userConfig.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return true;
          }
          set({
            isLoading: false,
            error: 'Usuario o contraseña incorrectos',
          });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true });

        if (USE_API) {
          try {
            await authService.logout();
          } catch (error) {
            console.error('Error en logout:', error);
          }
        }
        
        // Desconectar Socket.IO
        socketService.disconnect();
        
        // Limpiar tokens
        clearTokens();
        
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;
        if (user.permisos.includes('all')) return true;
        return user.permisos.includes(permission);
      },

      checkAuth: async () => {
        if (!USE_API) return;
        
        const token = getAccessToken();
        if (!token) {
          set({ user: null, isAuthenticated: false });
          return;
        }

        set({ isLoading: true });
        try {
          const apiUser = await authService.getCurrentUser();
          const user = apiUserToLocal(apiUser);
          
          // Reconectar Socket.IO si es necesario
          socketService.connect();
          
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // Token inválido o expirado
          clearTokens();
          socketService.disconnect();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'sigep-auth-storage',
      partialize: (state) => ({
        // Solo persistir el estado de autenticación, no el loading/error
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
