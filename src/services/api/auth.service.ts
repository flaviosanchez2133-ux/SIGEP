import apiClient, { setTokens, clearTokens } from './client';
import { ApiResponse, Usuario, AuthTokens } from './config';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: Usuario;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

// Login
export const login = async (credentials: LoginRequest): Promise<Usuario> => {
  const response = await apiClient.post<LoginResponse>(
    '/auth/login',
    credentials
  );
  const { user, tokens } = response.data;
  setTokens({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });
  return user;
};

// Logout
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } finally {
    clearTokens();
  }
};

// Obtener usuario actual
export const getCurrentUser = async (): Promise<Usuario> => {
  const response = await apiClient.get<Usuario>('/auth/me');
  return response.data;
};

// Refresh token (manejado automáticamente por el interceptor)
export const refreshTokens = async (
  refreshToken: string
): Promise<AuthTokens> => {
  const response = await apiClient.post<{ tokens: AuthTokens }>(
    '/auth/refresh',
    { refreshToken }
  );
  return response.data.tokens;
};
