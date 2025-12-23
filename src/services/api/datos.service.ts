import apiClient from './client';
import { ApiResponse, Departamento, TablaConfig } from './config';

export interface UpdateDatoRequest {
  datoId: string;
  campo: 'periodoAnterior' | 'periodoActual';
  valor: number;
}

export interface PeriodoQueryParams {
  periodoAnteriorInicio: string;
  periodoAnteriorFin: string;
  periodoActualInicio: string;
  periodoActualFin: string;
  tablaId?: string;
}

export interface DatoComparado {
  id: string;
  label: string;
  periodoAnterior: number;
  periodoActual: number;
  editable?: boolean;
}

export interface PeriodoInfo {
  inicio: string;
  fin: string;
  mes?: number;
  anio?: number;
  tieneSnapshot: boolean;
  datos: Record<string, DatoComparado[]>;
}

export interface DatosComparadosResponse {
  periodoAnterior: PeriodoInfo;
  periodoActual: PeriodoInfo;
}

export interface SnapshotDisponible {
  id: string;
  mes: number;
  anio: number;
  label: string;
  fechaCreacion: string;
  creadoPor: string;
}

// Listar departamentos
export const listDepartamentos = async (): Promise<Departamento[]> => {
  const response = await apiClient.get<ApiResponse<Departamento[]>>(
    '/datos/departamentos'
  );
  return response.data.data;
};

// Obtener datos de una tabla
export const getDatosTabla = async (
  departamentoId: string,
  tablaId?: string
): Promise<TablaConfig[]> => {
  const params = tablaId ? { tablaId } : {};
  const response = await apiClient.get<ApiResponse<TablaConfig[]>>(
    `/datos/departamentos/${departamentoId}/tablas`,
    { params }
  );
  return response.data.data;
};

// Obtener datos comparados por períodos
export const getDatosComparar = async (
  params: PeriodoQueryParams
): Promise<DatosComparadosResponse> => {
  const response = await apiClient.get<DatosComparadosResponse>(
    '/datos/comparar',
    { params }
  );
  return response.data;
};

// Listar snapshots disponibles
export const listSnapshots = async (): Promise<SnapshotDisponible[]> => {
  const response = await apiClient.get<SnapshotDisponible[]>(
    '/datos/snapshots'
  );
  return response.data;
};

// Actualizar dato
export const updateDato = async (
  departamentoId: string,
  tablaId: string,
  data: UpdateDatoRequest
): Promise<TablaConfig> => {
  const response = await apiClient.patch<ApiResponse<TablaConfig>>(
    `/datos/departamentos/${departamentoId}/tablas/${tablaId}`,
    data
  );
  return response.data.data;
};

// Actualizar múltiples datos
export const updateMultipleDatos = async (
  departamentoId: string,
  tablaId: string,
  datos: UpdateDatoRequest[]
): Promise<TablaConfig> => {
  const response = await apiClient.patch<ApiResponse<TablaConfig>>(
    `/datos/departamentos/${departamentoId}/tablas/${tablaId}/batch`,
    { datos }
  );
  return response.data.data;
};
