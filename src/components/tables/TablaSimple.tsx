import clsx from 'clsx';

export interface ColumnaTabla {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  formato?: 'texto' | 'numero' | 'porcentaje' | 'moneda';
  width?: string;
}

interface TablaSimpleProps {
  titulo: string;
  color?: string;
  columnas: ColumnaTabla[];
  datos: Record<string, any>[];
  className?: string;
}

export function TablaSimple({
  titulo,
  color = '#1e3a5f',
  columnas,
  datos,
  className,
}: TablaSimpleProps) {
  const formatValue = (valor: any, formato?: string) => {
    if (valor === null || valor === undefined) return '-';

    switch (formato) {
      case 'numero':
        return new Intl.NumberFormat('es-AR').format(valor);
      case 'porcentaje':
        return `${valor}%`;
      case 'moneda':
        return new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS',
          maximumFractionDigits: 0,
        }).format(valor);
      default:
        return valor;
    }
  };

  return (
    <div className={clsx('card overflow-hidden', className)}>
      <div className="px-6 py-4 text-white" style={{ backgroundColor: color }}>
        <h3 className="font-semibold text-lg">{titulo}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="table-header">
              {columnas.map(col => (
                <th
                  key={col.key}
                  className={clsx(
                    'table-cell',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right',
                    !col.align && 'text-left'
                  )}
                  style={{ width: col.width }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                {columnas.map(col => (
                  <td
                    key={col.key}
                    className={clsx(
                      'table-cell',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right'
                    )}
                  >
                    {formatValue(fila[col.key], col.formato)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
