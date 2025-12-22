import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database.js';
import { AppError } from '../middleware/error.js';
import { getSocketIO } from '../sockets/index.js';

// Listar historial
export async function listHistorial(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { departamento, mes, anio, tablaId, limit = '100' } = req.query;

    const where: any = {};

    if (tablaId) {
      const tabla = await prisma.tablaConfig.findUnique({ where: { tablaId: tablaId as string } });
      if (tabla) where.tablaConfigId = tabla.id;
    }

    if (mes && anio) {
      const mesNum = parseInt(mes as string, 10);
      const anioNum = parseInt(anio as string, 10);
      
      const inicio = new Date(anioNum, mesNum - 1, 1);
      const fin = new Date(anioNum, mesNum, 0, 23, 59, 59);
      
      where.timestamp = { gte: inicio, lte: fin };
    }

    const historial = await prisma.historialCambio.findMany({
      where,
      include: {
        usuario: { select: { id: true, nombre: true, username: true } },
        tablaConfig: { 
          select: { tablaId: true, nombre: true },
          include: { departamento: { select: { codigo: true, nombre: true } } },
        },
      },
      orderBy: { timestamp: 'desc' },
      take: parseInt(limit as string, 10),
    });

    // Filtrar por departamento si se especifica
    let resultado = historial;
    if (departamento) {
      resultado = historial.filter(h => 
        h.tablaConfig.departamento.codigo === departamento ||
        h.tablaConfig.departamento.nombre === departamento
      );
    }

    res.json(resultado.map(h => ({
      id: h.id,
      timestamp: h.timestamp.toISOString(),
      usuario: h.usuario.nombre,
      usuarioId: h.usuario.id,
      departamento: h.tablaConfig.departamento.nombre,
      tabla: h.tablaConfig.nombre,
      tablaId: h.tablaConfig.tablaId,
      filaId: h.filaId,
      filaLabel: h.filaLabel,
      campo: h.campo === 'PERIODO_ANTERIOR' ? 'periodoAnterior' : 'periodoActual',
      valorAnterior: Number(h.valorAnterior),
      valorNuevo: Number(h.valorNuevo),
    })));
  } catch (error) {
    next(error);
  }
}

// Revertir cambio
export async function revertirCambio(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    if (!req.user) {
      throw new AppError('No autenticado', 401);
    }

    const cambio = await prisma.historialCambio.findUnique({
      where: { id },
      include: { tablaConfig: true },
    });

    if (!cambio) {
      throw new AppError('Cambio no encontrado', 404);
    }

    // Revertir el valor
    const dato = await prisma.datoComparativo.findFirst({
      where: {
        tablaConfigId: cambio.tablaConfigId,
        filaId: cambio.filaId,
      },
    });

    if (dato) {
      const campo = cambio.campo === 'PERIODO_ANTERIOR' ? 'periodoAnterior' : 'periodoActual';
      
      await prisma.datoComparativo.update({
        where: { id: dato.id },
        data: { [campo]: cambio.valorAnterior },
      });

      // Crear registro de reversión
      await prisma.historialCambio.create({
        data: {
          usuarioId: req.user.userId,
          tablaConfigId: cambio.tablaConfigId,
          filaId: cambio.filaId,
          filaLabel: `[REVERTIDO] ${cambio.filaLabel}`,
          campo: cambio.campo,
          valorAnterior: cambio.valorNuevo,
          valorNuevo: cambio.valorAnterior,
        },
      });

      // Emitir evento WebSocket
      const io = getSocketIO();
      io.emit('datos:actualizado', {
        tablaId: cambio.tablaConfig.tablaId,
        revertido: true,
        usuario: req.user.username,
        timestamp: new Date().toISOString(),
      });
    }

    res.json({ message: 'Cambio revertido correctamente' });
  } catch (error) {
    next(error);
  }
}

// Limpiar historial (solo superadmin)
export async function limpiarHistorial(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await prisma.historialCambio.deleteMany({});
    res.json({ message: 'Historial limpiado correctamente' });
  } catch (error) {
    next(error);
  }
}
