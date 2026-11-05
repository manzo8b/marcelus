// Derive browser and Apple icons from the owner's original PNG; no redraw.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
const source = process.argv[2];
if (!source) throw new Error('Supply the original logo PNG path.');
async function icon(size) {
  const logo = await sharp(source).resize(Math.round(size * .9), Math.round(size * .9), {fit:'inside'}).png().toBuffer();
  return sharp({create:{width:size,height:size,channels:4,background:'#f5f5f7'}}).composite([{input:logo,gravity:'centre'}]).png().toBuffer();
}
for (const [size,name] of [[32,'favicon-32.png'],[192,'favicon-192.png'],[180,'apple-touch-icon.png']]) await writeFile(`public/${name}`,await icon(size));
const sizes=[16,32,48], images=await Promise.all(sizes.map(icon));
const header=Buffer.alloc(6+16*images.length);header.writeUInt16LE(1,2);header.writeUInt16LE(images.length,4);
let offset=header.length;
images.forEach((bytes,i)=>{const p=6+i*16;header[p]=sizes[i];header[p+1]=sizes[i];header.writeUInt16LE(1,p+4);header.writeUInt16LE(32,p+6);header.writeUInt32LE(bytes.length,p+8);header.writeUInt32LE(offset,p+12);offset+=bytes.length;});
await writeFile('public/favicon.ico',Buffer.concat([header,...images]));
console.log('Created four favicon files from the supplied logo.');
