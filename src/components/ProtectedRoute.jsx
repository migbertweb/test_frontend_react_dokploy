/**
 * Author: Migbert Yanez
 * GitHub: https://github.com/migbertweb
 * Description: Componente de ruta protegida. Verifica si el usuario está autenticado.
 * Si no lo está, redirige al login. Si sí, renderiza el contenido hijo (Outlet).
 */
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
