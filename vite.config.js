import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // muito importante para deploy
  plugins: [react()],
})
