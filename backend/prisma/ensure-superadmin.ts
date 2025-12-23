import { PrismaClient, Rol } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

async function ensureSuperadmin() {
  console.log('🛡️ Asegurando usuario superadmin...');

  try {
    const passwordHash = await hashPassword('SIGEP_2024');

    const superadmin = await prisma.usuario.upsert({
      where: { username: 'superadmin' },
      update: {
        passwordHash,
        rol: Rol.ADMIN,
        activo: true,
      },
      create: {
        username: 'superadmin',
        passwordHash,
        nombre: 'Super Administrador',
        rol: Rol.ADMIN,
        color: '#1e3a5f',
        activo: true,
        // superadmin no pertenece a un departamento específico necesariamente, o se puede dejar null
        departamentoId: null, 
      },
    });

    // Asegurar permisos
    const permisosNecesarios = ['all', 'read', 'write', 'export', 'admin'];

    // Eliminamos permisos existentes para volver a crearlos y asegurar que estén todos
    await prisma.permiso.deleteMany({
      where: { usuarioId: superadmin.id }
    });

    await prisma.permiso.createMany({
      data: permisosNecesarios.map(tipo => ({
        usuarioId: superadmin.id,
        tipo,
      })),
    });

    console.log('✅ Usuario superadmin actualizado/creado exitosamente.');
    console.log('   Username: superadmin');
    console.log('   Password: SIGEP_2024');
    console.log('   Rol: ADMIN');
    console.log(`   Permisos: ${permisosNecesarios.join(', ')}`);

  } catch (error) {
    console.error('❌ Error asegurando superadmin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

ensureSuperadmin();
