// Datos de Delitos Rurales
import { FilaComparativa } from '../components';

// Delitos rurales por tipo
export const delitosRuralesPorTipo: FilaComparativa[] = [
  {
    id: 'abigeato',
    label: 'Abigeato',
    periodoAnterior: 234,
    periodoActual: 198,
  },
  {
    id: 'robo_maquinaria',
    label: 'Robo de Maquinaria Agrícola',
    periodoAnterior: 45,
    periodoActual: 38,
  },
  {
    id: 'robo_cereales',
    label: 'Robo de Cereales',
    periodoAnterior: 67,
    periodoActual: 52,
  },
  {
    id: 'usurpacion',
    label: 'Usurpación',
    periodoAnterior: 34,
    periodoActual: 41,
  },
  {
    id: 'caza_furtiva',
    label: 'Caza Furtiva',
    periodoAnterior: 89,
    periodoActual: 76,
  },
  {
    id: 'danos_rurales',
    label: 'Daños Rurales',
    periodoAnterior: 56,
    periodoActual: 48,
  },
];

// Abigeato por regional
export const abigeatoPorRegional: FilaComparativa[] = [
  {
    id: 'capital',
    label: 'Regional Capital',
    periodoAnterior: 23,
    periodoActual: 18,
  },
  {
    id: 'norte',
    label: 'Regional Norte',
    periodoAnterior: 78,
    periodoActual: 65,
  },
  { id: 'sur', label: 'Regional Sur', periodoAnterior: 45, periodoActual: 38 },
  {
    id: 'este',
    label: 'Regional Este',
    periodoAnterior: 56,
    periodoActual: 48,
  },
  {
    id: 'oeste',
    label: 'Regional Oeste',
    periodoAnterior: 32,
    periodoActual: 29,
  },
];

// Animales recuperados
export const animalesRecuperados: FilaComparativa[] = [
  { id: 'bovinos', label: 'Bovinos', periodoAnterior: 345, periodoActual: 412 },
  { id: 'equinos', label: 'Equinos', periodoAnterior: 123, periodoActual: 98 },
  { id: 'ovinos', label: 'Ovinos', periodoAnterior: 89, periodoActual: 76 },
  { id: 'caprinos', label: 'Caprinos', periodoAnterior: 45, periodoActual: 52 },
  { id: 'porcinos', label: 'Porcinos', periodoAnterior: 34, periodoActual: 41 },
];

// Procedimientos realizados
export const procedimientosRurales: FilaComparativa[] = [
  {
    id: 'patrullajes',
    label: 'Patrullajes Preventivos',
    periodoAnterior: 1234,
    periodoActual: 1456,
  },
  {
    id: 'controles_transito',
    label: 'Controles de Tránsito Animal',
    periodoAnterior: 567,
    periodoActual: 634,
  },
  {
    id: 'inspecciones',
    label: 'Inspecciones en Campo',
    periodoAnterior: 345,
    periodoActual: 389,
  },
  {
    id: 'operativos_conjuntos',
    label: 'Operativos Conjuntos',
    periodoAnterior: 89,
    periodoActual: 112,
  },
];

// Datos para gráficos
export const datosGraficoDelitosRurales = [
  { nombre: 'Abigeato', anterior: 234, actual: 198 },
  { nombre: 'Caza Furtiva', anterior: 89, actual: 76 },
  { nombre: 'Robo Cereales', anterior: 67, actual: 52 },
  { nombre: 'Daños', anterior: 56, actual: 48 },
  { nombre: 'Robo Maquinaria', anterior: 45, actual: 38 },
];

export const datosGraficoAnimalesRecuperados = [
  { nombre: 'Bovinos', valor: 412, color: '#8B4513' },
  { nombre: 'Equinos', valor: 98, color: '#d97706' },
  { nombre: 'Ovinos', valor: 76, color: '#eab308' },
  { nombre: 'Caprinos', valor: 52, color: '#84cc16' },
  { nombre: 'Porcinos', valor: 41, color: '#f97316' },
];
