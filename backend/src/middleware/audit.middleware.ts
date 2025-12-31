import { Request, Response, NextFunction } from 'express';
import { auditEvents } from '../utils/logger.js';

// Middleware para auditar cambios en datos (POST, PUT, DELETE, PATCH)
export function auditLog(tableName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Interceptar la respuesta para loguear si fue exitosa
    const originalJson = res.json;
    
    // Sobreescribir res.json para capturar la respuesta
    res.json = function (body) {
      res.json = originalJson; // Restaurar función original
      
      // Solo auditar si la respuesta fue exitosa (2xx)
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        const method = req.method;
        const userId = req.user.userId;
        const resourceId = req.params.id || body.id || 'unknown';
        
// Función auxiliar para sanitizar datos sensibles
function sanitizeData(data: any): any {
  if (!data) return data;
  if (typeof data !== 'object') return data;
  
  const sanitized = { ...data };
  const sensitiveFields = ['password', 'token', 'refreshToken', 'secret', 'creditCard'];
  
  for (const key of Object.keys(sanitized)) {
    if (sensitiveFields.some(field => key.toLowerCase().includes(field))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof sanitized[key] === 'object') {
      sanitized[key] = sanitizeData(sanitized[key]);
    }
  }
  
  return sanitized;
}

        switch (method) {
          case 'POST':
            auditEvents.dataCreated(tableName, resourceId, userId, sanitizeData(req.body));
            break;
          case 'PUT':
          case 'PATCH':
            auditEvents.dataUpdated(tableName, resourceId, userId, {
              changes: sanitizeData(req.body),
            });
            break;
          case 'DELETE':
            auditEvents.dataDeleted(tableName, resourceId, userId);
            break;
        }
      }
      
      return res.json(body);
    };
    
    next();
  };
}

// Middleware para auditar exportaciones
export function auditExport(tableName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Similar interception logic
    const originalJson = res.json;
    
    res.json = function (body) {
      res.json = originalJson;
      
      if (res.statusCode >= 200 && res.statusCode < 300 && req.user) {
        const count = Array.isArray(body) ? body.length : 1;
        auditEvents.dataExported(tableName, req.user.userId, count);
      }
      
      return res.json(body);
    };
    
    next();
  };
}
