import { Router } from 'express';
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
} from '../controllers/users.controller.js';
import { authMiddleware, requireSuperAdmin } from '../middleware/auth.js';
import { auditLog } from '../middleware/audit.middleware.js';

const router = Router();

// Todas las rutas requieren autenticación y ser superadmin
router.use(authMiddleware);
router.use(requireSuperAdmin);

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', auditLog('usuarios'), createUser);
router.put('/:id', auditLog('usuarios'), updateUser);
router.delete('/:id', auditLog('usuarios'), deleteUser);
router.put('/:id/password', changePassword); // Auditoría handled by securityEvents

export default router;
