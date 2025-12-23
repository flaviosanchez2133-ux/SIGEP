import { UserX, FileText, AlertTriangle, Users } from 'lucide-react';
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
  denunciasRecibidas,
  sumariosAdministrativos,
  sancionesAplicadas,
  personalPorJerarquia,
  datosGraficoDenuncias,
  datosGraficoSanciones,
  datosGraficoJerarquia,
} from '../../data/asuntos-internos';

const COLOR_AI = '#0ea5e9';

export function AsuntosInternosPage() {
  // Calcular totales
  const totalDenuncias2024 = denunciasRecibidas.reduce(
    (acc, d) => acc + d.periodoAnterior,
    0
  );
  const totalDenuncias2025 = denunciasRecibidas.reduce(
    (acc, d) => acc + d.periodoActual,
    0
  );
  const porcentajeDenuncias = Math.round(
    ((totalDenuncias2025 - totalDenuncias2024) / totalDenuncias2024) * 100
  );

  const totalSumarios = sumariosAdministrativos.find(s => s.id === 'iniciados');
  const totalSanciones = sancionesAplicadas.reduce(
    (acc, s) => acc + s.periodoActual,
    0
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="Dirección General de Asuntos Internos"
        subtitulo="Control interno y disciplina policial"
        color={COLOR_AI}
        icon={<UserX size={24} />}
      >
        <ExportButtons
          titulo="Asuntos_Internos"
          datos={denunciasRecibidas}
          departamento="Dir. Gral. Asuntos Internos"
        />
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Denuncias Recibidas"
          valor={totalDenuncias2025}
          valorAnterior={totalDenuncias2024}
          porcentaje={porcentajeDenuncias}
          color={COLOR_AI}
          icon={<FileText size={20} />}
        />
        <StatCard
          titulo="Sumarios Iniciados"
          valor={totalSumarios?.periodoActual || 134}
          valorAnterior={totalSumarios?.periodoAnterior || 156}
          porcentaje={-14}
          color="#f97316"
          icon={<AlertTriangle size={20} />}
        />
        <StatCard
          titulo="Sanciones Aplicadas"
          valor={totalSanciones}
          valorAnterior={152}
          porcentaje={-20}
          color="#dc2626"
        />
        <StatCard
          titulo="Personal Investigado"
          valor={267}
          valorAnterior={314}
          porcentaje={-15}
          color="#7c3aed"
          icon={<Users size={20} />}
        />
      </div>

      {/* Denuncias recibidas */}
      <SectionHeader titulo="DENUNCIAS RECIBIDAS POR TIPO" color={COLOR_AI} />

      <TablaComparativa
        titulo="DENUNCIAS POR CATEGORÍA"
        tablaId="asuntos-internos-denuncias-categoria"
        departamento="Asuntos Internos"
        color={COLOR_AI}
        filas={denunciasRecibidas}
      />

      <ChartContainer titulo="Principales Denuncias (Comparativo)">
        <BarChartComparativo
          datos={datosGraficoDenuncias}
          colorAnterior="#94a3b8"
          colorActual={COLOR_AI}
        />
      </ChartContainer>

      {/* Sumarios */}
      <SectionHeader titulo="SUMARIOS ADMINISTRATIVOS" color={COLOR_AI} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="ESTADO DE SUMARIOS"
          tablaId="asuntos-internos-estado-sumarios"
          departamento="Asuntos Internos"
          color={COLOR_AI}
          filas={sumariosAdministrativos}
        />

        <TablaComparativa
          titulo="SANCIONES APLICADAS"
          tablaId="asuntos-internos-sanciones-aplicadas"
          departamento="Asuntos Internos"
          color={COLOR_AI}
          filas={sancionesAplicadas}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer titulo="Distribución de Sanciones (2025)">
          <PieChartComponent datos={datosGraficoSanciones} />
        </ChartContainer>

        <ChartContainer titulo="Personal Investigado por Jerarquía">
          <PieChartComponent datos={datosGraficoJerarquia} />
        </ChartContainer>
      </div>

      {/* Personal por Jerarquía */}
      <SectionHeader
        titulo="PERSONAL INVOLUCRADO POR JERARQUÍA"
        color={COLOR_AI}
      />

      <TablaComparativa
        titulo="PERSONAL POR JERARQUÍA"
        tablaId="asuntos-internos-personal-jerarquia"
        departamento="Asuntos Internos"
        color={COLOR_AI}
        filas={personalPorJerarquia}
      />

      {/* Resumen */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: COLOR_AI, color: 'white' }}
        >
          ANÁLISIS Y OBSERVACIONES
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
              <h4 className="font-bold text-cyan-800 mb-2">
                Reducción de Denuncias
              </h4>
              <p className="text-cyan-700 text-sm">
                Se observa una disminución del {Math.abs(porcentajeDenuncias)}%
                en las denuncias recibidas respecto al período anterior.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h4 className="font-bold text-orange-800 mb-2">
                Principal Infracción
              </h4>
              <p className="text-orange-700 text-sm">
                La inasistencia injustificada sigue siendo la principal causa de
                procedimientos disciplinarios (29%).
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-purple-800 mb-2">
                Jerarquía más afectada
              </h4>
              <p className="text-purple-700 text-sm">
                Los Agentes representan el 40% del personal investigado, seguido
                de Suboficiales (28%).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
