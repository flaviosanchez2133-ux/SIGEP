// Datos de Asuntos Internos
import { FilaComparativa } from '../components';

// Estadísticas de denuncias recibidas
export const denunciasRecibidas: FilaComparativa[] = [
  {
    id: 'abuso_autoridad',
    label: 'Abuso de Autoridad',
    periodoAnterior: 45,
    periodoActual: 38,
  },
  {
    id: 'incumplimiento',
    label: 'Incumplimiento de Deberes',
    periodoAnterior: 67,
    periodoActual: 52,
  },
  {
    id: 'abandono_servicio',
    label: 'Abandono de Servicio',
    periodoAnterior: 23,
    periodoActual: 18,
  },
  {
    id: 'inasistencia',
    label: 'Inasistencia Injustificada',
    periodoAnterior: 89,
    periodoActual: 76,
  },
  {
    id: 'faltas_respeto',
    label: 'Faltas de Respeto',
    periodoAnterior: 34,
    periodoActual: 29,
  },
  {
    id: 'uso_indebido_armas',
    label: 'Uso Indebido de Armas',
    periodoAnterior: 12,
    periodoActual: 8,
  },
  {
    id: 'violencia_genero',
    label: 'Violencia de Género',
    periodoAnterior: 28,
    periodoActual: 31,
  },
  { id: 'cohecho', label: 'Cohecho', periodoAnterior: 15, periodoActual: 11 },
];

// Estado de sumarios administrativos
export const sumariosAdministrativos: FilaComparativa[] = [
  {
    id: 'iniciados',
    label: 'Sumarios Iniciados',
    periodoAnterior: 156,
    periodoActual: 134,
  },
  {
    id: 'en_tramite',
    label: 'En Trámite',
    periodoAnterior: 89,
    periodoActual: 78,
  },
  {
    id: 'resueltos',
    label: 'Resueltos',
    periodoAnterior: 112,
    periodoActual: 98,
  },
  {
    id: 'archivados',
    label: 'Archivados',
    periodoAnterior: 34,
    periodoActual: 41,
  },
  {
    id: 'prescriptos',
    label: 'Prescriptos',
    periodoAnterior: 8,
    periodoActual: 5,
  },
];

// Sanciones aplicadas
export const sancionesAplicadas: FilaComparativa[] = [
  {
    id: 'apercibimiento',
    label: 'Apercibimiento',
    periodoAnterior: 45,
    periodoActual: 38,
  },
  {
    id: 'suspension',
    label: 'Suspensión',
    periodoAnterior: 67,
    periodoActual: 54,
  },
  { id: 'arresto', label: 'Arresto', periodoAnterior: 23, periodoActual: 19 },
  { id: 'cesantia', label: 'Cesantía', periodoAnterior: 12, periodoActual: 8 },
  {
    id: 'exoneracion',
    label: 'Exoneración',
    periodoAnterior: 5,
    periodoActual: 3,
  },
];

// Personal involucrado por jerarquía
export const personalPorJerarquia: FilaComparativa[] = [
  {
    id: 'oficiales_superiores',
    label: 'Oficiales Superiores',
    periodoAnterior: 8,
    periodoActual: 5,
  },
  {
    id: 'oficiales_jefes',
    label: 'Oficiales Jefes',
    periodoAnterior: 15,
    periodoActual: 12,
  },
  {
    id: 'oficiales_subalternos',
    label: 'Oficiales Subalternos',
    periodoAnterior: 34,
    periodoActual: 28,
  },
  {
    id: 'suboficiales_superiores',
    label: 'Suboficiales Superiores',
    periodoAnterior: 45,
    periodoActual: 38,
  },
  {
    id: 'suboficiales',
    label: 'Suboficiales',
    periodoAnterior: 89,
    periodoActual: 76,
  },
  { id: 'agentes', label: 'Agentes', periodoAnterior: 123, periodoActual: 108 },
];

// Datos para gráficos
export const datosGraficoDenuncias = [
  { nombre: 'Inasistencia', anterior: 89, actual: 76 },
  { nombre: 'Incumplimiento', anterior: 67, actual: 52 },
  { nombre: 'Abuso Autoridad', anterior: 45, actual: 38 },
  { nombre: 'Faltas Respeto', anterior: 34, actual: 29 },
  { nombre: 'Viol. Género', anterior: 28, actual: 31 },
];

export const datosGraficoSanciones = [
  { nombre: 'Suspensión', valor: 54, color: '#f97316' },
  { nombre: 'Apercibimiento', valor: 38, color: '#eab308' },
  { nombre: 'Arresto', valor: 19, color: '#ef4444' },
  { nombre: 'Cesantía', valor: 8, color: '#dc2626' },
  { nombre: 'Exoneración', valor: 3, color: '#7f1d1d' },
];

export const datosGraficoJerarquia = [
  { nombre: 'Agentes', valor: 108, color: '#3b82f6' },
  { nombre: 'Suboficiales', valor: 76, color: '#8b5cf6' },
  { nombre: 'Subof. Superiores', valor: 38, color: '#6366f1' },
  { nombre: 'Of. Subalternos', valor: 28, color: '#a855f7' },
  { nombre: 'Of. Jefes', valor: 12, color: '#c084fc' },
  { nombre: 'Of. Superiores', valor: 5, color: '#e879f9' },
];
