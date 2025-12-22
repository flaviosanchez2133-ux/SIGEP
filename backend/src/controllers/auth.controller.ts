import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database.js';
import { redisCache } from '../config/redis.js';
import {
  hashPassword,
  verifyPassword,
  generateTokenPair,
  verifyRefreshToken,
  getRefreshTokenExpiry,
} from '../utils/jwt.js';
import { AppError } from '../middleware/error.js';

// Esquemas de validación
const loginSchema = z.object({
  username: z.string().min(1, 'Username requerido'),
  password: z.string().min(1, 'Password requerido'),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token requerido'),
});

// Login
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { username, password } = loginSchema.parse(req.body);

    // Buscar usuario
    const usuario = await prisma.usuario.findUnique({
      where: { username },
      include: {
        departamento: true,
        permisos: true,
      },
    });

    if (!usuario || !usuario.activo) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Verificar contraseña
    const isValid = await verifyPassword(password, usuario.passwordHash);
    if (!isValid) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Generar tokens
    const tokens = generateTokenPair({
      userId: usuario.id,
      username: usuario.username,
      rol: usuario.rol,
    });

    // Guardar refresh token en Redis
    await redisCache.setRefreshToken(
      usuario.id,
      tokens.refreshToken,
      getRefreshTokenExpiry()
    );

    // Responder
    res.json({
      user: {
        id: usuario.id,
        username: usuario.username,
        nombre: usuario.nombre,
        rol: usuario.rol,
        color: usuario.color,
        departamento: usuario.departamento?.nombre,
        departamentoId: usuario.departamentoId,
        permisos: usuario.permisos.map(p => p.tipo),
      },
      tokens,
    });
  } catch (error) {
    next(error);
  }
}

// Logout
export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);

    if (req.user) {
      // Invalidar refresh token
      await redisCache.invalidateRefreshToken(req.user.userId, refreshToken);

      // Poner access token en blacklist
      const authHeader = req.headers.authorization;
      if (authHeader) {
        const token = authHeader.substring(7);
        await redisCache.blacklistToken(token, 3600); // 1 hora
      }
    }

    res.json({ message: 'Sesión cerrada correctamente' });
  } catch (error) {
    next(error);
  }
}

// Refresh Token
export async function refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { refreshToken } = refreshSchema.parse(req.body);

    // Verificar token
    const payload = verifyRefreshToken(refreshToken);

    // Verificar si está en Redis
    const isValid = await redisCache.isRefreshTokenValid(payload.userId, refreshToken);
    if (!isValid) {
      throw new AppError('Refresh token inválido', 401);
    }

    // Obtener usuario actualizado
    const usuario = await prisma.usuario.findUnique({
      where: { id: payload.userId },
      include: { permisos: true },
    });

    if (!usuario || !usuario.activo) {
      throw new AppError('Usuario no encontrado o inactivo', 401);
    }

    // Invalidar token antiguo
    await redisCache.invalidateRefreshToken(payload.userId, refreshToken);

    // Generar nuevos tokens
    const tokens = generateTokenPair({
      userId: usuario.id,
      username: usuario.username,
      rol: usuario.rol,
    });

    // Guardar nuevo refresh token
    await redisCache.setRefreshToken(
      usuario.id,
      tokens.refreshToken,
      getRefreshTokenExpiry()
    );

    res.json({ tokens });
  } catch (error) {
    next(error);
  }
}

// Obtener usuario actual
export async function me(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      throw new AppError('No autenticado', 401);
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: req.user.userId },
      include: {
        departamento: true,
        permisos: true,
      },
    });

    if (!usuario) {
      throw new AppError('Usuario no encontrado', 404);
    }

    res.json({
      id: usuario.id,
      username: usuario.username,
      nombre: usuario.nombre,
      rol: usuario.rol,
      color: usuario.color,
      departamento: usuario.departamento?.nombre,
      departamentoId: usuario.departamentoId,
      permisos: usuario.permisos.map(p => p.tipo),
    });
  } catch (error) {
    next(error);
  }
}
