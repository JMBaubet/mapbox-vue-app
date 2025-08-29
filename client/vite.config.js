import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080, // Or any other port you prefer for the Vue dev server
    fs: {
      allow: ['..'] // Allow serving files from parent directory (node_modules)
    }
  },
  build: {
    outDir: 'dist'
  }
})
