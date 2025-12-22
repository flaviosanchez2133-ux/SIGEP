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
  Activity,
  Zap,
} from 'lucide-react';
import {
  PageHeader,
  SectionHeader,
  StatCard,
  ChartContainer,
  BarChartComparativo,
  PieChartComponent,
} from '../../components';

const COLOR_DASHBOARD = '#3b82f6';

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
        titulo="Centro de Comando"
        subtitulo="Panel de control estadístico en tiempo real"
        color={COLOR_DASHBOARD}
        icon={<Activity size={24} />}
      />

      {/* Status Bar */}
      <div className="card-glass p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="led-indicator active" />
              <span className="text-sm text-gray-400">Sistema Operativo</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-amber-400 animate-pulse" />
              <span className="text-sm text-gray-400">
                Actualización en tiempo real
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Última actualización:{' '}
            <span className="text-blue-400 font-mono">hace 2 minutos</span>
          </div>
        </div>
      </div>

      {/* Indicadores Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Fuerza Efectiva Total"
          valor={12186}
          valorAnterior={11287}
          porcentaje={8}
          color="#3b82f6"
          icon={<Users size={20} />}
        />
        <StatCard
          titulo="Homicidios Dolosos"
          valor={21}
          valorAnterior={41}
          porcentaje={-49}
          color="#ef4444"
          icon={<AlertTriangle size={20} />}
        />
        <StatCard
          titulo="Detenidos Procesales"
          valor={3181}
          valorAnterior={4001}
          porcentaje={-20}
          color="#8b5cf6"
          icon={<Scale size={20} />}
        />
        <StatCard
          titulo="Cocaína Secuestrada (g)"
          valor={37300}
          valorAnterior={14417}
          porcentaje={159}
          color="#10b981"
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
          color="#f59e0b"
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
          color="#06b6d4"
          icon={<GraduationCap size={20} />}
        />
        <StatCard
          titulo="Operativos Realizados"
          valor={5678}
          valorAnterior={4892}
          porcentaje={16}
          color="#22c55e"
          icon={<MapPin size={20} />}
        />
      </div>

      {/* Logros Destacados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="card-glass relative overflow-hidden group"
          style={{
            background:
              'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-400/80 text-sm font-medium">
                  Reducción de Homicidios
                </p>
                <p
                  className="text-5xl font-bold mt-3 text-emerald-400"
                  style={{ textShadow: '0 0 30px rgba(34, 197, 94, 0.5)' }}
                >
                  -49%
                </p>
                <p className="text-gray-400 text-sm mt-3">De 41 a 21 casos</p>
              </div>
              <TrendingDown
                size={64}
                className="text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors duration-500"
              />
            </div>
          </div>
        </div>

        <div
          className="card-glass relative overflow-hidden group"
          style={{
            background:
              'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400/80 text-sm font-medium">
                  Incremento Cocaína Secuestrada
                </p>
                <p
                  className="text-5xl font-bold mt-3 text-blue-400"
                  style={{ textShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
                >
                  +159%
                </p>
                <p className="text-gray-400 text-sm mt-3">De 14.4kg a 37.3kg</p>
              </div>
              <TrendingUp
                size={64}
                className="text-blue-500/20 group-hover:text-blue-500/40 transition-colors duration-500"
              />
            </div>
          </div>
        </div>

        <div
          className="card-glass relative overflow-hidden group"
          style={{
            background:
              'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400/80 text-sm font-medium">
                  Reducción Detenidos en Comisarías
                </p>
                <p
                  className="text-5xl font-bold mt-3 text-purple-400"
                  style={{ textShadow: '0 0 30px rgba(139, 92, 246, 0.5)' }}
                >
                  -20%
                </p>
                <p className="text-gray-400 text-sm mt-3">De 4.001 a 3.181</p>
              </div>
              <TrendingDown
                size={64}
                className="text-purple-500/20 group-hover:text-purple-500/40 transition-colors duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer titulo="Indicadores por Departamento">
          <BarChartComparativo
            datos={datosResumenDepartamentos}
            colorAnterior="#475569"
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
          colorAnterior="#475569"
          colorActual="#10b981"
        />
      </ChartContainer>

      {/* Resumen por Departamento */}
      <SectionHeader
        titulo="RESUMEN POR DEPARTAMENTO"
        color={COLOR_DASHBOARD}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          className="card-glass hover:shadow-glow transition-all duration-500 cursor-pointer group"
          style={{ borderLeft: '3px solid #3b82f6' }}
        >
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl transition-all duration-300 group-hover:shadow-glow-sm"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
              >
                <Users size={24} style={{ color: '#3b82f6' }} />
              </div>
              <div>
                <h3 className="font-bold text-white">D-1 Personal</h3>
                <p className="text-sm text-emerald-400">
                  12.186 efectivos (+8%)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card-glass hover:shadow-glow transition-all duration-500 cursor-pointer group"
          style={{ borderLeft: '3px solid #8B4513' }}
        >
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl transition-all duration-300 group-hover:shadow-glow-sm"
                style={{ backgroundColor: 'rgba(139, 69, 19, 0.2)' }}
              >
                <Shield size={24} style={{ color: '#8B4513' }} />
              </div>
              <div>
                <h3 className="font-bold text-white">D-2 Inteligencia</h3>
                <p className="text-sm text-emerald-400">
                  26 procedimientos (+117%)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card-glass hover:shadow-glow transition-all duration-500 cursor-pointer group"
          style={{ borderLeft: '3px solid #22c55e' }}
        >
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl transition-all duration-300 group-hover:shadow-glow-sm"
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
              >
                <AlertTriangle size={24} style={{ color: '#22c55e' }} />
              </div>
              <div>
                <h3 className="font-bold text-white">D-3 Operaciones</h3>
                <p className="text-sm text-emerald-400">21 homicidios (-49%)</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card-glass hover:shadow-glow transition-all duration-500 cursor-pointer group"
          style={{ borderLeft: '3px solid #f59e0b' }}
        >
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl transition-all duration-300 group-hover:shadow-glow-sm"
                style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
              >
                <Truck size={24} style={{ color: '#f59e0b' }} />
              </div>
              <div>
                <h3 className="font-bold text-white">D-4 Logística</h3>
                <p className="text-sm text-emerald-400">630 vehículos (+6%)</p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card-glass hover:shadow-glow transition-all duration-500 cursor-pointer group"
          style={{ borderLeft: '3px solid #8b5cf6' }}
        >
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl transition-all duration-300 group-hover:shadow-glow-sm"
                style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
              >
                <Scale size={24} style={{ color: '#8b5cf6' }} />
              </div>
              <div>
                <h3 className="font-bold text-white">D-5 Judicial</h3>
                <p className="text-sm text-emerald-400">
                  3.181 detenidos (-20%)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="card-glass hover:shadow-glow transition-all duration-500 cursor-pointer group"
          style={{ borderLeft: '3px solid #ef4444' }}
        >
          <div className="card-body">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl transition-all duration-300 group-hover:shadow-glow-sm"
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
              >
                <Package size={24} style={{ color: '#ef4444' }} />
              </div>
              <div>
                <h3 className="font-bold text-white">DIGEDROP</h3>
                <p className="text-sm text-emerald-400">
                  37.3kg cocaína (+159%)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer informativo */}
      <div
        className="card-glass relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(30, 58, 95, 0.1) 100%)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        <div className="card-body">
          <div className="flex items-start gap-4">
            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
              }}
            >
              <Shield size={32} className="text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">
                SIGEP - Sistema de Gestión Estadística Policial
              </h3>
              <p className="text-gray-400 mt-2">
                Período comparado:{' '}
                <span className="text-blue-400 font-medium">
                  01/01/24 - 31/07/24
                </span>{' '}
                vs{' '}
                <span className="text-blue-400 font-medium">
                  01/01/25 - 31/07/25
                </span>
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
