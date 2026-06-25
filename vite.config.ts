
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'child_process'

// Cache bust commit and branch detection
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
const isMainBranch = branch === 'main'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    allowedHosts: ['romano-lantano-portfolio.onrender.com', 'romanolantano.online'],
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
  define: {
    __APP_BRANCH__: JSON.stringify(branch),
    __IS_MAIN__: JSON.stringify(isMainBranch)
  }
})
