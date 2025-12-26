import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { Eye, EyeOff, Lock, User, BarChart3, Shield, Sparkles, ShieldCheck } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, error: authError, clearError } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen bg-[#0a1628] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1d35] via-[#0a1628] to-[#071020]"></div>
      
      {/* Estrellas decorativas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo y título */}
        <div className="text-center mb-8">
          {/* Icono con sparkle */}
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <BarChart3 size={40} className="text-white" />
            </div>
            {/* Sparkle decorativo */}
            <Sparkles 
              size={20} 
              className="absolute -top-2 -right-2 text-yellow-400 animate-pulse" 
              fill="currentColor"
            />
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">SIGEP</h1>
          <p className="text-[#60a5fa] font-medium text-lg">
            Sistema de Gestión Estadística Policial
          </p>
          <p className="text-white/50 text-sm mt-1">Policía de Tucumán</p>
        </div>

        {/* Formulario de login */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111c32]/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/5"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Shield className="text-white/70" size={22} />
            <h2 className="text-xl font-semibold text-white">
              Acceso al Sistema
            </h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Campo usuario */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  size={20}
                />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full bg-[#0d1a2d] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="Ingrese su usuario"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Campo contraseña */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
                  size={20}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#0d1a2d] border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                  placeholder="Ingrese su contraseña"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Botón de login */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#4b92ff] hover:to-[#3573fb] text-white py-4 rounded-xl text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
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
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-sm text-white/50">
              Departamento de Inteligencia Criminal
            </p>
            <p className="text-center text-xs text-white/30 mt-1">
              Sección Análisis Delictual
            </p>
          </div>
        </form>

        {/* Footer con indicadores de seguridad */}
        <div className="mt-8 text-center">
          <p className="text-white/30 text-xs mb-3">
            © 2024-2025 Policía de Tucumán. Todos los derechos reservados.
          </p>
          <div className="flex items-center justify-center gap-4 text-white/25 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Conexión segura
            </span>
            <span className="text-white/10">|</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} />
              SSL/TLS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
