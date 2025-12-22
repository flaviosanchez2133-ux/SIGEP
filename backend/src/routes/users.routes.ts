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

const router = Router();

// Todas las rutas requieren autenticación y ser superadmin
router.use(authMiddleware);
router.use(requireSuperAdmin);

router.get('/', listUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/password', changePassword);

export default router;
