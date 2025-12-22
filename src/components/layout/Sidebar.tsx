import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore, useAppStore } from '../../store';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  User,
  Users,
  Shield,
  Activity,
  Truck,
  Scale,
  AlertTriangle,
  TreePine,
  Pill,
  Phone,
  Star,
  GraduationCap,
  MapPin,
  Home,
  BarChart3,
  Zap,
} from 'lucide-react';
import clsx from 'clsx';

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    path: '/dashboard',
    color: '#1e3a5f',
  },
  {
    id: 'd1',
    label: 'D-1 Personal',
    icon: Users,
    path: '/d1-personal',
    color: '#1e3a5f',
  },
  {
    id: 'd2',
    label: 'D-2 Inteligencia Criminal',
    icon: Shield,
    path: '/d2-inteligencia',
    color: '#8B4513',
  },
  {
    id: 'd3',
    label: 'D-3 Operaciones',
    icon: Activity,
    path: '/d3-operaciones',
    color: '#0ea5e9',
  },
  {
    id: 'd4',
    label: 'D-4 Logística',
    icon: Truck,
    path: '/d4-logistica',
    color: '#2563eb',
  },
  {
    id: 'd5',
    label: 'D-5 Judicial',
    icon: Scale,
    path: '/d5-judicial',
    color: '#d69e2e',
  },
  {
    id: 'asuntos',
    label: 'Asuntos Internos',
    icon: AlertTriangle,
    path: '/asuntos-internos',
    color: '#1e40af',
  },
  {
    id: 'rurales',
    label: 'Delitos Rurales',
    icon: TreePine,
    path: '/delitos-rurales',
    color: '#166534',
  },
  {
    id: 'digedrop',
    label: 'DIGEDROP',
    icon: Pill,
    path: '/digedrop',
    color: '#dc2626',
  },
  {
    id: 'prevencion',
    label: 'Prevención Ciudadana',
    icon: Phone,
    path: '/prevencion-ciudadana',
    color: '#22c55e',
  },
  {
    id: 'especiales',
    label: 'Unidades Especiales',
    icon: Star,
    path: '/unidades-especiales',
    color: '#ea580c',
  },
  {
    id: 'institutos',
    label: 'Institutos e Instrucción',
    icon: GraduationCap,
    path: '/institutos',
    color: '#7c3aed',
  },
  {
    id: 'regionales',
    label: 'Unidades Regionales',
    icon: MapPin,
    path: '/unidades-regionales',
    color: '#475569',
    children: [
      {
        id: 'ur_capital',
        label: 'UR Capital',
        path: '/unidades-regionales/capital',
        color: '#3b82f6',
      },
      {
        id: 'ur_norte',
        label: 'UR Norte',
        path: '/unidades-regionales/norte',
        color: '#10b981',
      },
      {
        id: 'ur_sur',
        label: 'UR Sur',
        path: '/unidades-regionales/sur',
        color: '#f97316',
      },
      {
        id: 'ur_este',
        label: 'UR Este',
        path: '/unidades-regionales/este',
        color: '#8b5cf6',
      },
      {
        id: 'ur_oeste',
        label: 'UR Oeste',
        path: '/unidades-regionales/oeste',
        color: '#ef4444',
      },
    ],
  },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, hasPermission } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['regionales']);

  const toggleExpanded = (id: string) => {
    setExpandedMenus(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const canAccessItem = (itemId: string) => {
    if (hasPermission('all')) return true;
    if (itemId === 'dashboard') return true;
    return hasPermission(itemId);
  };

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 h-full transition-all duration-500 z-50 flex flex-col',
        'bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900',
        'border-r border-blue-500/20',
        sidebarOpen ? 'w-72' : 'w-20'
      )}
      style={{
        boxShadow:
          '0 0 30px rgba(59, 130, 246, 0.1), inset -1px 0 0 rgba(59, 130, 246, 0.1)',
      }}
    >
      {/* Efecto de escaneo vertical */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-32 bg-gradient-to-b from-blue-500/5 via-blue-500/10 to-transparent"
          style={{
            animation: 'scan 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Logo y toggle */}
      <div className="relative flex items-center justify-between p-4 border-b border-blue-500/20">
        <div
          className={clsx(
            'flex items-center gap-3',
            !sidebarOpen && 'justify-center w-full'
          )}
        >
          <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-blue-500/30">
            <BarChart3 size={24} className="text-white" />
            <div className="absolute -top-1 -right-1">
              <Zap size={14} className="text-amber-400 animate-pulse" />
            </div>
          </div>
          {sidebarOpen && (
            <div className="animate-fadeIn">
              <h1 className="font-bold text-xl leading-tight text-white tracking-wider">
                SIGEP
              </h1>
              <p className="text-xs text-blue-400/80">Policía de Tucumán</p>
            </div>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className={clsx(
            'p-2 rounded-lg transition-all duration-300',
            'hover:bg-blue-500/20 hover:shadow-glow-sm text-gray-400 hover:text-blue-400',
            !sidebarOpen && 'hidden'
          )}
        >
          <X size={20} />
        </button>
      </div>

      {/* Botón expandir cuando está colapsado */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="p-4 hover:bg-blue-500/10 transition-all duration-300 text-gray-400 hover:text-blue-400"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Menú de navegación */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4">
        {menuItems.map(item => {
          if (!canAccessItem(item.id) && item.id !== 'dashboard') return null;

          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedMenus.includes(item.id);
          const active = isActive(item.path);

          return (
            <div key={item.id} className="px-3 mb-1">
              <button
                onClick={() => {
                  if (hasChildren) {
                    toggleExpanded(item.id);
                    if (sidebarOpen) return;
                  }
                  navigate(item.path);
                }}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300',
                  active
                    ? 'bg-blue-500/20 shadow-inner-glow border-l-2 border-blue-400'
                    : 'hover:bg-blue-500/10 border-l-2 border-transparent hover:border-blue-400/50',
                  !sidebarOpen && 'justify-center px-2'
                )}
                style={{
                  boxShadow: active
                    ? `inset 0 0 20px rgba(59, 130, 246, 0.1), 0 0 10px ${item.color}20`
                    : 'none',
                }}
              >
                <div
                  className="relative p-2 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: active ? `${item.color}30` : 'transparent',
                    boxShadow: active ? `0 0 15px ${item.color}40` : 'none',
                  }}
                >
                  <Icon size={18} style={{ color: item.color }} />
                </div>
                {sidebarOpen && (
                  <>
                    <span
                      className={clsx(
                        'flex-1 text-left text-sm transition-colors duration-300',
                        active ? 'text-white font-semibold' : 'text-gray-400'
                      )}
                    >
                      {item.label}
                    </span>
                    {hasChildren &&
                      (isExpanded ? (
                        <ChevronDown size={16} className="text-gray-500" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-500" />
                      ))}
                  </>
                )}
              </button>

              {/* Submenú */}
              {hasChildren && isExpanded && sidebarOpen && (
                <div className="ml-6 mt-1 space-y-1 animate-fadeIn">
                  {item.children!.map(child => {
                    if (!canAccessItem(child.id) && !hasPermission('all'))
                      return null;

                    const childActive = location.pathname === child.path;
                    return (
                      <button
                        key={child.id}
                        onClick={() => navigate(child.path)}
                        className={clsx(
                          'w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-300',
                          'hover:bg-blue-500/10',
                          childActive
                            ? 'bg-blue-500/20 font-medium text-white'
                            : 'text-gray-400'
                        )}
                        style={{
                          borderLeft: `3px solid ${child.color}`,
                          marginLeft: '8px',
                          boxShadow: childActive
                            ? `0 0 15px ${child.color}30`
                            : 'none',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                              backgroundColor: child.color,
                              boxShadow: `0 0 8px ${child.color}`,
                            }}
                          />
                          {child.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Usuario actual */}
      {sidebarOpen && user && (
        <div className="p-4 border-t border-blue-500/20">
          <div
            className="flex items-center gap-3 p-3 rounded-xl bg-dark-800/50 border border-blue-500/10"
            style={{
              boxShadow: 'inset 0 0 20px rgba(59, 130, 246, 0.05)',
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
              style={{
                backgroundColor: user.color,
                boxShadow: `0 0 15px ${user.color}50`,
              }}
            >
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">
                {user.nombre}
              </p>
              <p className="text-xs truncate text-blue-400/60">
                {user.departamento}
              </p>
            </div>
            <div className="led-indicator active" title="En línea" />
          </div>
        </div>
      )}
    </aside>
  );
}
