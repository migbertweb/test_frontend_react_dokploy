/**
 * Author: Migbert Yanez
 * GitHub: https://github.com/migbertweb
 * Description: Store de Zustand para gestionar el tema de la aplicación (Claro/Oscuro/Sistema).
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'system', // 'light', 'dark', 'system'
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useThemeStore;
