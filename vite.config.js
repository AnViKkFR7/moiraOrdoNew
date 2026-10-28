import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { imagetools } from 'vite-imagetools'
import { rrssPreview } from './server/rrss-preview.js'

// Solo la web de producción se deja indexar; previews y builds locales llevan noindex.
const indexable = process.env.VERCEL_ENV === 'production' || process.env.SITE_INDEXABLE === 'true'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), imagetools(), rrssPreview()],
  // El build del servidor (prerender) empaqueta todas las dependencias
  ssr: { noExternal: true },
  define: {
    __SITE_INDEXABLE__: JSON.stringify(indexable),
  },
  build: {
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            // Librerías en chunks propios para que ningún chunk pase de 500 KB
            manualChunks(id) {
              if (!id.includes('node_modules')) return undefined
              if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
              if (id.includes('gsap')) return 'gsap'
              if (id.includes('lottie')) return 'lottie'
              if (/lenis|split-type/.test(id)) return 'motion'
              return 'vendor'
            },
          },
        },
  },
}))
