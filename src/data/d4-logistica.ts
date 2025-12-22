// Datos del Departamento Logística (D-4)
import { FilaComparativa } from '../components';

// Cantidad total de armamento
export const armamentoTotal: FilaComparativa[] = [
  {
    id: 'escopetas',
    label: 'Escopetas 12/70',
    periodoAnterior: 639,
    periodoActual: 780,
  },
  {
    id: 'chalecos',
    label: 'Chalecos Balísticos',
    periodoAnterior: 5800,
    periodoActual: 7300,
  },
  {
    id: 'pistolas',
    label: 'Pistolas Cal 9mm',
    periodoAnterior: 12585,
    periodoActual: 13860,
  },
  {
    id: 'armas_menos_letales',
    label: 'Armas Menos Letales',
    periodoAnterior: 0,
    periodoActual: 533,
  },
];

// Proyecciones de compras
export const proyeccionesCompras: FilaComparativa[] = [
  {
    id: 'escopetas',
    label: 'Escopetas 12/70',
    periodoAnterior: 300,
    periodoActual: 100,
  },
  {
    id: 'chalecos',
    label: 'Chalecos Balísticos',
    periodoAnterior: 5000,
    periodoActual: 4000,
  },
  {
    id: 'pistolas',
    label: 'Pistolas Cal 9mm',
    periodoAnterior: 1000,
    periodoActual: 1000,
  },
];

// Adquisiciones 2024
export const adquisiciones2024 = [
  {
    caracteristica: 'Chalecos Balísticos',
    cantidad: 4500,
    marca: 'Delta V-stop3',
  },
  { caracteristica: 'Escopetas 12/70', cantidad: 150, marca: 'Bersa' },
  { caracteristica: 'Pistolas Cal 9mm', cantidad: 775, marca: 'Bersa' },
];

// Adquisiciones 2025
export const adquisiciones2025 = [
  {
    caracteristica: 'Armas Menos Letales',
    cantidad: 44,
    marca: 'Taser 7',
    fecha: 'mar-25',
  },
  {
    caracteristica: 'Armas Menos Letales',
    cantidad: 189,
    marca: 'Byrna Mission 4',
    fecha: 'abr-25',
  },
  {
    caracteristica: 'Armas Menos Letales',
    cantidad: 300,
    marca: 'Byrna (cortas)',
    fecha: 'jun-25',
  },
  {
    caracteristica: 'Pistola Cal 9mm',
    cantidad: 500,
    marca: 'Bersa',
    fecha: 'jun-25',
  },
];

// Vehículos en servicio/fuera de servicio
export const vehiculos2024: FilaComparativa[] = [
  { id: 'autobomba', label: 'Autobomba', periodoAnterior: 0, periodoActual: 5 },
  {
    id: 'automovil',
    label: 'Automóvil',
    periodoAnterior: 36,
    periodoActual: 32,
  },
  { id: 'camion', label: 'Camión', periodoAnterior: 3, periodoActual: 1 },
  {
    id: 'camion_guinche',
    label: 'Camión Guinche',
    periodoAnterior: 1,
    periodoActual: 0,
  },
  {
    id: 'camioneta',
    label: 'Camioneta',
    periodoAnterior: 187,
    periodoActual: 72,
  },
  { id: 'cuatri', label: 'Cuatri', periodoAnterior: 0, periodoActual: 4 },
  { id: 'furgon', label: 'Furgón', periodoAnterior: 7, periodoActual: 7 },
  {
    id: 'motocicleta',
    label: 'Motocicleta',
    periodoAnterior: 359,
    periodoActual: 254,
  },
];

export const vehiculos2025 = {
  autobomba: { enServicio: 1, fueraServicio: 4 },
  automovil: { enServicio: 32, fueraServicio: 40 },
  camion: { enServicio: 3, fueraServicio: 1 },
  camionGuinche: { enServicio: 0, fueraServicio: 1 },
  camioneta: { enServicio: 241, fueraServicio: 93 },
  cuatri: { enServicio: 0, fueraServicio: 4 },
  furgon: { enServicio: 11, fueraServicio: 9 },
  motocicleta: { enServicio: 342, fueraServicio: 286 },
  total2024: { enServicio: 592, fueraServicio: 374 },
  total2025: { enServicio: 630, fueraServicio: 438 },
};

// Vehículos Ministerio de Seguridad
export const vehiculosMinisterio: FilaComparativa[] = [
  {
    id: 'camioneta',
    label: 'Camioneta',
    periodoAnterior: 11,
    periodoActual: 11,
  },
  {
    id: 'motocicleta',
    label: 'Motocicleta',
    periodoAnterior: 2,
    periodoActual: 0,
  },
  { id: 'autos', label: 'Autos', periodoAnterior: 1, periodoActual: 2 },
];

// Sistema de rastreo
export const sistemaRastreo = [
  {
    mes: 'Enero',
    año2024: {
      camFurgon: 271,
      motos: 491,
      autos: 55,
      camion: 6,
      totalFact: 824,
      totalParque: 1017,
    },
    año2025: {
      camFurgon: 307,
      motos: 573,
      autos: 59,
      camion: 6,
      totalFact: 946,
      totalParque: 1053,
    },
  },
  {
    mes: 'Febrero',
    año2024: {
      camFurgon: 274,
      motos: 491,
      autos: 55,
      camion: 6,
      totalFact: 827,
      totalParque: 1017,
    },
    año2025: {
      camFurgon: 321,
      motos: 573,
      autos: 59,
      camion: 6,
      totalFact: 960,
      totalParque: 1053,
    },
  },
  {
    mes: 'Marzo',
    año2024: {
      camFurgon: 271,
      motos: 491,
      autos: 55,
      camion: 6,
      totalFact: 824,
      totalParque: 1017,
    },
    año2025: {
      camFurgon: 321,
      motos: 573,
      autos: 59,
      camion: 6,
      totalFact: 960,
      totalParque: 1053,
    },
  },
  {
    mes: 'Abril',
    año2024: {
      camFurgon: 272,
      motos: 518,
      autos: 56,
      camion: 6,
      totalFact: 853,
      totalParque: 1017,
    },
    año2025: {
      camFurgon: 322,
      motos: 573,
      autos: 59,
      camion: 6,
      totalFact: 961,
      totalParque: 1053,
    },
  },
  {
    mes: 'Mayo',
    año2024: {
      camFurgon: 272,
      motos: 518,
      autos: 56,
      camion: 6,
      totalFact: 854,
      totalParque: 1017,
    },
    año2025: {
      camFurgon: 322,
      motos: 573,
      autos: 59,
      camion: 6,
      totalFact: 961,
      totalParque: 1053,
    },
  },
  {
    mes: 'Junio',
    año2024: {
      camFurgon: 326,
      motos: 519,
      autos: 57,
      camion: 6,
      totalFact: 909,
      totalParque: 1017,
    },
    año2025: {
      camFurgon: 322,
      motos: 573,
      autos: 59,
      camion: 6,
      totalFact: 961,
      totalParque: 1053,
    },
  },
  {
    mes: 'Julio',
    año2024: {
      camFurgon: 326,
      motos: 519,
      autos: 57,
      camion: 6,
      totalFact: 908,
      totalParque: 1017,
    },
    año2025: {
      camFurgon: 323,
      motos: 572,
      autos: 60,
      camion: 6,
      totalFact: 962,
      totalParque: 1071,
    },
  },
];

// Datos para gráficos
export const datosGraficoArmamento = [
  { nombre: 'Escopetas', anterior: 639, actual: 780 },
  { nombre: 'Chalecos', anterior: 5800, actual: 7300 },
  { nombre: 'Pistolas 9mm', anterior: 12585, actual: 13860 },
];

export const datosGraficoDistribucionArmamento = [
  { nombre: 'Pistolas 9mm', valor: 13860, color: '#1e3a5f' },
  { nombre: 'Chalecos Balísticos', valor: 7300, color: '#d69e2e' },
  { nombre: 'Escopetas', valor: 780, color: '#0ea5e9' },
  { nombre: 'Armas Menos Letales', valor: 533, color: '#22c55e' },
];

export const datosGraficoVehiculos = [
  { nombre: 'Camionetas', anterior: 259, actual: 334 },
  { nombre: 'Motocicletas', anterior: 613, actual: 628 },
  { nombre: 'Automóviles', anterior: 68, actual: 72 },
];
