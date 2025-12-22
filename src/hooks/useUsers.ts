import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersService } from '../services/api';
import { CreateUserRequest, UpdateUserRequest } from '../services/api/users.service';

// Query keys
export const usersKeys = {
  all: ['users'] as const,
  list: ['users', 'list'] as const,
  detail: (id: string) => ['users', 'detail', id] as const,
};

// Hook para listar usuarios
export function useUsers() {
  return useQuery({
    queryKey: usersKeys.list,
    queryFn: usersService.listUsers,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}

// Hook para obtener un usuario
export function useUser(id: string) {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => usersService.getUser(id),
    enabled: !!id,
  });
}

// Hook para crear usuario
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => usersService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

// Hook para actualizar usuario
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) => usersService.updateUser(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
      queryClient.invalidateQueries({ queryKey: usersKeys.detail(id) });
    },
  });
}

// Hook para cambiar contraseña
export function useChangePassword() {
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) => usersService.changePassword(id, password),
  });
}

// Hook para eliminar usuario
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => usersService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}
