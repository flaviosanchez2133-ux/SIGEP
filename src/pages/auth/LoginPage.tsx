import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { Eye, EyeOff, Lock, User, BarChart3, Shield } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulamos un delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 500));

    const success = login(username, password);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Usuario o contraseña incorrectos');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-policia-dark via-policia-primary to-policia-dark flex items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-policia-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-policia-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-policia-secondary rounded-full mb-4 shadow-lg">
            <BarChart3 size={40} className="text-policia-dark" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SIGEP</h1>
          <p className="text-policia-secondary font-medium">
            Sistema de Gestión Estadística Policial
          </p>
          <p className="text-white/60 text-sm mt-1">Policía de Tucumán</p>
        </div>

        {/* Formulario de login */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center justify-center gap-2 mb-6 pb-6 border-b border-gray-100">
            <Shield className="text-policia-primary" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">
              Iniciar Sesión
            </h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm animate-fadeIn">
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Campo usuario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="input-field pl-11"
                  placeholder="Ingrese su usuario"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Campo contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pl-11 pr-11"
                  placeholder="Ingrese su contraseña"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Botón de login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Verificando...
                </>
              ) : (
                'Ingresar al Sistema'
              )}
            </button>
          </div>

          {/* Info de ayuda */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500">
              Departamento de Inteligencia Criminal
            </p>
            <p className="text-center text-xs text-gray-400 mt-1">
              Sección Análisis Delictual
            </p>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-white/40 text-xs mt-6">
          © 2024-2025 Policía de Tucumán. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
