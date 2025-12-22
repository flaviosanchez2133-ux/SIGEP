import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { config } from '../config/index.js';

// Tipo de error personalizado
export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Errores comunes
export const Errors = {
  NotFound: (resource = 'Recurso') =>
    new AppError(`${resource} no encontrado`, 404),
  Unauthorized: (message = 'No autorizado') => new AppError(message, 401),
  Forbidden: (message = 'Acceso denegado') => new AppError(message, 403),
  BadRequest: (message = 'Solicitud inválida') => new AppError(message, 400),
  Conflict: (message = 'Conflicto') => new AppError(message, 409),
  Internal: (message = 'Error interno del servidor') =>
    new AppError(message, 500),
};

// Middleware de manejo de errores
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Error de validación Zod
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Error de validación',
      details: err.errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  // Error de aplicación
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
    return;
  }

  // Error de Prisma
  if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any;

    switch (prismaError.code) {
      case 'P2002':
        res.status(409).json({
          error: 'Ya existe un registro con estos datos',
          field: prismaError.meta?.target?.[0],
        });
        return;
      case 'P2025':
        res.status(404).json({
          error: 'Registro no encontrado',
        });
        return;
      default:
        break;
    }
  }

  // Error genérico
  console.error('Error no manejado:', err);

  res.status(500).json({
    error: config.isDev ? err.message : 'Error interno del servidor',
    ...(config.isDev && { stack: err.stack }),
  });
}

// Middleware para rutas no encontradas
export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.path,
  });
}
