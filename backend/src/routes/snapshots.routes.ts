import { Router } from 'express';
import {
  listSnapshots,
  getSnapshot,
  createSnapshot,
  compareSnapshots,
  deleteSnapshot,
} from '../controllers/snapshots.controller.js';
import { authMiddleware, requireSuperAdmin } from '../middleware/auth.js';

const router = Router();

router.use(authMiddleware);
router.use(requireSuperAdmin);

router.get('/', listSnapshots);
router.get('/:anio/:mes', getSnapshot);
router.post('/', createSnapshot);
router.get('/comparar/:id1/:id2', compareSnapshots);
router.delete('/:id', deleteSnapshot);

export default router;
