import { useAppStore } from '../store/appStore';

// Re-exportar el tipo para uso externo
export type { PeriodoConfig } from '../store/appStore';

/**
 * Hook centralizado para acceder a la configuración de períodos
 * Proporciona funciones de utilidad para formatear y manipular fechas
 */
export function usePeriodo() {
  const { periodoSeleccionado, setPeriodo } = useAppStore();

  /**
   * Obtiene el label formateado del período anterior
   */
  const labelPeriodoAnterior = periodoSeleccionado.anterior.label;

  /**
   * Obtiene el label formateado del período actual
   */
  const labelPeriodoActual = periodoSeleccionado.actual.label;

  /**
   * Obtiene el label combinado para exportaciones
   * Formato: "01/01/24 - 31/07/24 vs 01/01/25 - 31/07/25"
   */
  const labelPeriodoCompleto = `${labelPeriodoAnterior} vs ${labelPeriodoActual}`;

  /**
   * Obtiene las fechas del período anterior en formato Date
   */
  const getPeriodoAnteriorDates = () => ({
    inicio: new Date(periodoSeleccionado.anterior.inicio + 'T00:00:00'),
    fin: new Date(periodoSeleccionado.anterior.fin + 'T23:59:59'),
  });

  /**
   * Obtiene las fechas del período actual en formato Date
   */
  const getPeriodoActualDates = () => ({
    inicio: new Date(periodoSeleccionado.actual.inicio + 'T00:00:00'),
    fin: new Date(periodoSeleccionado.actual.fin + 'T23:59:59'),
  });

  /**
   * Obtiene los parámetros de query para el backend
   */
  const getQueryParams = () => ({
    periodoAnteriorInicio: periodoSeleccionado.anterior.inicio,
    periodoAnteriorFin: periodoSeleccionado.anterior.fin,
    periodoActualInicio: periodoSeleccionado.actual.inicio,
    periodoActualFin: periodoSeleccionado.actual.fin,
  });

  /**
   * Actualiza solo el período anterior
   */
  const setPeriodoAnterior = (inicio: string, fin: string) => {
    const label = formatToLabel(inicio, fin);
    setPeriodo({
      ...periodoSeleccionado,
      anterior: { inicio, fin, label },
    });
  };

  /**
   * Actualiza solo el período actual
   */
  const setPeriodoActual = (inicio: string, fin: string) => {
    const label = formatToLabel(inicio, fin);
    setPeriodo({
      ...periodoSeleccionado,
      actual: { inicio, fin, label },
    });
  };

  return {
    // Período completo
    periodoSeleccionado,
    setPeriodo,

    // Labels formateados
    labelPeriodoAnterior,
    labelPeriodoActual,
    labelPeriodoCompleto,

    // Funciones de utilidad
    getPeriodoAnteriorDates,
    getPeriodoActualDates,
    getQueryParams,
    setPeriodoAnterior,
    setPeriodoActual,
  };
}

/**
 * Formatea fechas YYYY-MM-DD a label DD/MM/YY - DD/MM/YY
 */
function formatToLabel(inicio: string, fin: string): string {
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr + 'T00:00:00');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  return `${formatDate(inicio)} - ${formatDate(fin)}`;
}
