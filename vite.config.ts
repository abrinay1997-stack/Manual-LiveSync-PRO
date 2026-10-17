import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * URL pública del manual para <link rel="canonical"> y og:url.
 * Por defecto el subdominio actual; la plataforma unificada compila con
 * SITE_URL=https://livesyncpro.com/manual/ (LiveSync-Pro/scripts/build-platform.mjs).
 */
const SITE_URL = process.env.SITE_URL || 'https://manual.livesyncpro.com/';

const siteUrl = (): Plugin => ({
  name: 'site-url',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', SITE_URL),
});

export default defineConfig({
  plugins: [react(), siteUrl()],
  // Rutas relativas: el mismo build sirve en la raíz (manual.livesyncpro.com) y bajo
  // livesyncpro.com/manual/. La navegación es por hash (#seccion), sin rutas de servidor.
  base: './',
  build: {
    outDir: 'dist',
    // Sin sourcemaps en producción: no publicamos el código fuente original.
    sourcemap: false
  },
  server: {
    port: 3000
  }
});
