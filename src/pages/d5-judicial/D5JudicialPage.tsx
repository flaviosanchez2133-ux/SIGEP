import { Scale, Users, Shield, FileText, Target } from 'lucide-react';
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
  detenidosProcesales,
  consignasCubiertas,
  habeasCorpus,
  trasladosPenitenciario,
  armasSecuestradas,
  personalPolicialDetenido,
  detenidosLiberados,
  datosGraficoDetenidosProcesales,
  datosGraficoArmasSecuestradas,
  datosGraficoDistribucionArmas,
} from '../../data/d5-judicial';

const COLOR_D5 = '#7c3aed';

export function D5JudicialPage() {
  // Calcular totales
  const totalDetenidos2024 = detenidosProcesales.reduce(
    (acc, d) => acc + d.periodoAnterior,
    0
  );
  const totalDetenidos2025 = detenidosProcesales.reduce(
    (acc, d) => acc + d.periodoActual,
    0
  );
  const porcentajeDetenidos = Math.round(
    ((totalDetenidos2025 - totalDetenidos2024) / totalDetenidos2024) * 100
  );

  const totalArmas2024 = armasSecuestradas.reduce(
    (acc, a) => acc + a.periodoAnterior,
    0
  );
  const totalArmas2025 = armasSecuestradas.reduce(
    (acc, a) => acc + a.periodoActual,
    0
  );
  const porcentajeArmas = Math.round(
    ((totalArmas2025 - totalArmas2024) / totalArmas2024) * 100
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="Departamento Judicial (D-5)"
        subtitulo="Estadísticas judiciales, detenidos y consignas"
        color={COLOR_D5}
        icon={<Scale size={24} />}
      >
        <ExportButtons
          titulo="Judicial_Estadisticas"
          datos={detenidosProcesales}
          departamento="Departamento Judicial (D-5)"
          periodo="01/01/24 - 31/07/24 vs 01/01/25 - 31/07/25"
        />
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Detenidos Procesales"
          valor={totalDetenidos2025}
          valorAnterior={totalDetenidos2024}
          porcentaje={porcentajeDetenidos}
          color={COLOR_D5}
          icon={<Users size={20} />}
        />
        <StatCard
          titulo="Armas Secuestradas"
          valor={totalArmas2025}
          valorAnterior={totalArmas2024}
          porcentaje={porcentajeArmas}
          color="#dc2626"
          icon={<Shield size={20} />}
        />
        <StatCard
          titulo="Recursos Habeas Corpus"
          valor={187}
          valorAnterior={192}
          porcentaje={-3}
          color="#3b82f6"
          icon={<FileText size={20} />}
        />
        <StatCard
          titulo="Consignas Cubiertas"
          valor={422}
          valorAnterior={664}
          porcentaje={-36}
          color="#059669"
          icon={<Target size={20} />}
        />
      </div>

      {/* Detenidos Procesales */}
      <SectionHeader
        titulo="DETENIDOS PROCESALES POR DEPENDENCIA"
        color={COLOR_D5}
      />

      <TablaComparativa
        titulo="DETENIDOS PROCESALES"
        tablaId="d5-detenidos-procesales"
        departamento="D5 - Judicial"
        color={COLOR_D5}
        filas={detenidosProcesales}
      />

      <ChartContainer titulo="Comparativo Detenidos por Regional">
        <BarChartComparativo
          datos={datosGraficoDetenidosProcesales}
          colorAnterior="#94a3b8"
          colorActual={COLOR_D5}
        />
      </ChartContainer>

      {/* Consignas y Habeas Corpus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SectionHeader
            titulo="CONSIGNAS CUBIERTAS POR REGIONAL"
            color={COLOR_D5}
          />
          <TablaComparativa
            titulo="CONSIGNAS POLICIALES"
            tablaId="d5-consignas-policiales"
            departamento="D5 - Judicial"
            color={COLOR_D5}
            filas={consignasCubiertas}
          />
        </div>

        <div>
          <SectionHeader titulo="RECURSOS HABEAS CORPUS" color={COLOR_D5} />
          <TablaComparativa
            titulo="HABEAS CORPUS PRESENTADOS"
            tablaId="d5-habeas-corpus"
            departamento="D5 - Judicial"
            color={COLOR_D5}
            filas={habeasCorpus}
            labelPeriodoAnterior="AÑO 2024"
            labelPeriodoActual="AÑO 2025"
          />
        </div>
      </div>

      {/* Traslados al Penitenciario */}
      <SectionHeader
        titulo="TRASLADOS AL SERVICIO PENITENCIARIO"
        color={COLOR_D5}
      />

      <TablaComparativa
        titulo="DETENIDOS TRASLADADOS"
        tablaId="d5-detenidos-trasladados"
        departamento="D5 - Judicial"
        color={COLOR_D5}
        filas={trasladosPenitenciario}
      />

      {/* Armas Secuestradas */}
      <SectionHeader
        titulo="ARMAS DE FUEGO SECUESTRADAS POR DEPENDENCIA"
        color={COLOR_D5}
      />

      <TablaComparativa
        titulo="ARMAS SECUESTRADAS"
        tablaId="d5-armas-secuestradas"
        departamento="D5 - Judicial"
        color={COLOR_D5}
        filas={armasSecuestradas}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer titulo="Comparativo Armas por Dependencia">
          <BarChartComparativo
            datos={datosGraficoArmasSecuestradas}
            colorAnterior="#94a3b8"
            colorActual={COLOR_D5}
          />
        </ChartContainer>

        <ChartContainer titulo="Distribución Armas (2025)">
          <PieChartComponent datos={datosGraficoDistribucionArmas} />
        </ChartContainer>
      </div>

      {/* Personal Policial Detenido */}
      <SectionHeader titulo="PERSONAL POLICIAL DETENIDO" color={COLOR_D5} />

      <TablaComparativa
        titulo="PERSONAL POLICIAL DETENIDO POR DEPENDENCIA"
        tablaId="d5-personal-policial-detenido"
        departamento="D5 - Judicial"
        color={COLOR_D5}
        filas={personalPolicialDetenido}
      />

      {/* Detenidos Liberados */}
      <SectionHeader titulo="DETENIDOS PROCESALES LIBERADOS" color={COLOR_D5} />

      <TablaComparativa
        titulo="LIBERACIONES POR TIPO"
        tablaId="d5-liberaciones-tipo"
        departamento="D5 - Judicial"
        color={COLOR_D5}
        filas={detenidosLiberados}
      />

      {/* Resumen */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: COLOR_D5, color: 'white' }}
        >
          ANÁLISIS JUDICIAL
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <p className="text-sm text-purple-600 mb-1">
                Reducción Detenidos
              </p>
              <p className="text-2xl font-bold text-purple-700">
                {Math.abs(porcentajeDetenidos)}%
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg text-center">
              <p className="text-sm text-red-600 mb-1">Incremento Armas</p>
              <p className="text-2xl font-bold text-red-700">
                +{porcentajeArmas}%
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-sm text-green-600 mb-1">
                Total Liberados 2025
              </p>
              <p className="text-2xl font-bold text-green-700">6.962</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-blue-600 mb-1">Traslados Ben. Paz</p>
              <p className="text-2xl font-bold text-blue-700">405</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">
              <strong>Observación:</strong> La reducción del 20% en detenidos
              procesales se debe principalmente a la optimización de los
              traslados al nuevo establecimiento Benjamín Paz y la agilización
              de los procesos judiciales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
