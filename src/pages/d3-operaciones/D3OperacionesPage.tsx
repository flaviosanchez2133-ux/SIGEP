import { Shield, AlertTriangle, Crosshair, Heart } from 'lucide-react';
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
  delitosPropiedad,
  homicidiosTotales,
  datosGraficoDelitosPropiedad,
  datosGraficoSuicidiosGenero,
  datosGraficoModalidadSuicidio,
} from '../../data/d3-operaciones';

const COLOR_D3 = '#166534';

// Datos adicionales para tablas
const suicidiosPorGenero = [
  {
    id: 'masculino',
    label: 'Masculino',
    periodoAnterior: 71,
    periodoActual: 95,
  },
  { id: 'femenino', label: 'Femenino', periodoAnterior: 29, periodoActual: 22 },
];

const suicidiosModalidad = [
  {
    id: 'ahorcamiento',
    label: 'Ahorcamiento',
    periodoAnterior: 84,
    periodoActual: 100,
  },
  {
    id: 'arma_fuego',
    label: 'Arma de Fuego',
    periodoAnterior: 12,
    periodoActual: 13,
  },
  {
    id: 'arma_blanca',
    label: 'Arma Blanca',
    periodoAnterior: 1,
    periodoActual: 3,
  },
  {
    id: 'envenenamiento',
    label: 'Envenenamiento',
    periodoAnterior: 1,
    periodoActual: 1,
  },
  { id: 'otros', label: 'Otros', periodoAnterior: 2, periodoActual: 0 },
];

const homicidiosAmbito = [
  {
    id: 'publico',
    label: 'Ámbito Público',
    periodoAnterior: 27,
    periodoActual: 13,
  },
  {
    id: 'privado',
    label: 'Ámbito Privado',
    periodoAnterior: 2,
    periodoActual: 1,
  },
  {
    id: 'vivienda',
    label: 'Vivienda Particular',
    periodoAnterior: 8,
    periodoActual: 5,
  },
  {
    id: 'encierro',
    label: 'Contexto de Encierro',
    periodoAnterior: 2,
    periodoActual: 2,
  },
];

export function D3OperacionesPage() {
  // Calcular totales
  const totalDelitos2024 = delitosPropiedad.reduce(
    (acc, d) => acc + d.periodoAnterior,
    0
  );
  const totalDelitos2025 = delitosPropiedad.reduce(
    (acc, d) => acc + d.periodoActual,
    0
  );
  const porcentajeDelitos = Math.round(
    ((totalDelitos2025 - totalDelitos2024) / totalDelitos2024) * 100
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="Departamento Operaciones Policiales (D-3)"
        subtitulo="Estadísticas operacionales y delictuales"
        color={COLOR_D3}
        icon={<Shield size={24} />}
      >
        <ExportButtons
          titulo="Operaciones_Policiales"
          datos={delitosPropiedad}
          departamento="Departamento Operaciones Policiales (D-3)"
        />
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Delitos Contra la Propiedad"
          valor={totalDelitos2025}
          valorAnterior={totalDelitos2024}
          porcentaje={porcentajeDelitos}
          color={COLOR_D3}
          icon={<AlertTriangle size={20} />}
        />
        <StatCard
          titulo="Homicidios Dolosos"
          valor={21}
          valorAnterior={41}
          porcentaje={-49}
          color="#dc2626"
          icon={<Crosshair size={20} />}
        />
        <StatCard
          titulo="Suicidios Total"
          valor={117}
          valorAnterior={100}
          porcentaje={17}
          color="#7c3aed"
          icon={<Heart size={20} />}
        />
        <StatCard
          titulo="Reducción Homicidios"
          valor="-49%"
          subtitulo="Comparativo interanual"
          color="#059669"
        />
      </div>

      {/* Delitos contra la propiedad */}
      <SectionHeader
        titulo="DELITOS CONTRA LA PROPIEDAD POR UNIDAD REGIONAL"
        color={COLOR_D3}
      />

      <TablaComparativa
        titulo="DELITOS CONTRA LA PROPIEDAD"
        tablaId="d3-delitos-contra-propiedad"
        departamento="D3 - Operaciones"
        color={COLOR_D3}
        filas={delitosPropiedad}
      />

      <ChartContainer titulo="Comparativo Delitos por Regional">
        <BarChartComparativo
          datos={datosGraficoDelitosPropiedad}
          colorAnterior="#94a3b8"
          colorActual={COLOR_D3}
        />
      </ChartContainer>

      {/* Sección Suicidios */}
      <SectionHeader titulo="SUICIDIOS - TOTAL PROVINCIAL" color={COLOR_D3} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="SUICIDIOS POR GÉNERO"
          tablaId="d3-suicidios-genero"
          departamento="D3 - Operaciones"
          color={COLOR_D3}
          filas={suicidiosPorGenero}
        />

        <TablaComparativa
          titulo="SUICIDIOS POR MODALIDAD"
          tablaId="d3-suicidios-modalidad"
          departamento="D3 - Operaciones"
          color={COLOR_D3}
          filas={suicidiosModalidad}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer titulo="Distribución por Género (2025)">
          <PieChartComponent datos={datosGraficoSuicidiosGenero} />
        </ChartContainer>

        <ChartContainer titulo="Distribución por Modalidad (2025)">
          <PieChartComponent datos={datosGraficoModalidadSuicidio} />
        </ChartContainer>
      </div>

      {/* Sección Homicidios */}
      <SectionHeader titulo="HOMICIDIOS DOLOSOS POR ÁMBITO" color={COLOR_D3} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="HOMICIDIOS POR ÁMBITO"
          tablaId="d3-homicidios-ambito"
          departamento="D3 - Operaciones"
          color={COLOR_D3}
          filas={homicidiosAmbito}
        />

        <TablaComparativa
          titulo="TOTAL HOMICIDIOS DOLOSOS"
          tablaId="d3-total-homicidios-dolosos"
          departamento="D3 - Operaciones"
          color={COLOR_D3}
          filas={homicidiosTotales}
        />
      </div>

      {/* Resumen */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: COLOR_D3, color: 'white' }}
        >
          ANÁLISIS Y OBSERVACIONES
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-green-800 mb-2">
                Reducción de Homicidios
              </h4>
              <p className="text-green-700 text-sm">
                Se logró una reducción del 49% en homicidios dolosos, pasando de
                41 casos a 21 en el período comparado.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-800 mb-2">
                Delitos contra Propiedad
              </h4>
              <p className="text-blue-700 text-sm">
                Reducción del {Math.abs(porcentajeDelitos)}% en delitos contra
                la propiedad en todas las unidades regionales.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <h4 className="font-bold text-purple-800 mb-2">
                Modalidad Principal
              </h4>
              <p className="text-purple-700 text-sm">
                El ahorcamiento representa el 85% de los casos de suicidio,
                siendo la modalidad predominante.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
