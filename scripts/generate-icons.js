/**
 * PWA Icon Generator
 *
 * This script generates PWA icons from a source image.
 *
 * Usage:
 * 1. Place a 512x512px source image at public/icon-source.png
 * 2. Run: node scripts/generate-icons.js
 *
 * Requires: npm install --save-dev sharp
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const sourceImage = path.join(__dirname, '../public/icon-source.png')
const outputDir = path.join(__dirname, '../public/icons')

// Create icons directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Check if source image exists
if (!fs.existsSync(sourceImage)) {
  console.error('❌ Source image not found at:', sourceImage)
  console.log('📝 Please create a 512x512px icon and save it as:', sourceImage)
  process.exit(1)
}

console.log('🎨 Generating PWA icons...')

// Generate icons for each size
Promise.all(
  sizes.map(size => {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`)
    return sharp(sourceImage)
      .resize(size, size, {
        fit: 'cover',
        background: { r: 15, g: 23, b: 42 }, // slate-900 background
      })
      .png()
      .toFile(outputPath)
      .then(() => {
        console.log(`✅ Generated: icon-${size}x${size}.png`)
      })
      .catch(error => {
        console.error(`❌ Error generating icon-${size}x${size}.png:`, error)
      })
  })
)
  .then(() => {
    console.log('\n✨ All icons generated successfully!')
    console.log('📁 Icons saved to:', outputDir)
  })
  .catch(error => {
    console.error('❌ Error generating icons:', error)
    process.exit(1)
  })
