import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Additional ignores:
    'dist/**',
    'node_modules/**',
    '.sanity/**',
    'public/sw.js',
    'public/sw.js.map',
    'public/workbox-*.js',
    'public/workbox-*.js.map',
    // Config and script files that use CommonJS
    'sanity.cli.js',
    'scripts/**',
  ]),
])

export default eslintConfig
