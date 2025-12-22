import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database.js';
import { getSocketIO } from '../sockets/index.js';

// Obtener configuración global
export async function getConfig(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let config = await prisma.configGlobal.findFirst();

    if (!config) {
      config = await prisma.configGlobal.create({
        data: { edicionHabilitada: false },
      });
    }

    const periodo = await prisma.configPeriodo.findFirst({
      where: { activo: true },
    });

    res.json({
      edicionHabilitada: config.edicionHabilitada,
      periodo: periodo ? {
        anterior: {
          inicio: periodo.anteriorInicio,
          fin: periodo.anteriorFin,
          label: periodo.anteriorLabel,
        },
        actual: {
          inicio: periodo.actualInicio,
          fin: periodo.actualFin,
          label: periodo.actualLabel,
        },
      } : null,
    });
  } catch (error) {
    next(error);
  }
}

// Toggle edición
export async function toggleEdicion(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'No autenticado' });
      return;
    }

    let config = await prisma.configGlobal.findFirst();

    if (!config) {
      config = await prisma.configGlobal.create({
        data: { edicionHabilitada: true, updatedBy: req.user.userId },
      });
    } else {
      config = await prisma.configGlobal.update({
        where: { id: config.id },
        data: { 
          edicionHabilitada: !config.edicionHabilitada,
          updatedBy: req.user.userId,
        },
      });
    }

    // Emitir evento WebSocket
    const io = getSocketIO();
    io.emit('edicion:toggle', {
      habilitada: config.edicionHabilitada,
      usuario: req.user.username,
      timestamp: new Date().toISOString(),
    });

    res.json({
      edicionHabilitada: config.edicionHabilitada,
      message: `Edición ${config.edicionHabilitada ? 'habilitada' : 'deshabilitada'}`,
    });
  } catch (error) {
    next(error);
  }
}

// Actualizar período
const updatePeriodoSchema = z.object({
  anterior: z.object({
    inicio: z.string(),
    fin: z.string(),
    label: z.string(),
  }),
  actual: z.object({
    inicio: z.string(),
    fin: z.string(),
    label: z.string(),
  }),
});

export async function updatePeriodo(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = updatePeriodoSchema.parse(req.body);

    // Desactivar períodos anteriores
    await prisma.configPeriodo.updateMany({
      where: { activo: true },
      data: { activo: false },
    });

    // Crear nuevo período
    const periodo = await prisma.configPeriodo.create({
      data: {
        anteriorInicio: new Date(data.anterior.inicio),
        anteriorFin: new Date(data.anterior.fin),
        anteriorLabel: data.anterior.label,
        actualInicio: new Date(data.actual.inicio),
        actualFin: new Date(data.actual.fin),
        actualLabel: data.actual.label,
        activo: true,
      },
    });

    // Emitir evento WebSocket
    const io = getSocketIO();
    io.emit('config:periodo', {
      periodo: {
        anterior: { inicio: periodo.anteriorInicio, fin: periodo.anteriorFin, label: periodo.anteriorLabel },
        actual: { inicio: periodo.actualInicio, fin: periodo.actualFin, label: periodo.actualLabel },
      },
      timestamp: new Date().toISOString(),
    });

    res.json({
      message: 'Período actualizado correctamente',
      periodo,
    });
  } catch (error) {
    next(error);
  }
}
