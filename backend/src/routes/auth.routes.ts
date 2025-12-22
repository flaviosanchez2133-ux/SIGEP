import { Router } from 'express';
import { login, logout, refresh, me } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Rutas públicas
router.post('/login', login);
router.post('/refresh', refresh);

// Rutas protegidas
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, me);

export default router;
