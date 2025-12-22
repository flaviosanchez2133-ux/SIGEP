import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { snapshotsService } from '../services/api';
import { CreateSnapshotRequest } from '../services/api/snapshots.service';

// Query keys
export const snapshotKeys = {
  all: ['snapshots'] as const,
  list: (anio?: number) => ['snapshots', 'list', anio] as const,
  detail: (id: string) => ['snapshots', 'detail', id] as const,
  compare: (id1: string, id2: string) => ['snapshots', 'compare', id1, id2] as const,
};

// Hook para listar snapshots
export function useSnapshots(anio?: number) {
  return useQuery({
    queryKey: snapshotKeys.list(anio),
    queryFn: () => snapshotsService.listSnapshots(anio),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

// Hook para obtener un snapshot
export function useSnapshot(id: string) {
  return useQuery({
    queryKey: snapshotKeys.detail(id),
    queryFn: () => snapshotsService.getSnapshot(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos - los snapshots no cambian
  });
}

// Hook para crear snapshot
export function useCreateSnapshot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSnapshotRequest) => snapshotsService.createSnapshot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: snapshotKeys.all });
    },
  });
}

// Hook para eliminar snapshot
export function useDeleteSnapshot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => snapshotsService.deleteSnapshot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: snapshotKeys.all });
    },
  });
}

// Hook para comparar snapshots
export function useCompareSnapshots(id1: string, id2: string) {
  return useQuery({
    queryKey: snapshotKeys.compare(id1, id2),
    queryFn: () => snapshotsService.compareSnapshots(id1, id2),
    enabled: !!id1 && !!id2,
    staleTime: 10 * 60 * 1000,
  });
}
