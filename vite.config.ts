import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Sin sourcemaps en producción: no publicamos el código fuente original.
    sourcemap: false
  },
  server: {
    port: 3000
  }
});
