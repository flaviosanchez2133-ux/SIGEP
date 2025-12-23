import { Truck, Shield, Car, Wrench } from 'lucide-react';
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
  armamentoTotal,
  proyeccionesCompras,
  vehiculosMinisterio,
  datosGraficoArmamento,
  datosGraficoDistribucionArmamento,
  datosGraficoVehiculos,
} from '../../data/d4-logistica';

const COLOR_D4 = '#d69e2e';

// Datos adicionales para tablas de vehículos
const vehiculosEstado2025 = [
  { id: 'autobomba', label: 'Autobomba', periodoAnterior: 1, periodoActual: 4 },
  {
    id: 'automovil',
    label: 'Automóvil',
    periodoAnterior: 32,
    periodoActual: 40,
  },
  { id: 'camion', label: 'Camión', periodoAnterior: 3, periodoActual: 1 },
  {
    id: 'camion_guinche',
    label: 'Camión Guinche',
    periodoAnterior: 0,
    periodoActual: 1,
  },
  {
    id: 'camioneta',
    label: 'Camioneta',
    periodoAnterior: 241,
    periodoActual: 93,
  },
  { id: 'cuatri', label: 'Cuatriciclo', periodoAnterior: 0, periodoActual: 4 },
  { id: 'furgon', label: 'Furgón', periodoAnterior: 11, periodoActual: 9 },
  {
    id: 'motocicleta',
    label: 'Motocicleta',
    periodoAnterior: 342,
    periodoActual: 286,
  },
];

const adquisicionesRecientes = [
  {
    id: 'chalecos',
    label: 'Chalecos Balísticos (Delta V-stop3)',
    periodoAnterior: 5000,
    periodoActual: 4500,
  },
  {
    id: 'escopetas',
    label: 'Escopetas 12/70 (Bersa)',
    periodoAnterior: 300,
    periodoActual: 150,
  },
  {
    id: 'pistolas',
    label: 'Pistolas Cal 9mm (Bersa)',
    periodoAnterior: 1000,
    periodoActual: 775,
  },
];

const armasMenosLetales2025 = [
  { id: 'taser', label: 'Taser 7', periodoAnterior: 0, periodoActual: 44 },
  {
    id: 'byrna_mission',
    label: 'Byrna Mission 4',
    periodoAnterior: 0,
    periodoActual: 189,
  },
  {
    id: 'byrna_cortas',
    label: 'Byrna (cortas)',
    periodoAnterior: 0,
    periodoActual: 300,
  },
];

export function D4LogisticaPage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="Departamento Logística (D-4)"
        subtitulo="Gestión de recursos materiales, armamento y vehículos"
        color={COLOR_D4}
        icon={<Truck size={24} />}
      >
        <ExportButtons
          titulo="Logistica_Recursos"
          datos={armamentoTotal}
          departamento="Departamento Logística (D-4)"
        />
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Pistolas Cal 9mm"
          valor={13860}
          valorAnterior={12585}
          porcentaje={10}
          color={COLOR_D4}
          icon={<Shield size={20} />}
        />
        <StatCard
          titulo="Chalecos Balísticos"
          valor={7300}
          valorAnterior={5800}
          porcentaje={26}
          color="#3b82f6"
          icon={<Shield size={20} />}
        />
        <StatCard
          titulo="Vehículos en Servicio"
          valor={630}
          valorAnterior={592}
          porcentaje={6}
          color="#059669"
          icon={<Car size={20} />}
        />
        <StatCard
          titulo="Armas Menos Letales"
          valor={533}
          subtitulo="Nueva incorporación 2025"
          color="#7c3aed"
          icon={<Wrench size={20} />}
        />
      </div>

      {/* Sección Armamento */}
      <SectionHeader titulo="CANTIDAD TOTAL DE ARMAMENTO" color={COLOR_D4} />

      <TablaComparativa
        titulo="ARMAMENTO EN SERVICIO"
        tablaId="d4-armamento-servicio"
        departamento="D4 - Logística"
        color={COLOR_D4}
        filas={armamentoTotal}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer titulo="Comparativo Armamento">
          <BarChartComparativo
            datos={datosGraficoArmamento}
            colorAnterior="#94a3b8"
            colorActual={COLOR_D4}
          />
        </ChartContainer>

        <ChartContainer titulo="Distribución Armamento Actual">
          <PieChartComponent datos={datosGraficoDistribucionArmamento} />
        </ChartContainer>
      </div>

      {/* Proyecciones de compras */}
      <SectionHeader titulo="PROYECCIONES DE COMPRAS" color={COLOR_D4} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="PROYECCIÓN DE COMPRAS"
          tablaId="d4-proyeccion-compras"
          departamento="D4 - Logística"
          color={COLOR_D4}
          filas={proyeccionesCompras}
          labelPeriodoAnterior="PROYECCIÓN 2024"
          labelPeriodoActual="PROYECCIÓN 2025"
        />

        <TablaComparativa
          titulo="ADQUISICIONES REALIZADAS"
          tablaId="d4-adquisiciones-realizadas"
          departamento="D4 - Logística"
          color={COLOR_D4}
          filas={adquisicionesRecientes}
          labelPeriodoAnterior="META"
          labelPeriodoActual="ADQUIRIDO"
        />
      </div>

      {/* Armas Menos Letales */}
      <SectionHeader
        titulo="ARMAS MENOS LETALES - INCORPORACIÓN 2025"
        subtitulo="Nueva categoría de equipamiento"
        color={COLOR_D4}
      />

      <TablaComparativa
        titulo="ARMAS MENOS LETALES ADQUIRIDAS"
        tablaId="d4-armas-menos-letales"
        departamento="D4 - Logística"
        color={COLOR_D4}
        filas={armasMenosLetales2025}
        labelPeriodoAnterior="STOCK ANTERIOR"
        labelPeriodoActual="CANTIDAD 2025"
      />

      {/* Sección Vehículos */}
      <SectionHeader titulo="PARQUE AUTOMOTOR" color={COLOR_D4} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TablaComparativa
          titulo="VEHÍCULOS EN SERVICIO vs FUERA DE SERVICIO (2025)"
          tablaId="d4-vehiculos-servicio-fuera"
          departamento="D4 - Logística"
          color={COLOR_D4}
          filas={vehiculosEstado2025}
          labelPeriodoAnterior="EN SERVICIO"
          labelPeriodoActual="FUERA SERV."
        />

        <TablaComparativa
          titulo="VEHÍCULOS MINISTERIO DE SEGURIDAD"
          tablaId="d4-vehiculos-ministerio"
          departamento="D4 - Logística"
          color={COLOR_D4}
          filas={vehiculosMinisterio}
        />
      </div>

      <ChartContainer titulo="Comparativo Vehículos Principales">
        <BarChartComparativo
          datos={datosGraficoVehiculos}
          colorAnterior="#94a3b8"
          colorActual={COLOR_D4}
        />
      </ChartContainer>

      {/* Resumen de rastreo vehicular */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: COLOR_D4, color: 'white' }}
        >
          SISTEMA DE RASTREO VEHICULAR
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <p className="text-sm text-yellow-600 mb-1">
                Vehículos con GPS (Jul 2025)
              </p>
              <p className="text-2xl font-bold text-yellow-700">962</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <p className="text-sm text-yellow-600 mb-1">
                Total Parque Automotor
              </p>
              <p className="text-2xl font-bold text-yellow-700">1.071</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <p className="text-sm text-green-600 mb-1">Cobertura GPS</p>
              <p className="text-2xl font-bold text-green-700">90%</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-blue-600 mb-1">Motos con Rastreo</p>
              <p className="text-2xl font-bold text-blue-700">572</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm">
              <strong>Nota:</strong> El sistema de rastreo vehicular permite el
              monitoreo en tiempo real de las unidades móviles, optimizando los
              tiempos de respuesta y la asignación de recursos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
