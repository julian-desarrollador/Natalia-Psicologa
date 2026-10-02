import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const photoUrl =
  'https://res.cloudinary.com/dzoupwn0e/image/upload/v1761258760/Foto_Nati_nzkzsy.webp';

const WIDTH = 1200;
const HEIGHT = 630;
const PHOTO_WIDTH = 500;

const overlay = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <rect x="${PHOTO_WIDTH}" y="0" width="${WIDTH - PHOTO_WIDTH}" height="${HEIGHT}" fill="#F7FBFD"/>
  <rect x="${PHOTO_WIDTH}" y="0" width="8" height="${HEIGHT}" fill="#1FA7DA"/>
  <rect x="0" y="614" width="${WIDTH}" height="16" fill="#1FA7DA"/>
  <circle cx="850" cy="188" r="54" fill="#1FA7DA"/>
  <text x="850" y="203" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="700" fill="#ffffff">ND</text>
  <text x="850" y="312" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="48" font-weight="700" fill="#2c3e50">Lic. Natalia Domecq</text>
  <text x="850" y="364" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#1FA7DA">Psicóloga · M.P. 531</text>
  <text x="850" y="412" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#5d6d7e">Bahía Blanca, Buenos Aires</text>
</svg>`;

const response = await fetch(photoUrl);
if (!response.ok) {
  throw new Error(`No se pudo descargar la foto (${response.status})`);
}

const source = Buffer.from(await response.arrayBuffer());
const { width = 0, height = 0 } = await sharp(source).metadata();
const cropWidth = Math.round(height * (PHOTO_WIDTH / HEIGHT));
const cropLeft = Math.max(0, width - cropWidth);

const photo = await sharp(source)
  .extract({ left: cropLeft, top: 0, width: Math.min(cropWidth, width), height })
  .resize(PHOTO_WIDTH, HEIGHT, { fit: 'fill', kernel: 'lanczos3' })
  .sharpen({ sigma: 0.8 })
  .toBuffer();

const composed = await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 3,
    background: '#F7FBFD',
  },
})
  .composite([
    { input: photo, left: 0, top: 0 },
    { input: Buffer.from(overlay), left: 0, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toBuffer();

const ogPath = path.join(root, 'public', 'og-image.jpg');
await writeFile(ogPath, composed);

const icon = await sharp(path.join(root, 'public', 'logo.svg'))
  .resize(180, 180)
  .png()
  .toBuffer();
const iconPath = path.join(root, 'public', 'apple-touch-icon.png');
await writeFile(iconPath, icon);

console.log(`og-image.jpg ${(composed.length / 1024).toFixed(1)} KB`);
console.log(`apple-touch-icon.png ${(icon.length / 1024).toFixed(1)} KB`);
