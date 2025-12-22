import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../config/database.js';
import { hashPassword } from '../utils/jwt.js';
import { AppError } from '../middleware/error.js';

// Esquemas de validación
const createUserSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6),
  nombre: z.string().min(1).max(100),
  rol: z.enum(['ADMIN', 'EDITOR', 'VIEWER']).default('EDITOR'),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  departamentoId: z.string().uuid().optional(),
  permisos: z.array(z.string()).optional(),
});

const updateUserSchema = z.object({
  nombre: z.string().min(1).max(100).optional(),
  rol: z.enum(['ADMIN', 'EDITOR', 'VIEWER']).optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
  departamentoId: z.string().uuid().nullable().optional(),
  activo: z.boolean().optional(),
  permisos: z.array(z.string()).optional(),
});

const changePasswordSchema = z.object({
  newPassword: z.string().min(6),
});

// Listar usuarios
export async function listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        departamento: true,
        permisos: true,
      },
      orderBy: { nombre: 'asc' },
    });

    res.json(
      usuarios.map(u => ({
        id: u.id,
        username: u.username,
        nombre: u.nombre,
        rol: u.rol,
        color: u.color,
        activo: u.activo,
        departamento: u.departamento?.nombre,
        departamentoId: u.departamentoId,
        permisos: u.permisos.map(p => p.tipo),
        createdAt: u.createdAt,
      }))
    );
  } catch (error) {
    next(error);
  }
}

// Obtener usuario por ID
export async function getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: {
        departamento: true,
        permisos: true,
      },
    });

    if (!usuario) {
      throw new AppError('Usuario no encontrado', 404);
    }

    res.json({
      id: usuario.id,
      username: usuario.username,
      nombre: usuario.nombre,
      rol: usuario.rol,
      color: usuario.color,
      activo: usuario.activo,
      departamento: usuario.departamento?.nombre,
      departamentoId: usuario.departamentoId,
      permisos: usuario.permisos.map(p => p.tipo),
      createdAt: usuario.createdAt,
    });
  } catch (error) {
    next(error);
  }
}

// Crear usuario
export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = createUserSchema.parse(req.body);

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Crear usuario con permisos
    const usuario = await prisma.usuario.create({
      data: {
        username: data.username,
        passwordHash,
        nombre: data.nombre,
        rol: data.rol,
        color: data.color || '#1e3a5f',
        departamentoId: data.departamentoId,
        permisos: data.permisos
          ? {
              create: data.permisos.map(tipo => ({ tipo })),
            }
          : undefined,
      },
      include: {
        departamento: true,
        permisos: true,
      },
    });

    res.status(201).json({
      id: usuario.id,
      username: usuario.username,
      nombre: usuario.nombre,
      rol: usuario.rol,
      color: usuario.color,
      departamento: usuario.departamento?.nombre,
      permisos: usuario.permisos.map(p => p.tipo),
    });
  } catch (error) {
    next(error);
  }
}

// Actualizar usuario
export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const data = updateUserSchema.parse(req.body);

    // Actualizar permisos si se proporcionan
    if (data.permisos) {
      // Eliminar permisos existentes
      await prisma.permiso.deleteMany({ where: { usuarioId: id } });
      
      // Crear nuevos permisos
      await prisma.permiso.createMany({
        data: data.permisos.map(tipo => ({ usuarioId: id, tipo })),
      });
    }

    const usuario = await prisma.usuario.update({
      where: { id },
      data: {
        nombre: data.nombre,
        rol: data.rol,
        color: data.color,
        departamentoId: data.departamentoId,
        activo: data.activo,
      },
      include: {
        departamento: true,
        permisos: true,
      },
    });

    res.json({
      id: usuario.id,
      username: usuario.username,
      nombre: usuario.nombre,
      rol: usuario.rol,
      color: usuario.color,
      activo: usuario.activo,
      departamento: usuario.departamento?.nombre,
      permisos: usuario.permisos.map(p => p.tipo),
    });
  } catch (error) {
    next(error);
  }
}

// Eliminar usuario
export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    // No permitir eliminar superadmin
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      include: { permisos: true },
    });

    if (usuario?.permisos.some(p => p.tipo === 'all')) {
      throw new AppError('No se puede eliminar al superadministrador', 403);
    }

    await prisma.usuario.delete({ where: { id } });

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    next(error);
  }
}

// Cambiar contraseña
export async function changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { newPassword } = changePasswordSchema.parse(req.body);

    const passwordHash = await hashPassword(newPassword);

    await prisma.usuario.update({
      where: { id },
      data: { passwordHash },
    });

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    next(error);
  }
}
