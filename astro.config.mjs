// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: ['..']
      }
    },
    assetsInclude: ['**/*.MOV', '**/*.mov', '**/*.mp4'],
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Bundle all vendor libraries together to reduce requests
            if (id.includes('node_modules')) {
              // Group all vendor dependencies into a single chunk
              return 'vendor';
            }
            // Group all components into fewer chunks
            if (id.includes('/components/beauty/')) {
              return 'components';
            }
            if (id.includes('/components/ui/')) {
              return 'ui';
            }
            // Default chunk for everything else
            return 'main';
          }
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      // Increase chunk size limit to allow larger bundles (fewer requests)
      chunkSizeWarningLimit: 1000
    }
  },
  output: 'static',
  build: {
    format: 'file'
  }
});
