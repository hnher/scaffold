import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { WeappTailwindcss } from 'weapp-tailwindcss/vite'

const projectRoot = dirname(fileURLToPath(import.meta.url))
const packageMetadata = JSON.parse(
  readFileSync(resolve(projectRoot, 'package.json'), 'utf8'),
)

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(packageMetadata.version),
  },
  plugins: [
    uni(),
    WeappTailwindcss({
      cssEntries: [
        resolve(projectRoot, 'src/app.css'),
      ],
      cssOptions: {
        rem2rpx: true,
      },
    }),
  ],
})
