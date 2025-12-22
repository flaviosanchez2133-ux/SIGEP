import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { historialService } from '../services/api';
import { HistorialFilters } from '../services/api/historial.service';

// Query keys
export const historialKeys = {
  all: ['historial'] as const,
  list: (filters?: HistorialFilters) => ['historial', 'list', filters] as const,
};

// Hook para listar historial
export function useHistorial(filters?: HistorialFilters) {
  return useQuery({
    queryKey: historialKeys.list(filters),
    queryFn: () => historialService.listHistorial(filters),
    staleTime: 30 * 1000, // 30 segundos - el historial cambia frecuentemente
  });
}

// Hook para revertir un cambio
export function useRevertirCambio() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => historialService.revertirCambio(id),
    onSuccess: () => {
      // Invalidar historial y datos
      queryClient.invalidateQueries({ queryKey: historialKeys.all });
      queryClient.invalidateQueries({ queryKey: ['tablas'] });
    },
  });
}

// Hook para limpiar historial
export function useLimpiarHistorial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: historialService.limpiarHistorial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: historialKeys.all });
    },
  });
}
