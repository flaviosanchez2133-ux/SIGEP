// Configuración de la API
export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  socketURL: import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000',
  timeout: 10000,
};

// Tipos de respuesta de la API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
}

// Tokens
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// Usuario
export interface Usuario {
  id: string;
  username: string;
  nombre: string;
  rol: 'ADMIN' | 'EDITOR' | 'VIEWER';
  color: string;
  departamentoId: string | null;
  departamento?: Departamento | null;
  permisos: Permiso[];
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permiso {
  id: string;
  tipo: string;
}

// Departamento
export interface Departamento {
  id: string;
  codigo: string;
  nombre: string;
  color: string;
  orden: number;
}

// Tabla y Datos
export interface TablaConfig {
  id: string;
  tablaId: string;
  nombre: string;
  departamentoId: string;
  orden: number;
  datos: DatoComparativo[];
}

export interface DatoComparativo {
  id: string;
  filaId: string;
  label: string;
  periodoAnterior: number;
  periodoActual: number;
  orden: number;
}

// Historial
export interface HistorialCambio {
  id: string;
  tablaConfigId: string;
  datoId: string;
  campo: 'PERIODO_ANTERIOR' | 'PERIODO_ACTUAL';
  valorAnterior: number;
  valorNuevo: number;
  usuarioId: string;
  usuario: {
    nombre: string;
    username: string;
    color: string;
  };
  createdAt: string;
}

// Snapshot
export interface Snapshot {
  id: string;
  nombre: string;
  descripcion?: string;
  mes: number;
  anio: number;
  datos: Record<string, unknown>;
  createdAt: string;
}

// Config
export interface ConfigGlobal {
  edicionHabilitada: boolean;
}

export interface ConfigPeriodo {
  id: string;
  anteriorInicio: string;
  anteriorFin: string;
  anteriorLabel: string;
  actualInicio: string;
  actualFin: string;
  actualLabel: string;
}
