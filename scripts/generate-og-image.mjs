import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { Resvg } from '@resvg/resvg-js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cacheDir = path.join(root, 'scripts', '.cache');
const photoUrl =
  'https://res.cloudinary.com/dzoupwn0e/image/upload/v1761258760/Foto_Nati_nzkzsy.webp';

const WIDTH = 1200;
const HEIGHT = 630;

const fonts = [
  { id: 'nunito@5.2.7/latin-400-normal', file: 'nunito-400.ttf' },
  { id: 'nunito@5.2.7/latin-800-normal', file: 'nunito-800.ttf' },
  { id: 'playfair-display@5.2.7/latin-600-normal', file: 'playfair-600.ttf' },
];

async function downloadFont(id, file) {
  const target = path.join(cacheDir, file);
  try {
    const cached = await readFile(target);
    if (cached.subarray(0, 4).toString('hex') !== '774f4646') return target;
  } catch {
    // Se descarga una sola vez y queda en scripts/.cache
  }

  const response = await fetch(`https://cdn.jsdelivr.net/fontsource/fonts/${id}.ttf`);
  if (!response.ok) throw new Error(`No se pudo descargar la fuente ${id} (${response.status})`);
  const font = Buffer.from(await response.arrayBuffer());
  if (font.subarray(0, 4).toString('hex') === '774f4646') {
    throw new Error(`La fuente ${id} no llegó en formato TTF`);
  }
  await writeFile(target, font);
  return target;
}

function butterfly(id) {
  return `
    <g>
      <defs>
        <linearGradient id="${id}-tl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#7ED4F2"/>
          <stop offset="55%" stop-color="#1FA7DA"/>
          <stop offset="100%" stop-color="#1488B8"/>
        </linearGradient>
        <linearGradient id="${id}-tr" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7ED4F2"/>
          <stop offset="55%" stop-color="#1FA7DA"/>
          <stop offset="100%" stop-color="#1488B8"/>
        </linearGradient>
        <linearGradient id="${id}-bl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFB4A4"/>
          <stop offset="100%" stop-color="#FD7062"/>
        </linearGradient>
        <linearGradient id="${id}-br" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FFB4A4"/>
          <stop offset="100%" stop-color="#FD7062"/>
        </linearGradient>
      </defs>
      <path fill="url(#${id}-bl)" d="M31.2 35.2C24.5 34.2 14.2 37.2 13.2 46.4C12.3 54.6 21.2 58.4 29.2 53.2C33.6 50.2 34.4 43.2 33.2 38.6C32.6 36.6 32.2 35.6 31.2 35.2Z"/>
      <path fill="url(#${id}-br)" d="M32.8 35.2C39.5 34.2 49.8 37.2 50.8 46.4C51.7 54.6 42.8 58.4 34.8 53.2C30.4 50.2 29.6 43.2 30.8 38.6C31.4 36.6 31.8 35.6 32.8 35.2Z"/>
      <path fill="url(#${id}-tl)" d="M31 24.5C27.2 15.2 16.4 7.6 9.2 13.6C2.2 19.4 3.6 31.2 12.6 35.6C19.2 38.8 27.2 36.4 30.6 32.2C32.2 30.2 32.2 27.2 31 24.5Z"/>
      <path fill="url(#${id}-tr)" d="M33 24.5C36.8 15.2 47.6 7.6 54.8 13.6C61.8 19.4 60.4 31.2 51.4 35.6C44.8 38.8 36.8 36.4 33.4 32.2C31.8 30.2 31.8 27.2 33 24.5Z"/>
      <path fill="#2c3e50" d="M32 19.6c1.15 0 1.9 2.5 1.75 8.2-.12 4.6-.55 9.3-1.75 12.5-1.2-3.2-1.63-7.9-1.75-12.5C30.1 22.1 30.85 19.6 32 19.6Z"/>
      <circle cx="32" cy="17.6" r="2.15" fill="#2c3e50"/>
      <path d="M30.7 16.8C28.2 12.6 24.2 10.2 21.6 8.4" fill="none" stroke="#2c3e50" stroke-width="1.7" stroke-linecap="round"/>
      <path d="M33.3 16.8C35.8 12.6 39.8 10.2 42.4 8.4" fill="none" stroke="#2c3e50" stroke-width="1.7" stroke-linecap="round"/>
      <circle cx="21.1" cy="7.8" r="1.35" fill="#2c3e50"/>
      <circle cx="42.9" cy="7.8" r="1.35" fill="#2c3e50"/>
    </g>`;
}

function pill(x, y, width, label) {
  const height = 46;
  return `
    <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="23" fill="#ffffff" stroke="#1FA7DA" stroke-width="2.5"/>
    <text x="${x + width / 2}" y="${y + 30}" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="20" fill="#178bb8">${label}</text>`;
}

await mkdir(cacheDir, { recursive: true });

const fontFiles = [];
for (const font of fonts) {
  fontFiles.push(await downloadFont(font.id, font.file));
}

const photoResponse = await fetch(photoUrl);
if (!photoResponse.ok) throw new Error(`No se pudo descargar la foto (${photoResponse.status})`);
const source = Buffer.from(await photoResponse.arrayBuffer());

const photoSize = 250;
const resized = await sharp(source)
  .resize(photoSize, photoSize, { fit: 'cover', position: 'attention' })
  .png()
  .toBuffer();
const mask = Buffer.from(
  `<svg width="${photoSize}" height="${photoSize}"><circle cx="${photoSize / 2}" cy="${photoSize / 2}" r="${photoSize / 2}" fill="#fff"/></svg>`,
);
const circled = await sharp(resized)
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();
const photoHref = `data:image/png;base64,${circled.toString('base64')}`;

const photoX = 122;
const photoY = 148;

const pills = [
  { label: 'Niños', width: 112 },
  { label: 'Adolescentes', width: 196 },
  { label: 'Parejas', width: 132 },
  { label: 'Familias', width: 140 },
];
let pillX = 500;
const pillMarkup = pills
  .map((item) => {
    const markup = pill(pillX, 372, item.width, item.label);
    pillX += item.width + 12;
    return markup;
  })
  .join('');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E3F5FC"/>
      <stop offset="55%" stop-color="#F7FBFE"/>
      <stop offset="100%" stop-color="#FFE8E1"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <path d="M-60 20C40 -70 280 -30 360 70C430 155 250 210 90 175C-10 152 -40 90 -60 20Z" fill="#1FA7DA" opacity="0.16"/>
  <path d="M860 470C980 390 1180 400 1260 500C1330 590 1120 690 960 640C860 610 790 530 860 470Z" fill="#FD7062" opacity="0.18"/>
  <path d="M980 40C1060 10 1160 30 1180 90C1200 145 1100 160 1020 130C970 112 940 62 980 40Z" fill="#1FA7DA" opacity="0.1"/>

  <circle cx="268" cy="292" r="148" fill="#FD7062"/>
  <circle cx="246" cy="272" r="138" fill="#ffffff"/>
  <image href="${photoHref}" x="${photoX}" y="${photoY}" width="${photoSize}" height="${photoSize}"/>

  <g transform="translate(338, 392) rotate(-22) scale(1.05) translate(-32, -24)">
    ${butterfly('perched')}
  </g>

  <path d="M930 78C1000 48 1070 108 1140 72" fill="none" stroke="#1FA7DA" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="1.5 8" opacity="0.55"/>
  <g transform="translate(918, 62) rotate(-28) scale(0.48) translate(-32, -32)" opacity="0.95">
    ${butterfly('fly1')}
  </g>
  <g transform="translate(1036, 78) rotate(12) scale(0.36) translate(-32, -32)" opacity="0.9">
    ${butterfly('fly2')}
  </g>
  <g transform="translate(1124, 48) rotate(-8) scale(0.5) translate(-32, -32)">
    ${butterfly('fly3')}
  </g>

  <text x="500" y="214" font-family="Nunito" font-weight="800" font-size="92">
    <tspan fill="#FD7062">¿</tspan><tspan fill="#2c3e50">Hablamos</tspan><tspan fill="#FD7062">?</tspan>
  </text>
  <text x="500" y="272" font-family="Nunito" font-weight="400" font-size="32" fill="#3d5166">Tu bienestar empieza</text>
  <text x="500" y="314" font-family="Nunito" font-weight="400" font-size="32" fill="#3d5166">con una conversación</text>

  ${pillMarkup}

  <rect x="500" y="448" width="292" height="56" rx="28" fill="#FD7062"/>
  <text x="632" y="484" text-anchor="middle" font-family="Nunito" font-weight="800" font-size="24" fill="#ffffff">Pedí tu turno</text>
  <path d="M748 468l12 8-12 8" fill="none" stroke="#ffffff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="812" y="484" font-family="Nunito" font-weight="800" font-size="22" fill="#2c3e50">Presencial y online</text>

  <text x="246" y="520" text-anchor="middle" font-family="Playfair Display" font-weight="600" font-size="28" fill="#2c3e50">Lic. Natalia Domecq</text>
  <text x="246" y="552" text-anchor="middle" font-family="Nunito" font-weight="400" font-size="18" fill="#5c6b7a">Psicóloga · Bahía Blanca</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: 'width', value: WIDTH },
  font: {
    fontFiles,
    loadSystemFonts: false,
    defaultFontFamily: 'Nunito',
  },
});
const png = resvg.render().asPng();

let quality = 84;
let jpeg = await sharp(png).jpeg({ quality, progressive: false, mozjpeg: false }).toBuffer();
while (jpeg.length > 300 * 1024 && quality > 60) {
  quality -= 4;
  jpeg = await sharp(png).jpeg({ quality, progressive: false, mozjpeg: false }).toBuffer();
}
if (jpeg.length > 300 * 1024) {
  throw new Error(`La portada pesa ${(jpeg.length / 1024).toFixed(1)} KB`);
}

await writeFile(path.join(root, 'public', 'og-image.jpg'), jpeg);

async function icon(size, logoScale) {
  const background = await sharp(
    Buffer.from(`<svg width="${size}" height="${size}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#E3F5FC"/>
          <stop offset="100%" stop-color="#FFE8E1"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" fill="url(#g)"/>
    </svg>`),
  )
    .png()
    .toBuffer();

  const logo = await sharp(path.join(root, 'public', 'logo.svg'), {
    density: Math.ceil((72 * logoScale) / 64),
  })
    .resize(logoScale, logoScale)
    .png()
    .toBuffer();

  return sharp(background)
    .composite([{ input: logo, left: Math.round((size - logoScale) / 2), top: Math.round((size - logoScale) / 2) }])
    .png()
    .toBuffer();
}

const apple = await icon(180, 132);
const profile = await icon(512, 380);
await writeFile(path.join(root, 'public', 'apple-touch-icon.png'), apple);
await writeFile(path.join(root, 'public', 'logo-512.png'), profile);

const meta = await sharp(jpeg).metadata();
console.log(`og-image.jpg ${(jpeg.length / 1024).toFixed(1)} KB · ${meta.width}x${meta.height} · progresivo ${meta.isProgressive}`);
console.log(`apple-touch-icon.png ${(apple.length / 1024).toFixed(1)} KB`);
console.log(`logo-512.png ${(profile.length / 1024).toFixed(1)} KB`);
