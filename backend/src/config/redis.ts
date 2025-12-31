import Redis from 'ioredis';
import { config } from './index.js';

// Cliente Redis
export const redis = new Redis(config.redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    if (times > 3) {
      console.error('❌ No se pudo conectar a Redis después de 3 intentos');
      return null;
    }
    return Math.min(times * 200, 1000);
  },
});

// Eventos de conexión
redis.on('connect', () => {
  console.log('✅ Conectado a Redis');
});

redis.on('error', (error) => {
  console.error('❌ Error de Redis:', error.message);
});

redis.on('close', () => {
  console.log('🔌 Desconectado de Redis');
});

// Funciones de utilidad para caché
export const redisCache = {
  // Guardar con expiración
  async set(key: string, value: unknown, expiresInSeconds?: number): Promise<void> {
    const data = JSON.stringify(value);
    if (expiresInSeconds) {
      await redis.setex(key, expiresInSeconds, data);
    } else {
      await redis.set(key, data);
    }
  },

  // Obtener
  async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  },

  // Eliminar
  async del(key: string): Promise<void> {
    await redis.del(key);
  },

  // Eliminar por patrón
  async delPattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  },

  // Verificar existencia
  async exists(key: string): Promise<boolean> {
    const result = await redis.exists(key);
    return result === 1;
  },

  // Guardar token de refresh
  async setRefreshToken(userId: string, token: string, expiresInSeconds: number): Promise<void> {
    await redis.setex(`refresh:${userId}:${token}`, expiresInSeconds, 'valid');
  },

  // Verificar token de refresh
  async isRefreshTokenValid(userId: string, token: string): Promise<boolean> {
    const result = await redis.get(`refresh:${userId}:${token}`);
    return result === 'valid';
  },

  // Invalidar token de refresh
  async invalidateRefreshToken(userId: string, token: string): Promise<void> {
    await redis.del(`refresh:${userId}:${token}`);
  },

  // Invalidar todos los tokens de un usuario
  async invalidateAllUserTokens(userId: string): Promise<void> {
    const keys = await redis.keys(`refresh:${userId}:*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  },

  // Guardar en lista de tokens inválidos (blacklist)
  async blacklistToken(token: string, expiresInSeconds: number): Promise<void> {
    await redis.setex(`blacklist:${token}`, expiresInSeconds, 'invalid');
  },

  // Verificar si token está en blacklist
  async isTokenBlacklisted(token: string): Promise<boolean> {
    const result = await redis.get(`blacklist:${token}`);
    return result === 'invalid';
  },

  // Obtener número de sesiones activas (basado en refresh tokens)
  async getActiveSessionsCount(userId: string): Promise<number> {
    const keys = await redis.keys(`refresh:${userId}:*`);
    return keys.length;
  },
};
