# RUN 02 — Fix case-website login (role select did nothing)

- **Workstream tag:** JB
- **Date:** 2026-06-04
- **Commit:** `260604-JB02-fix-login`
- **Status:** done

## Goal
Fix the live case website (`index.html`) where clicking a role changed the URL
but the page stayed on the login screen. Resolves handoff §5.4.

## Scope
- In scope: the login → view-switching bug in the case website + build bump.
- Out of scope: all other deliverables; other handoff open items.

## Context read
- `index.html` login markup + routing/login JS (`go`, `applyHash`, `show`, `renderRole`).
- Confirmed the live deployed page was byte-identical to the repo (`curl` + `diff`).

## Root cause
A **CSS specificity** bug, not a JS bug. View switching relies on
`.view{display:none}` / `.view.active{display:block}` (specificity 0,1,0 / 0,2,0).
But `#login{…display:flex…}` is an **ID** rule (specificity 1,0,0), so its
`display:flex` always won — `#login` never hid, even with its `active` class
removed. With `min-height:100vh` it covered the whole screen, so the freshly
shown role/facilitator page sat underneath it and the user kept seeing login.
The URL changed because `go()` set `location.hash` before rendering.

Why it looked fine in code review / headless tests: jsdom (and the JS logic) toggle
the `active` class correctly; only a real browser's CSS cascade reveals it. Proven
with `getComputedStyle` in jsdom: after clicking a role, `#login` computed to
`flex` (active class `false`) — the smoking gun.

## What changed
- `dev/project/deliverables/22_casepage/casus-akzonobel-axalta.html` (canonical):
  - Removed `display:flex` from the base `#login{…}` rule; added a scoped
    `#login.active{display:flex}` so the `.view` cascade can hide it. Added a
    comment explaining the specificity trap.
  - Bumped diagnostic text `build 8` → `build 9` (two places) so the fix is
    verifiable against cached copies.
- Published: copied canonical → `index.html` and `src/index.html` (all three md5-identical).

No content/figures changed.

## Website published?
Yes — canonical casepage copied to `index.html` + `src/index.html`.

## Verification
- jsdom + `getComputedStyle` against the published `index.html`:
  - Click role → `#login: none`, `#rolePage: block`. (Before fix: `#login: flex`.)
  - Click facilitator → `#login: none`, `#facPage: block`.
  - Logout → `#login: flex`, `#rolePage: none`.
- All three HTML files share one md5.
- Not done: a real-browser click-through on the live URL after GitHub Pages
  redeploys — the diagnostic line should read **build 9** once propagated; if it
  still says build 8, it's a stale cache (hard-refresh).

## Open / next
- After push, confirm on the live site that the bottom line says **build 9** and
  roles open. Then resume handoff §5.1 (PPTX export of `02_lezing.html`).
