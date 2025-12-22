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
        'fixed left-0 top-0 h-full bg-policia-primary text-white transition-all duration-300 z-50 flex flex-col',
        sidebarOpen ? 'w-72' : 'w-20'
      )}
    >
      {/* Logo y toggle */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div
          className={clsx(
            'flex items-center gap-3',
            !sidebarOpen && 'justify-center w-full'
          )}
        >
          <div className="w-10 h-10 bg-policia-secondary rounded-full flex items-center justify-center font-bold text-policia-primary">
            <BarChart3 size={24} />
          </div>
          {sidebarOpen && (
            <div className="animate-fadeIn">
              <h1 className="font-bold text-lg leading-tight">SIGEP</h1>
              <p className="text-xs text-white/70">Policía de Tucumán</p>
            </div>
          )}
        </div>
        <button
          onClick={toggleSidebar}
          className={clsx(
            'p-2 rounded-lg hover:bg-white/10 transition-colors',
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
          className="p-4 hover:bg-white/10 transition-colors"
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
                  'w-full sidebar-item',
                  active && 'active',
                  !sidebarOpen && 'justify-center px-2'
                )}
                style={{
                  borderLeft: active
                    ? `4px solid ${item.color}`
                    : '4px solid transparent',
                }}
              >
                <Icon size={20} style={{ color: item.color }} />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left text-sm">
                      {item.label}
                    </span>
                    {hasChildren &&
                      (isExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
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
                          'w-full text-left px-4 py-2 rounded-lg text-sm transition-all',
                          'hover:bg-white/10',
                          childActive && 'bg-white/20 font-medium'
                        )}
                        style={{
                          borderLeft: `3px solid ${child.color}`,
                          marginLeft: '8px',
                        }}
                      >
                        {child.label}
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
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: user.color }}
            >
              <User size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.nombre}</p>
              <p className="text-xs text-white/60 truncate">
                {user.departamento}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
