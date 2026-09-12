import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import blog from './scripts/blog'

export default defineConfig({
  plugins: [react(), blog()],
  base: '/',
})
