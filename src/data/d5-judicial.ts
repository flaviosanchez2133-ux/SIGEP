// Datos del Departamento Judicial (D-5)
import { FilaComparativa } from '../components';

// Detenidos procesales por regional
export const detenidosProcesales: FilaComparativa[] = [
  {
    id: 'regional_capital',
    label: 'Regional Capital',
    periodoAnterior: 1534,
    periodoActual: 1004,
  },
  {
    id: 'regional_sur',
    label: 'Regional Sur',
    periodoAnterior: 291,
    periodoActual: 332,
  },
  {
    id: 'regional_norte',
    label: 'Regional Norte',
    periodoAnterior: 961,
    periodoActual: 835,
  },
  {
    id: 'regional_este',
    label: 'Regional Este',
    periodoAnterior: 458,
    periodoActual: 286,
  },
  {
    id: 'regional_oeste',
    label: 'Regional Oeste',
    periodoAnterior: 184,
    periodoActual: 189,
  },
  {
    id: 'uicydc',
    label: 'U.I.C.Y D.C.',
    periodoAnterior: 329,
    periodoActual: 298,
  },
  { id: 'd2', label: 'D-2', periodoAnterior: 22, periodoActual: 18 },
  {
    id: 'digedrop',
    label: 'DIGEDROP',
    periodoAnterior: 136,
    periodoActual: 160,
  },
  {
    id: 'delitos_rurales',
    label: 'Delitos Rurales',
    periodoAnterior: 27,
    periodoActual: 24,
  },
  {
    id: 'viol_genero',
    label: 'Dir. Viol. Gene. y Trata de Persona',
    periodoAnterior: 51,
    periodoActual: 20,
  },
  {
    id: 'gendarmeria',
    label: 'Gendarmería',
    periodoAnterior: 8,
    periodoActual: 15,
  },
];

// Detenidos con pendientes (capturas)
export const detenidosConPendientes = {
  detenidosInfracLey5140: {
    meses2024: [25, 15, 14, 7, 12, 14, 1],
    total2024: 88,
    meses2025: [13, 5, 8, 2, 1, 1, 0],
    total2025: 30,
  },
  divBusquedaCaptura: {
    meses2024: [5, 5, 15, 17, 16, 18, 11],
    total2024: 87,
    meses2025: [6, 5, 14, 22, 19, 23, 13],
    total2025: 102,
  },
};

// Consignas cubiertas por unidades regionales
export const consignasCubiertas: FilaComparativa[] = [
  {
    id: 'regional_capital',
    label: 'Regional Capital',
    periodoAnterior: 365,
    periodoActual: 259,
  },
  {
    id: 'regional_sur',
    label: 'Regional Sur',
    periodoAnterior: 3,
    periodoActual: 7,
  },
  {
    id: 'regional_norte',
    label: 'Regional Norte',
    periodoAnterior: 129,
    periodoActual: 79,
  },
  {
    id: 'regional_este',
    label: 'Regional Este',
    periodoAnterior: 138,
    periodoActual: 55,
  },
  {
    id: 'regional_oeste',
    label: 'Regional Oeste',
    periodoAnterior: 29,
    periodoActual: 22,
  },
];

// Recursos Habeas Corpus presentados por abogados
export const habeasCorpus: FilaComparativa[] = [
  { id: 'enero', label: 'Enero', periodoAnterior: 4, periodoActual: 17 },
  { id: 'febrero', label: 'Febrero', periodoAnterior: 8, periodoActual: 21 },
  { id: 'marzo', label: 'Marzo', periodoAnterior: 7, periodoActual: 39 },
  { id: 'abril', label: 'Abril', periodoAnterior: 20, periodoActual: 20 },
  { id: 'mayo', label: 'Mayo', periodoAnterior: 53, periodoActual: 30 },
  { id: 'junio', label: 'Junio', periodoAnterior: 58, periodoActual: 28 },
  { id: 'julio', label: 'Julio', periodoAnterior: 42, periodoActual: 32 },
];

// Detenidos trasladados al servicio penitenciario
export const trasladosPenitenciario: FilaComparativa[] = [
  {
    id: 'villa_urquiza',
    label: 'Villa Urquiza',
    periodoAnterior: 64,
    periodoActual: 41,
  },
  {
    id: 'benjamin_paz',
    label: 'Benjamín Paz',
    periodoAnterior: 0,
    periodoActual: 405,
  },
  {
    id: 'unidad_3',
    label: 'Unidad N° 3 Concepción',
    periodoAnterior: 11,
    periodoActual: 10,
  },
  {
    id: 'unidad_4',
    label: 'Unidad N° 4 (Mujeres)',
    periodoAnterior: 4,
    periodoActual: 0,
  },
  {
    id: 'delfin_gallo',
    label: 'Delfín Gallo (Mujeres)',
    periodoAnterior: 0,
    periodoActual: 54,
  },
];

// Armas de fuego secuestradas
export const armasSecuestradas: FilaComparativa[] = [
  {
    id: 'ur_capital',
    label: 'Unidad Regional Capital',
    periodoAnterior: 81,
    periodoActual: 135,
  },
  {
    id: 'ur_este',
    label: 'Unidad Regional Este',
    periodoAnterior: 87,
    periodoActual: 94,
  },
  {
    id: 'ur_norte',
    label: 'Unidad Regional Norte',
    periodoAnterior: 32,
    periodoActual: 26,
  },
  {
    id: 'ur_oeste',
    label: 'Unidad Regional Oeste',
    periodoAnterior: 17,
    periodoActual: 20,
  },
  {
    id: 'ur_sur',
    label: 'Unidad Regional Sur',
    periodoAnterior: 27,
    periodoActual: 46,
  },
  {
    id: 'uicydc',
    label: 'U.I.C. Y D.C.',
    periodoAnterior: 65,
    periodoActual: 76,
  },
  { id: 'd2', label: 'D-2', periodoAnterior: 5, periodoActual: 4 },
  {
    id: 'delitos_rurales',
    label: 'Delitos Rurales',
    periodoAnterior: 46,
    periodoActual: 39,
  },
  { id: 'digedrop', label: 'DIGEDROP', periodoAnterior: 8, periodoActual: 6 },
  {
    id: 'dg_uuee',
    label: 'Dir. Gral. de UU.EE.',
    periodoAnterior: 8,
    periodoActual: 4,
  },
  {
    id: 'viol_genero',
    label: 'Violencia de Género y Trata de Persona',
    periodoAnterior: 6,
    periodoActual: 4,
  },
];

// Personal policial detenido
export const personalPolicialDetenido: FilaComparativa[] = [
  {
    id: 'ur_capital',
    label: 'Unidad Regional Capital',
    periodoAnterior: 19,
    periodoActual: 2,
  },
  {
    id: 'ur_este',
    label: 'Unidad Regional Este',
    periodoAnterior: 4,
    periodoActual: 2,
  },
  {
    id: 'ur_norte',
    label: 'Unidad Regional Norte',
    periodoAnterior: 1,
    periodoActual: 0,
  },
  {
    id: 'ur_oeste',
    label: 'Unidad Regional Oeste',
    periodoAnterior: 6,
    periodoActual: 0,
  },
  {
    id: 'ur_sur',
    label: 'Unidad Regional Sur',
    periodoAnterior: 4,
    periodoActual: 1,
  },
  {
    id: 'uicydc',
    label: 'U.I.C. Y D.C.',
    periodoAnterior: 1,
    periodoActual: 5,
  },
  { id: 'd2', label: 'D-2', periodoAnterior: 0, periodoActual: 2 },
  {
    id: 'viol_genero',
    label: 'Violencia de Género y Trata de Persona',
    periodoAnterior: 0,
    periodoActual: 1,
  },
];

// Detenidos procesales liberados
export const detenidosLiberados: FilaComparativa[] = [
  {
    id: 'dependencias',
    label: 'Dependencias Policiales',
    periodoAnterior: 4441,
    periodoActual: 4808,
  },
  { id: 'penal', label: 'Penal', periodoAnterior: 2165, periodoActual: 2154 },
];

// Estadísticas llamadas telefónicas antecedentes
export const llamadasAntecedentes = {
  meses: ['Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
  conNovedad: [2, 5, 31, 14, 1],
  sinNovedad: [57, 286, 213, 138, 51],
  totalLlamadas: [59, 291, 244, 152, 52],
};

// Datos para gráficos
export const datosGraficoDetenidosProcesales = [
  { nombre: 'Capital', anterior: 1534, actual: 1004 },
  { nombre: 'Norte', anterior: 961, actual: 835 },
  { nombre: 'Este', anterior: 458, actual: 286 },
  { nombre: 'Sur', anterior: 291, actual: 332 },
  { nombre: 'Oeste', anterior: 184, actual: 189 },
];

export const datosGraficoArmasSecuestradas = [
  { nombre: 'Capital', anterior: 81, actual: 135 },
  { nombre: 'Este', anterior: 87, actual: 94 },
  { nombre: 'U.I.C.Y D.C.', anterior: 65, actual: 76 },
  { nombre: 'Sur', anterior: 27, actual: 46 },
  { nombre: 'Norte', anterior: 32, actual: 26 },
];

export const datosGraficoDistribucionArmas = [
  { nombre: 'UR Capital', valor: 135, color: '#3b82f6' },
  { nombre: 'UR Este', valor: 94, color: '#8b5cf6' },
  { nombre: 'U.I.C.Y D.C.', valor: 76, color: '#1e3a5f' },
  { nombre: 'UR Sur', valor: 46, color: '#f97316' },
  { nombre: 'Delitos Rurales', valor: 39, color: '#166534' },
  { nombre: 'UR Norte', valor: 26, color: '#10b981' },
  { nombre: 'Otros', valor: 38, color: '#94a3b8' },
];
