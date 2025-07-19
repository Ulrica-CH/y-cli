import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/index.ts'],
  format: ['cjs'],
  dts: true,
  // splitting: false,
  clean: true,
  outExtension() {
    return {
      js: `.js`,
      esm: `.mjs`,
      cjs: `.cjs`,
      dts: `.d.ts`
    }
  }
})
