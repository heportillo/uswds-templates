import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 3000,
    fs: {
      allow: ['..']
    }
  },
  resolve: {
    alias: {
      '@uswds': path.resolve(__dirname, './node_modules/@uswds/uswds')
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Add template pages here as they're created
      }
    }
  }
});