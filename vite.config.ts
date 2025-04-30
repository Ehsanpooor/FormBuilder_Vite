import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isStaticBuild = mode === 'static';
  
  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      }
    },
    build: {
      // Enable selective rendering
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: (id) => {
            // For static build, optimize for dashboard and login
            if (isStaticBuild) {
              if (id.includes('pages/forms')) {
                return 'ignored'; // Exclude from static build
              }
              if (id.includes('pages/auth') || id.includes('pages/dashboard')) {
                return 'static-pages'; // Static rendered
              }
            } 
            // For regular build, optimize for client-side rendering
            else {
              if (id.includes('pages/forms')) {
                return 'forms'; // Client-side rendered
              }
            }
            
            // Common chunks
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            return 'main';
          }
        }
      },
      // Configure static pre-rendering for specific routes
      ssrManifest: true,
      // Optimize chunks to make dashboard and login static
      chunkSizeWarningLimit: 1000
    }
  }
})
