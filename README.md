# Gestor de Tareas - Frontend

## Descripción

Este es el frontend de la aplicación de gestión de tareas "Tejido". Está construido con **React** y utiliza **Tailwind CSS** para un diseño moderno con soporte para modo oscuro y glassmorphism. La aplicación se comunica con un backend FastAPI para gestionar usuarios y tareas.

- **Author**: Migbert Yanez
- **GitHub**: [https://github.com/migbertweb](https://github.com/migbertweb)
- **Licencia**: GPL-3.0

## Características Principales

- **Autenticación**: Login y Registro de usuarios con JWT.
- **Gestión de Tareas**: Crear, listar, editar, eliminar y completar tareas.
- **Diseño Moderno**: Interfaz limpia con animaciones suaves y efectos de vidrio.
- **Temas**: Cambio dinámico entre modo Claro, Oscuro y Sistema.
- **Rutas Protegidas**: Seguridad en la navegación del lado del cliente.

## Tecnologías Utilizadas

- **React**: Biblioteca principal de UI.
- **Vite**: Empaquetador y servidor de desarrollo rápido.
- **Tailwind CSS**: Framework de utilidades CSS.
- **Zustand**: Gestión de estado ligero (Auth, Theme).
- **React Query (@tanstack/react-query)**: Gestión de estado asíncrono y caché de datos.
- **Axios**: Cliente HTTP con interceptores.
- **Framer Motion**: Animaciones.
- **React Router DOM**: Enrutamiento.
- **Lucide React**: Iconos.

## Instalación

1. Asegúrate de tener **Node.js** instalado.
2. Navega al directorio del frontend:
   ```bash
   cd frontend
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

## Estructura del Proyecto

- `src/api`: Configuración de Axios.
- `src/components`: Componentes reutilizables (ej. ProtectedRoute).
- `src/hooks`: Hooks personalizados (ej. useThemeEffect).
- `src/layouts`: Layouts principales (MainLayout, Sidebar).
- `src/pages`: Páginas de la aplicación (Login, Register, Dashboard, Tasks).
- `src/store`: Stores de Zustand (Auth, Theme).

## Notas

Asegúrate de que el backend esté corriendo en el puerto `8000` para que la aplicación funcione correctamente.
## Despliegue

La aplicación está preparada para ser desplegada en plataformas como **Dokploy**, **Railway** u otras que soporten construcción mediante **Docker** o **Nixpacks**.

### Archivos de Configuración Generados

Se han incluido los siguientes archivos para facilitar el despliegue:

- **`Dockerfile`**: Configuración multi-etapa (build + nginx) para despliegue estándar con Docker.
- **`nixpacks.toml`**: Configuración para plataformas que utilizan Nixpacks.
- **`railpack.json`**: Configuración específica para despliegue con Dokploy/Railpack.

### Variables de Entorno

Para que la aplicación funcione correctamente en producción, debes configurar las siguientes variables de entorno en tu panel de despliegue:

- **`VITE_API_URL`**: La URL base de tu backend (ej. `https://api.tudominio.com`).
  - _Nota_: Si no se especifica, por defecto intentará conectar a `http://localhost:8000`.
- **`PORT`**: El puerto donde el servidor servirá la aplicación (generalmente manejado automáticamente por la plataforma, pero útil para probar con `nixpacks`).

### Ejemplo de configuración (.env)

```env
VITE_API_URL=https://mi-backend.com
```
