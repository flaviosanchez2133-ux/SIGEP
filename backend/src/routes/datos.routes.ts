import { Router } from 'express';
import {
  listDepartamentos,
  listTablas,
  getDatosTabla,
  updateDatosTabla,
  getAllDatos,
} from '../controllers/datos.controller.js';
import { authMiddleware, requirePermission } from '../middleware/auth.js';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Departamentos
router.get('/departamentos', listDepartamentos);
router.get('/departamentos/:departamentoId/tablas', listTablas);

// Datos
router.get('/all', getAllDatos);
router.get('/tablas/:tablaId', getDatosTabla);
router.put(
  '/tablas/:tablaId',
  requirePermission('write', 'all'),
  updateDatosTabla
);

export default router;
