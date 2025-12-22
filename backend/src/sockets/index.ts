import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { verifyAccessToken } from '../utils/jwt.js';
import { redisCache } from '../config/redis.js';
import { config } from '../config/index.js';

let io: Server;

// Tipos para eventos
interface ServerToClientEvents {
  'datos:actualizado': (data: {
    tablaId: string;
    departamento?: string;
    datos?: any[];
    usuario: string;
    timestamp: string;
    revertido?: boolean;
  }) => void;
  'edicion:toggle': (data: {
    habilitada: boolean;
    usuario: string;
    timestamp: string;
  }) => void;
  'usuario:conectado': (data: {
    usuario: string;
    departamento?: string;
    timestamp: string;
  }) => void;
  'usuario:desconectado': (data: {
    usuario: string;
    timestamp: string;
  }) => void;
  'config:periodo': (data: {
    periodo: any;
    timestamp: string;
  }) => void;
  'error': (data: { message: string }) => void;
}

interface ClientToServerEvents {
  'join:departamento': (departamento: string) => void;
  'leave:departamento': (departamento: string) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  userId: string;
  username: string;
  departamento?: string;
}

// Inicializar Socket.IO
export function initializeSocketIO(httpServer: HttpServer): Server {
  io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
    httpServer,
    {
      cors: {
        origin: config.corsOrigin,
        methods: ['GET', 'POST'],
        credentials: true,
      },
      pingTimeout: 60000,
      pingInterval: 25000,
    }
  );

  // Middleware de autenticación
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.split(' ')[1];

      if (!token) {
        return next(new Error('Token no proporcionado'));
      }

      // Verificar si está en blacklist
      const isBlacklisted = await redisCache.isTokenBlacklisted(token);
      if (isBlacklisted) {
        return next(new Error('Token inválido'));
      }

      // Verificar token
      const payload = verifyAccessToken(token);

      // Guardar datos en el socket
      socket.data.userId = payload.userId;
      socket.data.username = payload.username;

      next();
    } catch (error) {
      next(new Error('Token inválido o expirado'));
    }
  });

  // Manejar conexiones
  io.on('connection', (socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
    console.log(`🔌 Usuario conectado: ${socket.data.username} (${socket.id})`);

    // Unirse a room general
    socket.join('general');

    // Notificar a otros usuarios
    socket.broadcast.emit('usuario:conectado', {
      usuario: socket.data.username,
      departamento: socket.data.departamento,
      timestamp: new Date().toISOString(),
    });

    // Unirse a room de departamento
    socket.on('join:departamento', (departamento: string) => {
      socket.data.departamento = departamento;
      socket.join(`departamento:${departamento}`);
      console.log(`📁 ${socket.data.username} se unió a departamento: ${departamento}`);
    });

    // Salir de room de departamento
    socket.on('leave:departamento', (departamento: string) => {
      socket.leave(`departamento:${departamento}`);
      console.log(`📁 ${socket.data.username} salió de departamento: ${departamento}`);
    });

    // Desconexión
    socket.on('disconnect', (reason) => {
      console.log(`🔌 Usuario desconectado: ${socket.data.username} (${reason})`);

      socket.broadcast.emit('usuario:desconectado', {
        usuario: socket.data.username,
        timestamp: new Date().toISOString(),
      });
    });

    // Manejo de errores
    socket.on('error', (error) => {
      console.error(`❌ Error en socket ${socket.id}:`, error);
      socket.emit('error', { message: error.message });
    });
  });

  console.log('✅ Socket.IO inicializado');

  return io;
}

// Obtener instancia de Socket.IO
export function getSocketIO(): Server {
  if (!io) {
    throw new Error('Socket.IO no ha sido inicializado');
  }
  return io;
}

// Emitir a un departamento específico
export function emitToDepartamento(departamento: string, event: string, data: any): void {
  if (io) {
    io.to(`departamento:${departamento}`).emit(event as any, data);
  }
}

// Emitir a todos
export function emitToAll(event: string, data: any): void {
  if (io) {
    io.emit(event as any, data);
  }
}
