import apiClient from './client';
import { ApiResponse, Departamento, TablaConfig } from './config';

export interface UpdateDatoRequest {
  datoId: string;
  campo: 'periodoAnterior' | 'periodoActual';
  valor: number;
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
