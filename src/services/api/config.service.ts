import apiClient from './client';
import { ApiResponse, ConfigGlobal, ConfigPeriodo } from './config';

export interface UpdatePeriodoRequest {
  anteriorInicio?: string;
  anteriorFin?: string;
  anteriorLabel?: string;
  actualInicio?: string;
  actualFin?: string;
  actualLabel?: string;
}

// Obtener configuración global
export const getConfig = async (): Promise<{ global: ConfigGlobal; periodo: ConfigPeriodo }> => {
  const response = await apiClient.get<ApiResponse<{ global: ConfigGlobal; periodo: ConfigPeriodo }>>('/config');
  return response.data.data;
};

// Toggle edición
export const toggleEdicion = async (habilitada: boolean): Promise<ConfigGlobal> => {
  const response = await apiClient.post<ApiResponse<ConfigGlobal>>('/config/edicion', { habilitada });
  return response.data.data;
};

// Actualizar período
export const updatePeriodo = async (data: UpdatePeriodoRequest): Promise<ConfigPeriodo> => {
  const response = await apiClient.put<ApiResponse<ConfigPeriodo>>('/config/periodo', data);
  return response.data.data;
};
