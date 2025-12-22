import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService, Usuario } from '../services/api';
import { LoginRequest } from '../services/api/auth.service';
import { socketService } from '../services/socket';

// Query keys
export const authKeys = {
  user: ['auth', 'user'] as const,
};

// Hook para obtener usuario actual
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.user,
    queryFn: authService.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: false,
  });
}

// Hook para login
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (user: Usuario) => {
      queryClient.setQueryData(authKeys.user, user);
      // Conectar socket después del login
      socketService.connect();
    },
  });
}

// Hook para logout
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      // Desconectar socket
      socketService.disconnect();
      // Limpiar cache
      queryClient.clear();
    },
    onError: () => {
      // Incluso si falla, limpiar el estado local
      socketService.disconnect();
      queryClient.clear();
    },
  });
}
