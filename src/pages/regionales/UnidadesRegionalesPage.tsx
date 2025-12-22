import { useState } from 'react';
import { MapPin, Users, Search, Car } from 'lucide-react';
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
  urCapitalPrivadosLibertad,
  urCapitalAllanamientos,
  urCapitalVehiculosSecuestrados,
  urNortePrivadosLibertad,
  urNorteAllanamientos,
  urNorteVehiculosSecuestrados,
  urSurPrivadosLibertad,
  urSurAllanamientos,
  urSurVehiculosSecuestrados,
  urEstePrivadosLibertad,
  urEsteAllanamientos,
  urEsteVehiculosSecuestrados,
  urOestePrivadosLibertad,
  urOesteAllanamientos,
  urOesteVehiculosSecuestrados,
  comparativoDetenidosRegionales,
  distribucionRegionalActual,
} from '../../data/unidades-regionales';

const COLOR_UR = '#1e3a5f';

type RegionalKey = 'capital' | 'norte' | 'sur' | 'este' | 'oeste';

const coloresRegionales: Record<RegionalKey, string> = {
  capital: '#1e3a5f',
  norte: '#3b82f6',
  sur: '#8b5cf6',
  este: '#f97316',
  oeste: '#22c55e',
};

const datosRegionales = {
  capital: {
    nombre: 'Unidad Regional Capital',
    privados: urCapitalPrivadosLibertad,
    allanamientos: urCapitalAllanamientos,
    vehiculos: urCapitalVehiculosSecuestrados,
  },
  norte: {
    nombre: 'Unidad Regional Norte',
    privados: urNortePrivadosLibertad,
    allanamientos: urNorteAllanamientos,
    vehiculos: urNorteVehiculosSecuestrados,
  },
  sur: {
    nombre: 'Unidad Regional Sur',
    privados: urSurPrivadosLibertad,
    allanamientos: urSurAllanamientos,
    vehiculos: urSurVehiculosSecuestrados,
  },
  este: {
    nombre: 'Unidad Regional Este',
    privados: urEstePrivadosLibertad,
    allanamientos: urEsteAllanamientos,
    vehiculos: urEsteVehiculosSecuestrados,
  },
  oeste: {
    nombre: 'Unidad Regional Oeste',
    privados: urOestePrivadosLibertad,
    allanamientos: urOesteAllanamientos,
    vehiculos: urOesteVehiculosSecuestrados,
  },
};

export function UnidadesRegionalesPage() {
  const [regionalSeleccionada, setRegionalSeleccionada] =
    useState<RegionalKey>('capital');

  const regional = datosRegionales[regionalSeleccionada];
  const colorActual = coloresRegionales[regionalSeleccionada];

  // Calcular totales generales
  const totalDetenidos2025 = 1004 + 835 + 332 + 286 + 189;
  const totalDetenidos2024 = 1534 + 961 + 291 + 458 + 184;
  const porcentajeDetenidos = Math.round(
    ((totalDetenidos2025 - totalDetenidos2024) / totalDetenidos2024) * 100
  );

  const totalAllanamientos = 412 + 234 + 178 + 145 + 134;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <PageHeader
        titulo="Unidades Regionales"
        subtitulo="Estadísticas por Unidad Regional"
        color={COLOR_UR}
        icon={<MapPin size={24} />}
      >
        <ExportButtons
          titulo="Unidades_Regionales"
          datos={urCapitalPrivadosLibertad}
          departamento="Unidades Regionales"
          periodo="01/01/24 - 31/07/24 vs 01/01/25 - 31/07/25"
        />
      </PageHeader>

      {/* Stats Cards Generales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          titulo="Total Detenidos Procesales"
          valor={totalDetenidos2025}
          valorAnterior={totalDetenidos2024}
          porcentaje={porcentajeDetenidos}
          color={COLOR_UR}
          icon={<Users size={20} />}
        />
        <StatCard
          titulo="Allanamientos Positivos"
          valor={totalAllanamientos}
          valorAnterior={978}
          porcentaje={15}
          color="#059669"
          icon={<Search size={20} />}
        />
        <StatCard
          titulo="Vehículos Secuestrados"
          valor={2342}
          valorAnterior={2189}
          porcentaje={7}
          color="#3b82f6"
          icon={<Car size={20} />}
        />
        <StatCard
          titulo="Reducción Detenidos"
          valor={`${Math.abs(porcentajeDetenidos)}%`}
          subtitulo="Comparativo interanual"
          color="#dc2626"
        />
      </div>

      {/* Visión General */}
      <SectionHeader titulo="COMPARATIVO ENTRE REGIONALES" color={COLOR_UR} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer titulo="Detenidos Procesales por Regional">
          <BarChartComparativo
            datos={comparativoDetenidosRegionales}
            colorAnterior="#94a3b8"
            colorActual={COLOR_UR}
          />
        </ChartContainer>

        <ChartContainer titulo="Distribución Actual de Detenidos">
          <PieChartComponent datos={distribucionRegionalActual} />
        </ChartContainer>
      </div>

      {/* Selector de Regional */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: COLOR_UR, color: 'white' }}
        >
          SELECCIONAR UNIDAD REGIONAL
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {(Object.keys(datosRegionales) as RegionalKey[]).map(key => (
              <button
                key={key}
                onClick={() => setRegionalSeleccionada(key)}
                className={`p-4 rounded-lg text-center transition-all ${
                  regionalSeleccionada === key
                    ? 'text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={
                  regionalSeleccionada === key
                    ? { backgroundColor: coloresRegionales[key] }
                    : {}
                }
              >
                <MapPin className="mx-auto mb-2" size={24} />
                <span className="font-medium capitalize">{key}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Datos de Regional Seleccionada */}
      <SectionHeader
        titulo={regional.nombre.toUpperCase()}
        color={colorActual}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TablaComparativa
          titulo="PRIVADOS DE LIBERTAD"
          tablaId={`unidades-regionales-${regionalSeleccionada}-privados-libertad`}
          departamento="Unidades Regionales"
          color={colorActual}
          filas={regional.privados}
        />

        <TablaComparativa
          titulo="ALLANAMIENTOS"
          tablaId={`unidades-regionales-${regionalSeleccionada}-allanamientos`}
          departamento="Unidades Regionales"
          color={colorActual}
          filas={regional.allanamientos}
        />

        <TablaComparativa
          titulo="VEHÍCULOS SECUESTRADOS"
          tablaId={`unidades-regionales-${regionalSeleccionada}-vehiculos-secuestrados`}
          departamento="Unidades Regionales"
          color={colorActual}
          filas={regional.vehiculos}
        />
      </div>

      {/* Resumen por Regional */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: colorActual, color: 'white' }}
        >
          RESUMEN {regional.nombre.toUpperCase()}
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">Total Detenidos</p>
              <p className="text-2xl font-bold" style={{ color: colorActual }}>
                {regional.privados.reduce((acc, p) => acc + p.periodoActual, 0)}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">
                Allanamientos Positivos
              </p>
              <p className="text-2xl font-bold" style={{ color: colorActual }}>
                {regional.allanamientos.find(a => a.id === 'positivos')
                  ?.periodoActual || 0}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">
                Vehículos Secuestrados
              </p>
              <p className="text-2xl font-bold" style={{ color: colorActual }}>
                {regional.vehiculos.reduce(
                  (acc, v) => acc + v.periodoActual,
                  0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Análisis General */}
      <div className="card">
        <div
          className="card-header"
          style={{ backgroundColor: COLOR_UR, color: 'white' }}
        >
          ANÁLISIS PROVINCIAL
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-800 mb-2">Regional Capital</h4>
              <p className="text-blue-700 text-sm">
                Concentra el 38% de los detenidos procesales de la provincia.
                Reducción del 35% respecto al período anterior.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-green-800 mb-2">
                Tendencia General
              </h4>
              <p className="text-green-700 text-sm">
                Se observa una reducción general del 23% en detenidos
                procesales, producto de la agilización de traslados al sistema
                penitenciario.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
