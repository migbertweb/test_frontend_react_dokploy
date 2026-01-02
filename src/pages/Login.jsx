/**
 * Author: Migbert Yanez
 * GitHub: https://github.com/migbertweb
 * Description: Página de inicio de sesión. Permite a los usuarios autenticarse con correo y contraseña.
 * Utiliza glassmorphism y maneja estados de carga y error.
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../api/client';
import useAuthStore from '../store/authStore';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();

  // Gestión del envío del formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await client.post('/token', {
        username: email,
        password: password
      });

      setToken(response.data.access_token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Credenciales inválidas. Por favor intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-600/20 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass p-8 rounded-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-purple-600">
            Bienvenido
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Ingresa a tu cuenta para continuar</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <div className="flex items-center gap-3">
              <Mail className="text-gray-400" size={24} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field flex-1"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña</label>
            <div className="flex items-center gap-3">
              <Lock className="text-gray-400" size={24} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field flex-1"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Ingresar'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
