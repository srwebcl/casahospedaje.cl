# Casa Hospedaje - Landing Page Oficial

Este repositorio contiene el código fuente de la landing page oficial para **Casa Hospedaje Cerro Los Placeres**, ubicada en Valparaíso, Chile. El proyecto ha sido diseñado para ofrecer una experiencia de usuario moderna, rápida y optimizada para la conversión de reservas.

## 🚀 Tecnologías

El proyecto está construido sobre un stack tecnológico moderno enfocado en rendimiento y SEO:

-   **Astro Framework**: Para una generación de sitios estáticos (SSG) ultra rápida y optimización automática de imágenes.
-   **Tailwind CSS**: Para un diseño responsivo, utilitario y fácil de mantener.
-   **React**: Utilizado en componentes interactivos específicos.
-   **Lucide React**: Biblioteca de iconos ligera y consistente.
-   **Formspree**: Gestión segura y sin servidor (serverless) del formulario de contacto.

## 🛠️ Instalación y Desarrollo Local

Para correr este proyecto en tu máquina local:

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/srwebcl/casahospedaje.cl.git
    cd casahospedaje.cl
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo**:
    ```bash
    npm run dev
    ```
    El sitio estará disponible en `http://localhost:4321`.

## 📦 Despliegue (Production Build)

Para generar la versión de producción:

```bash
npm run build
```

El sitio está configurado para ser desplegado fácilmente en **Vercel**, con adaptador para server-side logic si fuese necesario (aunque actualmente opera principalmente como estático + cliente).

## 🔒 Arquitectura y Seguridad

-   **Sin Base de Datos**: El sitio no almacena datos sensibles.
-   **Formularios Seguros**: El contacto se procesa externamente vía Formspree, evitando la exposición de credenciales SMTP en el cliente o servidor.
-   **Activos Estáticos**: Las imágenes y videos están optimizados y servidos desde la carpeta `public`.

## 📁 Estructura del Proyecto

-   `src/components/`: Componentes reutilizables (Hero, Navbar, Habitaciones, etc.).
-   `src/layouts/`: Plantilla base del HTML (`Layout.astro`).
-   `src/pages/`: Rutas del sitio (actualmente SPA en `index.astro`).
-   `src/styles/`: Estilos globales y configuraciones de Tailwind.

---
© Casa Hospedaje Cerro Los Placeres. Todos los derechos reservados.
