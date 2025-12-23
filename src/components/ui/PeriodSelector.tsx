import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';
import { useAppStore, PeriodoConfig } from '../../store/appStore';
import clsx from 'clsx';

// Función para formatear fecha a DD/MM/YY
const formatDateToLabel = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
};

// Función para crear label de período
const createPeriodLabel = (inicio: string, fin: string): string => {
  return `${formatDateToLabel(inicio)} - ${formatDateToLabel(fin)}`;
};

// Función para formatear fecha para input type="date"
const formatDateForInput = (dateStr: string): string => {
  return dateStr; // Ya está en formato YYYY-MM-DD
};

interface PeriodInputProps {
  label: string;
  inicio: string;
  fin: string;
  onChangeInicio: (value: string) => void;
  onChangeFin: (value: string) => void;
  color: string;
}

function PeriodInput({
  label,
  inicio,
  fin,
  onChangeInicio,
  onChangeFin,
  color,
}: PeriodInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Desde</label>
          <input
            type="date"
            value={formatDateForInput(inicio)}
            onChange={e => onChangeInicio(e.target.value)}
            className={clsx(
              'w-full px-2 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2',
              `focus:ring-${color}-500 focus:border-${color}-500`
            )}
            style={{ borderColor: color + '40' }}
          />
        </div>
        <span className="text-gray-400 mt-5">-</span>
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Hasta</label>
          <input
            type="date"
            value={formatDateForInput(fin)}
            onChange={e => onChangeFin(e.target.value)}
            className={clsx(
              'w-full px-2 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2',
              `focus:ring-${color}-500 focus:border-${color}-500`
            )}
            style={{ borderColor: color + '40' }}
          />
        </div>
      </div>
    </div>
  );
}

export function PeriodSelector() {
  const { periodoSeleccionado, setPeriodo } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [tempPeriodo, setTempPeriodo] =
    useState<PeriodoConfig>(periodoSeleccionado);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setTempPeriodo(periodoSeleccionado); // Reset si se cierra sin guardar
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [periodoSeleccionado]);

  // Sincronizar tempPeriodo cuando cambie el período seleccionado
  useEffect(() => {
    setTempPeriodo(periodoSeleccionado);
  }, [periodoSeleccionado]);

  const handleApply = () => {
    // Actualizar labels basados en las fechas
    const periodoActualizado: PeriodoConfig = {
      anterior: {
        ...tempPeriodo.anterior,
        label: createPeriodLabel(
          tempPeriodo.anterior.inicio,
          tempPeriodo.anterior.fin
        ),
      },
      actual: {
        ...tempPeriodo.actual,
        label: createPeriodLabel(
          tempPeriodo.actual.inicio,
          tempPeriodo.actual.fin
        ),
      },
    };

    setPeriodo(periodoActualizado);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempPeriodo(periodoSeleccionado);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200',
          'bg-gray-50 hover:bg-gray-100 border border-gray-200',
          isOpen && 'ring-2 ring-policia-primary ring-offset-1'
        )}
      >
        <Calendar size={18} className="text-policia-primary" />
        <div className="text-sm text-left">
          <span className="text-gray-500">Período: </span>
          <span className="font-medium text-gray-700">
            {periodoSeleccionado.anterior.label} vs{' '}
            {periodoSeleccionado.actual.label}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={clsx(
            'text-gray-400 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[420px] bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-fadeIn">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-xl">
            <h3 className="font-semibold text-gray-800">
              Seleccionar Períodos de Comparación
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Define los rangos de fechas para comparar datos estadísticos
            </p>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4">
            {/* Período Anterior */}
            <PeriodInput
              label="Período Anterior"
              inicio={tempPeriodo.anterior.inicio}
              fin={tempPeriodo.anterior.fin}
              onChangeInicio={value =>
                setTempPeriodo({
                  ...tempPeriodo,
                  anterior: { ...tempPeriodo.anterior, inicio: value },
                })
              }
              onChangeFin={value =>
                setTempPeriodo({
                  ...tempPeriodo,
                  anterior: { ...tempPeriodo.anterior, fin: value },
                })
              }
              color="blue"
            />

            {/* Separador visual */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-xs text-gray-400 font-medium">VS</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Período Actual */}
            <PeriodInput
              label="Período Actual"
              inicio={tempPeriodo.actual.inicio}
              fin={tempPeriodo.actual.fin}
              onChangeInicio={value =>
                setTempPeriodo({
                  ...tempPeriodo,
                  actual: { ...tempPeriodo.actual, inicio: value },
                })
              }
              onChangeFin={value =>
                setTempPeriodo({
                  ...tempPeriodo,
                  actual: { ...tempPeriodo.actual, fin: value },
                })
              }
              color="green"
            />

            {/* Preview */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-blue-600 font-medium mb-1">
                Vista previa:
              </p>
              <p className="text-sm text-blue-800">
                <span className="font-medium">
                  {createPeriodLabel(
                    tempPeriodo.anterior.inicio,
                    tempPeriodo.anterior.fin
                  )}
                </span>
                <span className="mx-2 text-blue-400">vs</span>
                <span className="font-medium">
                  {createPeriodLabel(
                    tempPeriodo.actual.inicio,
                    tempPeriodo.actual.fin
                  )}
                </span>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 text-sm bg-policia-primary text-white rounded-lg hover:bg-policia-secondary transition-colors flex items-center gap-2"
            >
              <Check size={16} />
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
