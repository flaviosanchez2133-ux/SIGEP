import apiClient from './client';
import { ApiResponse, Usuario } from './config';

export interface CreateUserRequest {
  username: string;
  password: string;
  nombre: string;
  rol: 'ADMIN' | 'EDITOR' | 'VIEWER';
  color?: string;
  departamentoId?: string;
  permisos: string[];
}

export interface UpdateUserRequest {
  nombre?: string;
  rol?: 'ADMIN' | 'EDITOR' | 'VIEWER';
  color?: string;
  departamentoId?: string | null;
  permisos?: string[];
  activo?: boolean;
}

// Listar usuarios
export const listUsers = async (): Promise<Usuario[]> => {
  const response = await apiClient.get<ApiResponse<Usuario[]>>('/users');
  return response.data.data;
};

// Obtener usuario por ID
export const getUser = async (id: string): Promise<Usuario> => {
  const response = await apiClient.get<ApiResponse<Usuario>>(`/users/${id}`);
  return response.data.data;
};

// Crear usuario
export const createUser = async (data: CreateUserRequest): Promise<Usuario> => {
  const response = await apiClient.post<ApiResponse<Usuario>>('/users', data);
  return response.data.data;
};

// Actualizar usuario
export const updateUser = async (id: string, data: UpdateUserRequest): Promise<Usuario> => {
  const response = await apiClient.put<ApiResponse<Usuario>>(`/users/${id}`, data);
  return response.data.data;
};

// Cambiar contraseña
export const changePassword = async (id: string, password: string): Promise<void> => {
  await apiClient.patch(`/users/${id}/password`, { password });
};

// Eliminar usuario
export const deleteUser = async (id: string): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};
