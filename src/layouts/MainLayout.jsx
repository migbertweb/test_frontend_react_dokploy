/**
 * Author: Migbert Yanez
 * GitHub: https://github.com/migbertweb
 * Description: Layout principal de la aplicación. Incluye la barra lateral de navegación (Sidebar)
 * y el área de contenido principal. Gestiona la navegación y el cambio de tema.
 */
import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, LogOut, Sun, Moon, Laptop } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useThemeStore from '../store/themeStore';
import clsx from 'clsx';

const MainLayout = () => {
  const logout = useAuthStore((state) => state.logout);
  const { theme, setTheme } = useThemeStore();
  const navigate = useNavigate();

  // Función para cerrar sesión y redirigir al login
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Elementos de navegación del sidebar
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/tasks', icon: CheckSquare, label: 'Mis Tareas' },
  ];

  const ThemeIcon = {
    light: Sun,
    dark: Moon,
    system: Laptop
  }[theme];

  const cycleTheme = () => {
    const modes = ['light', 'dark', 'system'];
    const nextIndex = (modes.indexOf(theme) + 1) % modes.length;
    setTheme(modes[nextIndex]);
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-gray-200 dark:border-gray-800 flex flex-col fixed h-full z-10 transition-all duration-300">
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-indigo-600">
            TaskApp
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                )
              }
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
          <button
            onClick={cycleTheme}
            className="flex w-full items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-xl transition-all"
          >
            <ThemeIcon size={20} />
            <span className="capitalize">{theme === 'system' ? 'Sistema' : theme}</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all"
          >
            <LogOut size={20} />
            Salir
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto animate-fadeIn">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
