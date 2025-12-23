import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';
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
  aspirantesFormacion,
  egresados,
  cursosCapacitacion,
  personalCapacitado,
  conveniosEducativos,
  datosGraficoAspirantes,
  datosGraficoCursos,
  datosGraficoPersonalCapacitado,
} from '../../data/institutos';

const COLOR_INST = '#0891b2';

export function InstitutosPage() {
  // Calcular totales
  const totalAspirantes = aspirantesFormacion.reduce(
    (acc, a) => acc + a.periodoActual,
    0
  );
  const totalEgresados = egresados.reduce((acc, e) => acc + e.periodoActual, 0);
  const totalCapacitados = personalCapacitado.reduce(
    (acc, p) => acc + p.periodoActual,
    0
  );
  const totalConvenios = conveniosEducativos.reduce(
    (acc, c) => acc + c.periodoActual,
    0
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="Dirección General de Institutos"
        subtitulo="Formación y capacitación policial"
        color={COLOR_INST}
        icon={<GraduationCap size={24} />}
      >
        <ExportButtons
          titulo="Institutos_Formacion"
          datos={aspirantesFormacion}
          departamento="Dir. Gral. Institutos"
        />
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Aspirantes en Formación"
          valor={totalAspirantes}
          valorAnterior={813}
          porcentaje={15}
          color={COLOR_INST}
          icon={<Users size={20} />}
        />
        <StatCard
          titulo="Egresados 2025"
          valor={totalEgresados}
          valorAnterior={512}
          porcentaje={17}
          color="#059669"
          icon={<Award size={20} />}
        />
        <StatCard
          titulo="Personal Capacitado"
          valor={totalCapacitados}
          valorAnterior={4491}
          porcentaje={15}
          color="#7c3aed"
          icon={<BookOpen size={20} />}
        />
        <StatCard
          titulo="Convenios Activos"
          valor={totalConvenios}
          valorAnterior={28}
          porcentaje={29}
          color="#f97316"
        />
      </div>

      {/* Aspirantes */}
      <SectionHeader titulo="ASPIRANTES EN FORMACIÓN" color={COLOR_INST} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="ASPIRANTES POR CATEGORÍA"
          tablaId="institutos-aspirantes-categoria"
          departamento="Institutos"
          color={COLOR_INST}
          filas={aspirantesFormacion}
        />

        <ChartContainer titulo="Comparativo Aspirantes">
          <BarChartComparativo
            datos={datosGraficoAspirantes}
            colorAnterior="#94a3b8"
            colorActual={COLOR_INST}
          />
        </ChartContainer>
      </div>

      {/* Egresados */}
      <SectionHeader titulo="EGRESADOS POR PROMOCIÓN" color={COLOR_INST} />

      <TablaComparativa
        titulo="EGRESADOS POR CATEGORÍA"
        tablaId="institutos-egresados-categoria"
        departamento="Institutos"
        color={COLOR_INST}
        filas={egresados}
      />

      {/* Cursos de Capacitación */}
      <SectionHeader
        titulo="CURSOS DE CAPACITACIÓN"
        subtitulo="Personal que completó capacitación"
        color={COLOR_INST}
      />

      <TablaComparativa
        titulo="PERSONAL CAPACITADO POR CURSO"
        tablaId="institutos-personal-capacitado-curso"
        departamento="Institutos"
        color={COLOR_INST}
        filas={cursosCapacitacion}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer titulo="Principales Cursos (2025)">
          <PieChartComponent datos={datosGraficoCursos} />
        </ChartContainer>

        <ChartContainer titulo="Personal Capacitado por Jerarquía">
          <PieChartComponent datos={datosGraficoPersonalCapacitado} />
        </ChartContainer>
      </div>

      {/* Personal Capacitado */}
      <SectionHeader
        titulo="PERSONAL CAPACITADO POR JERARQUÍA"
        color={COLOR_INST}
      />

      <TablaComparativa
        titulo="CAPACITADOS POR JERARQUÍA"
        tablaId="institutos-capacitados-jerarquia"
        departamento="Institutos"
        color={COLOR_INST}
        filas={personalCapacitado}
      />

      {/* Convenios */}
      <SectionHeader titulo="CONVENIOS EDUCATIVOS" color={COLOR_INST} />

      <TablaComparativa
        titulo="CONVENIOS ACTIVOS"
        tablaId="institutos-convenios-activos"
        departamento="Institutos"
        color={COLOR_INST}
        filas={conveniosEducativos}
      />

      {/* Resumen */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: COLOR_INST, color: 'white' }}
        >
          LOGROS ACADÉMICOS 2025
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-cyan-50 rounded-lg text-center">
              <GraduationCap className="mx-auto mb-2 text-cyan-600" size={32} />
              <p className="text-sm text-cyan-600 mb-1">Incremento Cadetes</p>
              <p className="text-2xl font-bold text-cyan-700">+14%</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <Award className="mx-auto mb-2 text-green-600" size={32} />
              <p className="text-sm text-green-600 mb-1">Más Egresados</p>
              <p className="text-2xl font-bold text-green-700">+17%</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg text-center">
              <BookOpen className="mx-auto mb-2 text-purple-600" size={32} />
              <p className="text-sm text-purple-600 mb-1">Cursos DD.HH.</p>
              <p className="text-2xl font-bold text-purple-700">+15%</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg text-center">
              <Users className="mx-auto mb-2 text-orange-600" size={32} />
              <p className="text-sm text-orange-600 mb-1">Viol. Género</p>
              <p className="text-2xl font-bold text-orange-700">+33%</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">
              <strong>Enfoque 2025:</strong> Se ha priorizado la capacitación en
              Derechos Humanos y Violencia de Género, con incrementos
              significativos en ambas áreas, alineados con las políticas de
              modernización institucional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
