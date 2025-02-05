import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    mimeTypes: {
      'application/wasm': ['wasm']
    }
  }
});