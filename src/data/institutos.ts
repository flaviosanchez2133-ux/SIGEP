// Datos de Institutos de Formación
import { FilaComparativa } from '../components';

// Aspirantes en formación
export const aspirantesFormacion: FilaComparativa[] = [
  {
    id: 'cadetes_oficiales',
    label: 'Cadetes (Oficiales)',
    periodoAnterior: 234,
    periodoActual: 267,
  },
  {
    id: 'aspirantes_agentes',
    label: 'Aspirantes a Agentes',
    periodoAnterior: 456,
    periodoActual: 523,
  },
  {
    id: 'aspirantes_auxiliares',
    label: 'Aspirantes Auxiliares',
    periodoAnterior: 123,
    periodoActual: 145,
  },
];

// Egresados por promoción
export const egresados: FilaComparativa[] = [
  {
    id: 'oficiales',
    label: 'Oficiales Egresados',
    periodoAnterior: 89,
    periodoActual: 98,
  },
  {
    id: 'agentes',
    label: 'Agentes Egresados',
    periodoAnterior: 345,
    periodoActual: 412,
  },
  {
    id: 'auxiliares',
    label: 'Auxiliares Egresados',
    periodoAnterior: 78,
    periodoActual: 89,
  },
];

// Cursos de capacitación
export const cursosCapacitacion: FilaComparativa[] = [
  {
    id: 'tiro_policial',
    label: 'Tiro Policial',
    periodoAnterior: 1234,
    periodoActual: 1456,
  },
  {
    id: 'defensa_personal',
    label: 'Defensa Personal',
    periodoAnterior: 567,
    periodoActual: 634,
  },
  {
    id: 'conduccion_evasiva',
    label: 'Conducción Evasiva',
    periodoAnterior: 234,
    periodoActual: 267,
  },
  {
    id: 'primeros_auxilios',
    label: 'Primeros Auxilios',
    periodoAnterior: 345,
    periodoActual: 389,
  },
  {
    id: 'investigacion_criminal',
    label: 'Investigación Criminal',
    periodoAnterior: 123,
    periodoActual: 156,
  },
  {
    id: 'derechos_humanos',
    label: 'Derechos Humanos',
    periodoAnterior: 456,
    periodoActual: 523,
  },
  {
    id: 'violencia_genero',
    label: 'Violencia de Género',
    periodoAnterior: 234,
    periodoActual: 312,
  },
  {
    id: 'informatica_forense',
    label: 'Informática Forense',
    periodoAnterior: 89,
    periodoActual: 112,
  },
];

// Personal capacitado
export const personalCapacitado: FilaComparativa[] = [
  {
    id: 'oficiales',
    label: 'Oficiales',
    periodoAnterior: 567,
    periodoActual: 634,
  },
  {
    id: 'suboficiales',
    label: 'Suboficiales',
    periodoAnterior: 1234,
    periodoActual: 1456,
  },
  {
    id: 'agentes',
    label: 'Agentes',
    periodoAnterior: 2345,
    periodoActual: 2678,
  },
  {
    id: 'administrativos',
    label: 'Personal Administrativo',
    periodoAnterior: 345,
    periodoActual: 389,
  },
];

// Convenios educativos
export const conveniosEducativos: FilaComparativa[] = [
  {
    id: 'universidades',
    label: 'Universidades',
    periodoAnterior: 5,
    periodoActual: 7,
  },
  {
    id: 'institutos_terciarios',
    label: 'Institutos Terciarios',
    periodoAnterior: 8,
    periodoActual: 10,
  },
  {
    id: 'fuerzas_seguridad',
    label: 'Otras Fuerzas de Seguridad',
    periodoAnterior: 12,
    periodoActual: 15,
  },
  {
    id: 'organismos_internacionales',
    label: 'Organismos Internacionales',
    periodoAnterior: 3,
    periodoActual: 4,
  },
];

// Datos para gráficos
export const datosGraficoAspirantes = [
  { nombre: 'Aspirantes Agentes', anterior: 456, actual: 523 },
  { nombre: 'Cadetes', anterior: 234, actual: 267 },
  { nombre: 'Aspirantes Aux.', anterior: 123, actual: 145 },
];

export const datosGraficoCursos = [
  { nombre: 'Tiro', valor: 1456, color: '#ef4444' },
  { nombre: 'Defensa', valor: 634, color: '#3b82f6' },
  { nombre: 'DD.HH.', valor: 523, color: '#22c55e' },
  { nombre: 'Primeros Aux.', valor: 389, color: '#f97316' },
  { nombre: 'Viol. Género', valor: 312, color: '#8b5cf6' },
];

export const datosGraficoPersonalCapacitado = [
  { nombre: 'Agentes', valor: 2678, color: '#3b82f6' },
  { nombre: 'Suboficiales', valor: 1456, color: '#8b5cf6' },
  { nombre: 'Oficiales', valor: 634, color: '#6366f1' },
  { nombre: 'Administrativos', valor: 389, color: '#a855f7' },
];
