// ============================================================================
// Generate apple-touch-icon and favicon PNG variants from SVG
// Run: node scripts/generate-icons.mjs
// ============================================================================

import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const svgBuffer = readFileSync(resolve(rootDir, 'public/favicon.svg'));

// Apple Touch Icon (180x180)
await sharp(svgBuffer)
  .resize(180, 180)
  .png()
  .toFile(resolve(rootDir, 'public/apple-touch-icon.png'));

console.log('✅ apple-touch-icon.png (180x180)');

// Favicon 32x32
await sharp(svgBuffer)
  .resize(32, 32)
  .png()
  .toFile(resolve(rootDir, 'public/favicon-32x32.png'));

console.log('✅ favicon-32x32.png (32x32)');

// Favicon 16x16
await sharp(svgBuffer)
  .resize(16, 16)
  .png()
  .toFile(resolve(rootDir, 'public/favicon-16x16.png'));

console.log('✅ favicon-16x16.png (16x16)');

// Android Chrome 192x192
await sharp(svgBuffer)
  .resize(192, 192)
  .png()
  .toFile(resolve(rootDir, 'public/android-chrome-192x192.png'));

console.log('✅ android-chrome-192x192.png (192x192)');

// Android Chrome 512x512
await sharp(svgBuffer)
  .resize(512, 512)
  .png()
  .toFile(resolve(rootDir, 'public/android-chrome-512x512.png'));

console.log('✅ android-chrome-512x512.png (512x512)');

console.log('\n✅ All icons generated successfully!');
