import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// Rate limiter para login - 5 intentos por IP cada 15 minutos
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 intentos
  message: {
    error: 'Demasiados intentos de inicio de sesión. Por favor, espere 15 minutos antes de intentarlo de nuevo.',
    retryAfter: '15 minutos',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // No contar los logins exitosos
  keyGenerator: (req: Request): string => {
    // Usar IP + username para tracking más preciso
    const username = req.body?.username || 'unknown';
    // Acceder a la IP manualmente para evitar el error de validación de express-rate-limit con IPv6
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    return `${ip}-${username}`;
  },
  validate: {
      ip: false,
      trustProxy: false,
      xForwardedForHeader: false
  },
  handler: (req: Request, res: Response) => {
    console.log(`⚠️ Rate limit excedido para IP: ${req.ip}, Usuario: ${req.body?.username || 'unknown'}`);
    res.status(429).json({
      error: 'Demasiados intentos de inicio de sesión. Por favor, espere 15 minutos antes de intentarlo de nuevo.',
      retryAfter: 900, // segundos
    });
  },
});

// Rate limiter general para API - 100 requests por minuto
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 100, // Máximo 100 requests por minuto
  message: {
    error: 'Demasiadas solicitudes. Por favor, espere un momento.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req: Request): boolean => {
    // No limitar rutas de health check
    return req.path === '/health' || req.path === '/api/health';
  },
});

// Rate limiter estricto para endpoints sensibles (cambio de contraseña, etc)
export const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 3, // Máximo 3 intentos por hora
  message: {
    error: 'Demasiados intentos. Por favor, espere una hora antes de intentarlo de nuevo.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter para refresh token
export const refreshLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 10, // Máximo 10 refresh por minuto
  message: {
    error: 'Demasiadas solicitudes de renovación de token.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
