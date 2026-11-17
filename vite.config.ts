import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// В production сборке активы идут с путями /muzh-na-chas/ (GitHub Pages),
// локальная разработка остаётся на корне.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/muzh-na-chas/' : '/',
}))
