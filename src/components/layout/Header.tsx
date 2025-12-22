import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, useAppStore, useDataStore } from '../../store';
import {
  Menu,
  LogOut,
  Calendar,
  Bell,
  Settings,
  Edit3,
  Save,
  History,
  Shield,
  Wifi,
  Database,
} from 'lucide-react';
import clsx from 'clsx';

export function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar, periodoSeleccionado } = useAppStore();
  const { edicionHabilitada, toggleEdicion, crearSnapshot } = useDataStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Reloj digital en tiempo real
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Solo el superadmin puede habilitar/deshabilitar la edición
  const esSuperAdmin =
    user?.id === 'superadmin' || user?.permisos?.includes('all');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleToggleEdicion = () => {
    toggleEdicion();
  };

  const handleGuardarSnapshot = () => {
    if (user) {
      crearSnapshot({ id: user.id, nombre: user.nombre });
      alert('Snapshot mensual guardado correctamente');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-AR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <>
      {/* Banner de modo edición */}
      {edicionHabilitada && (
        <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white flex items-center justify-center gap-3 z-50 shadow-lg shadow-amber-500/30">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>
          <Edit3 size={16} className="animate-pulse" />
          <span className="font-medium text-sm tracking-wide">
            MODO EDICIÓN ACTIVO - Los usuarios pueden modificar los datos
          </span>
          <Edit3 size={16} className="animate-pulse" />
        </div>
      )}

      <header
        className={clsx(
          'fixed right-0 h-16 z-40 flex items-center justify-between px-6 transition-all duration-500',
          'bg-dark-900/80 backdrop-blur-md border-b border-blue-500/20',
          edicionHabilitada ? 'top-10' : 'top-0'
        )}
        style={{
          left: sidebarOpen ? '288px' : '80px',
          boxShadow:
            '0 4px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.1)',
        }}
      >
        {/* Lado izquierdo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg transition-all duration-300 lg:hidden text-gray-400 hover:text-blue-400 hover:bg-blue-500/10"
          >
            <Menu size={20} />
          </button>

          {/* Período seleccionado */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-dark-800/50 border border-blue-500/20"
            style={{
              boxShadow: 'inset 0 0 20px rgba(59, 130, 246, 0.05)',
            }}
          >
            <Calendar size={18} className="text-blue-400" />
            <div className="text-sm">
              <span className="text-gray-500">Período: </span>
              <span className="font-medium text-gray-300">
                {periodoSeleccionado.anterior.label}
              </span>
              <span className="text-blue-400 mx-2">→</span>
              <span className="font-medium text-white">
                {periodoSeleccionado.actual.label}
              </span>
            </div>
          </div>

          {/* Reloj Digital */}
          <div
            className="hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-dark-800/50 border border-blue-500/20"
            style={{
              boxShadow: 'inset 0 0 20px rgba(59, 130, 246, 0.05)',
            }}
          >
            <div className="text-right">
              <p className="text-lg font-mono font-bold text-blue-400 tracking-wider">
                {formatTime(currentTime)}
              </p>
              <p className="text-xs text-gray-500">{formatDate(currentTime)}</p>
            </div>
          </div>
        </div>

        {/* Lado derecho */}
        <div className="flex items-center gap-3">
          {/* Indicadores de estado del sistema */}
          <div className="hidden lg:flex items-center gap-4 px-4 py-2 rounded-xl bg-dark-800/30 border border-dark-600/30">
            <div
              className="flex items-center gap-2"
              title="Base de datos conectada"
            >
              <Database size={14} className="text-emerald-400" />
              <div className="led-indicator active" />
            </div>
            <div className="flex items-center gap-2" title="Red activa">
              <Wifi size={14} className="text-emerald-400" />
              <div className="led-indicator active" />
            </div>
            <div className="flex items-center gap-2" title="Sistema seguro">
              <Shield size={14} className="text-blue-400" />
              <div className="led-indicator active" />
            </div>
          </div>

          {/* Botones de administración (solo superadmin) */}
          {esSuperAdmin && (
            <>
              {/* Botón de historial */}
              <button
                onClick={() => navigate('/historial')}
                className="p-2.5 rounded-xl transition-all duration-300 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30"
                title="Ver historial de cambios"
              >
                <History size={20} />
              </button>

              {/* Botón guardar snapshot */}
              <button
                onClick={handleGuardarSnapshot}
                className="p-2.5 rounded-xl transition-all duration-300 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30"
                title="Guardar snapshot mensual"
              >
                <Save size={20} />
              </button>

              {/* Botón de toggle edición */}
              <button
                onClick={handleToggleEdicion}
                className={clsx(
                  'p-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 border',
                  edicionHabilitada
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30 shadow-glow-amber'
                    : 'text-gray-400 hover:text-amber-400 hover:bg-amber-500/10 border-transparent hover:border-amber-500/30'
                )}
                title={
                  edicionHabilitada ? 'Desactivar edición' : 'Habilitar edición'
                }
              >
                <Edit3 size={20} />
                <span className="text-xs font-medium hidden md:inline">
                  {edicionHabilitada ? 'ON' : 'OFF'}
                </span>
              </button>

              {/* Separador */}
              <div className="h-8 w-px bg-dark-600/50"></div>
            </>
          )}

          {/* Notificaciones */}
          <button className="p-2.5 rounded-xl transition-all duration-300 relative text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full shadow-glow-red animate-pulse"></span>
          </button>

          {/* Configuración */}
          <button className="p-2.5 rounded-xl transition-all duration-300 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/30">
            <Settings size={20} />
          </button>

          {/* Separador */}
          <div className="h-8 w-px bg-dark-600/50"></div>

          {/* Usuario e información */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">{user?.nombre}</p>
              <p className="text-xs text-blue-400/60">
                {user?.rol === 'admin' ? 'Administrador' : 'Usuario'}
              </p>
            </div>

            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
              style={{
                backgroundColor: user?.color || '#1e3a5f',
                boxShadow: `0 0 20px ${user?.color || '#1e3a5f'}50`,
              }}
            >
              {user?.nombre?.charAt(0).toUpperCase() || 'U'}
            </div>

            {/* Botón cerrar sesión */}
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl transition-all duration-300 text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30"
              title="Cerrar sesión"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
