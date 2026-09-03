import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from 'canvas';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
GlobalWorkerOptions.workerSrc = new URL('./node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs', import.meta.url).href;

const pdfPath = './images/fs-timeline.pdf';
const outPath = './images/fs-timeline.png';

const data = new Uint8Array(fs.readFileSync(pdfPath));
const pdf = await getDocument({ data, useWorkerFetch: false, isEvalSupported: false }).promise;
const page = await pdf.getPage(1);
const scale = 2.5;
const viewport = page.getViewport({ scale });

const canvas = createCanvas(viewport.width, viewport.height);
const ctx = canvas.getContext('2d');

await page.render({ canvasContext: ctx, viewport }).promise;

const out = fs.createWriteStream(outPath);
const stream = canvas.createPNGStream();
stream.pipe(out);
await new Promise((resolve, reject) => { out.on('finish', resolve); out.on('error', reject); });

console.log(`Done: ${outPath} (${viewport.width}x${viewport.height})`);
