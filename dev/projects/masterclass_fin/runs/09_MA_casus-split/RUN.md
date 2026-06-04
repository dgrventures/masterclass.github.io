# RUN 09 — Split the casus app into parts + assemble

- **Track:** MA  (master/infra)
- **Lock:** yes  (created `dev/LOCK` at start, removed at finish — whole casus app)
- **Date:** 2026-06-04
- **Commit:** `260604-MA09-casus-split`  (matches folder `09_MA_casus-split`)
- **Status:** done

## Goal
Refactor the monolithic casus app into separately-editable parts (style / data+model
/ logic) so tracks can work in parallel, while what ships stays one self-contained
`index.html`. Per `dev/planning/architecture.md`.

## What changed
- **New canonical parts** in `dev/project/deliverables/22_casepage/src/`:
  - `shell.html` — head + view `<section>`s + `<link>`/`<script src>` to the parts.
  - `style.css` — casus CSS; `@import`s the shared tokens.
  - `data.js` — CONTENT + MODEL: 13 consts (SITUATIE, SPIEKKAART, TOETS, FINMODEL,
    IMPACT_MODEL, SOURCES, ROLES, ROLE_ORDER, PHASES, TOTAL, SEATS, VLAB, ANALIST_TABS)
    — the figure numbers (FINMODEL/IMPACT_MODEL `data-def`s) live here, editable alone.
  - `app.js` — LOGIC: router, render, live calc, facilitator, vote, QR, actions.
  - `vendor-qrcode.js` — the vendored qrcode-generator lib (unchanged).
  - `assemble.mjs` — inlines the parts → one self-contained `index.html`.
- **Shared** `dev/shared/style/tokens.css` — brand `:root` tokens + base resets (DS track home).
- **Removed** the old single-file canonical `22_casepage/casus-akzonobel-axalta.html`
  (replaced by `src/` + assembled output; avoids a second source of truth).
- **Generated** root `index.html` + `src/index.html` via assemble (build 12, identical behaviour).
- Docs: CLAUDE.md §1/§2 (canonical = parts, publish = assemble), architecture.md,
  backlog.md updated.

## How extraction was done (safely)
A one-off string/brace/comment-aware scanner pulled each named data const from
script2 (handling nested objects + HTML template literals; verified no `${}`
interpolation in the data). Logic kept in original order; data loaded first. Three
classic `<script>`s share top-level `const`s exactly as the original two did.

## Constraints met (user)
- (i) GitHub Pages: serves the assembled single `index.html`. ✓
- (ii) Download + double-click: assembled file is self-contained (no fetch / ES
  imports). The dev form (`src/shell.html`) also runs from file:// via classic tags. ✓
- (iii) Single-page integration: the assembled file *is* the single page. ✓
- Shared style folder: `dev/shared/style/tokens.css`, inlined at assemble. ✓

## Website published?
Yes — `node …/src/assemble.mjs` wrote root `index.html` + `src/index.html` (md5-equal).

## Verification
- `node --check` on data.js / app.js / vendor: clean.
- jsdom **behavioural** suites on the assembled file — all pass identically to pre-
  refactor, no JS errors:
  - nav: landing default → casus/role/analist/facilitator, back-to-start, deep-link
    `#rol/minister`, lecture href.
  - models: fin €81,5 vs €73 → edit realisatie/opslag → €72,7 flip → reset; impact
    −14,5/−1,3/+5,1 → edit → +1,7 flip → reset; RvC toets read-only (0 inputs).
  - sources: 9 links, all three authors.
- Dev form (`src/shell.html`, jsdom `resources:usable`): parts load, qrcode present,
  CSS applied, nav works, no errors.
- Not done: real-browser pass on the live URL after redeploy (footer should read build 12).

## Open / next
- `CW`: refine FINMODEL/IMPACT_MODEL default numbers in `src/data.js`.
- `DS`: have the lezing adopt `dev/shared/style/tokens.css`.
- `JB`: PPTX export. See `dev/planning/backlog.md`.
