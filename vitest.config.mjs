import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['test/**/*.test.js'],
    // index.js registers the classes (_ClassList) that the individual modules rely on
    setupFiles: ['./index.js'],
    coverage: {
      include: ['src/js/**'],
      exclude: ['src/js/third_party/**']
    }
  }
})
