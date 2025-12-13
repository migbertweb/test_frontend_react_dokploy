/**
 * Author: Migbert Yanez
 * GitHub: https://github.com/migbertweb
 * Description: Punto de entrada principal de la aplicación React.
 * Configura los proveedores de contexto globales: QueryClientProvider (React Query) y BrowserRouter.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
