import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database.js';
import { AppError } from '../middleware/error.js';
import { getSocketIO } from '../sockets/index.js';

// Esquemas de validación
const updateDatosSchema = z.object({
  datos: z.array(
    z.object({
      filaId: z.string(),
      label: z.string(),
      periodoAnterior: z.number(),
      periodoActual: z.number(),
    })
  ),
});

// Listar departamentos
export async function listDepartamentos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const departamentos = await prisma.departamento.findMany({
      where: { activo: true },
      orderBy: { orden: 'asc' },
      include: {
        _count: { select: { tablas: true } },
      },
    });

    res.json(departamentos.map(d => ({
      id: d.id,
      codigo: d.codigo,
      nombre: d.nombre,
      color: d.color,
      tablasCount: d._count.tablas,
    })));
  } catch (error) {
    next(error);
  }
}

// Listar tablas de un departamento
export async function listTablas(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { departamentoId } = req.params;

    const tablas = await prisma.tablaConfig.findMany({
      where: { 
        departamentoId,
        activo: true,
      },
      orderBy: { orden: 'asc' },
    });

    res.json(tablas.map(t => ({
      id: t.id,
      tablaId: t.tablaId,
      nombre: t.nombre,
    })));
  } catch (error) {
    next(error);
  }
}

// Obtener datos de una tabla
export async function getDatosTabla(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { tablaId } = req.params;

    const tabla = await prisma.tablaConfig.findUnique({
      where: { tablaId },
      include: {
        departamento: true,
        datos: {
          orderBy: { orden: 'asc' },
        },
      },
    });

    if (!tabla) {
      throw new AppError('Tabla no encontrada', 404);
    }

    res.json({
      tablaId: tabla.tablaId,
      nombre: tabla.nombre,
      departamento: tabla.departamento.nombre,
      datos: tabla.datos.map(d => ({
        id: d.filaId,
        label: d.label,
        periodoAnterior: Number(d.periodoAnterior),
        periodoActual: Number(d.periodoActual),
        editable: d.editable,
      })),
    });
  } catch (error) {
    next(error);
  }
}

// Actualizar datos de una tabla
export async function updateDatosTabla(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { tablaId } = req.params;
    const { datos } = updateDatosSchema.parse(req.body);

    if (!req.user) {
      throw new AppError('No autenticado', 401);
    }

    // Obtener tabla
    const tabla = await prisma.tablaConfig.findUnique({
      where: { tablaId },
      include: { 
        datos: true,
        departamento: true,
      },
    });

    if (!tabla) {
      throw new AppError('Tabla no encontrada', 404);
    }

    // Verificar permisos
    const tienePermiso = req.user.permisos.includes('all') || 
                         req.user.permisos.includes('write') ||
                         req.user.permisos.includes(tabla.departamento.codigo);
    
    if (!tienePermiso) {
      throw new AppError('No tienes permisos para editar esta tabla', 403);
    }

    // Verificar si la edición está habilitada
    const config = await prisma.configGlobal.findFirst();
    if (!config?.edicionHabilitada && !req.user.permisos.includes('all')) {
      throw new AppError('La edición no está habilitada', 403);
    }

    // Procesar cada dato y crear historial
    const cambios: any[] = [];

    for (const dato of datos) {
      const datoExistente = tabla.datos.find(d => d.filaId === dato.filaId);
      
      if (datoExistente) {
        // Verificar si hay cambios
        const anteriorChanged = Number(datoExistente.periodoAnterior) !== dato.periodoAnterior;
        const actualChanged = Number(datoExistente.periodoActual) !== dato.periodoActual;

        if (anteriorChanged) {
          cambios.push({
            usuarioId: req.user.userId,
            tablaConfigId: tabla.id,
            filaId: dato.filaId,
            filaLabel: dato.label,
            campo: 'PERIODO_ANTERIOR',
            valorAnterior: datoExistente.periodoAnterior,
            valorNuevo: dato.periodoAnterior,
          });
        }

        if (actualChanged) {
          cambios.push({
            usuarioId: req.user.userId,
            tablaConfigId: tabla.id,
            filaId: dato.filaId,
            filaLabel: dato.label,
            campo: 'PERIODO_ACTUAL',
            valorAnterior: datoExistente.periodoActual,
            valorNuevo: dato.periodoActual,
          });
        }

        // Actualizar dato
        await prisma.datoComparativo.update({
          where: { id: datoExistente.id },
          data: {
            periodoAnterior: dato.periodoAnterior,
            periodoActual: dato.periodoActual,
          },
        });
      }
    }

    // Guardar historial
    if (cambios.length > 0) {
      await prisma.historialCambio.createMany({ data: cambios });
    }

    // Obtener datos actualizados
    const tablaActualizada = await prisma.tablaConfig.findUnique({
      where: { tablaId },
      include: { datos: { orderBy: { orden: 'asc' } } },
    });

    // Emitir evento WebSocket
    const io = getSocketIO();
    io.emit('datos:actualizado', {
      tablaId,
      departamento: tabla.departamento.codigo,
      datos: tablaActualizada?.datos.map(d => ({
        id: d.filaId,
        label: d.label,
        periodoAnterior: Number(d.periodoAnterior),
        periodoActual: Number(d.periodoActual),
        editable: d.editable,
      })),
      usuario: req.user.username,
      timestamp: new Date().toISOString(),
    });

    res.json({
      message: 'Datos actualizados correctamente',
      cambios: cambios.length,
    });
  } catch (error) {
    next(error);
  }
}

// Obtener todos los datos (para el frontend)
export async function getAllDatos(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const tablas = await prisma.tablaConfig.findMany({
      where: { activo: true },
      include: {
        datos: { orderBy: { orden: 'asc' } },
        departamento: true,
      },
    });

    const resultado: Record<string, any[]> = {};

    tablas.forEach(tabla => {
      resultado[tabla.tablaId] = tabla.datos.map(d => ({
        id: d.filaId,
        label: d.label,
        periodoAnterior: Number(d.periodoAnterior),
        periodoActual: Number(d.periodoActual),
        editable: d.editable,
      }));
    });

    res.json(resultado);
  } catch (error) {
    next(error);
  }
}
