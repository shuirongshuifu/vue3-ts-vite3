import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // https: true,
    proxy: {
      '/auth': {
        target: 'http://ashuai.work:10000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, "")
      }
    },
  },
})
