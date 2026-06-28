import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, '../public/assets');

const assets = [
  { file: 'asset_1.svg', label: 'Digital Experiences', width: 800, height: 1000, from: '#6D28D9', to: '#A78BFA' },
  { file: 'asset_2.svg', label: 'Digital Solutions', width: 800, height: 480, from: '#5B21B6', to: '#8B5CF6' },
  { file: 'asset_3.svg', label: 'Sky Valley Resort', width: 1200, height: 800, from: '#1e3a5f', to: '#6D28D9' },
  { file: 'asset_5.svg', label: 'Founder', width: 640, height: 800, from: '#4C1D95', to: '#7C3AED' },
  { file: 'asset_6.svg', label: 'Our Process', width: 1200, height: 480, from: '#3730A3', to: '#6D28D9' },
  { file: 'asset_8.svg', label: 'Contact', width: 800, height: 480, from: '#5B21B6', to: '#C4B5FD' },
  { file: 'cosmic-bg.svg', label: '', width: 1920, height: 1080, from: '#0a0a0f', to: '#4C1D95' },
  { file: 'cap-design.svg', label: 'UI/UX Design', width: 480, height: 640, from: '#6D28D9', to: '#DDD6FE' },
  { file: 'cap-support.svg', label: '24/7 Support', width: 480, height: 640, from: '#5B21B6', to: '#A78BFA' },
  { file: 'cap-dev.svg', label: 'App Development', width: 480, height: 640, from: '#4C1D95', to: '#8B5CF6' },
  { file: 'cap-software.svg', label: 'Custom Software', width: 480, height: 640, from: '#3730A3', to: '#7C3AED' },
  { file: 'cap-process.svg', label: 'Process', width: 480, height: 640, from: '#581C87', to: '#C4B5FD' },
];

function svg({ width, height, from, to, label }) {
  const stars = label
    ? `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-family="Inter, Arial, sans-serif" font-size="${Math.max(18, width / 24)}" font-weight="600">${label}</text>`
    : `<circle cx="15%" cy="20%" r="2" fill="rgba(255,255,255,0.15)"/><circle cx="75%" cy="35%" r="1.5" fill="rgba(255,255,255,0.2)"/><circle cx="45%" cy="65%" r="2.5" fill="rgba(255,255,255,0.1)"/><circle cx="85%" cy="75%" r="1" fill="rgba(255,255,255,0.25)"/><circle cx="25%" cy="80%" r="1.5" fill="rgba(255,255,255,0.15)"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label || 'Background'}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  ${stars}
</svg>`;
}

await mkdir(assetsDir, { recursive: true });

for (const asset of assets) {
  await writeFile(path.join(assetsDir, asset.file), svg(asset), 'utf8');
}

console.log(`Created ${assets.length} placeholder assets in public/assets/`);
