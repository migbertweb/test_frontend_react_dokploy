/**
 * Author: Migbert Yanez
 * GitHub: https://github.com/migbertweb
 * Description: Store de Zustand para la gestión del estado de autenticación (Token y Usuario).
 * Utiliza persistencia para mantener la sesión activa entre recargas.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null, // Datos del usuario (opcional si se decodifica del token)
      isAuthenticated: false,
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      setUser: (user) => set({ user }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
