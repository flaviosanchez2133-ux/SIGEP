import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';

import { config, validateConfig } from './config/index.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { redis } from './config/redis.js';
import { initializeSocketIO } from './sockets/index.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.js';

// Validar configuración
validateConfig();

// Crear aplicación Express
const app = express();
const httpServer = createServer(app);

// Middlewares de seguridad
app.use(
  helmet({
    contentSecurityPolicy: false, // Desactivar para desarrollo
  })
);

// CORS
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Logging
if (config.isDev) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rutas de la API
app.use('/api', routes);

// Manejadores de errores
app.use(notFoundHandler);
app.use(errorHandler);

// Inicializar Socket.IO
initializeSocketIO(httpServer);

// Iniciar servidor
async function start(): Promise<void> {
  try {
    // Conectar a la base de datos
    await connectDatabase();

    // Verificar conexión a Redis
    await redis.ping();
    console.log('✅ Redis conectado');

    // Iniciar servidor HTTP
    httpServer.listen(config.port, () => {
      console.log(`
🚀 Servidor SIGEP Backend iniciado
📍 URL: http://localhost:${config.port}
🌍 Entorno: ${config.nodeEnv}
📊 API: http://localhost:${config.port}/api
🔌 WebSocket: ws://localhost:${config.port}
      `);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Manejo de cierre graceful
async function shutdown(): Promise<void> {
  console.log('\n🛑 Cerrando servidor...');

  httpServer.close(async () => {
    await disconnectDatabase();
    await redis.quit();
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Iniciar
start();
