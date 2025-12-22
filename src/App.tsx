import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layout
import { Layout } from './components/layout/Layout';

// Páginas de autenticación
import { LoginPage } from './pages/auth/LoginPage';

// Dashboard
import { DashboardPage } from './pages/dashboard';

// Departamentos
import { D1PersonalPage } from './pages/d1-personal';
import { D2InteligenciaPage } from './pages/d2-inteligencia';
import { D3OperacionesPage } from './pages/d3-operaciones';
import { D4LogisticaPage } from './pages/d4-logistica';
import { D5JudicialPage } from './pages/d5-judicial';

// Direcciones Generales
import {
  AsuntosInternosPage,
  DelitosRuralesPage,
  DigedropPage,
  PrevencionCiudadanaPage,
  UnidadesEspecialesPage,
  InstitutosPage,
} from './pages/direcciones';

// Unidades Regionales
import { UnidadesRegionalesPage } from './pages/regionales';

// Historial de Cambios
import { HistorialCambiosPage } from './pages/historial/HistorialCambiosPage';

// Componente de ruta protegida
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredModule?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredModule,
}) => {
  const { isAuthenticated, hasPermission } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredModule && !hasPermission(requiredModule)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <Routes>
      {/* Ruta de login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />

      {/* Rutas protegidas dentro del Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Redirección por defecto */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard */}
        <Route path="dashboard" element={<DashboardPage />} />

        {/* Departamentos */}
        <Route
          path="d1-personal"
          element={
            <ProtectedRoute requiredModule="d1">
              <D1PersonalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="d2-inteligencia"
          element={
            <ProtectedRoute requiredModule="d2">
              <D2InteligenciaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="d3-operaciones"
          element={
            <ProtectedRoute requiredModule="d3">
              <D3OperacionesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="d4-logistica"
          element={
            <ProtectedRoute requiredModule="d4">
              <D4LogisticaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="d5-judicial"
          element={
            <ProtectedRoute requiredModule="d5">
              <D5JudicialPage />
            </ProtectedRoute>
          }
        />

        {/* Direcciones Generales */}
        <Route
          path="asuntos-internos"
          element={
            <ProtectedRoute requiredModule="asuntos_internos">
              <AsuntosInternosPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="delitos-rurales"
          element={
            <ProtectedRoute requiredModule="delitos_rurales">
              <DelitosRuralesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="digedrop"
          element={
            <ProtectedRoute requiredModule="digedrop">
              <DigedropPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="prevencion-ciudadana"
          element={
            <ProtectedRoute requiredModule="prevencion_ciudadana">
              <PrevencionCiudadanaPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="unidades-especiales"
          element={
            <ProtectedRoute requiredModule="unidades_especiales">
              <UnidadesEspecialesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="institutos"
          element={
            <ProtectedRoute requiredModule="institutos">
              <InstitutosPage />
            </ProtectedRoute>
          }
        />

        {/* Unidades Regionales */}
        <Route
          path="unidades-regionales"
          element={
            <ProtectedRoute requiredModule="unidades_regionales">
              <UnidadesRegionalesPage />
            </ProtectedRoute>
          }
        />

        {/* Historial de Cambios - Solo Superadmin */}
        <Route
          path="historial"
          element={
            <ProtectedRoute>
              <HistorialCambiosPage />
            </ProtectedRoute>
          }
        />

        {/* Ruta catch-all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
