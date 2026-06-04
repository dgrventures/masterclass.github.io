/* assemble.mjs — inline the casus parts into one self-contained index.html.
 *
 * Pure string substitution: <link>/<script src> are replaced by the file
 * contents wrapped in <style>/<script>. No bundler, no npm, no GitHub Action.
 * The output is one file that works on GitHub Pages AND by double-clicking it
 * from a downloaded folder (no fetch / no ES-module import, both blocked on
 * file://). Run:  node assemble.mjs
 *
 * Canonical sources live here in src/ (shell.html, style.css, data.js, app.js)
 * + dev/shared/style/tokens.css. The generated index.html / src/index.html are
 * outputs — never hand-edit them. See dev/planning/architecture.md.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir  = path.dirname(fileURLToPath(import.meta.url));            // .../22_casepage/src
const root = path.resolve(dir, '../../../../..');                    // repo root
const tokens = path.resolve(dir, '../../../../shared/style/tokens.css');
const read = p => fs.readFileSync(p, 'utf8');
const inject = (s, marker, body) => {                                 // string replace, no regex
  if (!s.includes(marker)) throw new Error('marker not found: ' + marker);
  return s.split(marker).join(body);
};

let shell  = read(path.join(dir, 'shell.html'));
let css     = read(path.join(dir, 'style.css'));
const vendor = read(path.join(dir, 'vendor-qrcode.js'));
const data   = read(path.join(dir, 'data.js'));
const app    = read(path.join(dir, 'app.js'));

// resolve the shared-tokens @import by inlining the file
css = inject(css, '@import url("../../../../shared/style/tokens.css");', read(tokens));

let out = shell;
out = inject(out, '<link rel="stylesheet" href="style.css">', '<style>\n' + css + '\n</style>');
out = inject(out, '<script src="vendor-qrcode.js"></script>',  '<script>\n' + vendor + '\n</script>');
out = inject(out, '<script src="data.js"></script>',           '<script>\n' + data   + '\n</script>');
out = inject(out, '<script src="app.js"></script>',            '<script>\n' + app    + '\n</script>');

for (const dest of [path.join(root, 'index.html'), path.join(root, 'src', 'index.html')]) {
  fs.writeFileSync(dest, out);
  console.log('wrote', path.relative(root, dest), out.length, 'bytes');
}
