import { defineConfig } from 'vitest/config'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

const i18nMock = path.resolve(__dirname, './src/mocks/vue-i18n.ts')

export default defineConfig({
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'vue-i18n': i18nMock,
    },
  },
})
