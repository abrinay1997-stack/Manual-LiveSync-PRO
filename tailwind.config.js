/** Tailwind compilado en el build (antes Play CDN en runtime: frágil, lento y no apto para producción). */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './App.tsx', './index.tsx', './constants.tsx', './components/**/*.tsx', './lib/**/*.ts'],
  theme: { extend: {} },
  plugins: [],
};
