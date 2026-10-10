import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true,
    },
    // Allow the preview proxy host in sandbox mode.
    // The platform sets __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS (e.g. ".e2b.app");
    // Vite >= 6.1 reads it automatically, but Vite 5 needs manual config.
    allowedHosts: process.env.BASE44_PREVIEW_MODE === '1' ? true : undefined,
  },
})
