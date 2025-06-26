// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import compression from 'vite-plugin-compression';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [
      tailwindcss(),
      // Gzip compression
      compression({
        algorithm: 'gzip',
        ext: '.gz',
        filter: /\.(js|css|html|svg|json|txt|xml)$/,
        threshold: 1024,
        deleteOriginFile: false,
        verbose: false
      }),
      // Brotli compression (better compression than gzip)
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        filter: /\.(js|css|html|svg|json|txt|xml)$/,
        threshold: 1024,
        deleteOriginFile: false,
        verbose: false
      })
    ],
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
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.warn'],
          passes: 2
        },
        mangle: {
          safari10: true
        }
      },
      // Enable source maps for debugging but compressed
      sourcemap: false,
      // Increase chunk size limit to allow larger bundles (fewer requests)
      chunkSizeWarningLimit: 1000,
      // Enable asset inlining for small files
      assetsInlineLimit: 4096,
      // CSS optimization
      cssMinify: true
    }
  }
});
