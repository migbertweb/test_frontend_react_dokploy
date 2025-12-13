/**
 * Author: Migbert Yanez
 * GitHub: https://github.com/migbertweb
 * Description: Hook personalizado para aplicar el tema (claro/oscuro) al elemento raíz del documento HTML.
 * Escucha cambios en el store de temas y actualiza las clases CSS correspondientes.
 */
import { useEffect } from 'react';
import useThemeStore from '../store/themeStore';

const useThemeEffect = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);
};

export default useThemeEffect;
