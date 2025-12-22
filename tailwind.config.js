/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Colores institucionales
        policia: {
          primary: '#1e3a5f',
          secondary: '#d69e2e',
          dark: '#0f1c2e',
        },
        // Colores por departamento
        d1: { DEFAULT: '#1e3a5f', light: '#2d4a6f', dark: '#0f2a4f' },
        d2: { DEFAULT: '#8B4513', light: '#A0522D', dark: '#6B3503' },
        d3: { DEFAULT: '#0ea5e9', light: '#38bdf8', dark: '#0284c7' },
        d4: { DEFAULT: '#2563eb', light: '#3b82f6', dark: '#1d4ed8' },
        d5: { DEFAULT: '#d69e2e', light: '#eab308', dark: '#a16207' },
        asuntos: { DEFAULT: '#1e40af', light: '#3b82f6', dark: '#1e3a8a' },
        rurales: { DEFAULT: '#166534', light: '#22c55e', dark: '#14532d' },
        digedrop: { DEFAULT: '#dc2626', light: '#ef4444', dark: '#b91c1c' },
        prevencion: { DEFAULT: '#22c55e', light: '#4ade80', dark: '#16a34a' },
        especiales: { DEFAULT: '#ea580c', light: '#f97316', dark: '#c2410c' },
        institutos: { DEFAULT: '#7c3aed', light: '#8b5cf6', dark: '#6d28d9' },
        // Unidades Regionales
        'ur-capital': { DEFAULT: '#3b82f6', light: '#60a5fa', dark: '#2563eb' },
        'ur-norte': { DEFAULT: '#10b981', light: '#34d399', dark: '#059669' },
        'ur-sur': { DEFAULT: '#f97316', light: '#fb923c', dark: '#ea580c' },
        'ur-este': { DEFAULT: '#8b5cf6', light: '#a78bfa', dark: '#7c3aed' },
        'ur-oeste': { DEFAULT: '#ef4444', light: '#f87171', dark: '#dc2626' },
      },
    },
  },
  plugins: [],
};
