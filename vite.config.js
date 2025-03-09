import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    root: 'src',
    publicDir: '../public',
    plugins: [
      react(),
      FullReload(['./src/**/*.jsx']),
    ],
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    build: {
      sourcemap: true,
      outDir: '../dist',
    }
  };
});
