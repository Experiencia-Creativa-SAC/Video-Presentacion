import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {ASSETS} from '../video/assets.ts';
const referenced=new Set(Object.values(ASSETS).flatMap(asset=>[asset.src,asset.poster].filter(Boolean)));
const provenance=JSON.parse(await fs.readFile('public/andesmin/video/provenance.json','utf8'));
for(const clip of provenance)referenced.add(`proyectos/${clip.slug}/${clip.file}.mp4`);
for(const file of referenced){
  assert.ok(!file.includes('..')&&!file.startsWith('/'),`Invalid local media path: ${file}`);
  const stat=await fs.stat(`public/${file}`);
  assert.ok(stat.isFile()&&stat.size>0,`Missing media: ${file}`);
}
for(const name of ['Regular','Medium','SemiBold'])assert.ok((await fs.stat(`src/assets/fonts/Poppins-${name}.woff2`)).size>0);
console.log(`Standalone assets checked: ${referenced.size} media references and 3 local font weights.`);
