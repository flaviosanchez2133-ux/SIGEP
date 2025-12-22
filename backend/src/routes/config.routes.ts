import { Router } from 'express';
import { getConfig, toggleEdicion, updatePeriodo } from '../controllers/config.controller.js';
import { authMiddleware, requireSuperAdmin } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);

router.get('/', getConfig);
router.post('/edicion/toggle', requireSuperAdmin, toggleEdicion);
router.put('/periodo', requireSuperAdmin, updatePeriodo);

export default router;
