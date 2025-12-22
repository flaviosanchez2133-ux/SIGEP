import { Search, FileSearch, Users, Target } from 'lucide-react';
import {
  PageHeader,
  SectionHeader,
  StatCard,
  TablaComparativa,
  ExportButtons,
  ChartContainer,
  BarChartComparativo,
} from '../../components';
import {
  privadosLibertadD2,
  procedimientosD2,
  secuestrosD2,
  datosGraficoProcedimientosD2,
} from '../../data/d2-inteligencia';

const COLOR_D2 = '#8B4513';

export function D2InteligenciaPage() {
  // Calcular totales para las stat cards
  const totalProcedimientos = procedimientosD2.find(
    p => p.id === 'procedimientos'
  );
  const totalPrivados = privadosLibertadD2.reduce(
    (acc, p) => acc + p.periodoActual,
    0
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="Departamento Inteligencia Criminal (D-2)"
        subtitulo="Estadísticas de investigaciones e inteligencia criminal"
        color={COLOR_D2}
        icon={<Search size={24} />}
      >
        <ExportButtons
          titulo="Inteligencia_Criminal"
          datos={procedimientosD2}
          departamento="Departamento Inteligencia Criminal (D-2)"
          periodo="01/01/24 - 31/07/24 vs 01/01/25 - 31/07/25"
        />
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Procedimientos Realizados"
          valor={totalProcedimientos?.periodoActual || 26}
          valorAnterior={totalProcedimientos?.periodoAnterior || 12}
          porcentaje={117}
          color={COLOR_D2}
          icon={<Target size={20} />}
        />
        <StatCard
          titulo="Allanamientos Totales"
          valor={56}
          valorAnterior={43}
          porcentaje={30}
          color="#059669"
          icon={<FileSearch size={20} />}
        />
        <StatCard
          titulo="Allanamientos Positivos"
          valor={39}
          valorAnterior={31}
          porcentaje={26}
          color="#3b82f6"
        />
        <StatCard
          titulo="Privados de Libertad"
          valor={totalPrivados}
          valorAnterior={23}
          porcentaje={-9}
          color="#dc2626"
          icon={<Users size={20} />}
        />
      </div>

      {/* Tablas principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="PRIVADOS DE LIBERTAD"
          tablaId="d2-privados-libertad"
          departamento="D2 - Inteligencia"
          color={COLOR_D2}
          filas={privadosLibertadD2}
        />

        <TablaComparativa
          titulo="PROCEDIMIENTOS Y ALLANAMIENTOS"
          tablaId="d2-procedimientos-allanamientos"
          departamento="D2 - Inteligencia"
          color={COLOR_D2}
          filas={procedimientosD2}
        />
      </div>

      {/* Gráfico comparativo */}
      <ChartContainer titulo="Comparativo Procedimientos y Allanamientos">
        <BarChartComparativo
          datos={datosGraficoProcedimientosD2}
          colorAnterior="#94a3b8"
          colorActual={COLOR_D2}
        />
      </ChartContainer>

      {/* Secuestros */}
      <SectionHeader titulo="SECUESTROS REALIZADOS" color={COLOR_D2} />

      <TablaComparativa
        titulo="SECUESTROS POR TIPO"
        tablaId="d2-secuestros-tipo"
        departamento="D2 - Inteligencia"
        color={COLOR_D2}
        filas={secuestrosD2}
      />

      {/* Nota informativa */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: COLOR_D2, color: 'white' }}
        >
          OBSERVACIONES
        </div>
        <div className="card-body">
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <p className="text-amber-800">
                <strong>Nota:</strong> El Departamento D-2 se especializa en
                inteligencia criminal, realizando investigaciones que apoyan a
                otras dependencias en la prevención y esclarecimiento de delitos
                complejos.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">
                  Tasa de Efectividad Allanamientos
                </span>
                <span className="font-bold text-lg text-green-600">70%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Incremento Procedimientos</span>
                <span className="font-bold text-lg text-green-600">+117%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
