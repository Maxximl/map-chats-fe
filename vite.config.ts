import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@entities': path.resolve(__dirname, './src/entities'),
    },
  },

  plugins: [react()],

  server: {
    port: 5173,
    host: 'localhost',
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },

  build: {
    target: 'esnext',
    outDir: 'build',
  },
})
