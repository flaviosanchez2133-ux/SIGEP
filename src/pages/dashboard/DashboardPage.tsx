import {
  Users,
  Shield,
  Scale,
  Truck,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Package,
  MapPin,
  GraduationCap,
} from 'lucide-react';
import {
  PageHeader,
  SectionHeader,
  StatCard,
  ChartContainer,
  BarChartComparativo,
  PieChartComponent,
} from '../../components';

const COLOR_DASHBOARD = '#1e3a5f';

// Datos resumidos para el dashboard
const datosResumenDepartamentos = [
  { nombre: 'D-1 Personal', anterior: 11287, actual: 12186 },
  { nombre: 'D-3 Homicidios', anterior: 41, actual: 21 },
  { nombre: 'D-4 Vehículos', anterior: 592, actual: 630 },
  { nombre: 'D-5 Detenidos', anterior: 4001, actual: 3181 },
];

const datosDistribucionPersonal = [
  { nombre: 'UR Capital', valor: 3245, color: '#1e3a5f' },
  { nombre: 'UR Norte', valor: 2156, color: '#3b82f6' },
  { nombre: 'UR Sur', valor: 1678, color: '#8b5cf6' },
  { nombre: 'UR Este', valor: 1890, color: '#f97316' },
  { nombre: 'UR Oeste', valor: 1456, color: '#22c55e' },
  { nombre: 'Otros', valor: 1761, color: '#94a3b8' },
];

const datosIndicadoresOperativos = [
  { nombre: 'Allanamientos', anterior: 1567, actual: 1823 },
  { nombre: 'Procedimientos', anterior: 4532, actual: 5123 },
  { nombre: 'Operativos', anterior: 2345, actual: 2678 },
  { nombre: 'Controles', anterior: 3456, actual: 3890 },
];

export function DashboardPage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="Dashboard General"
        subtitulo="Resumen ejecutivo de estadísticas policiales"
        color={COLOR_DASHBOARD}
        icon={<Shield size={24} />}
      />

      {/* Indicadores Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Fuerza Efectiva Total"
          valor={12186}
          valorAnterior={11287}
          porcentaje={8}
          color="#1e3a5f"
          icon={<Users size={20} />}
        />
        <StatCard
          titulo="Homicidios Dolosos"
          valor={21}
          valorAnterior={41}
          porcentaje={-49}
          color="#dc2626"
          icon={<AlertTriangle size={20} />}
        />
        <StatCard
          titulo="Detenidos Procesales"
          valor={3181}
          valorAnterior={4001}
          porcentaje={-20}
          color="#7c3aed"
          icon={<Scale size={20} />}
        />
        <StatCard
          titulo="Cocaína Secuestrada (g)"
          valor={37300}
          valorAnterior={14417}
          porcentaje={159}
          color="#059669"
          icon={<Package size={20} />}
        />
      </div>

      {/* Segunda fila de indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Vehículos en Servicio"
          valor={630}
          valorAnterior={592}
          porcentaje={6}
          color="#d69e2e"
          icon={<Truck size={20} />}
        />
        <StatCard
          titulo="Armas Secuestradas"
          valor={454}
          valorAnterior={382}
          porcentaje={19}
          color="#8B4513"
          icon={<Shield size={20} />}
        />
        <StatCard
          titulo="Personal Capacitado"
          valor={5157}
          valorAnterior={4491}
          porcentaje={15}
          color="#0891b2"
          icon={<GraduationCap size={20} />}
        />
        <StatCard
          titulo="Operativos Realizados"
          valor={5678}
          valorAnterior={4892}
          porcentaje={16}
          color="#166534"
          icon={<MapPin size={20} />}
        />
      </div>

      {/* Logros Destacados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-to-br from-green-500 to-green-700 text-white">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">
                  Reducción de Homicidios
                </p>
                <p className="text-4xl font-bold mt-2">-49%</p>
                <p className="text-green-100 text-sm mt-2">De 41 a 21 casos</p>
              </div>
              <TrendingDown size={64} className="text-green-200 opacity-50" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-blue-500 to-blue-700 text-white">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">
                  Incremento Cocaína Secuestrada
                </p>
                <p className="text-4xl font-bold mt-2">+159%</p>
                <p className="text-blue-100 text-sm mt-2">De 14.4kg a 37.3kg</p>
              </div>
              <TrendingUp size={64} className="text-blue-200 opacity-50" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-700 text-white">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">
                  Reducción Detenidos en Comisarías
                </p>
                <p className="text-4xl font-bold mt-2">-20%</p>
                <p className="text-purple-100 text-sm mt-2">De 4.001 a 3.181</p>
              </div>
              <TrendingDown size={64} className="text-purple-200 opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer titulo="Indicadores por Departamento">
          <BarChartComparativo
            datos={datosResumenDepartamentos}
            colorAnterior="#94a3b8"
            colorActual={COLOR_DASHBOARD}
          />
        </ChartContainer>

        <ChartContainer titulo="Distribución de Personal por Regional">
          <PieChartComponent datos={datosDistribucionPersonal} />
        </ChartContainer>
      </div>

      {/* Indicadores Operativos */}
      <SectionHeader titulo="INDICADORES OPERATIVOS" color={COLOR_DASHBOARD} />

      <ChartContainer titulo="Comparativo de Actividad Operativa">
        <BarChartComparativo
          datos={datosIndicadoresOperativos}
          colorAnterior="#94a3b8"
          colorActual="#059669"
        />
      </ChartContainer>

      {/* Resumen por Departamento */}
      <SectionHeader
        titulo="RESUMEN POR DEPARTAMENTO"
        color={COLOR_DASHBOARD}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          className="card hover:shadow-lg transition-shadow cursor-pointer"
          style={{ borderLeft: '4px solid #1e3a5f' }}
        >
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#1e3a5f20' }}
              >
                <Users size={24} style={{ color: '#1e3a5f' }} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">D-1 Personal</h3>
                <p className="text-sm text-gray-600">12.186 efectivos (+8%)</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card hover:shadow-lg transition-shadow cursor-pointer"
          style={{ borderLeft: '4px solid #8B4513' }}
        >
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#8B451320' }}
              >
                <Shield size={24} style={{ color: '#8B4513' }} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">D-2 Inteligencia</h3>
                <p className="text-sm text-gray-600">
                  26 procedimientos (+117%)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card hover:shadow-lg transition-shadow cursor-pointer"
          style={{ borderLeft: '4px solid #166534' }}
        >
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#16653420' }}
              >
                <AlertTriangle size={24} style={{ color: '#166534' }} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">D-3 Operaciones</h3>
                <p className="text-sm text-gray-600">21 homicidios (-49%)</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card hover:shadow-lg transition-shadow cursor-pointer"
          style={{ borderLeft: '4px solid #d69e2e' }}
        >
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#d69e2e20' }}
              >
                <Truck size={24} style={{ color: '#d69e2e' }} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">D-4 Logística</h3>
                <p className="text-sm text-gray-600">630 vehículos (+6%)</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card hover:shadow-lg transition-shadow cursor-pointer"
          style={{ borderLeft: '4px solid #7c3aed' }}
        >
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#7c3aed20' }}
              >
                <Scale size={24} style={{ color: '#7c3aed' }} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">D-5 Judicial</h3>
                <p className="text-sm text-gray-600">3.181 detenidos (-20%)</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card hover:shadow-lg transition-shadow cursor-pointer"
          style={{ borderLeft: '4px solid #dc2626' }}
        >
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#dc262620' }}
              >
                <Package size={24} style={{ color: '#dc2626' }} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">DIGEDROP</h3>
                <p className="text-sm text-gray-600">37.3kg cocaína (+159%)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer informativo */}
      <div className="card bg-gray-50">
        <div className="card-body">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield size={32} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                SIGEP - Sistema de Gestión Estadística Policial
              </h3>
              <p className="text-gray-600 mt-2">
                Período comparado: <strong>01/01/24 - 31/07/24</strong> vs{' '}
                <strong>01/01/25 - 31/07/25</strong>
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Los datos presentados corresponden a información oficial de la
                Policía de Tucumán. Las variaciones porcentuales reflejan el
                comparativo entre ambos períodos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
