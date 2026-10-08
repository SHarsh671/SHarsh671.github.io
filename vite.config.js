import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If deploying to GitHub Pages at username.github.io/REPO-NAME/,
// change base to '/REPO-NAME/'. For Vercel/Netlify or a username.github.io repo, keep '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
