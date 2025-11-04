import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,tsx,vue}'],
      exclude: ['src/main.ts'],
      lines: 1,
      functions: 1,
      branches: 1,
      statements: 1,
    },
  },
})
