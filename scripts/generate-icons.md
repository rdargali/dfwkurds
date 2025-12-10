# PWA Icon Generation

To generate PWA icons, you can use one of these methods:

## Method 1: Using Online Tools

1. Create a 512x512px icon with the Kurdish Sun symbol
2. Use [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator) or [RealFaviconGenerator](https://realfavicongenerator.net/)
3. Place the generated icons in `/public/icons/` directory

## Method 2: Using ImageMagick (Command Line)

If you have a source image (icon-source.png):

```bash
mkdir -p public/icons

# Generate all required sizes
sizes=(72 96 128 144 152 192 384 512)
for size in "${sizes[@]}"; do
  convert icon-source.png -resize ${size}x${size} public/icons/icon-${size}x${size}.png
done
```

## Method 3: Using Node.js Script

Install `sharp`:

```bash
npm install --save-dev sharp
```

Then run:

```bash
node scripts/generate-icons.js
```

## Required Icon Sizes

- 72x72
- 96x96
- 128x128
- 144x144
- 152x152
- 192x192
- 384x384
- 512x512

All icons should be PNG format and placed in `/public/icons/` directory.
