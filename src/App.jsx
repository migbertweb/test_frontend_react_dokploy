/**
 * Author: Migbert Yanez
 * GitHub: https://github.com/migbertweb
 * Description: Componente raíz de la aplicación que define la configuración de enrutamiento.
 * Configura rutas públicas (Login, Register) y rutas protegidas (Dashboard, Tasks).
 */
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import ProtectedRoute from './components/ProtectedRoute';
import useThemeEffect from './hooks/useThemeEffect';

function App() {
  useThemeEffect();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/tasks" element={<Tasks />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
