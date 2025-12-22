import { PrismaClient, Rol } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Hash password helper
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

// Datos de departamentos
const departamentos = [
  { codigo: 'd1', nombre: 'Departamento Personal (D-1)', color: '#1e3a5f', orden: 1 },
  { codigo: 'd2', nombre: 'Departamento Inteligencia Criminal (D-2)', color: '#0ea5e9', orden: 2 },
  { codigo: 'd3', nombre: 'Departamento Operaciones Policiales (D-3)', color: '#ef4444', orden: 3 },
  { codigo: 'd4', nombre: 'Departamento Logística (D-4)', color: '#f59e0b', orden: 4 },
  { codigo: 'd5', nombre: 'Departamento Judicial (D-5)', color: '#8b5cf6', orden: 5 },
  { codigo: 'asuntos_internos', nombre: 'Dirección General de Asuntos Internos', color: '#374151', orden: 6 },
  { codigo: 'delitos_rurales', nombre: 'Dirección General de Delitos Rurales', color: '#22c55e', orden: 7 },
  { codigo: 'digedrop', nombre: 'Dirección General de Drogas Peligrosas', color: '#dc2626', orden: 8 },
  { codigo: 'prevencion_ciudadana', nombre: 'Dirección General de Prevención Ciudadana', color: '#06b6d4', orden: 9 },
  { codigo: 'unidades_especiales', nombre: 'Dirección General de Unidades Especiales', color: '#ea580c', orden: 10 },
  { codigo: 'institutos', nombre: 'Dirección General de Institutos e Instrucción', color: '#2563eb', orden: 11 },
  { codigo: 'unidades_regionales', nombre: 'Unidades Regionales', color: '#7c3aed', orden: 12 },
];

// Datos de usuarios
const usuarios = [
  { username: 'superadmin', password: 'SIGEP_2024', nombre: 'Super Administrador', rol: Rol.ADMIN, color: '#1e3a5f', departamento: null, permisos: ['all', 'read', 'write', 'export', 'admin'] },
  { username: 'd1_admin', password: 'D1_2024', nombre: 'Administrador D-1', rol: Rol.ADMIN, color: '#1e3a5f', departamento: 'd1', permisos: ['d1', 'read', 'write', 'export'] },
  { username: 'd2_admin', password: 'D2_2024', nombre: 'Administrador D-2', rol: Rol.ADMIN, color: '#0ea5e9', departamento: 'd2', permisos: ['d2', 'read', 'write', 'export'] },
  { username: 'd3_admin', password: 'D3_2024', nombre: 'Administrador D-3', rol: Rol.ADMIN, color: '#ef4444', departamento: 'd3', permisos: ['d3', 'read', 'write', 'export'] },
  { username: 'd4_admin', password: 'D4_2024', nombre: 'Administrador D-4', rol: Rol.ADMIN, color: '#f59e0b', departamento: 'd4', permisos: ['d4', 'read', 'write', 'export'] },
  { username: 'd5_admin', password: 'D5_2024', nombre: 'Administrador D-5', rol: Rol.ADMIN, color: '#8b5cf6', departamento: 'd5', permisos: ['d5', 'read', 'write', 'export'] },
  { username: 'asuntos_admin', password: 'Asuntos_2024', nombre: 'Administrador Asuntos Internos', rol: Rol.ADMIN, color: '#374151', departamento: 'asuntos_internos', permisos: ['asuntos_internos', 'read', 'write', 'export'] },
  { username: 'rurales_admin', password: 'Rurales_2024', nombre: 'Administrador Delitos Rurales', rol: Rol.ADMIN, color: '#22c55e', departamento: 'delitos_rurales', permisos: ['delitos_rurales', 'read', 'write', 'export'] },
  { username: 'digedrop_admin', password: 'Digedrop_2024', nombre: 'Administrador DIGEDROP', rol: Rol.ADMIN, color: '#dc2626', departamento: 'digedrop', permisos: ['digedrop', 'read', 'write', 'export'] },
  { username: 'prevencion_admin', password: 'Prevencion_2024', nombre: 'Administrador Prevención', rol: Rol.ADMIN, color: '#06b6d4', departamento: 'prevencion_ciudadana', permisos: ['prevencion_ciudadana', 'read', 'write', 'export'] },
  { username: 'especiales_admin', password: 'Especiales_2024', nombre: 'Administrador Unidades Especiales', rol: Rol.ADMIN, color: '#ea580c', departamento: 'unidades_especiales', permisos: ['unidades_especiales', 'read', 'write', 'export'] },
  { username: 'institutos_admin', password: 'Institutos_2024', nombre: 'Administrador Institutos', rol: Rol.ADMIN, color: '#2563eb', departamento: 'institutos', permisos: ['institutos', 'read', 'write', 'export'] },
  { username: 'regionales_admin', password: 'Regionales_2024', nombre: 'Administrador Unidades Regionales', rol: Rol.ADMIN, color: '#7c3aed', departamento: 'unidades_regionales', permisos: ['unidades_regionales', 'read', 'write', 'export'] },
];

// Datos de tablas D1 - Personal
const tablasD1 = [
  {
    tablaId: 'd1-total-personal-policial',
    nombre: 'Total de Personal Policial',
    datos: [
      { filaId: 'fuerza_efectiva', label: 'FUERZA EFECTIVA', periodoAnterior: 11287, periodoActual: 12186 },
      { filaId: 'poblacion', label: 'POBLACIÓN SEGÚN CENSO 2022', periodoAnterior: 1731820, periodoActual: 1731820 },
      { filaId: 'densidad', label: 'DENSIDAD POLICIAL', periodoAnterior: 0.65, periodoActual: 0.70 },
    ],
  },
  {
    tablaId: 'd1-personal-por-tipo',
    nombre: 'Personal por Tipo',
    datos: [
      { filaId: 'superior', label: 'PERSONAL SUPERIOR', periodoAnterior: 1087, periodoActual: 1178 },
      { filaId: 'subalterno', label: 'PERSONAL SUBALTERNO', periodoAnterior: 10200, periodoActual: 11008 },
    ],
  },
  {
    tablaId: 'd1-personal-por-genero',
    nombre: 'Personal por Género',
    datos: [
      { filaId: 'masculino', label: 'MASCULINO', periodoAnterior: 8616, periodoActual: 9334 },
      { filaId: 'femenino', label: 'FEMENINO', periodoAnterior: 2661, periodoActual: 2854 },
    ],
  },
  {
    tablaId: 'd1-oficiales-superiores',
    nombre: 'Oficiales Superiores',
    datos: [
      { filaId: 'comisario_general', label: 'Comisario General', periodoAnterior: 5, periodoActual: 5 },
      { filaId: 'comisario_mayor', label: 'Comisario Mayor', periodoAnterior: 24, periodoActual: 26 },
      { filaId: 'comisario_inspector', label: 'Comisario Inspector', periodoAnterior: 67, periodoActual: 72 },
    ],
  },
  {
    tablaId: 'd1-oficiales-jefes',
    nombre: 'Oficiales Jefes',
    datos: [
      { filaId: 'comisario', label: 'Comisario', periodoAnterior: 138, periodoActual: 148 },
      { filaId: 'subcomisario', label: 'Subcomisario', periodoAnterior: 208, periodoActual: 223 },
    ],
  },
];

// Datos de tablas D3 - Operaciones
const tablasD3 = [
  {
    tablaId: 'd3-delitos-propiedad',
    nombre: 'Delitos Contra la Propiedad',
    datos: [
      { filaId: 'hurto', label: 'HURTO', periodoAnterior: 3245, periodoActual: 2987 },
      { filaId: 'robo', label: 'ROBO', periodoAnterior: 1876, periodoActual: 1654 },
      { filaId: 'robo_agravado', label: 'ROBO AGRAVADO', periodoAnterior: 543, periodoActual: 489 },
    ],
  },
  {
    tablaId: 'd3-homicidios',
    nombre: 'Homicidios',
    datos: [
      { filaId: 'doloso', label: 'HOMICIDIO DOLOSO', periodoAnterior: 45, periodoActual: 38 },
      { filaId: 'culposo', label: 'HOMICIDIO CULPOSO', periodoAnterior: 123, periodoActual: 98 },
    ],
  },
];

// Datos de tablas D4 - Logística
const tablasD4 = [
  {
    tablaId: 'd4-armamento',
    nombre: 'Armamento Total',
    datos: [
      { filaId: 'pistolas', label: 'PISTOLAS 9MM', periodoAnterior: 8500, periodoActual: 9200 },
      { filaId: 'escopetas', label: 'ESCOPETAS', periodoAnterior: 1200, periodoActual: 1350 },
      { filaId: 'chalecos', label: 'CHALECOS ANTIBALAS', periodoAnterior: 5600, periodoActual: 6100 },
    ],
  },
  {
    tablaId: 'd4-vehiculos',
    nombre: 'Vehículos',
    datos: [
      { filaId: 'patrulleros', label: 'PATRULLEROS', periodoAnterior: 450, periodoActual: 520 },
      { filaId: 'motos', label: 'MOTOCICLETAS', periodoAnterior: 380, periodoActual: 420 },
      { filaId: 'otros', label: 'OTROS VEHÍCULOS', periodoAnterior: 120, periodoActual: 145 },
    ],
  },
];

// Datos de tablas DIGEDROP
const tablasDiGEDROP = [
  {
    tablaId: 'digedrop-sustancias',
    nombre: 'Sustancias Secuestradas',
    datos: [
      { filaId: 'cocaina', label: 'COCAÍNA (kg)', periodoAnterior: 156.5, periodoActual: 189.3 },
      { filaId: 'marihuana', label: 'MARIHUANA (kg)', periodoAnterior: 2345.8, periodoActual: 2890.4 },
      { filaId: 'pasta_base', label: 'PASTA BASE (kg)', periodoAnterior: 45.2, periodoActual: 67.8 },
    ],
  },
  {
    tablaId: 'digedrop-operativos',
    nombre: 'Operativos Realizados',
    datos: [
      { filaId: 'allanamientos', label: 'ALLANAMIENTOS', periodoAnterior: 234, periodoActual: 287 },
      { filaId: 'detenidos', label: 'DETENIDOS', periodoAnterior: 456, periodoActual: 534 },
    ],
  },
];

async function seed() {
  console.log('🌱 Iniciando seed de la base de datos...\n');

  try {
    // Limpiar datos existentes
    console.log('🧹 Limpiando datos existentes...');
    await prisma.historialCambio.deleteMany();
    await prisma.snapshot.deleteMany();
    await prisma.datoComparativo.deleteMany();
    await prisma.tablaConfig.deleteMany();
    await prisma.permiso.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.departamento.deleteMany();
    await prisma.configGlobal.deleteMany();
    await prisma.configPeriodo.deleteMany();

    // Crear configuración global
    console.log('⚙️ Creando configuración global...');
    await prisma.configGlobal.create({
      data: { edicionHabilitada: false },
    });

    // Crear configuración de período
    await prisma.configPeriodo.create({
      data: {
        anteriorInicio: new Date('2024-01-01'),
        anteriorFin: new Date('2024-07-31'),
        anteriorLabel: '01/01/24 - 31/07/24',
        actualInicio: new Date('2025-01-01'),
        actualFin: new Date('2025-07-31'),
        actualLabel: '01/01/25 - 31/07/25',
        activo: true,
      },
    });

    // Crear departamentos
    console.log('🏢 Creando departamentos...');
    const deptMap = new Map<string, string>();
    for (const dept of departamentos) {
      const created = await prisma.departamento.create({ data: dept });
      deptMap.set(dept.codigo, created.id);
      console.log(`   ✓ ${dept.nombre}`);
    }

    // Crear usuarios
    console.log('\n👥 Creando usuarios...');
    for (const userData of usuarios) {
      const passwordHash = await hashPassword(userData.password);
      const departamentoId = userData.departamento ? deptMap.get(userData.departamento) : null;

      const user = await prisma.usuario.create({
        data: {
          username: userData.username,
          passwordHash,
          nombre: userData.nombre,
          rol: userData.rol,
          color: userData.color,
          departamentoId,
        },
      });

      // Crear permisos
      await prisma.permiso.createMany({
        data: userData.permisos.map(tipo => ({
          usuarioId: user.id,
          tipo,
        })),
      });

      console.log(`   ✓ ${userData.username} (${userData.permisos.join(', ')})`);
    }

    // Crear tablas y datos - D1
    console.log('\n📊 Creando tablas D1...');
    const d1Id = deptMap.get('d1')!;
    for (let i = 0; i < tablasD1.length; i++) {
      const tabla = tablasD1[i];
      const tablaConfig = await prisma.tablaConfig.create({
        data: {
          tablaId: tabla.tablaId,
          nombre: tabla.nombre,
          departamentoId: d1Id,
          orden: i,
        },
      });

      await prisma.datoComparativo.createMany({
        data: tabla.datos.map((dato, idx) => ({
          tablaConfigId: tablaConfig.id,
          filaId: dato.filaId,
          label: dato.label,
          periodoAnterior: dato.periodoAnterior,
          periodoActual: dato.periodoActual,
          orden: idx,
        })),
      });
      console.log(`   ✓ ${tabla.nombre}`);
    }

    // Crear tablas y datos - D3
    console.log('\n📊 Creando tablas D3...');
    const d3Id = deptMap.get('d3')!;
    for (let i = 0; i < tablasD3.length; i++) {
      const tabla = tablasD3[i];
      const tablaConfig = await prisma.tablaConfig.create({
        data: {
          tablaId: tabla.tablaId,
          nombre: tabla.nombre,
          departamentoId: d3Id,
          orden: i,
        },
      });

      await prisma.datoComparativo.createMany({
        data: tabla.datos.map((dato, idx) => ({
          tablaConfigId: tablaConfig.id,
          filaId: dato.filaId,
          label: dato.label,
          periodoAnterior: dato.periodoAnterior,
          periodoActual: dato.periodoActual,
          orden: idx,
        })),
      });
      console.log(`   ✓ ${tabla.nombre}`);
    }

    // Crear tablas y datos - D4
    console.log('\n📊 Creando tablas D4...');
    const d4Id = deptMap.get('d4')!;
    for (let i = 0; i < tablasD4.length; i++) {
      const tabla = tablasD4[i];
      const tablaConfig = await prisma.tablaConfig.create({
        data: {
          tablaId: tabla.tablaId,
          nombre: tabla.nombre,
          departamentoId: d4Id,
          orden: i,
        },
      });

      await prisma.datoComparativo.createMany({
        data: tabla.datos.map((dato, idx) => ({
          tablaConfigId: tablaConfig.id,
          filaId: dato.filaId,
          label: dato.label,
          periodoAnterior: dato.periodoAnterior,
          periodoActual: dato.periodoActual,
          orden: idx,
        })),
      });
      console.log(`   ✓ ${tabla.nombre}`);
    }

    // Crear tablas y datos - DIGEDROP
    console.log('\n📊 Creando tablas DIGEDROP...');
    const digedropId = deptMap.get('digedrop')!;
    for (let i = 0; i < tablasDiGEDROP.length; i++) {
      const tabla = tablasDiGEDROP[i];
      const tablaConfig = await prisma.tablaConfig.create({
        data: {
          tablaId: tabla.tablaId,
          nombre: tabla.nombre,
          departamentoId: digedropId,
          orden: i,
        },
      });

      await prisma.datoComparativo.createMany({
        data: tabla.datos.map((dato, idx) => ({
          tablaConfigId: tablaConfig.id,
          filaId: dato.filaId,
          label: dato.label,
          periodoAnterior: dato.periodoAnterior,
          periodoActual: dato.periodoActual,
          orden: idx,
        })),
      });
      console.log(`   ✓ ${tabla.nombre}`);
    }

    console.log('\n✅ Seed completado exitosamente!');
    console.log('\n📋 Resumen:');
    console.log(`   - ${departamentos.length} departamentos`);
    console.log(`   - ${usuarios.length} usuarios`);
    console.log(`   - ${tablasD1.length + tablasD3.length + tablasD4.length + tablasDiGEDROP.length} tablas`);
    console.log('\n🔑 Credenciales de superadmin:');
    console.log('   Usuario: superadmin');
    console.log('   Contraseña: SIGEP_2024');

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();
