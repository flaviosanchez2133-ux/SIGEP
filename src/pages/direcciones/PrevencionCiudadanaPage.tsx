import { Eye, Car, FileText, Users, Shield } from 'lucide-react';
import {
  PageHeader,
  SectionHeader,
  StatCard,
  TablaComparativa,
  ExportButtons,
  ChartContainer,
  BarChartComparativo,
  PieChartComponent,
} from '../../components';
import {
  operativosPrevencion,
  actasLabradas,
  personasIdentificadas,
  vehiculosControlados,
  datosGraficoOperativos,
  datosGraficoActas,
} from '../../data/prevencion-ciudadana';

const COLOR_PREV = '#f97316';

export function PrevencionCiudadanaPage() {
  // Calcular totales
  const totalOperativos2024 = operativosPrevencion.reduce(
    (acc, o) => acc + o.periodoAnterior,
    0
  );
  const totalOperativos2025 = operativosPrevencion.reduce(
    (acc, o) => acc + o.periodoActual,
    0
  );
  const porcentajeOperativos = Math.round(
    ((totalOperativos2025 - totalOperativos2024) / totalOperativos2024) * 100
  );

  const totalActas = actasLabradas.reduce((acc, a) => acc + a.periodoActual, 0);
  const totalPersonas = personasIdentificadas.reduce(
    (acc, p) => acc + p.periodoActual,
    0
  );
  const totalVehiculos = vehiculosControlados.reduce(
    (acc, v) => acc + v.periodoActual,
    0
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="Dirección General de Prevención Ciudadana"
        subtitulo="Operativos preventivos y control urbano"
        color={COLOR_PREV}
        icon={<Eye size={24} />}
      >
        <ExportButtons
          titulo="Prevencion_Ciudadana"
          datos={operativosPrevencion}
          departamento="Dir. Gral. Prevención Ciudadana"
        />
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Operativos Totales"
          valor={totalOperativos2025}
          valorAnterior={totalOperativos2024}
          porcentaje={porcentajeOperativos}
          color={COLOR_PREV}
          icon={<Shield size={20} />}
        />
        <StatCard
          titulo="Actas Labradas"
          valor={totalActas}
          valorAnterior={8146}
          porcentaje={14}
          color="#dc2626"
          icon={<FileText size={20} />}
        />
        <StatCard
          titulo="Personas Identificadas"
          valor={totalPersonas}
          valorAnterior={37899}
          porcentaje={14}
          color="#3b82f6"
          icon={<Users size={20} />}
        />
        <StatCard
          titulo="Vehículos Controlados"
          valor={totalVehiculos}
          valorAnterior={64935}
          porcentaje={13}
          color="#059669"
          icon={<Car size={20} />}
        />
      </div>

      {/* Operativos */}
      <SectionHeader titulo="OPERATIVOS DE PREVENCIÓN" color={COLOR_PREV} />

      <TablaComparativa
        titulo="TIPO DE OPERATIVOS"
        tablaId="prevencion-ciudadana-tipo-operativos"
        departamento="Prevención Ciudadana"
        color={COLOR_PREV}
        filas={operativosPrevencion}
      />

      <ChartContainer titulo="Comparativo Operativos de Prevención">
        <BarChartComparativo
          datos={datosGraficoOperativos}
          colorAnterior="#94a3b8"
          colorActual={COLOR_PREV}
        />
      </ChartContainer>

      {/* Actas */}
      <SectionHeader titulo="ACTAS LABRADAS" color={COLOR_PREV} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="ACTAS POR TIPO"
          tablaId="prevencion-ciudadana-actas-tipo"
          departamento="Prevención Ciudadana"
          color={COLOR_PREV}
          filas={actasLabradas}
        />

        <ChartContainer titulo="Distribución de Actas (2025)">
          <PieChartComponent datos={datosGraficoActas} />
        </ChartContainer>
      </div>

      {/* Personas y Vehículos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SectionHeader titulo="PERSONAS IDENTIFICADAS" color={COLOR_PREV} />
          <TablaComparativa
            titulo="IDENTIFICACIONES POR CONTEXTO"
            tablaId="prevencion-ciudadana-identificaciones-contexto"
            departamento="Prevención Ciudadana"
            color={COLOR_PREV}
            filas={personasIdentificadas}
          />
        </div>

        <div>
          <SectionHeader titulo="VEHÍCULOS CONTROLADOS" color={COLOR_PREV} />
          <TablaComparativa
            titulo="CONTROLES VEHICULARES"
            tablaId="prevencion-ciudadana-controles-vehiculares"
            departamento="Prevención Ciudadana"
            color={COLOR_PREV}
            filas={vehiculosControlados}
          />
        </div>
      </div>

      {/* Resumen */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: COLOR_PREV, color: 'white' }}
        >
          IMPACTO EN LA SEGURIDAD CIUDADANA
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <p className="text-sm text-orange-600 mb-1">
                Incremento Patrullajes
              </p>
              <p className="text-2xl font-bold text-orange-700">+10%</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-blue-600 mb-1">
                Más Personas Controladas
              </p>
              <p className="text-2xl font-bold text-blue-700">+14%</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-sm text-green-600 mb-1">
                Mayor Presencia en Eventos
              </p>
              <p className="text-2xl font-bold text-green-700">+19%</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg text-center">
              <p className="text-sm text-red-600 mb-1">
                Saturaciones Realizadas
              </p>
              <p className="text-2xl font-bold text-red-700">+23%</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">
              <strong>Estrategia:</strong> El incremento en operativos de
              saturación y presencia en eventos masivos contribuye directamente
              a la disuasión del delito y mejora la percepción de seguridad
              ciudadana.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
