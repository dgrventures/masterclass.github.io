/* publish-all.mjs — publish BOTH artifacts (casus + lezing) in one command.
 *
 * Thin wrapper: it just runs the two existing publish steps in order, so a build
 * bump is a single command. To bump the build: edit build.json, then run:
 *   node projectapps/masterclass_fin/src/publish-all.mjs
 *
 *   - casus:   deliverables/22_casepage/assemble.mjs  (inlines parts -> index.html)
 *   - lezing:  deliverables/10_lezing/publish.mjs      (stamps -> lezing.html)
 * Both stamp the shared build number from build.json via build.mjs. Importing a
 * step runs it (each has top-level side effects) and each resolves its own paths,
 * so this works regardless of the cwd it is invoked from.
 */
import { BUILD } from './build.mjs';

console.log('Publishing build ' + BUILD + ' …\n');
console.log('— casus (assemble.mjs)');
await import('./deliverables/22_casepage/assemble.mjs');
console.log('\n— lezing (publish.mjs)');
await import('./deliverables/10_lezing/publish.mjs');
console.log('\nDone — build ' + BUILD + ' published to src/output/, docs/ and repo-root.');
