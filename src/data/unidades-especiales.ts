// Datos de Unidades Especiales
import { FilaComparativa } from '../components';

// Intervenciones por tipo de unidad
export const intervencionesGOE: FilaComparativa[] = [
  {
    id: 'allanamientos_alto_riesgo',
    label: 'Allanamientos Alto Riesgo',
    periodoAnterior: 89,
    periodoActual: 112,
  },
  {
    id: 'rescate_rehenes',
    label: 'Rescate de Rehenes',
    periodoAnterior: 3,
    periodoActual: 2,
  },
  {
    id: 'apoyo_operativos',
    label: 'Apoyo a Operativos',
    periodoAnterior: 234,
    periodoActual: 267,
  },
  {
    id: 'custodia_vip',
    label: 'Custodia VIP',
    periodoAnterior: 56,
    periodoActual: 78,
  },
  {
    id: 'control_disturbios',
    label: 'Control de Disturbios',
    periodoAnterior: 12,
    periodoActual: 8,
  },
];

// Intervenciones Bomberos
export const intervencionesBomberos: FilaComparativa[] = [
  {
    id: 'incendios_estructurales',
    label: 'Incendios Estructurales',
    periodoAnterior: 234,
    periodoActual: 198,
  },
  {
    id: 'incendios_forestales',
    label: 'Incendios Forestales',
    periodoAnterior: 89,
    periodoActual: 156,
  },
  {
    id: 'incendios_vehiculares',
    label: 'Incendios Vehiculares',
    periodoAnterior: 123,
    periodoActual: 134,
  },
  { id: 'rescates', label: 'Rescates', periodoAnterior: 78, periodoActual: 89 },
  {
    id: 'emergencias_materiales',
    label: 'Emergencias con Mat. Peligrosos',
    periodoAnterior: 23,
    periodoActual: 31,
  },
  {
    id: 'otros_servicios',
    label: 'Otros Servicios',
    periodoAnterior: 456,
    periodoActual: 512,
  },
];

// Intervenciones Canes
export const intervencionesCanes: FilaComparativa[] = [
  {
    id: 'busqueda_drogas',
    label: 'Búsqueda de Drogas',
    periodoAnterior: 345,
    periodoActual: 412,
  },
  {
    id: 'busqueda_explosivos',
    label: 'Búsqueda de Explosivos',
    periodoAnterior: 45,
    periodoActual: 52,
  },
  {
    id: 'busqueda_personas',
    label: 'Búsqueda de Personas',
    periodoAnterior: 23,
    periodoActual: 31,
  },
  {
    id: 'apoyo_patrullaje',
    label: 'Apoyo a Patrullaje',
    periodoAnterior: 234,
    periodoActual: 267,
  },
  {
    id: 'eventos_especiales',
    label: 'Eventos Especiales',
    periodoAnterior: 89,
    periodoActual: 98,
  },
];

// Intervenciones Montada
export const intervencionesMontada: FilaComparativa[] = [
  {
    id: 'patrullajes_parques',
    label: 'Patrullajes en Parques',
    periodoAnterior: 567,
    periodoActual: 634,
  },
  {
    id: 'eventos_masivos',
    label: 'Eventos Masivos',
    periodoAnterior: 234,
    periodoActual: 267,
  },
  {
    id: 'control_manifestaciones',
    label: 'Control de Manifestaciones',
    periodoAnterior: 45,
    periodoActual: 38,
  },
  {
    id: 'busqueda_terreno',
    label: 'Búsqueda en Terreno',
    periodoAnterior: 23,
    periodoActual: 31,
  },
];

// Resultados operativos
export const resultadosOperativos: FilaComparativa[] = [
  {
    id: 'detenidos',
    label: 'Detenidos',
    periodoAnterior: 234,
    periodoActual: 287,
  },
  {
    id: 'armas_secuestradas',
    label: 'Armas Secuestradas',
    periodoAnterior: 56,
    periodoActual: 78,
  },
  {
    id: 'vehiculos_recuperados',
    label: 'Vehículos Recuperados',
    periodoAnterior: 45,
    periodoActual: 52,
  },
  {
    id: 'drogas_incautadas_kg',
    label: 'Drogas Incautadas (kg)',
    periodoAnterior: 123,
    periodoActual: 167,
  },
];

// Datos para gráficos
export const datosGraficoIntervencionesGOE = [
  { nombre: 'Apoyo Operativos', anterior: 234, actual: 267 },
  { nombre: 'Allanamientos AR', anterior: 89, actual: 112 },
  { nombre: 'Custodia VIP', anterior: 56, actual: 78 },
  { nombre: 'Control Disturbios', anterior: 12, actual: 8 },
];

export const datosGraficoBomberos = [
  { nombre: 'Otros Servicios', valor: 512, color: '#3b82f6' },
  { nombre: 'Inc. Estructurales', valor: 198, color: '#ef4444' },
  { nombre: 'Inc. Forestales', valor: 156, color: '#22c55e' },
  { nombre: 'Inc. Vehiculares', valor: 134, color: '#f97316' },
  { nombre: 'Rescates', valor: 89, color: '#8b5cf6' },
];

export const datosGraficoCanes = [
  { nombre: 'Drogas', valor: 412, color: '#dc2626' },
  { nombre: 'Patrullaje', valor: 267, color: '#3b82f6' },
  { nombre: 'Eventos', valor: 98, color: '#eab308' },
  { nombre: 'Explosivos', valor: 52, color: '#f97316' },
  { nombre: 'Personas', valor: 31, color: '#22c55e' },
];
