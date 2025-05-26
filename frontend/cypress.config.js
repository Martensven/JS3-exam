import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'cypress'
import vitePreprocessor from 'cypress-vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on(
        'file:preprocessor',
        vitePreprocessor({
          configFile: path.resolve(__dirname, 'vite.config.js'), // JS istället för TS
          mode: 'development',
        }),
      )
    },
  },
})