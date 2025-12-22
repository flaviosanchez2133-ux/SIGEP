// Datos del Departamento Personal (D-1) - Extraídos de las imágenes
import { FilaComparativa } from '../components';

// Datos generales de personal
export const datosGeneralesPersonal: FilaComparativa[] = [
  {
    id: 'fuerza_efectiva',
    label: 'Fuerza Efectiva',
    periodoAnterior: 11287,
    periodoActual: 12186,
  },
  {
    id: 'densidad_poblacional',
    label: 'Densidad Poblacional (Censo 2022)',
    periodoAnterior: 1731820,
    periodoActual: 1731820,
    editable: false,
  },
];

export const personalPorTipo: FilaComparativa[] = [
  {
    id: 'superior',
    label: 'Superior (OF)',
    periodoAnterior: 1494,
    periodoActual: 1566,
  },
  {
    id: 'subalterno',
    label: 'Subalterno (SUBOF)',
    periodoAnterior: 9781,
    periodoActual: 10620,
  },
];

export const personalPorGenero: FilaComparativa[] = [
  {
    id: 'masculino',
    label: 'Masculino',
    periodoAnterior: 8616,
    periodoActual: 9334,
  },
  {
    id: 'femenino',
    label: 'Femenino',
    periodoAnterior: 2661,
    periodoActual: 2854,
  },
];

// Cuadro de Oficiales por Jerarquía
export const oficialesSuperiores: FilaComparativa[] = [
  {
    id: 'comisario_general',
    label: 'Comisario General',
    periodoAnterior: 5,
    periodoActual: 17,
  },
  {
    id: 'comisario_mayor',
    label: 'Comisario Mayor',
    periodoAnterior: 20,
    periodoActual: 35,
  },
  {
    id: 'comisario_inspector',
    label: 'Comisario Inspector',
    periodoAnterior: 46,
    periodoActual: 65,
  },
];

export const oficialesJefes: FilaComparativa[] = [
  {
    id: 'comisario_principal',
    label: 'Comisario Principal',
    periodoAnterior: 95,
    periodoActual: 112,
  },
  {
    id: 'comisario',
    label: 'Comisario',
    periodoAnterior: 145,
    periodoActual: 179,
  },
  {
    id: 'subcomisario',
    label: 'Subcomisario',
    periodoAnterior: 222,
    periodoActual: 231,
  },
];

export const oficialesSubalternos: FilaComparativa[] = [
  {
    id: 'oficial_principal',
    label: 'Oficial Principal',
    periodoAnterior: 267,
    periodoActual: 258,
  },
  {
    id: 'oficial_auxiliar',
    label: 'Oficial Auxiliar',
    periodoAnterior: 126,
    periodoActual: 201,
  },
  {
    id: 'oficial_ayudante',
    label: 'Oficial Ayudante',
    periodoAnterior: 257,
    periodoActual: 234,
  },
  {
    id: 'oficial_subayudante',
    label: 'Oficial Subayudante',
    periodoAnterior: 313,
    periodoActual: 234,
  },
];

// Resumen Cuadro Oficiales
export const resumenOficiales: FilaComparativa[] = [
  {
    id: 'of_superiores',
    label: 'Oficiales Superiores',
    periodoAnterior: 71,
    periodoActual: 117,
  },
  {
    id: 'of_jefes',
    label: 'Oficiales Jefes',
    periodoAnterior: 462,
    periodoActual: 522,
  },
  {
    id: 'of_subalternos',
    label: 'Oficiales Subalternos',
    periodoAnterior: 963,
    periodoActual: 927,
  },
];

// Cuadro de Suboficiales por Jerarquía
export const suboficialesSuperiores: FilaComparativa[] = [
  {
    id: 'suboficial_mayor',
    label: 'Suboficial Mayor',
    periodoAnterior: 75,
    periodoActual: 160,
  },
  {
    id: 'suboficial_principal',
    label: 'Suboficial Principal',
    periodoAnterior: 177,
    periodoActual: 297,
  },
  {
    id: 'sargento_ayudante',
    label: 'Sargento Ayudante',
    periodoAnterior: 423,
    periodoActual: 599,
  },
  {
    id: 'sargento_primero',
    label: 'Sargento Primero',
    periodoAnterior: 837,
    periodoActual: 974,
  },
];

export const suboficialesSubalternos: FilaComparativa[] = [
  {
    id: 'sargento',
    label: 'Sargento',
    periodoAnterior: 1341,
    periodoActual: 1461,
  },
  {
    id: 'cabo_primero',
    label: 'Cabo Primero',
    periodoAnterior: 1962,
    periodoActual: 2065,
  },
  { id: 'cabo', label: 'Cabo', periodoAnterior: 1966, periodoActual: 1769 },
];

export const tropaPTP: FilaComparativa[] = [
  { id: 'agente', label: 'Agente', periodoAnterior: 721, periodoActual: 98 },
  { id: 'ptp', label: 'P.T.P.', periodoAnterior: 2289, periodoActual: 3197 },
];

// Resumen Cuadro Suboficiales
export const resumenSuboficiales: FilaComparativa[] = [
  {
    id: 'subof_superiores',
    label: 'Suboficiales Superiores',
    periodoAnterior: 1512,
    periodoActual: 2030,
  },
  {
    id: 'subof_subalternos',
    label: 'Suboficiales Subalternos',
    periodoAnterior: 5269,
    periodoActual: 5295,
  },
  { id: 'tropa', label: 'Tropa', periodoAnterior: 721, periodoActual: 98 },
  { id: 'ptp', label: 'PTP', periodoAnterior: 2289, periodoActual: 3197 },
];

// Personal por Dependencia (Departamentos y DDGG)
export const personalPorDependencia: FilaComparativa[] = [
  {
    id: 'depto_central',
    label: 'Departamento Central',
    periodoAnterior: 339,
    periodoActual: 394,
  },
  {
    id: 'depto_personal_d1',
    label: 'Departamento Personal D-1',
    periodoAnterior: 147,
    periodoActual: 191,
  },
  {
    id: 'depto_inteligencia_d2',
    label: 'Departamento Inteligencia Criminal D-2',
    periodoAnterior: 117,
    periodoActual: 135,
  },
  {
    id: 'depto_operaciones_d3',
    label: 'Departamento Operaciones Policiales D-3',
    periodoAnterior: 92,
    periodoActual: 115,
  },
  {
    id: 'depto_logistica_d4',
    label: 'Departamento Logística D-4',
    periodoAnterior: 240,
    periodoActual: 250,
  },
  {
    id: 'depto_judicial_d5',
    label: 'Departamento Judiciales D-5',
    periodoAnterior: 174,
    periodoActual: 180,
  },
  {
    id: 'dg_policia_adicional',
    label: 'Dirección General Policía Adicional',
    periodoAnterior: 34,
    periodoActual: 35,
  },
  {
    id: 'dg_asuntos_internos',
    label: 'Direc. Gral. Asuntos Internos Policiales',
    periodoAnterior: 33,
    periodoActual: 35,
  },
  {
    id: 'dg_relaciones',
    label: 'Direc. Gral. Relaciones Policiales e Instit.',
    periodoAnterior: 63,
    periodoActual: 72,
  },
  {
    id: 'dg_institutos',
    label: 'Direc. Gral. Institutos e Instrucción',
    periodoAnterior: 252,
    periodoActual: 1163,
  },
  {
    id: 'dg_investigacion',
    label: 'Direc. Gral. Investig. Criminal y Del. Complejos',
    periodoAnterior: 390,
    periodoActual: 399,
  },
  {
    id: 'dg_trata',
    label: 'Direc. Gral. Trata Personas y Violenc. Género',
    periodoAnterior: 119,
    periodoActual: 111,
  },
  {
    id: 'dg_seguridad_judicial',
    label: 'Direc. Gral. Seguridad Poder Judicial',
    periodoAnterior: 288,
    periodoActual: 292,
  },
  {
    id: 'dg_drogas',
    label: 'Direc. Gral. Drogas Peligrosas',
    periodoAnterior: 189,
    periodoActual: 215,
  },
  {
    id: 'dg_bomberos',
    label: 'Direc. Gral. Bomberos',
    periodoAnterior: 111,
    periodoActual: 108,
  },
  {
    id: 'dg_delitos_rurales',
    label: 'Direc. Gral. Delitos Rurales y Ambientales',
    periodoAnterior: 129,
    periodoActual: 145,
  },
  {
    id: 'dg_policia_cientifica',
    label: 'Direc. Gral. Policía Científica',
    periodoAnterior: 342,
    periodoActual: 337,
  },
  {
    id: 'dg_prevencion',
    label: 'Direc. Gral. Prevención Ciudadana',
    periodoAnterior: 3646,
    periodoActual: 3313,
  },
  {
    id: 'dg_unidades_especiales',
    label: 'Direc. Gral. Unidades Especiales',
    periodoAnterior: 26,
    periodoActual: 35,
  },
  {
    id: 'dg_fuerzas_especiales',
    label: 'Direc. Fuerzas Especiales',
    periodoAnterior: 0,
    periodoActual: 35,
  },
  {
    id: 'dg_seguridad_vial',
    label: 'Direc. Seguridad Vial',
    periodoAnterior: 179,
    periodoActual: 175,
  },
];

// Personal por Dependencia (Divisiones, UURR, otros)
export const personalPorDivision: FilaComparativa[] = [
  {
    id: 'div_seguridad_vial',
    label: 'División Policía Seguridad Vial',
    periodoAnterior: 90,
    periodoActual: 98,
  },
  {
    id: 'div_canes',
    label: 'División Canes',
    periodoAnterior: 16,
    periodoActual: 18,
  },
  {
    id: 'div_enduro',
    label: 'División Operaciones Enduro y Rescate',
    periodoAnterior: 5,
    periodoActual: 5,
  },
  {
    id: 'div_motorizadas',
    label: 'División Operaciones Motorizadas Tuc',
    periodoAnterior: 77,
    periodoActual: 80,
  },
  {
    id: 'div_equinos',
    label: 'División Equinos',
    periodoAnterior: 36,
    periodoActual: 35,
  },
  {
    id: 'cero',
    label: 'Cuerpo Especial Rescate y Operaciones',
    periodoAnterior: 59,
    periodoActual: 57,
  },
  {
    id: 'destacamentos',
    label: 'Destacamentos Fronterizos',
    periodoAnterior: 147,
    periodoActual: 144,
  },
  {
    id: 'puesto_chorrillos',
    label: 'Puesto Control Chorrillos',
    periodoAnterior: 8,
    periodoActual: 8,
  },
  {
    id: 'ur_capital',
    label: 'Unidad Regional Capital',
    periodoAnterior: 1024,
    periodoActual: 1032,
  },
  {
    id: 'ur_norte',
    label: 'Unidad Regional Norte',
    periodoAnterior: 539,
    periodoActual: 550,
  },
  {
    id: 'ur_sur',
    label: 'Unidad Regional Sur',
    periodoAnterior: 587,
    periodoActual: 591,
  },
  {
    id: 'ur_este',
    label: 'Unidad Regional Este',
    periodoAnterior: 835,
    periodoActual: 870,
  },
  {
    id: 'ur_oeste',
    label: 'Unidad Regional Oeste',
    periodoAnterior: 620,
    periodoActual: 670,
  },
  {
    id: 'situaciones_especiales',
    label: 'Situaciones Especiales',
    periodoAnterior: 334,
    periodoActual: 324,
  },
];

// Situación Particular de Personal
export const situacionParticular: FilaComparativa[] = [
  {
    id: 'abandono_servicio',
    label: 'Abandono de servicio',
    periodoAnterior: 38,
    periodoActual: 45,
  },
  {
    id: 'aband_serv_pasivo',
    label: 'Aband. Serv. // Pasiv. Proceso',
    periodoAnterior: 1,
    periodoActual: 4,
  },
  {
    id: 'disp_art114_inc1',
    label: 'Disponible Art. 114 inc. 1 ley 3823',
    periodoAnterior: 1,
    periodoActual: 3,
  },
  {
    id: 'disp_art203_inc_a',
    label: 'Disponible Art. 203 inc. A ley 3823',
    periodoAnterior: 1,
    periodoActual: 0,
  },
  {
    id: 'disp_art203_inc_b',
    label: 'Disponible Art. 203 inc. B ley 3823',
    periodoAnterior: 5,
    periodoActual: 8,
  },
  {
    id: 'disp_enf_art114_inc2',
    label: 'Disponible por Enf. Art. 114 inc. 2 Ley 3823',
    periodoAnterior: 35,
    periodoActual: 31,
  },
  {
    id: 'disp_enf_art114_inc2_art',
    label: 'Disponible por Enf. Art. 114 inc. 2 Ley 3823 ART',
    periodoAnterior: 16,
    periodoActual: 9,
  },
  {
    id: 'licencia_sin_goce',
    label: 'Licencia especial sin goce de sueldo',
    periodoAnterior: 10,
    periodoActual: 9,
  },
  {
    id: 'pasivo_enf_art116',
    label: 'Pasivo por Enf. Art. 116 Ley 3823',
    periodoAnterior: 7,
    periodoActual: 7,
  },
  {
    id: 'pasivo_enf_art116_art',
    label: 'Pasivo por Enf. 116 Ley 3823 ART',
    periodoAnterior: 1,
    periodoActual: 2,
  },
  {
    id: 'pasivo_enf_art119_inc1',
    label: 'Pasivo por Enf. Art. 119 inc. 1 Ley 3823',
    periodoAnterior: 37,
    periodoActual: 33,
  },
  {
    id: 'pasivo_enf_art119_inc1_art',
    label: 'Pasivo por Enf. Art. 119 inc. 1 Ley 3823 ART',
    periodoAnterior: 1,
    periodoActual: 5,
  },
  {
    id: 'pasivo_enf_art119_inc5',
    label: 'Pasivo por Enf. Art. 119 inc. 5 Ley 3823',
    periodoAnterior: 66,
    periodoActual: 52,
  },
  {
    id: 'pasivo_enf_art119_inc6',
    label: 'Pasivo por Enf. Art. 119 inc. 6 Ley 3823',
    periodoAnterior: 3,
    periodoActual: 3,
  },
  {
    id: 'renuncia_tramite',
    label: 'Renuncia en trámite',
    periodoAnterior: 13,
    periodoActual: 14,
  },
  {
    id: 'serv_efect_enfermedad',
    label: 'Serv. Efect. Enfermedad Art. 111 inc. 2 Ley 3823',
    periodoAnterior: 26,
    periodoActual: 46,
  },
  {
    id: 'baja_laboral_art',
    label: 'Baja laboral ART',
    periodoAnterior: 73,
    periodoActual: 72,
  },
  {
    id: 'desafectacion_ptp',
    label: 'Desafectación de PTP',
    periodoAnterior: 13,
    periodoActual: 2,
  },
  {
    id: 'desvinculacion_ptp',
    label: 'Desvinculación PTP',
    periodoAnterior: 2,
    periodoActual: 0,
  },
];

// Renuncias Aceptadas
export const renunciasAceptadas = {
  periodo2024: 10,
  periodo2025: 6,
};

// Otras Situaciones
export const otrasSituaciones = {
  jubilaciones2024: 4766,
  pensiones2024: 2489,
  totalOtras: 7255,
};

// Cuadro Comparativo Personal
export const cuadroComparativoPersonal: FilaComparativa[] = [
  {
    id: 'normales',
    label: 'Normales',
    periodoAnterior: 10811,
    periodoActual: 11695,
  },
  {
    id: 'administrativas',
    label: 'Administrativas',
    periodoAnterior: 391,
    periodoActual: 419,
  },
  {
    id: 'baja_laboral_art',
    label: 'Baja Laboral (ART)',
    periodoAnterior: 73,
    periodoActual: 72,
  },
];

// Ascensos y Proyección
export const ascensosProyeccion: FilaComparativa[] = [
  {
    id: 'crio_gral',
    label: 'Crio. Gral.',
    periodoAnterior: 12,
    periodoActual: 9,
  },
  { id: 'crio_my', label: 'Crio. My.', periodoAnterior: 27, periodoActual: 9 },
  {
    id: 'crio_insp',
    label: 'Crio. Insp.',
    periodoAnterior: 46,
    periodoActual: 9,
  },
  {
    id: 'crio_ppal',
    label: 'Crio. Ppal.',
    periodoAnterior: 65,
    periodoActual: 12,
  },
  {
    id: 'comisario',
    label: 'Comisario',
    periodoAnterior: 100,
    periodoActual: 13,
  },
  { id: 'subcrio', label: 'Subcrio.', periodoAnterior: 110, periodoActual: 14 },
  {
    id: 'of_ppal',
    label: 'Of. Ppal.',
    periodoAnterior: 100,
    periodoActual: 29,
  },
  { id: 'of_aux', label: 'Of. Aux.', periodoAnterior: 175, periodoActual: 17 },
  {
    id: 'of_ayte',
    label: 'Of. Ayte.',
    periodoAnterior: 153,
    periodoActual: 13,
  },
  {
    id: 'subof_my',
    label: 'Subof. My.',
    periodoAnterior: 85,
    periodoActual: 12,
  },
  {
    id: 'subof_ppal',
    label: 'Subof. Ppal.',
    periodoAnterior: 208,
    periodoActual: 70,
  },
  {
    id: 'sgto_ayte',
    label: 'Sgto. Ayte.',
    periodoAnterior: 385,
    periodoActual: 365,
  },
  { id: 'sgto_1', label: 'Sgto. 1°', periodoAnterior: 528, periodoActual: 651 },
  { id: 'sgto', label: 'Sgto.', periodoAnterior: 657, periodoActual: 904 },
  { id: 'cabo_1', label: 'Cabo 1°', periodoAnterior: 775, periodoActual: 918 },
  { id: 'cabo', label: 'Cabo', periodoAnterior: 617, periodoActual: 98 },
];

// Datos para gráficos
export const datosGraficoGenero = [
  { nombre: 'Masculino', valor: 9334, color: '#3b82f6' },
  { nombre: 'Femenino', valor: 2854, color: '#ec4899' },
];

export const datosGraficoTipo = [
  { nombre: 'Superior (OF)', valor: 1566, color: '#1e3a5f' },
  { nombre: 'Subalterno (SUBOF)', valor: 10620, color: '#d69e2e' },
];

export const datosGraficoComparativoTipo = [
  { nombre: 'Superior', anterior: 1494, actual: 1566 },
  { nombre: 'Subalterno', anterior: 9781, actual: 10620 },
];

export const datosGraficoRegionales = [
  { nombre: 'Capital', anterior: 1024, actual: 1032 },
  { nombre: 'Norte', anterior: 539, actual: 550 },
  { nombre: 'Sur', anterior: 587, actual: 591 },
  { nombre: 'Este', anterior: 835, actual: 870 },
  { nombre: 'Oeste', anterior: 620, actual: 670 },
];
