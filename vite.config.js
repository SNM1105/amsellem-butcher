import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['motion'],
          'vendor-supabase': ['@supabase/supabase-js'],
        },
      },
    },
    // Enable source map for debugging but keep bundle small
    sourcemap: false,
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
  },
})
