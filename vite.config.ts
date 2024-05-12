import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lodash: ['lodash'],
          react: ['react', 'react-dom'],
          semanticUI: ['semantic-ui-react'],
        },
      },
    },
  },
  server: {
    port: 3000
  },
  plugins: [react()],
})
