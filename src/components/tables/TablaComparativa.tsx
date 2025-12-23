import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Edit2, Save, X } from 'lucide-react';
import clsx from 'clsx';
import { useDataStore, useAuthStore, useAppStore } from '../../store';

export interface FilaComparativa {
  id: string;
  label: string;
  periodoAnterior: number;
  periodoActual: number;
  editable?: boolean;
}

interface TablaComparativaProps {
  titulo: string;
  tablaId: string; // ID único para identificar la tabla en el store
  departamento: string; // Nombre del departamento para el historial
  color?: string;
  labelPeriodoAnterior?: string;
  labelPeriodoActual?: string;
  filas: FilaComparativa[];
  mostrarTotal?: boolean;
  formatoNumero?: 'entero' | 'decimal' | 'porcentaje' | 'moneda';
  className?: string;
}

export function TablaComparativa({
  titulo,
  tablaId,
  departamento,
  color = '#1e3a5f',
  labelPeriodoAnterior: labelPeriodoAnteriorProp,
  labelPeriodoActual: labelPeriodoActualProp,
  filas: filasOriginales,
  mostrarTotal = true,
  formatoNumero = 'entero',
  className,
}: TablaComparativaProps) {
  const { user } = useAuthStore();
  const { edicionHabilitada, obtenerDatos, actualizarDatos } = useDataStore();
  const { periodoSeleccionado } = useAppStore();

  // Usar labels del store si no se pasan como props
  const labelPeriodoAnterior =
    labelPeriodoAnteriorProp || periodoSeleccionado.anterior.label;
  const labelPeriodoActual =
    labelPeriodoActualProp || periodoSeleccionado.actual.label;

  // Obtener datos del store (editados) o usar los originales
  const filasGuardadas = obtenerDatos(tablaId, filasOriginales);

  const [filas, setFilas] = useState(filasGuardadas);
  const [editando, setEditando] = useState(false);
  const [filasEditadas, setFilasEditadas] = useState(filasGuardadas);

  // Actualizar filas cuando cambien los datos guardados
  useEffect(() => {
    const datosActuales = obtenerDatos(tablaId, filasOriginales);
    setFilas(datosActuales);
    setFilasEditadas(datosActuales);
  }, [tablaId, filasOriginales, obtenerDatos]);

  const formatNumber = (num: number) => {
    switch (formatoNumero) {
      case 'decimal':
        return num.toFixed(2);
      case 'porcentaje':
        return `${num.toFixed(2)}%`;
      case 'moneda':
        return new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS',
          maximumFractionDigits: 0,
        }).format(num);
      default:
        return new Intl.NumberFormat('es-AR').format(num);
    }
  };

  const calcularDiferencia = (anterior: number, actual: number) =>
    actual - anterior;

  const calcularPorcentaje = (anterior: number, actual: number) => {
    if (anterior === 0) return actual > 0 ? 100 : 0;
    return Math.round(((actual - anterior) / anterior) * 100);
  };

  const calcularTotal = (campo: 'periodoAnterior' | 'periodoActual') => {
    return filas.reduce((acc, fila) => acc + fila[campo], 0);
  };

  const handleEdit = () => {
    setFilasEditadas([...filas]);
    setEditando(true);
  };

  const handleSave = () => {
    setFilas(filasEditadas);
    setEditando(false);

    // Guardar en el store con historial
    if (user) {
      actualizarDatos(
        tablaId,
        filasEditadas,
        { id: user.id, nombre: user.nombre },
        departamento,
        titulo,
        filasOriginales
      );
    }
  };

  const handleCancel = () => {
    setFilasEditadas(filas);
    setEditando(false);
  };

  const handleChange = (
    id: string,
    campo: 'periodoAnterior' | 'periodoActual',
    valor: string
  ) => {
    const numValue = parseFloat(valor) || 0;
    setFilasEditadas(prev =>
      prev.map(fila => (fila.id === id ? { ...fila, [campo]: numValue } : fila))
    );
  };

  const filasRender = editando ? filasEditadas : filas;
  const totalAnterior = calcularTotal('periodoAnterior');
  const totalActual = calcularTotal('periodoActual');

  return (
    <div className={clsx('card overflow-hidden', className)}>
      {/* Header */}
      <div
        className="px-6 py-4 text-white flex items-center justify-between"
        style={{ backgroundColor: color }}
      >
        <h3 className="font-semibold text-lg">{titulo}</h3>
        {edicionHabilitada && (
          <div className="flex items-center gap-2">
            {editando ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  title="Guardar"
                >
                  <Save size={18} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  title="Cancelar"
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title="Editar"
              >
                <Edit2 size={18} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="table-header">
              <th className="table-cell text-left">Detalle</th>
              <th className="table-cell text-center">{labelPeriodoAnterior}</th>
              <th className="table-cell text-center">{labelPeriodoActual}</th>
              <th className="table-cell text-center">Diferencia</th>
              <th className="table-cell text-center">Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            {filasRender.map(fila => {
              const diferencia = calcularDiferencia(
                fila.periodoAnterior,
                fila.periodoActual
              );
              const porcentaje = calcularPorcentaje(
                fila.periodoAnterior,
                fila.periodoActual
              );

              return (
                <tr
                  key={fila.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="table-cell font-medium text-gray-700">
                    {fila.label}
                  </td>
                  <td className="table-cell text-center">
                    {editando && fila.editable !== false ? (
                      <input
                        type="number"
                        value={fila.periodoAnterior}
                        onChange={e =>
                          handleChange(
                            fila.id,
                            'periodoAnterior',
                            e.target.value
                          )
                        }
                        className="w-24 px-2 py-1 border rounded text-center"
                      />
                    ) : (
                      formatNumber(fila.periodoAnterior)
                    )}
                  </td>
                  <td className="table-cell text-center">
                    {editando && fila.editable !== false ? (
                      <input
                        type="number"
                        value={fila.periodoActual}
                        onChange={e =>
                          handleChange(fila.id, 'periodoActual', e.target.value)
                        }
                        className="w-24 px-2 py-1 border rounded text-center"
                      />
                    ) : (
                      formatNumber(fila.periodoActual)
                    )}
                  </td>
                  <td className="table-cell text-center">
                    <span
                      className={clsx(
                        'px-2 py-1 rounded-full text-sm font-medium',
                        diferencia > 0 && 'bg-green-100 text-green-700',
                        diferencia < 0 && 'bg-red-100 text-red-700',
                        diferencia === 0 && 'bg-gray-100 text-gray-600'
                      )}
                    >
                      {diferencia > 0 ? '+' : ''}
                      {formatNumber(diferencia)}
                    </span>
                  </td>
                  <td className="table-cell text-center">
                    <div className="flex items-center justify-center gap-1">
                      {porcentaje > 0 && (
                        <TrendingUp size={16} className="text-green-600" />
                      )}
                      {porcentaje < 0 && (
                        <TrendingDown size={16} className="text-red-600" />
                      )}
                      {porcentaje === 0 && (
                        <Minus size={16} className="text-gray-400" />
                      )}
                      <span
                        className={clsx(
                          'font-medium',
                          porcentaje > 0 && 'text-green-600',
                          porcentaje < 0 && 'text-red-600',
                          porcentaje === 0 && 'text-gray-500'
                        )}
                      >
                        {porcentaje > 0 ? '+' : ''}
                        {porcentaje}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}

            {/* Fila de total */}
            {mostrarTotal && (
              <tr className="bg-gray-100 font-bold">
                <td className="table-cell">TOTAL</td>
                <td className="table-cell text-center">
                  {formatNumber(totalAnterior)}
                </td>
                <td className="table-cell text-center">
                  {formatNumber(totalActual)}
                </td>
                <td className="table-cell text-center">
                  <span
                    className={clsx(
                      'px-2 py-1 rounded-full text-sm',
                      totalActual - totalAnterior > 0 &&
                        'bg-green-200 text-green-800',
                      totalActual - totalAnterior < 0 &&
                        'bg-red-200 text-red-800',
                      totalActual - totalAnterior === 0 &&
                        'bg-gray-200 text-gray-700'
                    )}
                  >
                    {totalActual - totalAnterior > 0 ? '+' : ''}
                    {formatNumber(totalActual - totalAnterior)}
                  </span>
                </td>
                <td className="table-cell text-center">
                  <span
                    className={clsx(
                      'font-bold',
                      calcularPorcentaje(totalAnterior, totalActual) > 0 &&
                        'text-green-600',
                      calcularPorcentaje(totalAnterior, totalActual) < 0 &&
                        'text-red-600'
                    )}
                  >
                    {calcularPorcentaje(totalAnterior, totalActual) > 0
                      ? '+'
                      : ''}
                    {calcularPorcentaje(totalAnterior, totalActual)}%
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
