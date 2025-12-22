import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore, useAppStore, useDataStore } from '../../store';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import clsx from 'clsx';

export function Layout() {
  const { isAuthenticated } = useAuthStore();
  const { sidebarOpen } = useAppStore();
  const { edicionHabilitada } = useDataStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />

      <main
        className={clsx(
          'pb-8 px-6 transition-all duration-300 min-h-screen',
          sidebarOpen ? 'ml-72' : 'ml-20',
          edicionHabilitada ? 'pt-28' : 'pt-20'
        )}
      >
        <div className="max-w-[1800px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
