// Tipos de usuario y autenticación
export interface User {
  id: string;
  username: string;
  nombre: string;
  departamento: string;
  rol: 'admin' | 'editor' | 'viewer';
  color: string;
  permisos: string[];
}

// Tipos para datos comparativos
export interface DatoComparativo {
  label: string;
  periodoAnterior: number;
  periodoActual: number;
  diferencia: number;
  porcentaje: number;
}

export interface TablaComparativaData {
  titulo: string;
  periodoAnterior: string;
  periodoActual: string;
  filas: DatoComparativo[];
}

// Tipos para períodos
export interface Periodo {
  inicio: string;
  fin: string;
  label: string;
}

// Tipos específicos por departamento
export interface PersonalPorTipo {
  superior: DatoComparativo;
  subalterno: DatoComparativo;
  total: DatoComparativo;
}

export interface PersonalPorGenero {
  masculino: DatoComparativo;
  femenino: DatoComparativo;
  total: DatoComparativo;
}

export interface JerarquiaOficial {
  comisarioGeneral: number;
  comisarioMayor: number;
  comisarioInspector: number;
  comisarioPrincipal: number;
  comisario: number;
  subcomisario: number;
  oficialPrincipal: number;
  oficialAuxiliar: number;
  oficialAyudante: number;
  oficialSubayudante: number;
}

export interface JerarquiaSuboficial {
  suboficialMayor: number;
  suboficialPrincipal: number;
  sargentoAyudante: number;
  sargentoPrimero: number;
  sargento: number;
  caboPrimero: number;
  cabo: number;
  agente: number;
  ptp: number;
}

export interface DependenciaPersonal {
  nombre: string;
  periodoAnterior: number;
  periodoActual: number;
  diferencia: number;
  porcentaje: number;
}

// Tipos para D3 - Operaciones
export interface DelitosPropiedad {
  regional: string;
  periodoAnterior: number;
  periodoActual: number;
  diferencia: number;
  porcentaje: number;
}

export interface Suicidio {
  periodo: string;
  total: number;
  masculino: number;
  femenino: number;
  modalidades: {
    ahorcamiento: number;
    armaFuego: number;
    armaBlanca: number;
    quemaduras: number;
    envenenamiento: number;
    otros: number;
  };
}

export interface Homicidio {
  ambito: string;
  año: number;
  urc: number;
  urn: number;
  urs: number;
  ure: number;
  uro: number;
  totalHechos: number;
  totalVictimas: number;
}

// Tipos para D4 - Logística
export interface Armamento {
  caracteristica: string;
  periodoAnterior: number;
  periodoActual: number;
  diferencia: number;
  porcentaje: number;
}

export interface Vehiculo {
  caracteristica: string;
  año: number;
  enServicio: number;
  fueraServicio: number;
}

export interface SistemaRastreo {
  periodo: string;
  mes: string;
  camiontaFurgon: number;
  motos: number;
  autos: number;
  camion: number;
  totalFacturado: number;
  totalParque: number;
}

// Tipos para D5 - Judicial
export interface DetenidoProcesal {
  regional: string;
  periodoAnterior: number;
  periodoActual: number;
  diferencia: number;
  porcentaje: number;
}

export interface ArmaSecuestrada {
  unidad: string;
  periodoAnterior: number;
  periodoActual: number;
  diferencia: number;
  porcentaje: number;
}

// Tipos para DIGEDROP
export interface SustanciaSecuestrada {
  detalle: string;
  unidad: string;
  periodoAnterior: number;
  periodoActual: number;
  diferencia: number;
  porcentaje: number;
}

// Tipos para Unidades Regionales
export interface UnidadRegionalData {
  nombre: string;
  codigo: string;
  color: string;
  privadosLibertad: {
    procesal: DatoComparativo;
    contravencional: DatoComparativo;
    capturas: DatoComparativo;
    total: DatoComparativo;
  };
  allanamientos: {
    positivos: DatoComparativo;
    negativos: DatoComparativo;
    total: DatoComparativo;
  };
  vehiculosSecuestrados: {
    automoviles: DatoComparativo;
    motocicletas: DatoComparativo;
    camionetas: DatoComparativo;
    otros: DatoComparativo;
    total: DatoComparativo;
  };
  vehiculosAdulterados?: {
    automoviles: DatoComparativo;
    motocicletas: DatoComparativo;
    camionetas: DatoComparativo;
    otros: DatoComparativo;
    total: DatoComparativo;
  };
}

// Tipos para navegación
export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  color: string;
  children?: MenuItem[];
}

// Tipos para gráficos
export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface BarChartData {
  name: string;
  periodoAnterior: number;
  periodoActual: number;
}

// Tipos para exportación
export interface ExportConfig {
  titulo: string;
  subtitulo?: string;
  periodo: string;
  departamento: string;
  fecha: string;
}
