// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // Use lightningcss for transforms
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(
        browserslist('>= 0.25%') // adjust browser support as needed
      ),
    },
  },
  build: {
    // Use lightningcss for minifying CSS
    cssMinify: 'lightningcss',
  },
});
