import { readFile, writeFile } from 'node:fs/promises';
import sharp from '../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js';

const svg = await readFile(new URL('../public/favicon-source.png', import.meta.url));
for (const [name, size] of [['favicon.png', 512], ['apple-touch-icon.png', 180]]) {
  await sharp(svg).resize(size, size).png().toFile(new URL(`../public/${name}`, import.meta.url).pathname.replace(/^\/(\w:)/, '$1'));
}
const sizes = [16, 32, 48, 256];
const frames = await Promise.all(sizes.map(size => sharp(svg).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
frames.forEach((frame, i) => {
  const pos = 6 + i * 16;
  header[pos] = sizes[i] === 256 ? 0 : sizes[i];
  header[pos + 1] = header[pos];
  header.writeUInt16LE(1, pos + 4);
  header.writeUInt16LE(32, pos + 6);
  header.writeUInt32LE(frame.length, pos + 8);
  header.writeUInt32LE(offset, pos + 12);
  offset += frame.length;
});
await writeFile(new URL('../public/favicon.ico', import.meta.url), Buffer.concat([header, ...frames]));
console.log('Generated bright favicon PNG, Apple icon and multi-size ICO.');
