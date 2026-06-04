/* publish.mjs — publish the casus-intro deck.
 *
 * The intro is a single self-contained slide deck (intro.html, same deck engine
 * as the lecture). This script stamps the shared build number into the __BUILD__
 * placeholder and writes the result to the deploy locations — same shape as the
 * lecture publish step. No bundler, no npm. Run:
 *   node publish.mjs
 *
 * Source (edit here):   deliverables/23_casusintro/intro.html
 * Canonical bundle:     src/output/intro.html
 * Served copy (Pages):  docs/intro.html
 * The build number is shared with the casus + lecture via src/build.json — bump it
 * there, never hand-edit __BUILD__ or a number in the generated files.
 * See dev/projects/masterclass_fin/plan/architecture.md.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { stampBuild, BUILD } from '../../build.mjs';             // shared build no. (build.json)

const dir    = path.dirname(fileURLToPath(import.meta.url));     // .../23_casusintro
const source = path.join(dir, 'intro.html');
const output = path.resolve(dir, '../../output');               // src/output (canonical bundle)
const root   = path.resolve(dir, '../../../../..');             // repo root (for relative logging + docs path)
const docs   = path.join(root, 'docs');                         // served copy (Pages /docs)

let out = fs.readFileSync(source, 'utf8');
out = stampBuild(out);                                          // __BUILD__ -> build no. from build.json

fs.mkdirSync(output, { recursive: true });
fs.mkdirSync(docs, { recursive: true });
// src/output = canonical; docs/ = served copy (Pages serves /docs)
for (const dest of [path.join(output, 'intro.html'), path.join(docs, 'intro.html')]) {
  fs.writeFileSync(dest, out);
  console.log('wrote', path.relative(root, dest), out.length, 'bytes', '(build ' + BUILD + ')');
}
