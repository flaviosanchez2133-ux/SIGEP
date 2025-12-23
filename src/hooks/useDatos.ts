import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { datosService } from '../services/api';
import {
  UpdateDatoRequest,
  PeriodoQueryParams,
  DatosComparadosResponse,
  SnapshotDisponible,
} from '../services/api/datos.service';
import { socketService, DatoActualizadoEvent } from '../services/socket';
import { useAppStore } from '../store';

// Query keys
export const datosKeys = {
  departamentos: ['departamentos'] as const,
  tablas: (departamentoId: string) => ['tablas', departamentoId] as const,
  tabla: (departamentoId: string, tablaId: string) =>
    ['tablas', departamentoId, tablaId] as const,
  comparar: (params: PeriodoQueryParams) => ['datos-comparar', params] as const,
  snapshots: ['snapshots-disponibles'] as const,
};

// Hook para listar departamentos
export function useDepartamentos() {
  return useQuery({
    queryKey: datosKeys.departamentos,
    queryFn: datosService.listDepartamentos,
    staleTime: 10 * 60 * 1000, // 10 minutos - los departamentos no cambian frecuentemente
  });
}

// Hook para obtener tablas de un departamento
export function useTablasDepartamento(
  departamentoId: string,
  tablaId?: string
) {
  return useQuery({
    queryKey: tablaId
      ? datosKeys.tabla(departamentoId, tablaId)
      : datosKeys.tablas(departamentoId),
    queryFn: () => datosService.getDatosTabla(departamentoId, tablaId),
    enabled: !!departamentoId,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}

// Hook para obtener datos comparados según el período seleccionado en el store
export function useDatosComparar(tablaId?: string) {
  const { periodoSeleccionado } = useAppStore();

  const params: PeriodoQueryParams = {
    periodoAnteriorInicio: periodoSeleccionado.anterior.inicio,
    periodoAnteriorFin: periodoSeleccionado.anterior.fin,
    periodoActualInicio: periodoSeleccionado.actual.inicio,
    periodoActualFin: periodoSeleccionado.actual.fin,
    tablaId,
  };

  return useQuery<DatosComparadosResponse>({
    queryKey: datosKeys.comparar(params),
    queryFn: () => datosService.getDatosComparar(params),
    staleTime: 2 * 60 * 1000, // 2 minutos
    enabled: !!periodoSeleccionado,
  });
}

// Hook para listar snapshots disponibles
export function useSnapshotsDisponibles() {
  return useQuery<SnapshotDisponible[]>({
    queryKey: datosKeys.snapshots,
    queryFn: datosService.listSnapshots,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

// Hook para actualizar un dato
export function useUpdateDato(departamentoId: string, tablaId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateDatoRequest) =>
      datosService.updateDato(departamentoId, tablaId, data),
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({
        queryKey: datosKeys.tablas(departamentoId),
      });
      // También invalidar datos comparados
      queryClient.invalidateQueries({ queryKey: ['datos-comparar'] });
    },
  });
}

// Hook para escuchar actualizaciones en tiempo real
export function useRealtimeDatos(departamentoId?: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!departamentoId) return;

    // Unirse a la sala del departamento
    socketService.joinDepartamento(departamentoId);

    // Suscribirse a actualizaciones
    const unsubscribe = socketService.subscribeDatoActualizado(
      (event: DatoActualizadoEvent) => {
        // Si es del departamento actual, invalidar queries
        if (event.departamentoId === departamentoId) {
          queryClient.invalidateQueries({
            queryKey: datosKeys.tablas(departamentoId),
          });
          queryClient.invalidateQueries({ queryKey: ['datos-comparar'] });
        }
      }
    );

    return () => {
      socketService.leaveDepartamento(departamentoId);
      unsubscribe();
    };
  }, [departamentoId, queryClient]);
}
