import { Router } from 'express';
import authRoutes from './auth.routes.js';
import usersRoutes from './users.routes.js';
import datosRoutes from './datos.routes.js';
import historialRoutes from './historial.routes.js';
import snapshotsRoutes from './snapshots.routes.js';
import configRoutes from './config.routes.js';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rutas de la API
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/datos', datosRoutes);
router.use('/historial', historialRoutes);
router.use('/snapshots', snapshotsRoutes);
router.use('/config', configRoutes);

export default router;
