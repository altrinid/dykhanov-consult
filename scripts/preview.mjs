// Копия сборки для предпросмотра на GitHub Pages: https://<владелец>.github.io/<репозиторий>/
//
//   node scripts/preview.mjs dist preview /dykhanov-consult/
//
// Сайт там живёт в подпапке, поэтому адреса от корня («/…») получают её в начало.
// Предпросмотр закрыт от поисковиков. Форма в нём ничего не отправляет: PHP на GitHub Pages нет,
// а персональные данные из формы можно собирать только на серверах в РФ (152-ФЗ).
import fs from 'node:fs';
import path from 'node:path';

const [, , SRC = 'dist', OUT = 'preview', baseArg = '/'] = process.argv;
const trimmed = baseArg.replace(/^\/+|\/+$/g, '');
const BASE = trimmed ? `/${trimmed}/` : '/';

const withBase = (url) => (url.startsWith('/') && !url.startsWith('//') ? BASE + url.slice(1) : url);
const fixCssUrls = (s) => s.replace(/url\((['"]?)(\/[^'")]+)\1\)/g, (_, q, u) => `url(${q}${withBase(u)}${q})`);

const HEAD = '<meta name="robots" content="noindex, nofollow">';
const BODY = `<div style="position:fixed;left:12px;bottom:12px;z-index:9999;padding:6px 12px;border-radius:999px;background:#c9a24d;color:#170842;font:600 13px/1.3 system-ui,sans-serif;box-shadow:0 4px 14px rgb(23 8 66/.25);pointer-events:none">Предпросмотр · заявки не отправляются</div>
<script>
  document.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const status = event.target.querySelector('.form__status');
    if (status) {
      status.textContent = 'Это предпросмотр сайта: заявки отсюда не отправляются.';
      status.dataset.state = 'error';
    }
  }, true);
</script>`;

fs.rmSync(OUT, { recursive: true, force: true });
// Серверные файлы для Beget на GitHub Pages не нужны
fs.cpSync(SRC, OUT, { recursive: true, filter: (p) => !/[\\/](\.htaccess|api)$/.test(p) });

const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));

for (const file of walk(OUT)) {
  if (file.endsWith('.html')) {
    let s = fs.readFileSync(file, 'utf8');
    s = s.replace(/\b(href|src|poster)="(\/[^"]*)"/g, (_, attr, url) => `${attr}="${withBase(url)}"`);
    s = s.replace(/\bsrcset="([^"]*)"/g, (_, value) => {
      const parts = value.split(',').map((part) => {
        const [url, size] = part.trim().split(/\s+/);
        return [withBase(url), size].filter(Boolean).join(' ');
      });
      return `srcset="${parts.join(', ')}"`;
    });
    // Без JavaScript форма тоже не должна никуда уходить
    s = s.replace(/\baction="\/[^"]*"/g, 'action="javascript:void(0)"');
    s = fixCssUrls(s);
    s = s.replace('</head>', `${HEAD}</head>`).replace('</body>', `${BODY}</body>`);
    fs.writeFileSync(file, s);
  } else if (file.endsWith('.css')) {
    fs.writeFileSync(file, fixCssUrls(fs.readFileSync(file, 'utf8')));
  }
}

fs.writeFileSync(path.join(OUT, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
// Без этого файла GitHub Pages пропустит папку _astro (Jekyll не публикует папки с «_»)
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');
console.log(`Предпросмотр: ${OUT} (адреса от ${BASE})`);
