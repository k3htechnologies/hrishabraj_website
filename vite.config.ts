
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },

  server: {
    port: 5000,
    open: true,
    host: true,
  },

  build: {
    sourcemap: false,
    minify: 'oxc',
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
