import { Flame, Shield, Dog, Target } from 'lucide-react';
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
  intervencionesGOE,
  intervencionesBomberos,
  intervencionesCanes,
  intervencionesMontada,
  resultadosOperativos,
  datosGraficoIntervencionesGOE,
  datosGraficoBomberos,
  datosGraficoCanes,
} from '../../data/unidades-especiales';

const COLOR_UE = '#7c3aed';

export function UnidadesEspecialesPage() {
  // Calcular totales
  const totalGOE = intervencionesGOE.reduce(
    (acc, i) => acc + i.periodoActual,
    0
  );
  const totalBomberos = intervencionesBomberos.reduce(
    (acc, i) => acc + i.periodoActual,
    0
  );
  const totalCanes = intervencionesCanes.reduce(
    (acc, i) => acc + i.periodoActual,
    0
  );
  const totalMontada = intervencionesMontada.reduce(
    (acc, i) => acc + i.periodoActual,
    0
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="Dirección General de Unidades Especiales"
        subtitulo="GOE, Bomberos, Canes y Montada"
        color={COLOR_UE}
        icon={<Shield size={24} />}
      >
        <ExportButtons
          titulo="Unidades_Especiales"
          datos={intervencionesGOE}
          departamento="Dir. Gral. Unidades Especiales"
          periodo="01/01/24 - 31/07/24 vs 01/01/25 - 31/07/25"
        />
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Intervenciones GOE"
          valor={totalGOE}
          valorAnterior={394}
          porcentaje={18}
          color={COLOR_UE}
          icon={<Shield size={20} />}
        />
        <StatCard
          titulo="Intervenciones Bomberos"
          valor={totalBomberos}
          valorAnterior={1003}
          porcentaje={20}
          color="#dc2626"
          icon={<Flame size={20} />}
        />
        <StatCard
          titulo="Intervenciones Canes"
          valor={totalCanes}
          valorAnterior={736}
          porcentaje={17}
          color="#059669"
          icon={<Dog size={20} />}
        />
        <StatCard
          titulo="Intervenciones Montada"
          valor={totalMontada}
          valorAnterior={869}
          porcentaje={12}
          color="#f97316"
        />
      </div>

      {/* GOE */}
      <SectionHeader
        titulo="GRUPO DE OPERACIONES ESPECIALES (GOE)"
        color={COLOR_UE}
      />

      <TablaComparativa
        titulo="INTERVENCIONES GOE"
        tablaId="unidades-especiales-intervenciones-goe"
        departamento="Unidades Especiales"
        color={COLOR_UE}
        filas={intervencionesGOE}
      />

      <ChartContainer titulo="Comparativo Intervenciones GOE">
        <BarChartComparativo
          datos={datosGraficoIntervencionesGOE}
          colorAnterior="#94a3b8"
          colorActual={COLOR_UE}
        />
      </ChartContainer>

      {/* Bomberos */}
      <SectionHeader titulo="DIVISIÓN BOMBEROS" color="#dc2626" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="INTERVENCIONES BOMBEROS"
          tablaId="unidades-especiales-intervenciones-bomberos"
          departamento="Unidades Especiales"
          color="#dc2626"
          filas={intervencionesBomberos}
        />

        <ChartContainer titulo="Distribución Intervenciones (2025)">
          <PieChartComponent datos={datosGraficoBomberos} />
        </ChartContainer>
      </div>

      {/* Canes */}
      <SectionHeader titulo="DIVISIÓN CANES" color="#059669" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="INTERVENCIONES CANES"
          tablaId="unidades-especiales-intervenciones-canes"
          departamento="Unidades Especiales"
          color="#059669"
          filas={intervencionesCanes}
        />

        <ChartContainer titulo="Distribución Canes (2025)">
          <PieChartComponent datos={datosGraficoCanes} />
        </ChartContainer>
      </div>

      {/* Montada */}
      <SectionHeader titulo="DIVISIÓN MONTADA" color="#f97316" />

      <TablaComparativa
        titulo="INTERVENCIONES MONTADA"
        tablaId="unidades-especiales-intervenciones-montada"
        departamento="Unidades Especiales"
        color="#f97316"
        filas={intervencionesMontada}
      />

      {/* Resultados Operativos */}
      <SectionHeader
        titulo="RESULTADOS OPERATIVOS CONSOLIDADOS"
        color={COLOR_UE}
      />

      <TablaComparativa
        titulo="RESULTADOS DE UNIDADES ESPECIALES"
        tablaId="unidades-especiales-resultados"
        departamento="Unidades Especiales"
        color={COLOR_UE}
        filas={resultadosOperativos}
      />

      {/* Resumen */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: COLOR_UE, color: 'white' }}
        >
          CAPACIDADES ESPECIALES
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-purple-50 rounded-lg text-center border-2 border-purple-200">
              <Shield className="mx-auto mb-2 text-purple-600" size={32} />
              <p className="text-sm text-purple-600 mb-1">GOE</p>
              <p className="font-bold text-purple-800">Alto Riesgo</p>
              <p className="text-xs text-purple-600">+26% Allanamientos AR</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg text-center border-2 border-red-200">
              <Flame className="mx-auto mb-2 text-red-600" size={32} />
              <p className="text-sm text-red-600 mb-1">Bomberos</p>
              <p className="font-bold text-red-800">Emergencias</p>
              <p className="text-xs text-red-600">+75% Inc. Forestales</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center border-2 border-green-200">
              <Dog className="mx-auto mb-2 text-green-600" size={32} />
              <p className="text-sm text-green-600 mb-1">Canes</p>
              <p className="font-bold text-green-800">Detección</p>
              <p className="text-xs text-green-600">+19% Búsq. Drogas</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg text-center border-2 border-orange-200">
              <Target className="mx-auto mb-2 text-orange-600" size={32} />
              <p className="text-sm text-orange-600 mb-1">Montada</p>
              <p className="font-bold text-orange-800">Presencia</p>
              <p className="text-xs text-orange-600">+12% Patrullajes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
