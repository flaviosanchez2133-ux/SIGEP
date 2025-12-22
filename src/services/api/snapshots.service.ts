import apiClient from './client';
import { ApiResponse, Snapshot } from './config';

export interface CreateSnapshotRequest {
  nombre: string;
  descripcion?: string;
  mes: number;
  anio: number;
}

export interface SnapshotComparison {
  snapshot1: Snapshot;
  snapshot2: Snapshot;
  diferencias: Array<{
    tabla: string;
    fila: string;
    campo: string;
    valor1: number;
    valor2: number;
    diferencia: number;
    porcentaje: number;
  }>;
}

// Listar snapshots
export const listSnapshots = async (anio?: number): Promise<Snapshot[]> => {
  const params = anio ? { anio } : {};
  const response = await apiClient.get<ApiResponse<Snapshot[]>>('/snapshots', {
    params,
  });
  return response.data.data;
};

// Obtener snapshot por ID
export const getSnapshot = async (id: string): Promise<Snapshot> => {
  const response = await apiClient.get<ApiResponse<Snapshot>>(
    `/snapshots/${id}`
  );
  return response.data.data;
};

// Crear snapshot
export const createSnapshot = async (
  data: CreateSnapshotRequest
): Promise<Snapshot> => {
  const response = await apiClient.post<ApiResponse<Snapshot>>(
    '/snapshots',
    data
  );
  return response.data.data;
};

// Eliminar snapshot
export const deleteSnapshot = async (id: string): Promise<void> => {
  await apiClient.delete(`/snapshots/${id}`);
};

// Comparar snapshots
export const compareSnapshots = async (
  id1: string,
  id2: string
): Promise<SnapshotComparison> => {
  const response = await apiClient.get<ApiResponse<SnapshotComparison>>(
    '/snapshots/compare',
    {
      params: { id1, id2 },
    }
  );
  return response.data.data;
};
