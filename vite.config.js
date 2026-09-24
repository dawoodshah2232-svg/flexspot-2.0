import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Deployed to GitHub Pages at https://dawoodshah2232-svg.github.io/flexspot-2.0/
export default defineConfig({
  base: '/flexspot-2.0/',
  plugins: [react()],
})
