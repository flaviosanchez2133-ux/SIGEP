import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PeriodoConfig {
  anterior: {
    inicio: string;
    fin: string;
    label: string;
  };
  actual: {
    inicio: string;
    fin: string;
    label: string;
  };
}

interface AppState {
  sidebarOpen: boolean;
  periodoSeleccionado: PeriodoConfig;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setPeriodo: (periodo: PeriodoConfig) => void;
}

const periodoDefault: PeriodoConfig = {
  anterior: {
    inicio: '2024-01-01',
    fin: '2024-07-31',
    label: '01/01/24 - 31/07/24',
  },
  actual: {
    inicio: '2025-01-01',
    fin: '2025-07-31',
    label: '01/01/25 - 31/07/25',
  },
};

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      sidebarOpen: true,
      periodoSeleccionado: periodoDefault,

      toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),

      setPeriodo: (periodo: PeriodoConfig) =>
        set({ periodoSeleccionado: periodo }),
    }),
    {
      name: 'sigep-app-storage',
    }
  )
);
