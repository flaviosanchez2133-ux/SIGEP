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
export async function listDepartamentos(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const departamentos = await prisma.departamento.findMany({
      where: { activo: true },
      orderBy: { orden: 'asc' },
      include: {
        _count: { select: { tablas: true } },
      },
    });

    res.json(
      departamentos.map(d => ({
        id: d.id,
        codigo: d.codigo,
        nombre: d.nombre,
        color: d.color,
        tablasCount: d._count.tablas,
      }))
    );
  } catch (error) {
    next(error);
  }
}

// Listar tablas de un departamento
export async function listTablas(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { departamentoId } = req.params;

    const tablas = await prisma.tablaConfig.findMany({
      where: {
        departamentoId,
        activo: true,
      },
      orderBy: { orden: 'asc' },
    });

    res.json(
      tablas.map(t => ({
        id: t.id,
        tablaId: t.tablaId,
        nombre: t.nombre,
      }))
    );
  } catch (error) {
    next(error);
  }
}

// Obtener datos de una tabla
export async function getDatosTabla(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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
export async function updateDatosTabla(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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
    const tienePermiso =
      req.user.permisos.includes('all') ||
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
        const anteriorChanged =
          Number(datoExistente.periodoAnterior) !== dato.periodoAnterior;
        const actualChanged =
          Number(datoExistente.periodoActual) !== dato.periodoActual;

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
export async function getAllDatos(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
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

// Comparar datos de dos períodos diferentes usando snapshots
export async function getDatosComparar(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const {
      periodoAnteriorInicio,
      periodoAnteriorFin,
      periodoActualInicio,
      periodoActualFin,
      tablaId,
    } = req.query;

    // Validar parámetros
    if (
      !periodoAnteriorInicio ||
      !periodoAnteriorFin ||
      !periodoActualInicio ||
      !periodoActualFin
    ) {
      throw new AppError('Se requieren los parámetros de período', 400);
    }

    // Extraer mes y año de las fechas
    const anteriorDate = new Date(periodoAnteriorInicio as string);
    const actualDate = new Date(periodoActualInicio as string);

    const mesAnterior = anteriorDate.getMonth() + 1;
    const anioAnterior = anteriorDate.getFullYear();
    const mesActual = actualDate.getMonth() + 1;
    const anioActual = actualDate.getFullYear();

    // Buscar snapshots para los períodos
    const snapshotAnterior = await prisma.snapshot.findFirst({
      where: {
        mes: mesAnterior,
        anio: anioAnterior,
      },
      orderBy: { fechaCreacion: 'desc' },
    });

    const snapshotActual = await prisma.snapshot.findFirst({
      where: {
        mes: mesActual,
        anio: anioActual,
      },
      orderBy: { fechaCreacion: 'desc' },
    });

    // Si no hay snapshots, usar datos actuales
    let datosAnterior: Record<string, any[]> = {};
    let datosActual: Record<string, any[]> = {};

    if (snapshotAnterior) {
      datosAnterior = snapshotAnterior.datos as Record<string, any[]>;
    }

    if (snapshotActual) {
      datosActual = snapshotActual.datos as Record<string, any[]>;
    }

    // Si no hay snapshots, usar datos actuales de la BD
    if (!snapshotAnterior || !snapshotActual) {
      const tablas = await prisma.tablaConfig.findMany({
        where: { activo: true },
        include: {
          datos: { orderBy: { orden: 'asc' } },
        },
      });

      tablas.forEach(tabla => {
        const datosMapeados = tabla.datos.map(d => ({
          id: d.filaId,
          label: d.label,
          periodoAnterior: Number(d.periodoAnterior),
          periodoActual: Number(d.periodoActual),
          editable: d.editable,
        }));

        if (!snapshotAnterior) {
          datosAnterior[tabla.tablaId] = datosMapeados;
        }
        if (!snapshotActual) {
          datosActual[tabla.tablaId] = datosMapeados;
        }
      });
    }

    // Si se especifica una tabla, filtrar solo esa
    if (tablaId) {
      res.json({
        tablaId,
        periodoAnterior: {
          inicio: periodoAnteriorInicio,
          fin: periodoAnteriorFin,
          datos: datosAnterior[tablaId as string] || [],
          tieneSnapshot: !!snapshotAnterior,
        },
        periodoActual: {
          inicio: periodoActualInicio,
          fin: periodoActualFin,
          datos: datosActual[tablaId as string] || [],
          tieneSnapshot: !!snapshotActual,
        },
      });
      return;
    }

    // Devolver todos los datos comparados
    res.json({
      periodoAnterior: {
        inicio: periodoAnteriorInicio,
        fin: periodoAnteriorFin,
        mes: mesAnterior,
        anio: anioAnterior,
        tieneSnapshot: !!snapshotAnterior,
        datos: datosAnterior,
      },
      periodoActual: {
        inicio: periodoActualInicio,
        fin: periodoActualFin,
        mes: mesActual,
        anio: anioActual,
        tieneSnapshot: !!snapshotActual,
        datos: datosActual,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Listar snapshots disponibles
export async function listSnapshots(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const snapshots = await prisma.snapshot.findMany({
      orderBy: [{ anio: 'desc' }, { mes: 'desc' }],
      select: {
        id: true,
        mes: true,
        anio: true,
        fechaCreacion: true,
        creadoPor: {
          select: { nombre: true },
        },
      },
    });

    res.json(
      snapshots.map(s => ({
        id: s.id,
        mes: s.mes,
        anio: s.anio,
        label: `${s.mes.toString().padStart(2, '0')}/${s.anio}`,
        fechaCreacion: s.fechaCreacion,
        creadoPor: s.creadoPor.nombre,
      }))
    );
  } catch (error) {
    next(error);
  }
}
