/* build.mjs — single source of truth for the deploy build number.
 *
 * The number lives in build.json (next to this file). Both publish steps import
 * stampBuild() and replace the literal placeholder __BUILD__ with the number:
 *   - casus:   deliverables/22_casepage/assemble.mjs
 *   - lezing:  deliverables/10_lezing/publish.mjs
 * To bump the build, edit ONLY build.json, then re-run both publish steps. Never
 * hand-edit __BUILD__ in the sources or a number in the generated output.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const here = path.dirname(fileURLToPath(import.meta.url));      // src/
export const BUILD = JSON.parse(fs.readFileSync(path.join(here, 'build.json'), 'utf8')).build;
export const PLACEHOLDER = '__BUILD__';
export const stampBuild = s => s.split(PLACEHOLDER).join(String(BUILD));
