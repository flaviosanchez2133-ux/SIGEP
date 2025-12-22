// Datos de Prevención Ciudadana
import { FilaComparativa } from '../components';

// Operativos de prevención
export const operativosPrevencion: FilaComparativa[] = [
  {
    id: 'patrullajes',
    label: 'Patrullajes Preventivos',
    periodoAnterior: 5678,
    periodoActual: 6234,
  },
  {
    id: 'controles_vehiculares',
    label: 'Controles Vehiculares',
    periodoAnterior: 3456,
    periodoActual: 3890,
  },
  {
    id: 'saturaciones',
    label: 'Operativos de Saturación',
    periodoAnterior: 234,
    periodoActual: 287,
  },
  {
    id: 'recorridas_pie',
    label: 'Recorridas a Pie',
    periodoAnterior: 1234,
    periodoActual: 1456,
  },
  {
    id: 'presencia_eventos',
    label: 'Presencia en Eventos',
    periodoAnterior: 345,
    periodoActual: 412,
  },
];

// Actas labradas
export const actasLabradas: FilaComparativa[] = [
  {
    id: 'actas_infraccion',
    label: 'Actas de Infracción',
    periodoAnterior: 4567,
    periodoActual: 5123,
  },
  {
    id: 'actas_contravencion',
    label: 'Actas Contravencionales',
    periodoAnterior: 2345,
    periodoActual: 2678,
  },
  {
    id: 'actas_notificacion',
    label: 'Actas de Notificación',
    periodoAnterior: 1234,
    periodoActual: 1456,
  },
];

// Personas identificadas
export const personasIdentificadas: FilaComparativa[] = [
  {
    id: 'controles_rutina',
    label: 'En Controles de Rutina',
    periodoAnterior: 23456,
    periodoActual: 26789,
  },
  {
    id: 'operativos_especiales',
    label: 'En Operativos Especiales',
    periodoAnterior: 8765,
    periodoActual: 9876,
  },
  {
    id: 'eventos_masivos',
    label: 'En Eventos Masivos',
    periodoAnterior: 5678,
    periodoActual: 6234,
  },
];

// Vehículos controlados
export const vehiculosControlados: FilaComparativa[] = [
  {
    id: 'automoviles',
    label: 'Automóviles',
    periodoAnterior: 34567,
    periodoActual: 38901,
  },
  {
    id: 'motocicletas',
    label: 'Motocicletas',
    periodoAnterior: 23456,
    periodoActual: 26789,
  },
  {
    id: 'transporte_publico',
    label: 'Transporte Público',
    periodoAnterior: 1234,
    periodoActual: 1456,
  },
  {
    id: 'carga',
    label: 'Vehículos de Carga',
    periodoAnterior: 5678,
    periodoActual: 6234,
  },
];

// Datos para gráficos
export const datosGraficoOperativos = [
  { nombre: 'Patrullajes', anterior: 5678, actual: 6234 },
  { nombre: 'Controles Veh.', anterior: 3456, actual: 3890 },
  { nombre: 'Recorridas Pie', anterior: 1234, actual: 1456 },
  { nombre: 'Eventos', anterior: 345, actual: 412 },
  { nombre: 'Saturaciones', anterior: 234, actual: 287 },
];

export const datosGraficoActas = [
  { nombre: 'Infracción', valor: 5123, color: '#f97316' },
  { nombre: 'Contravención', valor: 2678, color: '#eab308' },
  { nombre: 'Notificación', valor: 1456, color: '#22c55e' },
];
