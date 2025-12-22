import { useState, useMemo } from 'react';
import {
  History,
  Filter,
  RotateCcw,
  FileSpreadsheet,
  FileText,
  Calendar,
  Building2,
  Table,
  ChevronDown,
  ChevronUp,
  ArrowLeftRight,
} from 'lucide-react';
import { useDataStore, useAuthStore, NOMBRES_MESES } from '../../store';
import type { CambioHistorial } from '../../store';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

type VistaActual = 'historial' | 'snapshots' | 'comparar';
type AgrupadoPor = 'departamento' | 'tabla' | 'fecha';

export function HistorialCambiosPage() {
  const { user } = useAuthStore();
  const {
    historialCambios,
    snapshotsMensuales,
    revertirCambio,
    compararSnapshots,
  } = useDataStore();

  const [vistaActual, setVistaActual] = useState<VistaActual>('historial');
  const [agrupadoPor, setAgrupadoPor] = useState<AgrupadoPor>('departamento');
  const [filtroMes, setFiltroMes] = useState<number | null>(null);
  const [filtroAño, setFiltroAño] = useState<number>(new Date().getFullYear());
  const [filtroDepartamento, setFiltroDepartamento] = useState<string>('');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Para comparación de snapshots
  const [snapshot1, setSnapshot1] = useState<string>('');
  const [snapshot2, setSnapshot2] = useState<string>('');

  // Obtener años únicos del historial
  const añosDisponibles = useMemo(() => {
    const años = new Set(
      historialCambios.map(c => new Date(c.timestamp).getFullYear())
    );
    return Array.from(años).sort((a, b) => b - a);
  }, [historialCambios]);

  // Obtener departamentos únicos
  const departamentosUnicos = useMemo(() => {
    return Array.from(
      new Set(historialCambios.map(c => c.departamento))
    ).sort();
  }, [historialCambios]);

  // Filtrar historial
  const historialFiltrado = useMemo(() => {
    return historialCambios
      .filter(cambio => {
        const fecha = new Date(cambio.timestamp);

        if (filtroMes !== null && fecha.getMonth() + 1 !== filtroMes)
          return false;
        if (fecha.getFullYear() !== filtroAño) return false;
        if (filtroDepartamento && cambio.departamento !== filtroDepartamento)
          return false;

        return true;
      })
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
  }, [historialCambios, filtroMes, filtroAño, filtroDepartamento]);

  // Agrupar historial
  const historialAgrupado = useMemo(() => {
    const grupos: Record<string, CambioHistorial[]> = {};

    historialFiltrado.forEach(cambio => {
      let key = '';
      switch (agrupadoPor) {
        case 'departamento':
          key = cambio.departamento;
          break;
        case 'tabla':
          key = cambio.tabla;
          break;
        case 'fecha':
          key = new Date(cambio.timestamp).toLocaleDateString('es-AR');
          break;
      }

      if (!grupos[key]) grupos[key] = [];
      grupos[key].push(cambio);
    });

    return grupos;
  }, [historialFiltrado, agrupadoPor]);

  const toggleGroup = (group: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(group)) {
      newExpanded.delete(group);
    } else {
      newExpanded.add(group);
    }
    setExpandedGroups(newExpanded);
  };

  const handleRevertir = (cambioId: string) => {
    if (confirm('¿Estás seguro de revertir este cambio?')) {
      revertirCambio(cambioId);
    }
  };

  // Comparación de snapshots
  const resultadoComparacion = useMemo(() => {
    if (!snapshot1 || !snapshot2) return null;
    return compararSnapshots(snapshot1, snapshot2);
  }, [snapshot1, snapshot2, compararSnapshots]);

  // Exportar a PDF
  const exportarPDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(30, 58, 95);
    doc.rect(0, 0, 210, 35, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('SIGEP - Historial de Cambios', 105, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-AR')}`, 105, 25, {
      align: 'center',
    });

    const tableData = historialFiltrado.map(cambio => [
      new Date(cambio.timestamp).toLocaleString('es-AR'),
      cambio.usuario,
      cambio.departamento,
      cambio.tabla,
      cambio.filaLabel,
      cambio.campo === 'periodoAnterior'
        ? 'Período Anterior'
        : 'Período Actual',
      cambio.valorAnterior.toLocaleString('es-AR'),
      cambio.valorNuevo.toLocaleString('es-AR'),
    ]);

    autoTable(doc, {
      head: [
        [
          'Fecha',
          'Usuario',
          'Departamento',
          'Tabla',
          'Fila',
          'Campo',
          'Valor Ant.',
          'Valor Nuevo',
        ],
      ],
      body: tableData,
      startY: 45,
      styles: { fontSize: 7 },
      headStyles: { fillColor: [30, 58, 95] },
    });

    doc.save(`historial_cambios_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Exportar a Excel
  const exportarExcel = () => {
    const wsData = [
      ['SIGEP - Historial de Cambios'],
      [`Generado: ${new Date().toLocaleDateString('es-AR')}`],
      [],
      [
        'Fecha',
        'Usuario',
        'Departamento',
        'Tabla',
        'Fila',
        'Campo',
        'Valor Anterior',
        'Valor Nuevo',
      ],
    ];

    historialFiltrado.forEach(cambio => {
      wsData.push([
        new Date(cambio.timestamp).toLocaleString('es-AR'),
        cambio.usuario,
        cambio.departamento,
        cambio.tabla,
        cambio.filaLabel,
        cambio.campo === 'periodoAnterior'
          ? 'Período Anterior'
          : 'Período Actual',
        cambio.valorAnterior.toString(),
        cambio.valorNuevo.toString(),
      ]);
    });

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Historial');

    XLSX.writeFile(
      wb,
      `historial_cambios_${new Date().toISOString().split('T')[0]}.xlsx`
    );
  };

  const esSuperAdmin =
    user?.id === 'superadmin' || user?.permisos?.includes('all');

  if (!esSuperAdmin) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <History size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">
            Acceso Restringido
          </h2>
          <p className="text-gray-500">
            Solo el superadministrador puede ver el historial de cambios.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
            <History size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Historial de Cambios
            </h1>
            <p className="text-gray-500 text-sm">
              Gestión y seguimiento de modificaciones
            </p>
          </div>
        </div>

        {/* Botones de exportación */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportarPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FileText size={18} />
            <span className="hidden sm:inline">Exportar PDF</span>
          </button>
          <button
            onClick={exportarExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <FileSpreadsheet size={18} />
            <span className="hidden sm:inline">Exportar Excel</span>
          </button>
        </div>
      </div>

      {/* Tabs de navegación */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1 inline-flex">
        <button
          onClick={() => setVistaActual('historial')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            vistaActual === 'historial'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <History size={18} className="inline mr-2" />
          Historial
        </button>
        <button
          onClick={() => setVistaActual('snapshots')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            vistaActual === 'snapshots'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar size={18} className="inline mr-2" />
          Snapshots Mensuales
        </button>
        <button
          onClick={() => setVistaActual('comparar')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            vistaActual === 'comparar'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ArrowLeftRight size={18} className="inline mr-2" />
          Comparar Meses
        </button>
      </div>

      {/* Vista de Historial */}
      {vistaActual === 'historial' && (
        <>
          {/* Filtros */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} className="text-gray-500" />
              <span className="font-medium text-gray-700">Filtros</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Año
                </label>
                <select
                  value={filtroAño}
                  onChange={e => setFiltroAño(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {añosDisponibles.length > 0 ? (
                    añosDisponibles.map(año => (
                      <option key={año} value={año}>
                        {año}
                      </option>
                    ))
                  ) : (
                    <option value={new Date().getFullYear()}>
                      {new Date().getFullYear()}
                    </option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Mes
                </label>
                <select
                  value={filtroMes ?? ''}
                  onChange={e =>
                    setFiltroMes(e.target.value ? Number(e.target.value) : null)
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos</option>
                  {NOMBRES_MESES.map((mes, idx) => (
                    <option key={idx} value={idx + 1}>
                      {mes}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Departamento
                </label>
                <select
                  value={filtroDepartamento}
                  onChange={e => setFiltroDepartamento(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos</option>
                  {departamentosUnicos.map(dep => (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Agrupar por
                </label>
                <select
                  value={agrupadoPor}
                  onChange={e => setAgrupadoPor(e.target.value as AgrupadoPor)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="departamento">Departamento</option>
                  <option value="tabla">Tabla</option>
                  <option value="fecha">Fecha</option>
                </select>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <History size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {historialFiltrado.length}
                  </p>
                  <p className="text-sm text-gray-500">Cambios registrados</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Building2 size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {Object.keys(historialAgrupado).length}
                  </p>
                  <p className="text-sm text-gray-500">
                    {agrupadoPor === 'departamento'
                      ? 'Departamentos'
                      : agrupadoPor === 'tabla'
                      ? 'Tablas'
                      : 'Fechas'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Calendar size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {snapshotsMensuales.length}
                  </p>
                  <p className="text-sm text-gray-500">Snapshots guardados</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de cambios agrupados */}
          <div className="space-y-4">
            {Object.keys(historialAgrupado).length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <History size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-600">
                  No hay cambios registrados
                </h3>
                <p className="text-gray-500">
                  Los cambios aparecerán aquí cuando se editen datos.
                </p>
              </div>
            ) : (
              Object.entries(historialAgrupado).map(([grupo, cambios]) => (
                <div
                  key={grupo}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleGroup(grupo)}
                    className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {agrupadoPor === 'departamento' && (
                        <Building2 size={20} className="text-blue-600" />
                      )}
                      {agrupadoPor === 'tabla' && (
                        <Table size={20} className="text-green-600" />
                      )}
                      {agrupadoPor === 'fecha' && (
                        <Calendar size={20} className="text-purple-600" />
                      )}
                      <span className="font-semibold text-gray-700">
                        {grupo}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {cambios.length} cambios
                      </span>
                    </div>
                    {expandedGroups.has(grupo) ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </button>

                  {expandedGroups.has(grupo) && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-y border-gray-200">
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Fecha
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Usuario
                            </th>
                            {agrupadoPor !== 'tabla' && (
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Tabla
                              </th>
                            )}
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Fila
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                              Campo
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                              Anterior
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                              Nuevo
                            </th>
                            <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                              Acción
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {cambios.map(cambio => (
                            <tr key={cambio.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {new Date(cambio.timestamp).toLocaleString(
                                  'es-AR'
                                )}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                                {cambio.usuario}
                              </td>
                              {agrupadoPor !== 'tabla' && (
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {cambio.tabla}
                                </td>
                              )}
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {cambio.filaLabel}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 text-xs">
                                  {cambio.campo === 'periodoAnterior'
                                    ? 'P. Anterior'
                                    : 'P. Actual'}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">
                                {cambio.valorAnterior.toLocaleString('es-AR')}
                              </td>
                              <td className="px-4 py-3 text-sm text-right text-green-600 font-medium">
                                {cambio.valorNuevo.toLocaleString('es-AR')}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={() => handleRevertir(cambio.id)}
                                  className="p-1 text-orange-600 hover:bg-orange-100 rounded transition-colors"
                                  title="Revertir cambio"
                                >
                                  <RotateCcw size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Vista de Snapshots */}
      {vistaActual === 'snapshots' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">
              Snapshots Mensuales Guardados
            </h2>
            <p className="text-sm text-gray-500">
              Copias de seguridad de los datos por mes
            </p>
          </div>

          {snapshotsMensuales.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-600">
                No hay snapshots guardados
              </h3>
              <p className="text-gray-500">
                Use el botón de guardar en el header para crear un snapshot.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Mes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Año
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Fecha Creación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Creado Por
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Tablas
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {snapshotsMensuales.map(snapshot => (
                    <tr key={snapshot.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {NOMBRES_MESES[snapshot.mes - 1]}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {snapshot.año}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(snapshot.fechaCreacion).toLocaleString(
                          'es-AR'
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {snapshot.creadoPor}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {Object.keys(snapshot.datos).length} tablas
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Vista de Comparación */}
      {vistaActual === 'comparar' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-800 mb-4">
              Comparar Snapshots
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Snapshot 1
                </label>
                <select
                  value={snapshot1}
                  onChange={e => setSnapshot1(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar...</option>
                  {snapshotsMensuales.map(s => (
                    <option key={s.id} value={s.id}>
                      {NOMBRES_MESES[s.mes - 1]} {s.año}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Snapshot 2
                </label>
                <select
                  value={snapshot2}
                  onChange={e => setSnapshot2(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar...</option>
                  {snapshotsMensuales.map(s => (
                    <option key={s.id} value={s.id}>
                      {NOMBRES_MESES[s.mes - 1]} {s.año}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {resultadoComparacion && resultadoComparacion.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <h3 className="font-semibold text-gray-800">
                  Diferencias Encontradas
                </h3>
              </div>

              <div className="divide-y divide-gray-200">
                {resultadoComparacion.map((grupo, idx) => (
                  <div key={idx} className="p-4">
                    <h4 className="font-medium text-gray-700 mb-3">
                      {grupo.tabla}
                    </h4>
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs text-gray-500 uppercase">
                          <th className="text-left py-2">Fila</th>
                          <th className="text-left py-2">Campo</th>
                          <th className="text-right py-2">Snapshot 1</th>
                          <th className="text-right py-2">Snapshot 2</th>
                          <th className="text-right py-2">Diferencia</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grupo.diferencias.map((dif, difIdx) => (
                          <tr key={difIdx} className="text-sm">
                            <td className="py-2 text-gray-700">{dif.fila}</td>
                            <td className="py-2 text-gray-600">{dif.campo}</td>
                            <td className="py-2 text-right text-gray-600">
                              {dif.valor1.toLocaleString('es-AR')}
                            </td>
                            <td className="py-2 text-right text-gray-600">
                              {dif.valor2.toLocaleString('es-AR')}
                            </td>
                            <td
                              className={`py-2 text-right font-medium ${
                                dif.valor2 - dif.valor1 > 0
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {dif.valor2 - dif.valor1 > 0 ? '+' : ''}
                              {(dif.valor2 - dif.valor1).toLocaleString(
                                'es-AR'
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          ) : snapshot1 && snapshot2 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <ArrowLeftRight
                size={48}
                className="mx-auto text-gray-300 mb-4"
              />
              <h3 className="text-lg font-medium text-gray-600">
                Sin diferencias
              </h3>
              <p className="text-gray-500">
                Los snapshots seleccionados son idénticos.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <ArrowLeftRight
                size={48}
                className="mx-auto text-gray-300 mb-4"
              />
              <h3 className="text-lg font-medium text-gray-600">
                Seleccione dos snapshots
              </h3>
              <p className="text-gray-500">
                Elija dos snapshots diferentes para comparar sus datos.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
