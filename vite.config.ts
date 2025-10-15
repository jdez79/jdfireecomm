import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // IMPORTANT: enables test, expect, etc. globally
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts' // ensure this path is correct
  }
});
