/* assemble.mjs — inline the casus parts into one self-contained index.html.
 *
 * Pure string substitution: <link>/<script src> are replaced by the file
 * contents wrapped in <style>/<script>. No bundler, no npm, no GitHub Action.
 * The output works on GitHub Pages AND by double-clicking it from a downloaded
 * folder (no fetch / no ES-module import, both blocked on file://). Run:
 *   node assemble.mjs
 *
 * Layout (this folder = .../22_casepage):
 *   appdeliverables/  shell.html, style.css, data.js, app.js, vendor-qrcode.js  (edit here)
 *   shared/style/tokens.css                                                     (shared brand tokens)
 *   assemble.mjs      this script
 * Writes the assembled file to the canonical output bundle src/output/index.html,
 * then copies it to docs/index.html (served via Pages /docs). The assembled files
 * are generated — never hand-edit them.
 * See dev/projects/masterclass_fin/plan/architecture.md.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { stampBuild, injectGate } from '../../build.mjs';        // shared build no. + login gate

const dir    = path.dirname(fileURLToPath(import.meta.url));     // .../22_casepage
const parts  = path.join(dir, 'appdeliverables');
const tokens = path.join(dir, 'shared', 'style', 'tokens.css');
const output = path.resolve(dir, '../../output');               // src/output (canonical bundle)
const root   = path.resolve(dir, '../../../../..');             // repo root (for relative logging + docs path)
const docs   = path.join(root, 'docs');                         // served copy (Pages /docs)
const read = p => fs.readFileSync(p, 'utf8');
const inject = (s, marker, body) => {                            // string replace, no regex
  if (!s.includes(marker)) throw new Error('marker not found: ' + marker);
  return s.split(marker).join(body);
};

let shell    = read(path.join(parts, 'shell.html'));
let css      = read(path.join(parts, 'style.css'));
const vendor = read(path.join(parts, 'vendor-qrcode.js'));
const data   = read(path.join(parts, 'data.js'));
const app    = read(path.join(parts, 'app.js'));

// resolve the shared-tokens @import by inlining the file
css = inject(css, '@import url("../shared/style/tokens.css");', read(tokens));

let out = shell;
out = inject(out, '<link rel="stylesheet" href="style.css">', '<style>\n' + css + '\n</style>');
out = inject(out, '<script src="vendor-qrcode.js"></script>',  '<script>\n' + vendor + '\n</script>');
out = inject(out, '<script src="data.js"></script>',           '<script>\n' + data   + '\n</script>');
out = inject(out, '<script src="app.js"></script>',            '<script>\n' + app    + '\n</script>');
out = stampBuild(out);                                          // __BUILD__ -> build no. from build.json
out = injectGate(out);                                          // soft login overlay (see src/gate.mjs)

fs.mkdirSync(output, { recursive: true });
fs.mkdirSync(docs, { recursive: true });
// src/output = canonical; docs/ = served copy (Pages serves /docs)
for (const dest of [path.join(output, 'index.html'), path.join(docs, 'index.html')]) {
  fs.writeFileSync(dest, out);
  console.log('wrote', path.relative(root, dest), out.length, 'bytes');
}
