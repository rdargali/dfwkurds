/**
 * Generate Kurdish Sun Icon Source Image
 *
 * Creates a 512x512 PNG icon based on the Kurdish Sun emblem
 * Uses the same design as the KurdishSunIcon React component
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const size = 512
const outputPath = path.join(__dirname, '../public/icon-source.png')

// Create SVG string for Kurdish Sun
function createKurdishSunSVG(size) {
  const center = size / 2
  const circleRadius = (size * 20) / 100 // Scale from 100x100 viewBox
  const innerRadius = (size * 24) / 100
  const outerRadius = (size * 42) / 100
  const strokeWidth = (size * 5) / 100

  // Generate 21 rays
  let rays = ''
  for (let i = 0; i < 21; i++) {
    const angle = (i * 360) / 21 - 90 // Start from top
    const rad = (angle * Math.PI) / 180
    const x1 = center + innerRadius * Math.cos(rad)
    const y1 = center + innerRadius * Math.sin(rad)
    const x2 = center + outerRadius * Math.cos(rad)
    const y2 = center + outerRadius * Math.sin(rad)

    rays += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#F5C842" stroke-width="${strokeWidth}" stroke-linecap="round" />\n`
  }

  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Background: Kurdish Red -->
  <rect width="${size}" height="${size}" fill="#ED2024"/>
  
  <!-- Center circle: Kurdish Gold -->
  <circle cx="${center}" cy="${center}" r="${circleRadius}" fill="#F5C842"/>
  
  <!-- 21 rays: Kurdish Gold -->
  ${rays}
</svg>
  `.trim()
}

async function generateIcon() {
  try {
    console.log('🎨 Generating Kurdish Sun icon source image...')

    // Create SVG
    const svg = createKurdishSunSVG(size)

    // Convert SVG to PNG using sharp
    const buffer = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()

    // Write to file
    fs.writeFileSync(outputPath, buffer)

    console.log(`✅ Generated: ${outputPath}`)
    console.log(`📐 Size: ${size}x${size}px`)
    console.log('\n✨ Icon source created successfully!')
    console.log('💡 You can now run: node scripts/generate-icons.js')
  } catch (error) {
    console.error('❌ Error generating icon:', error)
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('\n💡 Please install sharp: npm install --save-dev sharp')
    }
    process.exit(1)
  }
}

generateIcon()
