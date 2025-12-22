// Datos de DIGEDROP (Dirección General de Drogas Peligrosas)
import { FilaComparativa } from '../components';

// Sustancias secuestradas
export const sustanciasSecuestradas: FilaComparativa[] = [
  {
    id: 'cocaina',
    label: 'Cocaína (kg)',
    periodoAnterior: 14417,
    periodoActual: 37300,
  },
  {
    id: 'marihuana',
    label: 'Marihuana (kg)',
    periodoAnterior: 161737,
    periodoActual: 297123,
  },
  {
    id: 'pasta_base',
    label: 'Pasta Base (kg)',
    periodoAnterior: 2345,
    periodoActual: 4567,
  },
  {
    id: 'extasis',
    label: 'Éxtasis (unidades)',
    periodoAnterior: 1234,
    periodoActual: 2890,
  },
  {
    id: 'lsd',
    label: 'LSD (dosis)',
    periodoAnterior: 567,
    periodoActual: 1234,
  },
  {
    id: 'otras',
    label: 'Otras Sustancias (kg)',
    periodoAnterior: 234,
    periodoActual: 456,
  },
];

// Operativos realizados
export const operativosRealizados: FilaComparativa[] = [
  {
    id: 'allanamientos',
    label: 'Allanamientos',
    periodoAnterior: 456,
    periodoActual: 523,
  },
  {
    id: 'procedimientos_calle',
    label: 'Procedimientos en Calle',
    periodoAnterior: 1234,
    periodoActual: 1567,
  },
  {
    id: 'controles_ruta',
    label: 'Controles en Ruta',
    periodoAnterior: 789,
    periodoActual: 934,
  },
  {
    id: 'operativos_conjuntos',
    label: 'Operativos Conjuntos',
    periodoAnterior: 123,
    periodoActual: 156,
  },
];

// Detenidos por delitos de drogas
export const detenidosDrogas: FilaComparativa[] = [
  {
    id: 'tenencia_simple',
    label: 'Tenencia Simple',
    periodoAnterior: 234,
    periodoActual: 198,
  },
  {
    id: 'tenencia_fines_comercio',
    label: 'Tenencia con Fines de Comercio',
    periodoAnterior: 456,
    periodoActual: 523,
  },
  {
    id: 'comercializacion',
    label: 'Comercialización',
    periodoAnterior: 345,
    periodoActual: 412,
  },
  {
    id: 'transporte',
    label: 'Transporte',
    periodoAnterior: 78,
    periodoActual: 95,
  },
  {
    id: 'organizacion',
    label: 'Organización Criminal',
    periodoAnterior: 23,
    periodoActual: 31,
  },
];

// Vehículos secuestrados
export const vehiculosSecuestradosDigedrop: FilaComparativa[] = [
  {
    id: 'automoviles',
    label: 'Automóviles',
    periodoAnterior: 89,
    periodoActual: 112,
  },
  {
    id: 'motocicletas',
    label: 'Motocicletas',
    periodoAnterior: 234,
    periodoActual: 287,
  },
  {
    id: 'camionetas',
    label: 'Camionetas',
    periodoAnterior: 34,
    periodoActual: 45,
  },
  { id: 'camiones', label: 'Camiones', periodoAnterior: 12, periodoActual: 18 },
];

// Dinero secuestrado
export const dineroSecuestrado: FilaComparativa[] = [
  {
    id: 'pesos',
    label: 'Pesos Argentinos ($)',
    periodoAnterior: 45678900,
    periodoActual: 67890123,
  },
  {
    id: 'dolares',
    label: 'Dólares (USD)',
    periodoAnterior: 123456,
    periodoActual: 234567,
  },
  {
    id: 'euros',
    label: 'Euros (EUR)',
    periodoAnterior: 12345,
    periodoActual: 23456,
  },
  {
    id: 'criptoactivos',
    label: 'Criptoactivos (USD equiv.)',
    periodoAnterior: 34567,
    periodoActual: 78901,
  },
];

// Datos para gráficos
export const datosGraficoSustancias = [
  { nombre: 'Cocaína', anterior: 14.4, actual: 37.3 },
  { nombre: 'Marihuana', anterior: 161.7, actual: 297.1 },
  { nombre: 'Pasta Base', anterior: 2.3, actual: 4.6 },
];

export const datosGraficoOperativos = [
  { nombre: 'Proc. Calle', anterior: 1234, actual: 1567 },
  { nombre: 'Controles Ruta', anterior: 789, actual: 934 },
  { nombre: 'Allanamientos', anterior: 456, actual: 523 },
  { nombre: 'Op. Conjuntos', anterior: 123, actual: 156 },
];

export const datosGraficoDistribucionDetenidos = [
  { nombre: 'Tenencia Comercio', valor: 523, color: '#dc2626' },
  { nombre: 'Comercialización', valor: 412, color: '#f97316' },
  { nombre: 'Tenencia Simple', valor: 198, color: '#eab308' },
  { nombre: 'Transporte', valor: 95, color: '#84cc16' },
  { nombre: 'Organización', valor: 31, color: '#7f1d1d' },
];

export const datosGraficoTendenciaSustancias = [
  { nombre: 'Ene', cocaina: 2500, marihuana: 25000 },
  { nombre: 'Feb', cocaina: 3200, marihuana: 32000 },
  { nombre: 'Mar', cocaina: 4100, marihuana: 38000 },
  { nombre: 'Abr', cocaina: 5600, marihuana: 45000 },
  { nombre: 'May', cocaina: 6800, marihuana: 52000 },
  { nombre: 'Jun', cocaina: 7500, marihuana: 58000 },
  { nombre: 'Jul', cocaina: 7600, marihuana: 47123 },
];
