import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FilaComparativa } from '../components/tables/TablaComparativa';

// Tipos para el historial
export interface CambioHistorial {
  id: string;
  timestamp: string;
  usuario: string;
  usuarioId: string;
  departamento: string;
  tabla: string;
  tablaId: string;
  filaId: string;
  filaLabel: string;
  campo: 'periodoAnterior' | 'periodoActual';
  valorAnterior: number;
  valorNuevo: number;
}

// Tipos para snapshots mensuales
export interface SnapshotMensual {
  id: string;
  mes: number;
  año: number;
  fechaCreacion: string;
  datos: Record<string, FilaComparativa[]>;
  creadoPor: string;
}

// Tipos para datos editados
export interface DatosEditados {
  [tablaId: string]: FilaComparativa[];
}

interface DataState {
  // Estado de edición global
  edicionHabilitada: boolean;

  // Datos editados (sobrescriben los datos originales)
  datosEditados: DatosEditados;

  // Historial de cambios
  historialCambios: CambioHistorial[];

  // Snapshots mensuales
  snapshotsMensuales: SnapshotMensual[];

  // Acciones de edición
  habilitarEdicion: () => void;
  deshabilitarEdicion: () => void;
  toggleEdicion: () => void;

  // Acciones de datos
  actualizarDatos: (
    tablaId: string,
    filasNuevas: FilaComparativa[],
    usuario: { id: string; nombre: string },
    departamento: string,
    tablaNombre: string,
    filasOriginales: FilaComparativa[]
  ) => void;

  obtenerDatos: (
    tablaId: string,
    datosOriginales: FilaComparativa[]
  ) => FilaComparativa[];

  // Acciones de historial
  revertirCambio: (cambioId: string) => void;
  limpiarHistorial: () => void;
  obtenerHistorialPorTabla: (tablaId: string) => CambioHistorial[];
  obtenerHistorialPorDepartamento: (departamento: string) => CambioHistorial[];
  obtenerHistorialPorMes: (mes: number, año: number) => CambioHistorial[];

  // Acciones de snapshots
  crearSnapshot: (usuario: { id: string; nombre: string }) => void;
  obtenerSnapshot: (mes: number, año: number) => SnapshotMensual | undefined;
  compararSnapshots: (
    snapshot1Id: string,
    snapshot2Id: string
  ) => {
    tabla: string;
    diferencias: {
      fila: string;
      campo: string;
      valor1: number;
      valor2: number;
    }[];
  }[];
}

const generarId = () =>
  `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const getMesActual = () => new Date().getMonth() + 1;
const getAñoActual = () => new Date().getFullYear();

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      edicionHabilitada: false,
      datosEditados: {},
      historialCambios: [],
      snapshotsMensuales: [],

      habilitarEdicion: () => set({ edicionHabilitada: true }),

      deshabilitarEdicion: () => set({ edicionHabilitada: false }),

      toggleEdicion: () =>
        set(state => ({ edicionHabilitada: !state.edicionHabilitada })),

      actualizarDatos: (
        tablaId,
        filasNuevas,
        usuario,
        departamento,
        tablaNombre,
        filasOriginales
      ) => {
        const state = get();
        const filasAnteriores = state.datosEditados[tablaId] || filasOriginales;

        // Crear entradas de historial para cada cambio
        const nuevosCambios: CambioHistorial[] = [];

        filasNuevas.forEach(filaNueva => {
          const filaAnterior = filasAnteriores.find(f => f.id === filaNueva.id);

          if (filaAnterior) {
            // Verificar cambios en periodoAnterior
            if (filaAnterior.periodoAnterior !== filaNueva.periodoAnterior) {
              nuevosCambios.push({
                id: generarId(),
                timestamp: new Date().toISOString(),
                usuario: usuario.nombre,
                usuarioId: usuario.id,
                departamento,
                tabla: tablaNombre,
                tablaId,
                filaId: filaNueva.id,
                filaLabel: filaNueva.label,
                campo: 'periodoAnterior',
                valorAnterior: filaAnterior.periodoAnterior,
                valorNuevo: filaNueva.periodoAnterior,
              });
            }

            // Verificar cambios en periodoActual
            if (filaAnterior.periodoActual !== filaNueva.periodoActual) {
              nuevosCambios.push({
                id: generarId(),
                timestamp: new Date().toISOString(),
                usuario: usuario.nombre,
                usuarioId: usuario.id,
                departamento,
                tabla: tablaNombre,
                tablaId,
                filaId: filaNueva.id,
                filaLabel: filaNueva.label,
                campo: 'periodoActual',
                valorAnterior: filaAnterior.periodoActual,
                valorNuevo: filaNueva.periodoActual,
              });
            }
          }
        });

        set(state => ({
          datosEditados: {
            ...state.datosEditados,
            [tablaId]: filasNuevas,
          },
          historialCambios: [...state.historialCambios, ...nuevosCambios],
        }));
      },

      obtenerDatos: (tablaId, datosOriginales) => {
        const { datosEditados } = get();
        return datosEditados[tablaId] || datosOriginales;
      },

      revertirCambio: cambioId => {
        const state = get();
        const cambio = state.historialCambios.find(c => c.id === cambioId);

        if (!cambio) return;

        const datosTabla = state.datosEditados[cambio.tablaId];
        if (!datosTabla) return;

        const datosActualizados = datosTabla.map(fila => {
          if (fila.id === cambio.filaId) {
            return {
              ...fila,
              [cambio.campo]: cambio.valorAnterior,
            };
          }
          return fila;
        });

        // Crear registro de reversión en historial
        const registroReversion: CambioHistorial = {
          id: generarId(),
          timestamp: new Date().toISOString(),
          usuario: 'Sistema (Reversión)',
          usuarioId: 'system',
          departamento: cambio.departamento,
          tabla: cambio.tabla,
          tablaId: cambio.tablaId,
          filaId: cambio.filaId,
          filaLabel: cambio.filaLabel,
          campo: cambio.campo,
          valorAnterior: cambio.valorNuevo,
          valorNuevo: cambio.valorAnterior,
        };

        set(state => ({
          datosEditados: {
            ...state.datosEditados,
            [cambio.tablaId]: datosActualizados,
          },
          historialCambios: [...state.historialCambios, registroReversion],
        }));
      },

      limpiarHistorial: () => set({ historialCambios: [] }),

      obtenerHistorialPorTabla: tablaId => {
        return get().historialCambios.filter(c => c.tablaId === tablaId);
      },

      obtenerHistorialPorDepartamento: departamento => {
        return get().historialCambios.filter(
          c => c.departamento === departamento
        );
      },

      obtenerHistorialPorMes: (mes, año) => {
        return get().historialCambios.filter(c => {
          const fecha = new Date(c.timestamp);
          return fecha.getMonth() + 1 === mes && fecha.getFullYear() === año;
        });
      },

      crearSnapshot: usuario => {
        const state = get();
        const mes = getMesActual();
        const año = getAñoActual();

        const snapshotExistente = state.snapshotsMensuales.find(
          s => s.mes === mes && s.año === año
        );

        const nuevoSnapshot: SnapshotMensual = {
          id: generarId(),
          mes,
          año,
          fechaCreacion: new Date().toISOString(),
          datos: { ...state.datosEditados },
          creadoPor: usuario.nombre,
        };

        set(state => ({
          snapshotsMensuales: snapshotExistente
            ? state.snapshotsMensuales.map(s =>
                s.mes === mes && s.año === año ? nuevoSnapshot : s
              )
            : [...state.snapshotsMensuales, nuevoSnapshot],
        }));
      },

      obtenerSnapshot: (mes, año) => {
        return get().snapshotsMensuales.find(
          s => s.mes === mes && s.año === año
        );
      },

      compararSnapshots: (snapshot1Id, snapshot2Id) => {
        const state = get();
        const snapshot1 = state.snapshotsMensuales.find(
          s => s.id === snapshot1Id
        );
        const snapshot2 = state.snapshotsMensuales.find(
          s => s.id === snapshot2Id
        );

        if (!snapshot1 || !snapshot2) return [];

        const diferencias: {
          tabla: string;
          diferencias: {
            fila: string;
            campo: string;
            valor1: number;
            valor2: number;
          }[];
        }[] = [];

        const todasLasTablas = new Set([
          ...Object.keys(snapshot1.datos),
          ...Object.keys(snapshot2.datos),
        ]);

        todasLasTablas.forEach(tablaId => {
          const filas1 = snapshot1.datos[tablaId] || [];
          const filas2 = snapshot2.datos[tablaId] || [];
          const diferenciasTabla: {
            fila: string;
            campo: string;
            valor1: number;
            valor2: number;
          }[] = [];

          filas1.forEach(fila1 => {
            const fila2 = filas2.find(f => f.id === fila1.id);
            if (fila2) {
              if (fila1.periodoAnterior !== fila2.periodoAnterior) {
                diferenciasTabla.push({
                  fila: fila1.label,
                  campo: 'Período Anterior',
                  valor1: fila1.periodoAnterior,
                  valor2: fila2.periodoAnterior,
                });
              }
              if (fila1.periodoActual !== fila2.periodoActual) {
                diferenciasTabla.push({
                  fila: fila1.label,
                  campo: 'Período Actual',
                  valor1: fila1.periodoActual,
                  valor2: fila2.periodoActual,
                });
              }
            }
          });

          if (diferenciasTabla.length > 0) {
            diferencias.push({
              tabla: tablaId,
              diferencias: diferenciasTabla,
            });
          }
        });

        return diferencias;
      },
    }),
    {
      name: 'sigep-data-storage',
    }
  )
);

// Nombres de meses para mostrar
export const NOMBRES_MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
