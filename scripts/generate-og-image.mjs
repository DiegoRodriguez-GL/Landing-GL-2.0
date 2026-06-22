// ============================================================================
// Generate OG default image (PNG) from SVG using Sharp
// Run: node scripts/generate-og-image.mjs
// ============================================================================

import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const svgPath = resolve(rootDir, 'public/images/og/og-default.svg');
const pngPath = resolve(rootDir, 'public/images/og/og-default.png');

const svgBuffer = readFileSync(svgPath);

await sharp(svgBuffer)
  .resize(1200, 630)
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(pngPath);

console.log('✅ OG default image generated: public/images/og/og-default.png (1200x630)');
