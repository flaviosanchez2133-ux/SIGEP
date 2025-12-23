import { useNavigate } from 'react-router-dom';
import { useAuthStore, useAppStore, useDataStore } from '../../store';
import {
  Menu,
  LogOut,
  Bell,
  Settings,
  Edit3,
  Save,
  History,
} from 'lucide-react';
import clsx from 'clsx';
import { PeriodSelector } from '../ui/PeriodSelector';

export function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const { edicionHabilitada, toggleEdicion, crearSnapshot } = useDataStore();

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

  return (
    <>
      {/* Banner de modo edición */}
      {edicionHabilitada && (
        <div className="fixed top-0 left-0 right-0 h-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center gap-3 z-50 shadow-md">
          <Edit3 size={16} className="animate-pulse" />
          <span className="font-medium text-sm">
            MODO EDICIÓN ACTIVO - Los usuarios pueden modificar los datos
          </span>
          <Edit3 size={16} className="animate-pulse" />
        </div>
      )}

      <header
        className={clsx(
          'fixed right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-6 transition-all duration-300',
          edicionHabilitada ? 'top-10' : 'top-0'
        )}
        style={{ left: sidebarOpen ? '288px' : '80px' }}
      >
        {/* Lado izquierdo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <Menu size={20} className="text-gray-600" />
          </button>

          {/* Selector de Período */}
          <PeriodSelector />
        </div>

        {/* Lado derecho */}
        <div className="flex items-center gap-3">
          {/* Botones de administración (solo superadmin) */}
          {esSuperAdmin && (
            <>
              {/* Botón de historial */}
              <button
                onClick={() => navigate('/historial')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-blue-600"
                title="Ver historial de cambios"
              >
                <History size={20} />
              </button>

              {/* Botón guardar snapshot */}
              <button
                onClick={handleGuardarSnapshot}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-green-600"
                title="Guardar snapshot mensual"
              >
                <Save size={20} />
              </button>

              {/* Botón de toggle edición */}
              <button
                onClick={handleToggleEdicion}
                className={clsx(
                  'p-2 rounded-lg transition-colors flex items-center gap-2',
                  edicionHabilitada
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    : 'hover:bg-gray-100 text-gray-600'
                )}
                title={
                  edicionHabilitada ? 'Desactivar edición' : 'Habilitar edición'
                }
              >
                <Edit3 size={20} />
                <span className="text-xs font-medium hidden md:inline">
                  {edicionHabilitada ? 'Edición ON' : 'Edición OFF'}
                </span>
              </button>

              {/* Separador */}
              <div className="h-8 w-px bg-gray-200"></div>
            </>
          )}

          {/* Notificaciones */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Configuración */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>

          {/* Separador */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* Usuario e información */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">
                {user?.nombre}
              </p>
              <p className="text-xs text-gray-500">
                {user?.rol === 'admin' ? 'Administrador' : 'Usuario'}
              </p>
            </div>

            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: user?.color || '#1e3a5f' }}
            >
              {user?.nombre?.charAt(0).toUpperCase() || 'U'}
            </div>

            {/* Botón cerrar sesión */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
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
