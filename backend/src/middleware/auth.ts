import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, JwtPayload } from '../utils/jwt.js';
import { redisCache } from '../config/redis.js';
import { prisma } from '../config/database.js';

// Extender Request para incluir usuario
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { permisos: string[] };
    }
  }
}

// Middleware de autenticación
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token no proporcionado' });
      return;
    }

    const token = authHeader.substring(7);

    // Verificar si está en blacklist
    const isBlacklisted = await redisCache.isTokenBlacklisted(token);
    if (isBlacklisted) {
      res.status(401).json({ error: 'Token inválido' });
      return;
    }

    // Verificar token
    const payload = verifyAccessToken(token);

    // Obtener permisos del usuario
    const permisos = await prisma.permiso.findMany({
      where: { usuarioId: payload.userId },
      select: { tipo: true },
    });

    // Agregar usuario al request
    req.user = {
      ...payload,
      permisos: permisos.map(p => p.tipo),
    };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

// Middleware para verificar rol
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'No autenticado' });
      return;
    }

    if (!roles.includes(req.user.rol)) {
      res.status(403).json({ error: 'No tienes permisos para esta acción' });
      return;
    }

    next();
  };
}

// Middleware para verificar permiso
export function requirePermission(...permissions: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'No autenticado' });
      return;
    }

    // Superadmin tiene todos los permisos
    if (req.user.permisos.includes('all')) {
      next();
      return;
    }

    const hasPermission = permissions.some(p => req.user!.permisos.includes(p));
    if (!hasPermission) {
      res.status(403).json({ error: 'No tienes permisos para esta acción' });
      return;
    }

    next();
  };
}

// Middleware para superadmin
export function requireSuperAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: 'No autenticado' });
    return;
  }

  if (!req.user.permisos.includes('all') && req.user.rol !== 'ADMIN') {
    res.status(403).json({ error: 'Solo el superadministrador puede realizar esta acción' });
    return;
  }

  next();
}
