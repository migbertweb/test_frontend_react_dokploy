/**
 * Author: Migbert Yanez
 * GitHub: https://github.com/migbertweb
 * Description: Configuración del cliente Axios para realizar peticiones a la API backend.
 * Incluye interceptores para agregar el token JWT y manejar errores 401.
 */
import axios from 'axios';
import useAuthStore from '../store/authStore';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000', // Set VITE_API_URL in your environment
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
