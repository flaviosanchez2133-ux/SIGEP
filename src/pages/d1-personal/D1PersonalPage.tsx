import { Users } from 'lucide-react';
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
  datosGeneralesPersonal,
  personalPorTipo,
  personalPorGenero,
  oficialesSuperiores,
  oficialesJefes,
  oficialesSubalternos,
  resumenOficiales,
  suboficialesSuperiores,
  suboficialesSubalternos,
  tropaPTP,
  resumenSuboficiales,
  personalPorDependencia,
  personalPorDivision,
  situacionParticular,
  cuadroComparativoPersonal,
  ascensosProyeccion,
  datosGraficoGenero,
  datosGraficoTipo,
  datosGraficoComparativoTipo,
  datosGraficoRegionales,
} from '../../data/d1-personal';

const COLOR_D1 = '#1e3a5f';

export function D1PersonalPage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="Departamento Personal (D-1)"
        subtitulo="Gestión y estadísticas del personal policial"
        color={COLOR_D1}
        icon={<Users size={24} />}
      >
        <ExportButtons
          titulo="Personal_General"
          datos={personalPorTipo}
          departamento="Departamento Personal (D-1)"
        />
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Fuerza Efectiva Total"
          valor={12186}
          valorAnterior={11287}
          porcentaje={8}
          color={COLOR_D1}
          icon={<Users size={20} />}
        />
        <StatCard
          titulo="Personal Masculino"
          valor={9334}
          valorAnterior={8616}
          porcentaje={8}
          color="#3b82f6"
        />
        <StatCard
          titulo="Personal Femenino"
          valor={2854}
          valorAnterior={2661}
          porcentaje={7}
          color="#ec4899"
        />
        <StatCard
          titulo="Relación Policía/Población"
          valor="0,70%"
          subtitulo="Según Censo 2022 (1.731.820 hab.)"
          color={COLOR_D1}
          formato="porcentaje"
        />
      </div>

      {/* Primera fila de tablas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="TOTAL DE PERSONAL POLICIAL"
          tablaId="d1-total-personal-policial"
          departamento="D1 - Personal"
          color={COLOR_D1}
          filas={datosGeneralesPersonal}
          mostrarTotal={false}
        />

        <TablaComparativa
          titulo="PERSONAL POR TIPO"
          tablaId="d1-personal-por-tipo"
          departamento="D1 - Personal"
          color={COLOR_D1}
          filas={personalPorTipo}
        />
      </div>

      {/* Gráficos de distribución */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer titulo="Distribución por Género (Período Actual)">
          <PieChartComponent datos={datosGraficoGenero} />
        </ChartContainer>

        <ChartContainer titulo="Distribución por Tipo (Período Actual)">
          <PieChartComponent datos={datosGraficoTipo} />
        </ChartContainer>
      </div>

      {/* Personal por Género */}
      <TablaComparativa
        titulo="PERSONAL POR GÉNERO"
        tablaId="d1-personal-por-genero"
        departamento="D1 - Personal"
        color={COLOR_D1}
        filas={personalPorGenero}
      />

      {/* Sección Oficiales */}
      <SectionHeader
        titulo="CUADRO DE OFICIALES POR JERARQUÍA"
        color={COLOR_D1}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TablaComparativa
          titulo="Oficiales Superiores"
          tablaId="d1-oficiales-superiores"
          departamento="D1 - Personal"
          color={COLOR_D1}
          filas={oficialesSuperiores}
        />

        <TablaComparativa
          titulo="Oficiales Jefes"
          tablaId="d1-oficiales-jefes"
          departamento="D1 - Personal"
          color={COLOR_D1}
          filas={oficialesJefes}
        />

        <TablaComparativa
          titulo="Oficiales Subalternos"
          tablaId="d1-oficiales-subalternos"
          departamento="D1 - Personal"
          color={COLOR_D1}
          filas={oficialesSubalternos}
        />
      </div>

      <TablaComparativa
        titulo="RESUMEN CUADRO DE OFICIALES"
        tablaId="d1-resumen-cuadro-oficiales"
        departamento="D1 - Personal"
        color={COLOR_D1}
        filas={resumenOficiales}
      />

      {/* Sección Suboficiales */}
      <SectionHeader
        titulo="CUADRO DE SUBOFICIALES POR JERARQUÍA"
        color={COLOR_D1}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TablaComparativa
          titulo="Suboficiales Superiores"
          tablaId="d1-suboficiales-superiores"
          departamento="D1 - Personal"
          color={COLOR_D1}
          filas={suboficialesSuperiores}
        />

        <TablaComparativa
          titulo="Suboficiales Subalternos"
          tablaId="d1-suboficiales-subalternos"
          departamento="D1 - Personal"
          color={COLOR_D1}
          filas={suboficialesSubalternos}
        />

        <TablaComparativa
          titulo="Tropa y PTP"
          tablaId="d1-tropa-ptp"
          departamento="D1 - Personal"
          color={COLOR_D1}
          filas={tropaPTP}
        />
      </div>

      <TablaComparativa
        titulo="RESUMEN CUADRO DE SUBOFICIALES"
        tablaId="d1-resumen-cuadro-suboficiales"
        departamento="D1 - Personal"
        color={COLOR_D1}
        filas={resumenSuboficiales}
      />

      {/* Gráfico comparativo */}
      <ChartContainer titulo="Comparativo Personal por Tipo">
        <BarChartComparativo
          datos={datosGraficoComparativoTipo}
          colorAnterior="#94a3b8"
          colorActual={COLOR_D1}
        />
      </ChartContainer>

      {/* Personal por Dependencia */}
      <SectionHeader
        titulo="CANTIDAD TOTAL DE PERSONAL POR DEPENDENCIA"
        subtitulo="Departamentos y Direcciones Generales"
        color={COLOR_D1}
      />

      <TablaComparativa
        titulo="PERSONAL POR DEPENDENCIA (Departamentos y DDGG)"
        tablaId="d1-personal-dependencia-departamentos"
        departamento="D1 - Personal"
        color={COLOR_D1}
        filas={personalPorDependencia}
      />

      <TablaComparativa
        titulo="PERSONAL POR DEPENDENCIA (Divisiones, UURR, otros)"
        tablaId="d1-personal-dependencia-divisiones"
        departamento="D1 - Personal"
        color={COLOR_D1}
        filas={personalPorDivision}
      />

      {/* Gráfico Unidades Regionales */}
      <ChartContainer titulo="Personal por Unidad Regional">
        <BarChartComparativo
          datos={datosGraficoRegionales}
          colorAnterior="#94a3b8"
          colorActual={COLOR_D1}
        />
      </ChartContainer>

      {/* Situaciones Particulares */}
      <SectionHeader
        titulo="SITUACIÓN PARTICULAR DE PERSONAL POLICIAL"
        color={COLOR_D1}
      />

      <TablaComparativa
        titulo="SITUACIÓN PARTICULAR DE PERSONAL"
        tablaId="d1-situacion-particular-personal"
        departamento="D1 - Personal"
        color={COLOR_D1}
        filas={situacionParticular}
      />

      {/* Cuadro Comparativo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="CUADRO COMPARATIVO"
          tablaId="d1-cuadro-comparativo"
          departamento="D1 - Personal"
          color={COLOR_D1}
          filas={cuadroComparativoPersonal}
        />

        <div className="card">
          <div
            className="card-header"
            style={{ backgroundColor: COLOR_D1, color: 'white' }}
          >
            OTRAS SITUACIONES
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Renuncias Aceptadas 2024</span>
                <span className="font-bold text-lg">10</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Renuncias Aceptadas 2025</span>
                <span className="font-bold text-lg">6</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700">Jubilaciones 2024</span>
                  <span className="font-bold text-lg text-yellow-700">
                    4.766
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg mt-2">
                  <span className="text-gray-700">Pensiones 2024</span>
                  <span className="font-bold text-lg text-yellow-700">
                    2.489
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-100 rounded-lg mt-2 font-bold">
                  <span className="text-gray-800">TOTAL</span>
                  <span className="text-lg text-yellow-800">7.255</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ascensos y Proyección */}
      <SectionHeader titulo="ASCENSOS Y SU PROYECCIÓN" color={COLOR_D1} />

      <TablaComparativa
        titulo="ASCENSOS Y SU PROYECCIÓN"
        tablaId="d1-ascensos-proyeccion"
        departamento="D1 - Personal"
        color={COLOR_D1}
        filas={ascensosProyeccion}
        labelPeriodoAnterior="CANTIDAD 2024"
        labelPeriodoActual="CANTIDAD 2025"
      />
    </div>
  );
}
