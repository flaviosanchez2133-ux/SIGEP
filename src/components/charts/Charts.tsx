import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

interface ChartContainerProps {
  titulo: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({
  titulo,
  children,
  className,
}: ChartContainerProps) {
  return (
    <div className={`card-glass relative overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="card-header bg-dark-800/50 border-b border-blue-500/10">
        <span className="text-gray-200">{titulo}</span>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Gráfico de barras comparativo
interface BarChartComparativoProps {
  datos: Array<{
    nombre: string;
    anterior: number;
    actual: number;
  }>;
  colorAnterior?: string;
  colorActual?: string;
  height?: number;
}

export function BarChartComparativo({
  datos,
  colorAnterior = '#475569',
  colorActual = '#3b82f6',
  height = 300,
}: BarChartComparativoProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={datos}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="nombre" tick={{ fontSize: 12, fill: '#94a3b8' }} />
        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)',
            color: '#e2e8f0',
          }}
          formatter={(value: number) =>
            new Intl.NumberFormat('es-AR').format(value)
          }
          labelStyle={{ color: '#94a3b8' }}
        />
        <Legend wrapperStyle={{ color: '#94a3b8' }} />
        <Bar
          dataKey="anterior"
          name="Período Anterior"
          fill={colorAnterior}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="actual"
          name="Período Actual"
          fill={colorActual}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Gráfico de torta
interface PieChartDataItem {
  nombre: string;
  valor: number;
  color: string;
}

interface PieChartComponentProps {
  datos: PieChartDataItem[];
  height?: number;
  showLabel?: boolean;
}

export function PieChartComponent({
  datos,
  height = 300,
  showLabel = true,
}: PieChartComponentProps) {
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={datos}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={showLabel ? renderCustomizedLabel : undefined}
          outerRadius={100}
          fill="#8884d8"
          dataKey="valor"
          nameKey="nombre"
        >
          {datos.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) =>
            new Intl.NumberFormat('es-AR').format(value)
          }
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)',
            color: '#e2e8f0',
          }}
        />
        <Legend wrapperStyle={{ color: '#94a3b8' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Gráfico de líneas
interface LineChartDataItem {
  nombre: string;
  [key: string]: string | number;
}

interface LineChartComponentProps {
  datos: LineChartDataItem[];
  lineas: Array<{
    key: string;
    nombre: string;
    color: string;
  }>;
  height?: number;
}

export function LineChartComponent({
  datos,
  lineas,
  height = 300,
}: LineChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={datos}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="nombre" tick={{ fontSize: 12, fill: '#94a3b8' }} />
        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)',
            color: '#e2e8f0',
          }}
          formatter={(value: number) =>
            new Intl.NumberFormat('es-AR').format(value)
          }
        />
        <Legend wrapperStyle={{ color: '#94a3b8' }} />
        {lineas.map(linea => (
          <Line
            key={linea.key}
            type="monotone"
            dataKey={linea.key}
            name={linea.nombre}
            stroke={linea.color}
            strokeWidth={2}
            dot={{ fill: linea.color, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

// Gráfico de área
interface AreaChartComponentProps {
  datos: LineChartDataItem[];
  areas: Array<{
    key: string;
    nombre: string;
    color: string;
  }>;
  height?: number;
}

export function AreaChartComponent({
  datos,
  areas,
  height = 300,
}: AreaChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart
        data={datos}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="nombre" tick={{ fontSize: 12, fill: '#94a3b8' }} />
        <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)',
            color: '#e2e8f0',
          }}
          formatter={(value: number) =>
            new Intl.NumberFormat('es-AR').format(value)
          }
        />
        <Legend wrapperStyle={{ color: '#94a3b8' }} />
        {areas.map(area => (
          <Area
            key={area.key}
            type="monotone"
            dataKey={area.key}
            name={area.nombre}
            stroke={area.color}
            fill={area.color}
            fillOpacity={0.3}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
