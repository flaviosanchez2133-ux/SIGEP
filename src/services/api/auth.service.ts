import apiClient, { setTokens, clearTokens, getRefreshToken } from './client';
import { Usuario, AuthTokens } from './config';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: Usuario;
  tokens: AuthTokens;
}

// Login
export const login = async (credentials: LoginRequest): Promise<Usuario> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  setTokens(response.data.tokens);
  return response.data.user;
};

// Logout
export const logout = async (): Promise<void> => {
  try {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      await apiClient.post('/auth/logout', { refreshToken });
    }
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
export const refreshTokens = async (refreshToken: string): Promise<AuthTokens> => {
  const response = await apiClient.post<{ tokens: AuthTokens }>('/auth/refresh', { refreshToken });
  return response.data.tokens;
};
