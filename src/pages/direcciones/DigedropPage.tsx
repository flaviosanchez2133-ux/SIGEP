import { Package, Target, TrendingUp } from 'lucide-react';
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
  sustanciasSecuestradas,
  operativosRealizados,
  detenidosDrogas,
  vehiculosSecuestradosDigedrop,
  datosGraficoOperativos,
  datosGraficoDistribucionDetenidos,
} from '../../data/digedrop';

const COLOR_DIGEDROP = '#dc2626';

export function DigedropPage() {
  // Calcular totales
  const cocaina = sustanciasSecuestradas.find(s => s.id === 'cocaina');
  const marihuana = sustanciasSecuestradas.find(s => s.id === 'marihuana');

  const totalOperativos2025 = operativosRealizados.reduce(
    (acc, o) => acc + o.periodoActual,
    0
  );
  const totalDetenidos2025 = detenidosDrogas.reduce(
    (acc, d) => acc + d.periodoActual,
    0
  );

  const porcentajeCocaina = cocaina
    ? Math.round(
        ((cocaina.periodoActual - cocaina.periodoAnterior) /
          cocaina.periodoAnterior) *
          100
      )
    : 0;
  const porcentajeMarihuana = marihuana
    ? Math.round(
        ((marihuana.periodoActual - marihuana.periodoAnterior) /
          marihuana.periodoAnterior) *
          100
      )
    : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="DIGEDROP - Drogas Peligrosas"
        subtitulo="Dirección General de Drogas Peligrosas"
        color={COLOR_DIGEDROP}
        icon={<Package size={24} />}
      >
        <ExportButtons
          titulo="DIGEDROP_Estadisticas"
          datos={sustanciasSecuestradas}
          departamento="DIGEDROP"
          periodo="01/01/24 - 31/07/24 vs 01/01/25 - 31/07/25"
        />
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Cocaína Secuestrada (g)"
          valor={cocaina?.periodoActual || 37300}
          valorAnterior={cocaina?.periodoAnterior || 14417}
          porcentaje={porcentajeCocaina}
          color={COLOR_DIGEDROP}
          icon={<Package size={20} />}
        />
        <StatCard
          titulo="Marihuana (g)"
          valor={marihuana?.periodoActual || 297123}
          valorAnterior={marihuana?.periodoAnterior || 161737}
          porcentaje={porcentajeMarihuana}
          color="#059669"
        />
        <StatCard
          titulo="Operativos Totales"
          valor={totalOperativos2025}
          valorAnterior={2602}
          porcentaje={22}
          color="#3b82f6"
          icon={<Target size={20} />}
        />
        <StatCard
          titulo="Detenidos"
          valor={totalDetenidos2025}
          valorAnterior={1136}
          porcentaje={11}
          color="#7c3aed"
        />
      </div>

      {/* Sustancias Secuestradas */}
      <SectionHeader
        titulo="SUSTANCIAS SECUESTRADAS"
        subtitulo="Cantidades en gramos/unidades"
        color={COLOR_DIGEDROP}
      />

      <TablaComparativa
        titulo="SUSTANCIAS INCAUTADAS"
        tablaId="digedrop-sustancias-incautadas"
        departamento="DIGEDROP"
        color={COLOR_DIGEDROP}
        filas={sustanciasSecuestradas}
      />

      {/* Destacado de incrementos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-red-50 rounded-lg text-center border-2 border-red-200">
          <p className="text-sm text-red-600 mb-1">Incremento Cocaína</p>
          <p className="text-3xl font-bold text-red-700">+159%</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg text-center border-2 border-green-200">
          <p className="text-sm text-green-600 mb-1">Incremento Marihuana</p>
          <p className="text-3xl font-bold text-green-700">+84%</p>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg text-center border-2 border-orange-200">
          <p className="text-sm text-orange-600 mb-1">Incremento Pasta Base</p>
          <p className="text-3xl font-bold text-orange-700">+95%</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg text-center border-2 border-purple-200">
          <p className="text-sm text-purple-600 mb-1">Incremento Éxtasis</p>
          <p className="text-3xl font-bold text-purple-700">+134%</p>
        </div>
      </div>

      {/* Operativos */}
      <SectionHeader titulo="OPERATIVOS REALIZADOS" color={COLOR_DIGEDROP} />

      <TablaComparativa
        titulo="TIPO DE OPERATIVOS"
        tablaId="digedrop-tipo-operativos"
        departamento="DIGEDROP"
        color={COLOR_DIGEDROP}
        filas={operativosRealizados}
      />

      <ChartContainer titulo="Comparativo Operativos">
        <BarChartComparativo
          datos={datosGraficoOperativos}
          colorAnterior="#94a3b8"
          colorActual={COLOR_DIGEDROP}
        />
      </ChartContainer>

      {/* Detenidos */}
      <SectionHeader
        titulo="DETENIDOS POR DELITOS DE DROGAS"
        color={COLOR_DIGEDROP}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="DETENIDOS POR TIPO DE DELITO"
          tablaId="digedrop-detenidos-tipo-delito"
          departamento="DIGEDROP"
          color={COLOR_DIGEDROP}
          filas={detenidosDrogas}
        />

        <ChartContainer titulo="Distribución por Tipo de Delito (2025)">
          <PieChartComponent datos={datosGraficoDistribucionDetenidos} />
        </ChartContainer>
      </div>

      {/* Vehículos y Dinero */}
      <SectionHeader titulo="VEHÍCULOS SECUESTRADOS" color={COLOR_DIGEDROP} />

      <TablaComparativa
        titulo="VEHÍCULOS SECUESTRADOS"
        tablaId="digedrop-vehiculos-secuestrados"
        departamento="DIGEDROP"
        color={COLOR_DIGEDROP}
        filas={vehiculosSecuestradosDigedrop}
      />

      {/* Resumen */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: COLOR_DIGEDROP, color: 'white' }}
        >
          ANÁLISIS E IMPACTO
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                <TrendingUp size={20} />
                Incremento Significativo
              </h4>
              <p className="text-red-700 text-sm">
                Se registra un incremento del 159% en el secuestro de cocaína,
                evidenciando una mayor efectividad en los operativos antidrogas
                y el fortalecimiento de las tareas de inteligencia criminal.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                <Target size={20} />
                Estrategia Operativa
              </h4>
              <p className="text-blue-700 text-sm">
                Los procedimientos en calle aumentaron un 27%, reflejando un
                enfoque más proactivo en la prevención y detección de
                actividades relacionadas con el narcotráfico.
              </p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">
              <strong>Nota:</strong> Los datos reflejan el resultado de
              operativos coordinados con otras fuerzas de seguridad nacionales y
              provinciales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
