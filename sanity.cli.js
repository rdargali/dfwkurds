/**
 * Sanity CLI Configuration
 * This file is required for Sanity CLI commands (deploy, schema, etc.)
 * It automatically loads your project ID from .env.local
 *
 * Location: Project root (./sanity.cli.js)
 *
 * The Sanity CLI looks for this file in the current working directory.
 * Run all Sanity commands from the project root.
 */

const { defineCliConfig } = require('sanity/cli')
const path = require('path')

// Load environment variables from .env.local if it exists
try {
  const fs = require('fs')
  const envPath = path.resolve(__dirname, '.env.local')

  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8')
    envFile.split('\n').forEach(line => {
      const match = line.match(/^([^=:#]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const value = match[2].trim().replace(/^["']|["']$/g, '')
        if (!process.env[key]) {
          process.env[key] = value
        }
      }
    })
  }
} catch (error) {
  // Silently fail if .env.local doesn't exist or can't be read
}

// Get project ID and dataset from environment variables
// Check both SANITY_STUDIO_ (Sanity standard) and NEXT_PUBLIC_ (Next.js compatibility)
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Validate that project ID is set
if (projectId === 'your-project-id') {
  console.warn(
    '⚠️  Warning: Project ID is not set. Please set SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local'
  )
}

module.exports = defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset,
  },
  // Deployment configuration
  // appId prevents Sanity from prompting for the application ID on future deploys
  // Can be set in .env.local as SANITY_APP_ID, or hardcoded here
  ...(process.env.SANITY_APP_ID && {
    deployment: {
      appId: process.env.SANITY_APP_ID,
    },
  }),
  // Fallback: If you prefer to hardcode it, uncomment below and remove the env check above
  // deployment: {
  //   appId: 'YOUR_SANITY_APP_ID',
  // },
})

