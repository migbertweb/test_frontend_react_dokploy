/**
 * Author: Migbert Yanez
 * GitHub: https://github.com/migbertweb
 * Description: Configuración del cliente Axios para realizar peticiones a la API backend.
 * Incluye interceptores para agregar el token JWT y manejar errores 401.
 * quite y agregue comentarios para probar el deploy en Dokploy
 */
import axios from 'axios';
import useAuthStore from '../store/authStore';

const getBaseUrl = () => {
  let url = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  // Si la aplicación se carga por HTTPS, forzar que la API también use HTTPS
  // para evitar errores de Mixed Content.
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && url.startsWith('http://')) {
    url = url.replace('http://', 'https://');
  }
  // Eliminar barra final si existe para evitar dobles barras al concatenar
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const client = axios.create({
  baseURL: getBaseUrl(), // Set VITE_API_URL in your environment
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitud: Agrega el token de autorización si existe
client.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta: Maneja errores globlales, como el token expirado (401)
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  }
);

export default client;
