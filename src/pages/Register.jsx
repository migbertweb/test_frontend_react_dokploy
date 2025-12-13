/**
 * Author: Migbert Yanez
 * GitHub: https://github.com/migbertweb
 * Description: Página de registro de usuarios. Permite crear una nueva cuenta.
 * Inicia sesión automáticamente tras el registro exitoso.
 */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../api/client';
import useAuthStore from '../store/authStore';
import { Lock, Mail, Loader2, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setToken = useAuthStore((state) => state.setToken); // Auto-login after register?
  const navigate = useNavigate();

  // Gestión del envío del formulario de registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Create User
      await client.post('/users/', {
        email,
        password
      });

      // 2. Auto Login
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);

      const response = await client.post('/token', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setToken(response.data.access_token);
      navigate('/');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Error al registrarse. Intenta nuevamente.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-primary-600/20 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md glass p-8 rounded-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-primary-600">
            Crear Cuenta
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Únete para gestionar tus tareas</p>
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
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <UserPlus size={20} />
                Registrarse
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium hover:underline">
            Inicia sesión
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
