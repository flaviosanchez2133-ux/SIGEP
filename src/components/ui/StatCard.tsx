import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import clsx from 'clsx';

interface StatCardProps {
  titulo: string;
  valor: number | string;
  valorAnterior?: number;
  porcentaje?: number;
  color?: string;
  icon?: React.ReactNode;
  formato?: 'numero' | 'porcentaje' | 'moneda';
  subtitulo?: string;
}

export function StatCard({
  titulo,
  valor,
  valorAnterior,
  porcentaje,
  color = '#3b82f6',
  icon,
  formato = 'numero',
  subtitulo,
}: StatCardProps) {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;

    switch (formato) {
      case 'porcentaje':
        return `${val.toFixed(2)}%`;
      case 'moneda':
        return new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS',
          maximumFractionDigits: 0,
        }).format(val);
      default:
        return new Intl.NumberFormat('es-AR').format(val);
    }
  };

  const getTrend = () => {
    if (porcentaje === undefined || porcentaje === 0) {
      return {
        icon: <Minus size={16} />,
        color: 'text-gray-400',
        bg: 'bg-gray-500/20',
        border: 'border-gray-500/30',
      };
    }
    if (porcentaje > 0) {
      return {
        icon: <TrendingUp size={16} />,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-500/30',
      };
    }
    return {
      icon: <TrendingDown size={16} />,
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      border: 'border-red-500/30',
    };
  };

  const trend = getTrend();

  return (
    <div
      className="card-glass p-6 hover:shadow-glow transition-all duration-500 group relative overflow-hidden"
      style={{
        borderTop: `2px solid ${color}`,
      }}
    >
      {/* Efecto de brillo en hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}10 0%, transparent 70%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400 font-medium">{titulo}</p>
            {subtitulo && (
              <p className="text-xs text-gray-500 mt-0.5">{subtitulo}</p>
            )}
          </div>
          {icon && (
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${color}20`,
                boxShadow: `0 0 20px ${color}30`,
              }}
            >
              <span style={{ color }}>{icon}</span>
            </div>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p
              className="text-3xl font-bold text-white"
              style={{
                textShadow: `0 0 30px ${color}40`,
              }}
            >
              {formatValue(valor)}
            </p>
            {valorAnterior !== undefined && (
              <p className="text-sm text-gray-500 mt-1">
                Anterior:{' '}
                <span className="text-gray-400">
                  {formatValue(valorAnterior)}
                </span>
              </p>
            )}
          </div>

          {porcentaje !== undefined && (
            <div
              className={clsx(
                'flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border',
                trend.bg,
                trend.color,
                trend.border
              )}
              style={{
                boxShadow:
                  porcentaje !== 0
                    ? `0 0 15px ${
                        porcentaje > 0
                          ? 'rgba(16, 185, 129, 0.3)'
                          : 'rgba(239, 68, 68, 0.3)'
                      }`
                    : 'none',
              }}
            >
              {trend.icon}
              <span>
                {porcentaje > 0 ? '+' : ''}
                {porcentaje}%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
