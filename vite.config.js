import react from '@vitejs/plugin-react'
import process from 'node:process'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === 'true' ? '/INP-GhostBAND-tribute/' : '/',
  plugins: [react()],
})
