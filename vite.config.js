// vite.config.ts or vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    // Make sure Vite outputs to "dist" so Vercel finds it
    outDir: 'dist',
  },
});