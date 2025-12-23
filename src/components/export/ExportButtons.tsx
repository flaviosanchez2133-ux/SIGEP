import { FileSpreadsheet, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { FilaComparativa } from '../tables/TablaComparativa';
import { useAppStore } from '../../store';

interface ExportButtonsProps {
  titulo: string;
  datos: FilaComparativa[];
  departamento: string;
  periodo?: string; // Ahora es opcional, se usa del store si no se proporciona
}

export function ExportButtons({
  titulo,
  datos,
  departamento,
  periodo: periodoProp,
}: ExportButtonsProps) {
  const { periodoSeleccionado } = useAppStore();

  // Usar el período del store si no se pasa como prop
  const periodo =
    periodoProp ||
    `${periodoSeleccionado.anterior.label} vs ${periodoSeleccionado.actual.label}`;

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(30, 58, 95);
    doc.rect(0, 0, 210, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('SIGEP - Policía de Tucumán', 105, 15, { align: 'center' });

    doc.setFontSize(12);
    doc.text(departamento, 105, 25, { align: 'center' });
    doc.text(titulo, 105, 33, { align: 'center' });

    // Info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(`Período: ${periodo}`, 14, 50);
    doc.text(
      `Fecha de generación: ${new Date().toLocaleDateString('es-AR')}`,
      14,
      56
    );

    // Tabla
    const tableData = datos.map(fila => {
      const diferencia = fila.periodoActual - fila.periodoAnterior;
      const porcentaje =
        fila.periodoAnterior === 0
          ? fila.periodoActual > 0
            ? 100
            : 0
          : Math.round(
              ((fila.periodoActual - fila.periodoAnterior) /
                fila.periodoAnterior) *
                100
            );

      return [
        fila.label,
        fila.periodoAnterior.toLocaleString('es-AR'),
        fila.periodoActual.toLocaleString('es-AR'),
        (diferencia > 0 ? '+' : '') + diferencia.toLocaleString('es-AR'),
        `${porcentaje > 0 ? '+' : ''}${porcentaje}%`,
      ];
    });

    // Agregar total
    const totalAnterior = datos.reduce((acc, f) => acc + f.periodoAnterior, 0);
    const totalActual = datos.reduce((acc, f) => acc + f.periodoActual, 0);
    const totalDif = totalActual - totalAnterior;
    const totalPct =
      totalAnterior === 0
        ? 100
        : Math.round(((totalActual - totalAnterior) / totalAnterior) * 100);

    tableData.push([
      'TOTAL',
      totalAnterior.toLocaleString('es-AR'),
      totalActual.toLocaleString('es-AR'),
      (totalDif > 0 ? '+' : '') + totalDif.toLocaleString('es-AR'),
      `${totalPct > 0 ? '+' : ''}${totalPct}%`,
    ]);

    autoTable(doc, {
      head: [
        [
          'Detalle',
          'Período Anterior',
          'Período Actual',
          'Diferencia',
          'Porcentaje',
        ],
      ],
      body: tableData,
      startY: 65,
      headStyles: {
        fillColor: [30, 58, 95],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      styles: {
        fontSize: 9,
        cellPadding: 4,
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
        1: { halign: 'center' },
        2: { halign: 'center' },
        3: { halign: 'center' },
        4: { halign: 'center' },
      },
      didParseCell: function (data) {
        // Última fila (total) en negrita
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fontStyle = 'bold';
          data.cell.styles.fillColor = [229, 231, 235];
        }
      },
    });

    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text(
        `Página ${i} de ${pageCount} - Generado por SIGEP`,
        105,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    doc.save(
      `${titulo.replace(/\s+/g, '_')}_${
        new Date().toISOString().split('T')[0]
      }.pdf`
    );
  };

  const exportToExcel = () => {
    const wsData: (string | number)[][] = [
      ['SIGEP - Sistema de Gestión Estadística Policial'],
      ['Policía de Tucumán'],
      [departamento],
      [titulo],
      [`Período: ${periodo}`],
      [`Fecha de generación: ${new Date().toLocaleDateString('es-AR')}`],
      [],
      [
        'Detalle',
        'Período Anterior',
        'Período Actual',
        'Diferencia',
        'Porcentaje',
      ],
    ];

    datos.forEach(fila => {
      const diferencia = fila.periodoActual - fila.periodoAnterior;
      const porcentaje =
        fila.periodoAnterior === 0
          ? fila.periodoActual > 0
            ? 100
            : 0
          : Math.round(
              ((fila.periodoActual - fila.periodoAnterior) /
                fila.periodoAnterior) *
                100
            );

      wsData.push([
        fila.label,
        fila.periodoAnterior,
        fila.periodoActual,
        diferencia,
        `${porcentaje}%`,
      ]);
    });

    // Total
    const totalAnterior = datos.reduce((acc, f) => acc + f.periodoAnterior, 0);
    const totalActual = datos.reduce((acc, f) => acc + f.periodoActual, 0);
    const totalDif = totalActual - totalAnterior;
    const totalPct =
      totalAnterior === 0
        ? 100
        : Math.round(((totalActual - totalAnterior) / totalAnterior) * 100);

    wsData.push([
      'TOTAL',
      totalAnterior,
      totalActual,
      totalDif,
      `${totalPct}%`,
    ]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    // Ajustar anchos de columna
    ws['!cols'] = [
      { wch: 30 },
      { wch: 18 },
      { wch: 18 },
      { wch: 15 },
      { wch: 12 },
    ];

    XLSX.writeFile(
      wb,
      `${titulo.replace(/\s+/g, '_')}_${
        new Date().toISOString().split('T')[0]
      }.xlsx`
    );
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={exportToPDF}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
      >
        <FileText size={18} />
        Exportar PDF
      </button>
      <button
        onClick={exportToExcel}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
      >
        <FileSpreadsheet size={18} />
        Exportar Excel
      </button>
    </div>
  );
}
