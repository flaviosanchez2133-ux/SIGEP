import { Trees, Beef, Tractor, Map } from 'lucide-react';
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
  delitosRuralesPorTipo,
  abigeatoPorRegional,
  animalesRecuperados,
  procedimientosRurales,
  datosGraficoDelitosRurales,
  datosGraficoAnimalesRecuperados,
} from '../../data/delitos-rurales';

const COLOR_RURAL = '#166534';

export function DelitosRuralesPage() {
  // Calcular totales
  const totalDelitos2024 = delitosRuralesPorTipo.reduce(
    (acc, d) => acc + d.periodoAnterior,
    0
  );
  const totalDelitos2025 = delitosRuralesPorTipo.reduce(
    (acc, d) => acc + d.periodoActual,
    0
  );
  const porcentajeDelitos = Math.round(
    ((totalDelitos2025 - totalDelitos2024) / totalDelitos2024) * 100
  );

  const totalAnimales = animalesRecuperados.reduce(
    (acc, a) => acc + a.periodoActual,
    0
  );
  const abigeato = delitosRuralesPorTipo.find(d => d.id === 'abigeato');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="Dirección General de Delitos Rurales"
        subtitulo="Protección del sector agropecuario y rural"
        color={COLOR_RURAL}
        icon={<Trees size={24} />}
      >
        <ExportButtons
          titulo="Delitos_Rurales"
          datos={delitosRuralesPorTipo}
          departamento="Dir. Gral. Delitos Rurales"
          periodo="01/01/24 - 31/07/24 vs 01/01/25 - 31/07/25"
        />
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Total Delitos Rurales"
          valor={totalDelitos2025}
          valorAnterior={totalDelitos2024}
          porcentaje={porcentajeDelitos}
          color={COLOR_RURAL}
          icon={<Trees size={20} />}
        />
        <StatCard
          titulo="Casos de Abigeato"
          valor={abigeato?.periodoActual || 198}
          valorAnterior={abigeato?.periodoAnterior || 234}
          porcentaje={-15}
          color="#8B4513"
          icon={<Beef size={20} />}
        />
        <StatCard
          titulo="Animales Recuperados"
          valor={totalAnimales}
          valorAnterior={636}
          porcentaje={7}
          color="#059669"
        />
        <StatCard
          titulo="Patrullajes Realizados"
          valor={1456}
          valorAnterior={1234}
          porcentaje={18}
          color="#3b82f6"
          icon={<Map size={20} />}
        />
      </div>

      {/* Delitos por Tipo */}
      <SectionHeader titulo="DELITOS RURALES POR TIPO" color={COLOR_RURAL} />

      <TablaComparativa
        titulo="DELITOS POR CATEGORÍA"
        tablaId="delitos-rurales-delitos-categoria"
        departamento="Delitos Rurales"
        color={COLOR_RURAL}
        filas={delitosRuralesPorTipo}
      />

      <ChartContainer titulo="Comparativo Delitos Rurales">
        <BarChartComparativo
          datos={datosGraficoDelitosRurales}
          colorAnterior="#94a3b8"
          colorActual={COLOR_RURAL}
        />
      </ChartContainer>

      {/* Abigeato por Regional */}
      <SectionHeader
        titulo="ABIGEATO POR UNIDAD REGIONAL"
        color={COLOR_RURAL}
      />

      <TablaComparativa
        titulo="CASOS DE ABIGEATO"
        tablaId="delitos-rurales-casos-abigeato"
        departamento="Delitos Rurales"
        color={COLOR_RURAL}
        filas={abigeatoPorRegional}
      />

      {/* Animales Recuperados */}
      <SectionHeader titulo="ANIMALES RECUPERADOS" color={COLOR_RURAL} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="ANIMALES POR ESPECIE"
          tablaId="delitos-rurales-animales-especie"
          departamento="Delitos Rurales"
          color={COLOR_RURAL}
          filas={animalesRecuperados}
        />

        <ChartContainer titulo="Distribución por Especie (2025)">
          <PieChartComponent datos={datosGraficoAnimalesRecuperados} />
        </ChartContainer>
      </div>

      {/* Procedimientos */}
      <SectionHeader titulo="PROCEDIMIENTOS REALIZADOS" color={COLOR_RURAL} />

      <TablaComparativa
        titulo="TIPO DE PROCEDIMIENTOS"
        tablaId="delitos-rurales-tipo-procedimientos"
        departamento="Delitos Rurales"
        color={COLOR_RURAL}
        filas={procedimientosRurales}
      />

      {/* Resumen */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: COLOR_RURAL, color: 'white' }}
        >
          ANÁLISIS Y LOGROS
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                <Beef size={20} />
                Reducción de Abigeato
              </h4>
              <p className="text-green-700 text-sm">
                Disminución del 15% en casos de abigeato gracias a los
                patrullajes preventivos intensificados.
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
              <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                <Tractor size={20} />
                Maquinaria Protegida
              </h4>
              <p className="text-amber-700 text-sm">
                Reducción del 16% en robos de maquinaria agrícola mediante
                controles coordinados con productores.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                <Map size={20} />
                Mayor Presencia
              </h4>
              <p className="text-blue-700 text-sm">
                Incremento del 18% en patrullajes preventivos cubriendo mayor
                extensión de zona rural.
              </p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">
              <strong>Nota:</strong> Se trabaja en coordinación permanente con
              las Sociedades Rurales y SENASA para el control del tránsito de
              animales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
