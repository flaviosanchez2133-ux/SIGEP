import { Router } from 'express';
import {
  listHistorial,
  revertirCambio,
  limpiarHistorial,
} from '../controllers/historial.controller.js';
import {
  authMiddleware,
  requireSuperAdmin,
  requirePermission,
} from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/', requirePermission('read', 'all'), listHistorial);
router.post('/:id/revertir', requireSuperAdmin, revertirCambio);
router.delete('/', requireSuperAdmin, limpiarHistorial);

export default router;
