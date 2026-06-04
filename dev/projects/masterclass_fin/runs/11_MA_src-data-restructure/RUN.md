# RUN 11 — data/ folder, app-src restructure, versions, architecture split

- **Track:** MA  (master/infra)
- **Lock:** yes  (created `dev/LOCK` at start, removed at finish — repo-wide moves)
- **Date:** 2026-06-04
- **Commit:** `260604-MA11-src-data-restructure`  (matches folder `11_MA_src-data-restructure`)
- **Status:** done

## Goal
Six clean-up items from the user: split architecture (general vs project) +
`.gitkeep` convention; formalise `versions/`; add `project/data/`; add
`src/appdeliverables/`; move `shared/` into `src/`; add `src/pages/`.

## What changed
- **(1) architecture split + .gitkeep:** `dev/general/architecture/architecture.md` →
  reusable patterns only; new `dev/project/plan/architecture.md` → this project's
  concrete architecture. `context/gitkeep` → `.gitkeep`; `.gitkeep` used for all new
  empty folders.
- **(2) versions:** added `versions/README.md` (kept deployed-output snapshots); the
  existing `version_260603_run05/` is now tracked. Documented in CLAUDE.md §2.
- **(3) data:** new `dev/project/data/{input,process}/.gitkeep` + `projectdeliverables/`.
  Moved non-app source materials there: `21_casus/**` and `10_lezing/{01a,01b,*.xlsx}`
  (the lecture `02_lezing.html` stays in `deliverables/10_lezing/`).
- **(4) appdeliverables:** moved the assemble inputs into
  `…/22_casepage/src/appdeliverables/` (shell.html, style.css, data.js, app.js, vendor).
- **(5) shared → src:** `dev/shared/` → `…/22_casepage/src/shared/` (`dev/shared/` removed).
- **(6) pages:** assemble now writes `…/src/pages/index.html` (canonical artefact) +
  repo-root `index.html`. **Dropped** the redundant repo-root `src/` mirror
  (`src/index.html`, `src/lezing.html`); lecture publishes by `cp` to root `lezing.html`.
- Updated `assemble.mjs` (read parts from `appdeliverables/`, tokens from `shared/`,
  write `pages/` + root) and `style.css` `@import` (`../shared/style/tokens.css`).
- Reference updates: CLAUDE.md (layout, deploy, DS path), `tracks/README.md` (DS/CW/MA
  owned paths), `backlog.md`, runs README + template. All cross-links verified to resolve.

## Decisions (from user)
- "Not used in the app" includes the lecture's non-app source files → moved them too.
- Assembled pages in `pages/`; drop the redundant repo-root `src/` mirror.

## Website published?
Yes — `node …/src/assemble.mjs`. **Assembled `index.html` is byte-identical** to the
prior build (restructure changed only locations, not app content); `pages/index.html`
== root `index.html`.

## Verification
- `diff` assembled `index.html` vs previous deployed → **IDENTICAL**.
- `node --check` parts clean; jsdom dev-form (`appdeliverables/shell.html`) loads parts
  (qrcode + CSS) with no errors via the new `../shared/style` path.
- Repo-wide sweep: no residual stale paths in active docs (run logs/HANDOFF excluded).
- All moves via `git mv` (history preserved).

## Open / next
- `CW`: refine model defaults in `…/src/appdeliverables/data.js`.
- `DS`: lezing adopts `…/src/shared/style/tokens.css`. `JB`: PPTX export.
- Note for `JB`: the repo-root `src/` mirror is gone — lecture publishes to root `lezing.html` only.
