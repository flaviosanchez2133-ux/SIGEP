import winston from 'winston';
import path from 'path';
import { config } from '../config/index.js';

// Directorio de logs
const logsDir = path.resolve(__dirname, '../../logs');

// Formato personalizado para logs
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Formato para consola (desarrollo)
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

// Logger principal
export const logger = winston.createLogger({
  level: config.isDev ? 'debug' : 'info',
  format: customFormat,
  defaultMeta: { service: 'sigep-backend' },
  transports: [
    // Errores en archivo separado
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Todos los logs
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

// Logger de seguridad (eventos de autenticación)
export const securityLogger = winston.createLogger({
  level: 'info',
  format: customFormat,
  defaultMeta: { service: 'sigep-security' },
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'security.log'),
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],
});

// Logger de auditoría (cambios en datos)
export const auditLogger = winston.createLogger({
  level: 'info',
  format: customFormat,
  defaultMeta: { service: 'sigep-audit' },
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'audit.log'),
      maxsize: 5242880,
      maxFiles: 10,
    }),
  ],
});

// En desarrollo, también mostrar en consola
if (config.isDev) {
  logger.add(new winston.transports.Console({ format: consoleFormat }));
  securityLogger.add(new winston.transports.Console({ format: consoleFormat }));
}

// Funciones helper para eventos de seguridad
export const securityEvents = {
  loginSuccess: (username: string, ip: string, userId: string) => {
    securityLogger.info('Login exitoso', {
      event: 'LOGIN_SUCCESS',
      username,
      userId,
      ip,
      timestamp: new Date().toISOString(),
    });
  },

  loginFailed: (username: string, ip: string, reason: string) => {
    securityLogger.warn('Intento de login fallido', {
      event: 'LOGIN_FAILED',
      username,
      ip,
      reason,
      timestamp: new Date().toISOString(),
    });
  },

  logout: (username: string, userId: string, ip: string) => {
    securityLogger.info('Logout', {
      event: 'LOGOUT',
      username,
      userId,
      ip,
      timestamp: new Date().toISOString(),
    });
  },

  tokenRefresh: (userId: string, ip: string) => {
    securityLogger.info('Token renovado', {
      event: 'TOKEN_REFRESH',
      userId,
      ip,
      timestamp: new Date().toISOString(),
    });
  },

  tokenBlacklisted: (userId: string, reason: string) => {
    securityLogger.info('Token agregado a blacklist', {
      event: 'TOKEN_BLACKLISTED',
      userId,
      reason,
      timestamp: new Date().toISOString(),
    });
  },

  accessDenied: (userId: string, resource: string, ip: string) => {
    securityLogger.warn('Acceso denegado', {
      event: 'ACCESS_DENIED',
      userId,
      resource,
      ip,
      timestamp: new Date().toISOString(),
    });
  },

  rateLimitExceeded: (ip: string, endpoint: string) => {
    securityLogger.warn('Rate limit excedido', {
      event: 'RATE_LIMIT_EXCEEDED',
      ip,
      endpoint,
      timestamp: new Date().toISOString(),
    });
  },

  suspiciousActivity: (details: Record<string, unknown>) => {
    securityLogger.error('Actividad sospechosa detectada', {
      event: 'SUSPICIOUS_ACTIVITY',
      ...details,
      timestamp: new Date().toISOString(),
    });
  },

  passwordChanged: (userId: string, changedBy: string, ip: string) => {
    securityLogger.info('Contraseña cambiada', {
      event: 'PASSWORD_CHANGED',
      userId,
      changedBy,
      ip,
      timestamp: new Date().toISOString(),
    });
  },

  userCreated: (userId: string, createdBy: string, ip: string) => {
    securityLogger.info('Usuario creado', {
      event: 'USER_CREATED',
      userId,
      createdBy,
      ip,
      timestamp: new Date().toISOString(),
    });
  },

  userDeactivated: (userId: string, deactivatedBy: string, ip: string) => {
    securityLogger.warn('Usuario desactivado', {
      event: 'USER_DEACTIVATED',
      userId,
      deactivatedBy,
      ip,
      timestamp: new Date().toISOString(),
    });
  },

  permissionChanged: (userId: string, changedBy: string, oldPerms: string[], newPerms: string[]) => {
    securityLogger.info('Permisos modificados', {
      event: 'PERMISSION_CHANGED',
      userId,
      changedBy,
      oldPerms,
      newPerms,
      timestamp: new Date().toISOString(),
    });
  },
};

// Funciones helper para auditoría de datos
export const auditEvents = {
  dataCreated: (table: string, recordId: string, userId: string, data: Record<string, unknown>) => {
    auditLogger.info('Registro creado', {
      event: 'DATA_CREATED',
      table,
      recordId,
      userId,
      data,
      timestamp: new Date().toISOString(),
    });
  },

  dataUpdated: (table: string, recordId: string, userId: string, changes: Record<string, unknown>) => {
    auditLogger.info('Registro actualizado', {
      event: 'DATA_UPDATED',
      table,
      recordId,
      userId,
      changes,
      timestamp: new Date().toISOString(),
    });
  },

  dataDeleted: (table: string, recordId: string, userId: string) => {
    auditLogger.warn('Registro eliminado', {
      event: 'DATA_DELETED',
      table,
      recordId,
      userId,
      timestamp: new Date().toISOString(),
    });
  },

  dataExported: (table: string, userId: string, recordCount: number) => {
    auditLogger.info('Datos exportados', {
      event: 'DATA_EXPORTED',
      table,
      userId,
      recordCount,
      timestamp: new Date().toISOString(),
    });
  },
};

export default logger;
