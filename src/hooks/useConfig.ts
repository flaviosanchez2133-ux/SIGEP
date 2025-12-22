import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { configService, ConfigGlobal, ConfigPeriodo } from '../services/api';
import { UpdatePeriodoRequest } from '../services/api/config.service';
import { socketService } from '../services/socket';

// Query keys
export const configKeys = {
  all: ['config'] as const,
  global: ['config', 'global'] as const,
  periodo: ['config', 'periodo'] as const,
};

// Hook para obtener configuración
export function useConfig() {
  return useQuery({
    queryKey: configKeys.all,
    queryFn: configService.getConfig,
    staleTime: 60 * 1000, // 1 minuto
  });
}

// Hook para toggle de edición
export function useToggleEdicion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habilitada: boolean) =>
      configService.toggleEdicion(habilitada),
    onSuccess: data => {
      queryClient.setQueryData(
        configKeys.all,
        (old: { global: ConfigGlobal; periodo: ConfigPeriodo } | undefined) => {
          if (!old) return old;
          return { ...old, global: data };
        }
      );
    },
  });
}

// Hook para actualizar período
export function useUpdatePeriodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePeriodoRequest) =>
      configService.updatePeriodo(data),
    onSuccess: data => {
      queryClient.setQueryData(
        configKeys.all,
        (old: { global: ConfigGlobal; periodo: ConfigPeriodo } | undefined) => {
          if (!old) return old;
          return { ...old, periodo: data };
        }
      );
    },
  });
}

// Hook para escuchar cambios de configuración en tiempo real
export function useRealtimeConfig() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Suscribirse a toggle de edición
    const unsubscribeEdicion = socketService.subscribeEdicionToggle(event => {
      queryClient.setQueryData(
        configKeys.all,
        (old: { global: ConfigGlobal; periodo: ConfigPeriodo } | undefined) => {
          if (!old) return old;
          return { ...old, global: { edicionHabilitada: event.habilitada } };
        }
      );
    });

    // Suscribirse a cambios de período
    const unsubscribePeriodo = socketService.subscribePeriodoActualizado(() => {
      queryClient.invalidateQueries({ queryKey: configKeys.all });
    });

    return () => {
      unsubscribeEdicion();
      unsubscribePeriodo();
    };
  }, [queryClient]);
}
