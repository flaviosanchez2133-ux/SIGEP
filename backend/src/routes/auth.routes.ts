import { Router } from 'express';
import { login, logout, refresh, me } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.js';
import { loginLimiter, refreshLimiter } from '../middleware/rate-limit.js';

const router = Router();

// Rutas públicas (con rate limiting)
router.post('/login', loginLimiter, login);
router.post('/refresh', refreshLimiter, refresh);

// Rutas protegidas
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, me);

export default router;
