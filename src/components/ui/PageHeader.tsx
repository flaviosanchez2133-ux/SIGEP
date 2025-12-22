import { ReactNode } from 'react';

interface PageHeaderProps {
  titulo: string;
  subtitulo?: string;
  color?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export function PageHeader({
  titulo,
  subtitulo,
  color = '#3b82f6',
  icon,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          {icon && (
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg relative overflow-hidden"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 30px ${color}50`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <span className="relative z-10">{icon}</span>
            </div>
          )}
          <div>
            <h1
              className="text-2xl font-bold text-white"
              style={{
                textShadow: `0 0 30px ${color}30`,
              }}
            >
              {titulo}
            </h1>
            {subtitulo && <p className="text-gray-400 mt-1">{subtitulo}</p>}
          </div>
        </div>

        {children && <div className="flex items-center gap-3">{children}</div>}
      </div>

      <div className="relative h-1 w-40 rounded-full mt-4 bg-dark-700 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 w-full rounded-full animate-shimmer"
          style={{
            backgroundColor: color,
            backgroundImage: `linear-gradient(90deg, ${color}, ${color}80, ${color})`,
            backgroundSize: '200% 100%',
          }}
        />
      </div>
    </div>
  );
}

interface SectionHeaderProps {
  titulo: string;
  subtitulo?: string;
  color?: string;
}

export function SectionHeader({
  titulo,
  subtitulo,
  color = '#3b82f6',
}: SectionHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <div
          className="w-1.5 h-7 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 15px ${color}80`,
          }}
        />
        <h2 className="text-lg font-semibold text-white tracking-wide">
          {titulo}
        </h2>
      </div>
      {subtitulo && (
        <p className="text-sm text-gray-500 mt-1 ml-4">{subtitulo}</p>
      )}
    </div>
  );
}
