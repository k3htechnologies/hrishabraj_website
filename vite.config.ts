import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false, // ❌ Hides TSX, JSX, source files in production
    minify: 'esbuild', // Faster & smaller bundle
    outDir: 'dist', // Output folder
    assetsDir: 'assets', // Assets folder
    rollupOptions: {
      output: {
        manualChunks: undefined, // Keep bundle optimized
      },
    },
  },
})
