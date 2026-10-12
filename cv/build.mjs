// Genera los PDF del CV con Chrome o Edge en modo headless (sin dependencias de npm).
// Uso: npm run cv   (o: node cv/build.mjs)
// Si no encuentra el navegador, indica su ruta con la variable CHROME_PATH.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const cvDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(cvDir, '..');
const outDir = join(cvDir, 'out'); // ignorada por git: aquí van las versiones con teléfono
const base = 'Marcos_Maria_Martinez_Varas_BigData_IA';

const builds = [
  // Públicas (se enlazan desde la web): sin teléfono
  { src: 'cv.es.html', out: join(root, 'public', `${base}.pdf`) },
  { src: 'cv.en.html', out: join(root, 'public', `${base}_EN.pdf`) },
  // Privadas (para enviar a mano o subir a portales): con teléfono
  { src: 'cv.es.html', out: join(outDir, `${base}.pdf`), private: true },
  { src: 'cv.en.html', out: join(outDir, `${base}_EN.pdf`), private: true },
];

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ];
  const found = candidates.find((p) => p && existsSync(p));
  if (!found) throw new Error('No encuentro Chrome ni Edge. Indica la ruta con CHROME_PATH.');
  return found;
}

// Chrome guarda el árbol de páginas sin comprimir: basta con leer /Count del nodo /Pages.
function pageCount(file) {
  const counts = [...readFileSync(file, 'latin1').matchAll(/\/Type\s*\/Pages\b[^>]*?\/Count\s+(\d+)/g)];
  return counts.length ? Math.max(...counts.map((m) => Number(m[1]))) : NaN;
}

const browser = findBrowser();
mkdirSync(outDir, { recursive: true });
let ok = true;

for (const b of builds) {
  const url = pathToFileURL(join(cvDir, b.src)).href + (b.private ? '?private' : '');
  rmSync(b.out, { force: true });
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--allow-file-access-from-files',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=3000',
    `--print-to-pdf=${b.out}`,
    url,
  ], { stdio: 'ignore' });

  const pages = pageCount(b.out);
  if (pages !== 1) ok = false;
  console.log(`${pages === 1 ? 'OK ' : 'ERR'} ${pages} pág. · ${b.out}`);
}

if (!ok) {
  console.error('Algún PDF no ocupa exactamente una página A4.');
  process.exit(1);
}
