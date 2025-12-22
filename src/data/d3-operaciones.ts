// Datos del Departamento Operaciones Policiales (D-3)
import { FilaComparativa } from '../components';

// Delitos contra la propiedad por regional
export const delitosPropiedad: FilaComparativa[] = [
  {
    id: 'urc',
    label: 'U.R.C (Capital)',
    periodoAnterior: 8786,
    periodoActual: 7906,
  },
  {
    id: 'urn',
    label: 'U.R.N (Norte)',
    periodoAnterior: 2396,
    periodoActual: 2030,
  },
  {
    id: 'urs',
    label: 'U.R.S (Sur)',
    periodoAnterior: 1714,
    periodoActual: 955,
  },
  {
    id: 'ure',
    label: 'U.R.E (Este)',
    periodoAnterior: 2271,
    periodoActual: 1820,
  },
  {
    id: 'uro',
    label: 'U.R.O (Oeste)',
    periodoAnterior: 1618,
    periodoActual: 1458,
  },
];

// Suicidios - Total Provincial
export const suicidiosTotal: FilaComparativa[] = [
  {
    id: 'total_2024',
    label: 'Total 2024',
    periodoAnterior: 100,
    periodoActual: 117,
    editable: false,
  },
];

export const suicidiosPorGenero = {
  periodo2024: { masculino: 71, femenino: 29 },
  periodo2025: { masculino: 95, femenino: 22 },
};

export const suicidiosPorModalidad = {
  periodo2024: {
    ahorcamiento: 84,
    armaFuego: 12,
    armaBlanca: 1,
    quemaduras: 0,
    envenenamiento: 1,
    otros: 2,
  },
  periodo2025: {
    ahorcamiento: 100,
    armaFuego: 13,
    armaBlanca: 3,
    quemaduras: 0,
    envenenamiento: 1,
    otros: 0,
  },
};

// Homicidios dolosos por ámbito
export const homicidiosPorAmbito = [
  {
    ambito: 'AMBITO PUBLICO',
    datos2024: {
      urc: 19,
      urn: 3,
      urs: 1,
      ure: 1,
      uro: 1,
      totalHechos: 27,
      totalVictimas: 29,
    },
    datos2025: {
      urc: 8,
      urn: 2,
      urs: 1,
      ure: 1,
      uro: 1,
      totalHechos: 13,
      totalVictimas: 13,
    },
  },
  {
    ambito: 'AMBITO PRIVADO',
    datos2024: {
      urc: 0,
      urn: 1,
      urs: 0,
      ure: 0,
      uro: 1,
      totalHechos: 2,
      totalVictimas: 2,
    },
    datos2025: {
      urc: 1,
      urn: 0,
      urs: 0,
      ure: 0,
      uro: 0,
      totalHechos: 1,
      totalVictimas: 1,
    },
  },
  {
    ambito: 'VIVIENDA PARTICULAR',
    datos2024: {
      urc: 2,
      urn: 3,
      urs: 1,
      ure: 2,
      uro: 0,
      totalHechos: 8,
      totalVictimas: 8,
    },
    datos2025: {
      urc: 5,
      urn: 0,
      urs: 0,
      ure: 0,
      uro: 0,
      totalHechos: 5,
      totalVictimas: 5,
    },
  },
  {
    ambito: 'CONTEXTO DE ENCIERRO',
    datos2024: {
      urc: 2,
      urn: 0,
      urs: 0,
      ure: 0,
      uro: 0,
      totalHechos: 2,
      totalVictimas: 2,
    },
    datos2025: {
      urc: 0,
      urn: 1,
      urs: 0,
      ure: 1,
      uro: 0,
      totalHechos: 2,
      totalVictimas: 2,
    },
  },
];

export const homicidiosTotales: FilaComparativa[] = [
  {
    id: 'total_homicidios',
    label: 'Total Homicidios Dolosos',
    periodoAnterior: 41,
    periodoActual: 21,
  },
];

// Datos para gráficos
export const datosGraficoDelitosPropiedad = [
  { nombre: 'Capital', anterior: 8786, actual: 7906 },
  { nombre: 'Norte', anterior: 2396, actual: 2030 },
  { nombre: 'Sur', anterior: 1714, actual: 955 },
  { nombre: 'Este', anterior: 2271, actual: 1820 },
  { nombre: 'Oeste', anterior: 1618, actual: 1458 },
];

export const datosGraficoSuicidiosGenero = [
  { nombre: 'Masculino', valor: 95, color: '#3b82f6' },
  { nombre: 'Femenino', valor: 22, color: '#ec4899' },
];

export const datosGraficoModalidadSuicidio = [
  { nombre: 'Ahorcamiento', valor: 100, color: '#1e3a5f' },
  { nombre: 'Arma de Fuego', valor: 13, color: '#dc2626' },
  { nombre: 'Arma Blanca', valor: 3, color: '#f97316' },
  { nombre: 'Envenenamiento', valor: 1, color: '#22c55e' },
];
