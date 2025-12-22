import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';
import { AppError } from '../middleware/error.js';

// Listar snapshots
export async function listSnapshots(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const snapshots = await prisma.snapshot.findMany({
      include: {
        creadoPor: { select: { nombre: true } },
      },
      orderBy: [{ anio: 'desc' }, { mes: 'desc' }],
    });

    res.json(
      snapshots.map(s => ({
        id: s.id,
        mes: s.mes,
        año: s.anio,
        fechaCreacion: s.fechaCreacion.toISOString(),
        creadoPor: s.creadoPor.nombre,
        tablasCount: Object.keys(s.datos as object).length,
      }))
    );
  } catch (error) {
    next(error);
  }
}

// Obtener snapshot
export async function getSnapshot(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { anio, mes } = req.params;

    const snapshot = await prisma.snapshot.findUnique({
      where: {
        mes_anio: {
          mes: parseInt(mes, 10),
          anio: parseInt(anio, 10),
        },
      },
      include: {
        creadoPor: { select: { nombre: true } },
      },
    });

    if (!snapshot) {
      throw new AppError('Snapshot no encontrado', 404);
    }

    res.json({
      id: snapshot.id,
      mes: snapshot.mes,
      año: snapshot.anio,
      fechaCreacion: snapshot.fechaCreacion.toISOString(),
      creadoPor: snapshot.creadoPor.nombre,
      datos: snapshot.datos,
    });
  } catch (error) {
    next(error);
  }
}

// Crear snapshot
export async function createSnapshot(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (!req.user) {
      throw new AppError('No autenticado', 401);
    }

    const now = new Date();
    const mes = now.getMonth() + 1;
    const anio = now.getFullYear();

    // Obtener todos los datos actuales
    const tablas = await prisma.tablaConfig.findMany({
      include: { datos: true },
    });

    const datos: Record<string, any[]> = {};
    tablas.forEach(tabla => {
      datos[tabla.tablaId] = tabla.datos.map(d => ({
        id: d.filaId,
        label: d.label,
        periodoAnterior: Number(d.periodoAnterior),
        periodoActual: Number(d.periodoActual),
      }));
    });

    // Crear o actualizar snapshot
    const snapshot = await prisma.snapshot.upsert({
      where: {
        mes_anio: { mes, anio },
      },
      update: {
        datos,
        creadoPorId: req.user.userId,
        fechaCreacion: now,
      },
      create: {
        mes,
        anio,
        datos,
        creadoPorId: req.user.userId,
      },
      include: {
        creadoPor: { select: { nombre: true } },
      },
    });

    res.status(201).json({
      id: snapshot.id,
      mes: snapshot.mes,
      año: snapshot.anio,
      fechaCreacion: snapshot.fechaCreacion.toISOString(),
      creadoPor: snapshot.creadoPor.nombre,
      message: 'Snapshot creado correctamente',
    });
  } catch (error) {
    next(error);
  }
}

// Comparar snapshots
export async function compareSnapshots(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id1, id2 } = req.params;

    const [snapshot1, snapshot2] = await Promise.all([
      prisma.snapshot.findUnique({ where: { id: id1 } }),
      prisma.snapshot.findUnique({ where: { id: id2 } }),
    ]);

    if (!snapshot1 || !snapshot2) {
      throw new AppError('Uno o ambos snapshots no encontrados', 404);
    }

    const datos1 = snapshot1.datos as Record<string, any[]>;
    const datos2 = snapshot2.datos as Record<string, any[]>;

    const diferencias: Array<{
      tabla: string;
      diferencias: Array<{
        fila: string;
        campo: string;
        valor1: number;
        valor2: number;
      }>;
    }> = [];

    // Obtener nombres de tablas
    const tablasConfig = await prisma.tablaConfig.findMany();
    const tablasMap = new Map(tablasConfig.map(t => [t.tablaId, t.nombre]));

    // Comparar cada tabla
    const allTablaIds = new Set([
      ...Object.keys(datos1),
      ...Object.keys(datos2),
    ]);

    for (const tablaId of allTablaIds) {
      const filas1 = datos1[tablaId] || [];
      const filas2 = datos2[tablaId] || [];

      const tablaDiferencias: Array<{
        fila: string;
        campo: string;
        valor1: number;
        valor2: number;
      }> = [];

      // Crear map de filas
      const filas1Map = new Map(filas1.map((f: any) => [f.id, f]));
      const filas2Map = new Map(filas2.map((f: any) => [f.id, f]));

      const allFilaIds = new Set([
        ...filas1.map((f: any) => f.id),
        ...filas2.map((f: any) => f.id),
      ]);

      for (const filaId of allFilaIds) {
        const fila1 = filas1Map.get(filaId) as any;
        const fila2 = filas2Map.get(filaId) as any;

        if (fila1 && fila2) {
          if (fila1.periodoAnterior !== fila2.periodoAnterior) {
            tablaDiferencias.push({
              fila: fila1.label,
              campo: 'Período Anterior',
              valor1: fila1.periodoAnterior,
              valor2: fila2.periodoAnterior,
            });
          }
          if (fila1.periodoActual !== fila2.periodoActual) {
            tablaDiferencias.push({
              fila: fila1.label,
              campo: 'Período Actual',
              valor1: fila1.periodoActual,
              valor2: fila2.periodoActual,
            });
          }
        }
      }

      if (tablaDiferencias.length > 0) {
        diferencias.push({
          tabla: tablasMap.get(tablaId) || tablaId,
          diferencias: tablaDiferencias,
        });
      }
    }

    res.json(diferencias);
  } catch (error) {
    next(error);
  }
}

// Eliminar snapshot
export async function deleteSnapshot(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    await prisma.snapshot.delete({ where: { id } });

    res.json({ message: 'Snapshot eliminado correctamente' });
  } catch (error) {
    next(error);
  }
}
