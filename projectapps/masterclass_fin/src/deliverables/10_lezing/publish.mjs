/* publish.mjs — publish the lecture (JB track).
 *
 * The lecture is a single self-contained file (02_lezing.html, fonts/images
 * inlined as base64). This script stamps the shared build number into the
 * __BUILD__ placeholder and writes the result to the deploy locations — the
 * lecture equivalent of the casus assemble.mjs. No bundler, no npm. Run:
 *   node publish.mjs
 *
 * Source (edit here):   deliverables/10_lezing/02_lezing.html
 * Canonical bundle:     src/output/lezing.html
 * Served copy (Pages):  docs/lezing.html
 * The build number is shared with the casus via src/build.json — bump it there,
 * never hand-edit __BUILD__ or a number in the generated files.
 * See dev/projects/masterclass_fin/plan/architecture.md.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { stampBuild, injectGate, BUILD } from '../../build.mjs'; // shared build no. + login gate

const dir    = path.dirname(fileURLToPath(import.meta.url));     // .../10_lezing
const source = path.join(dir, '02_lezing.html');
const output = path.resolve(dir, '../../output');               // src/output (canonical bundle)
const root   = path.resolve(dir, '../../../../..');             // repo root (for relative logging + docs path)
const docs   = path.join(root, 'docs');                         // served copy (Pages /docs)

let out = fs.readFileSync(source, 'utf8');
out = stampBuild(out);                                          // __BUILD__ -> build no. from build.json
out = injectGate(out);                                          // soft login overlay (see src/gate.mjs)

fs.mkdirSync(output, { recursive: true });
fs.mkdirSync(docs, { recursive: true });
// src/output = canonical; docs/ = served copy (Pages serves /docs)
for (const dest of [path.join(output, 'lezing.html'), path.join(docs, 'lezing.html')]) {
  fs.writeFileSync(dest, out);
  console.log('wrote', path.relative(root, dest), out.length, 'bytes', '(build ' + BUILD + ')');
}
