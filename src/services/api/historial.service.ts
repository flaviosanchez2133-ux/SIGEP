import apiClient from './client';
import { ApiResponse, HistorialCambio } from './config';

export interface HistorialFilters {
  departamentoId?: string;
  tablaId?: string;
  usuarioId?: string;
  desde?: string;
  hasta?: string;
  limit?: number;
  offset?: number;
}

export interface HistorialResponse {
  historial: HistorialCambio[];
  total: number;
  limit: number;
  offset: number;
}

// Listar historial
export const listHistorial = async (filters?: HistorialFilters): Promise<HistorialResponse> => {
  const response = await apiClient.get<ApiResponse<HistorialResponse>>('/historial', {
    params: filters,
  });
  return response.data.data;
};

// Revertir cambio
export const revertirCambio = async (id: string): Promise<void> => {
  await apiClient.post(`/historial/${id}/revertir`);
};

// Limpiar historial (solo superadmin)
export const limpiarHistorial = async (filters?: { desde?: string; hasta?: string }): Promise<{ deleted: number }> => {
  const response = await apiClient.delete<ApiResponse<{ deleted: number }>>('/historial', {
    params: filters,
  });
  return response.data.data;
};
