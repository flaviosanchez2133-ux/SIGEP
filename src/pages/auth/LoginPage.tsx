import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import {
  Eye,
  EyeOff,
  Lock,
  User,
  BarChart3,
  Shield,
  Zap,
  Activity,
} from 'lucide-react';

// Componente de partículas flotantes
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const { login, error: authError, clearError } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Reloj en tiempo real
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    clearError();
    setLoading(true);

    try {
      const success = await login(username, password);

      if (success) {
        navigate('/dashboard');
      } else {
        setError(authError || 'Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo con grid y gradientes */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        {/* Gradientes decorativos */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Partículas flotantes */}
      <FloatingParticles />

      {/* Líneas de escaneo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
          style={{
            animation: 'scan 8s ease-in-out infinite',
          }}
        />
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Header con reloj */}
        <div className="absolute -top-16 left-0 right-0 flex justify-between items-center text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="led-indicator active" />
            <span>SISTEMA ACTIVO</span>
          </div>
          <div className="font-mono text-blue-400">
            {currentTime.toLocaleTimeString('es-AR', { hour12: false })}
          </div>
        </div>

        {/* Logo y título */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6 relative"
            style={{
              background: 'linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)',
              boxShadow:
                '0 0 60px rgba(59, 130, 246, 0.4), inset 0 0 30px rgba(255,255,255,0.1)',
            }}
          >
            <BarChart3 size={48} className="text-white" />
            <div className="absolute -top-2 -right-2">
              <div className="relative">
                <Zap size={20} className="text-amber-400" />
                <div className="absolute inset-0 animate-ping">
                  <Zap size={20} className="text-amber-400 opacity-50" />
                </div>
              </div>
            </div>
          </div>
          <h1
            className="text-4xl font-bold text-white mb-2 tracking-wider"
            style={{ textShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
          >
            SIGEP
          </h1>
          <p className="text-blue-400 font-medium tracking-wide">
            Sistema de Gestión Estadística Policial
          </p>
          <p className="text-gray-500 text-sm mt-1">Policía de Tucumán</p>
        </div>

        {/* Formulario de login */}
        <form
          onSubmit={handleSubmit}
          className="relative rounded-2xl p-8 overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            boxShadow:
              '0 0 60px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(59, 130, 246, 0.05)',
          }}
        >
          {/* Borde superior brillante */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          {/* Efecto de escaneo */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute w-full h-32 bg-gradient-to-b from-blue-500/5 to-transparent"
              style={{ animation: 'scan 6s ease-in-out infinite' }}
            />
          </div>

          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-6 pb-6 border-b border-blue-500/20">
              <Shield className="text-blue-400" size={24} />
              <h2 className="text-xl font-semibold text-white tracking-wide">
                Acceso al Sistema
              </h2>
            </div>

            {error && (
              <div
                className="mb-6 p-4 rounded-xl text-red-400 text-sm animate-fadeIn flex items-center gap-3"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)',
                }}
              >
                <Activity size={18} className="animate-pulse" />
                {error}
              </div>
            )}

            <div className="space-y-5">
              {/* Campo usuario */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Usuario
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors"
                    size={20}
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-dark-800/50 border border-dark-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="Ingrese su usuario"
                    required
                    autoComplete="username"
                    style={{
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
                    }}
                  />
                </div>
              </div>

              {/* Campo contraseña */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Contraseña
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors"
                    size={20}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-dark-800/50 border border-dark-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    placeholder="Ingrese su contraseña"
                    required
                    autoComplete="current-password"
                    style={{
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Botón de login */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-lg font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group"
                style={{
                  background: loading
                    ? 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 100%)'
                    : 'linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)',
                  boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                }}
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-white">Verificando...</span>
                  </>
                ) : (
                  <span className="text-white">Ingresar al Sistema</span>
                )}
              </button>
            </div>

            {/* Info de ayuda */}
            <div className="mt-6 pt-6 border-t border-blue-500/20">
              <p className="text-center text-sm text-gray-500">
                Departamento de Inteligencia Criminal
              </p>
              <p className="text-center text-xs text-gray-600 mt-1">
                Sección Análisis Delictual
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-xs">
            © 2024-2025 Policía de Tucumán. Todos los derechos reservados.
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="led-indicator active" />
              <span>Conexión segura</span>
            </div>
            <div className="w-px h-3 bg-gray-700" />
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Shield size={12} className="text-blue-400" />
              <span>SSL/TLS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
