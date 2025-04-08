import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Tắt source map cho CSS
  },
  css: {
    devSourcemap: false // Tắt sourcemap cho CSS khi dev
  }
})
