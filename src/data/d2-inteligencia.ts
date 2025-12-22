// Datos del Departamento Inteligencia Criminal (D-2)
import { FilaComparativa } from '../components';

export const privadosLibertadD2: FilaComparativa[] = [
  { id: 'procesal', label: 'Procesal', periodoAnterior: 21, periodoActual: 21 },
  {
    id: 'contravencional',
    label: 'Contravencional',
    periodoAnterior: 2,
    periodoActual: 0,
  },
];

export const procedimientosD2: FilaComparativa[] = [
  {
    id: 'procedimientos',
    label: 'Procedimientos',
    periodoAnterior: 12,
    periodoActual: 26,
  },
  {
    id: 'allanamientos_positivos',
    label: 'Allanamientos Positivos',
    periodoAnterior: 31,
    periodoActual: 39,
  },
  {
    id: 'allanamientos_negativos',
    label: 'Allanamientos Negativos',
    periodoAnterior: 12,
    periodoActual: 17,
  },
];

export const secuestrosD2: FilaComparativa[] = [
  { id: 'vehiculos', label: 'Vehículos', periodoAnterior: 0, periodoActual: 0 },
  {
    id: 'motocicletas',
    label: 'Motocicletas',
    periodoAnterior: 0,
    periodoActual: 0,
  },
  {
    id: 'armas_fuego',
    label: 'Armas de Fuego',
    periodoAnterior: 0,
    periodoActual: 0,
  },
  { id: 'celulares', label: 'Celulares', periodoAnterior: 0, periodoActual: 0 },
  {
    id: 'dispositivos',
    label: 'Dispositivos Electrónicos',
    periodoAnterior: 0,
    periodoActual: 0,
  },
  { id: 'otros', label: 'Otros', periodoAnterior: 0, periodoActual: 0 },
];

// Datos para gráficos
export const datosGraficoProcedimientosD2 = [
  { nombre: 'Procedimientos', anterior: 12, actual: 26 },
  { nombre: 'Allan. Positivos', anterior: 31, actual: 39 },
  { nombre: 'Allan. Negativos', anterior: 12, actual: 17 },
];
