import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
 build: {
    lib: {
      entry: './src/components/FixtureSearch.jsx',
      name: 'FixtureSearch',
      fileName: 'index',
      formats: ['es', 'cjs'] // ESModule + CommonJS
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});