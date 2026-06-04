# RUN 13 — canonical src/output bundle (index.html + lezing.html)

- **Track:** MA  (master/infra)
- **Lock:** yes  (created `dev/LOCK` at start, removed at finish)
- **Date:** 2026-06-04
- **Commit:** `260604-MA13-output-bundle`  (matches folder `13_MA_output-bundle`)
- **Status:** done

## Goal
Add a `src/output/` folder holding the **canonical** deployed pages (`index.html` +
`lezing.html`), copied to the repo root for now — so the root is just a convenience
copy, not the source of truth (and Pages could later point at the bundle).

## What changed
- New `projectapps/masterclass_fin/src/output/` = `index.html` (casus) + `lezing.html` (lecture).
  Sorts after `deliverables/`; mirrors the `versions/*/output/` snapshot shape.
- `assemble.mjs`: now writes the casus build to `src/output/index.html` (canonical) **and**
  repo-root `index.html` (copy). **Retired** `22_casepage/pages/` (superseded by the bundle).
- Lecture: its source is copied to `src/output/lezing.html`, then to root `lezing.html`.
- Docs updated: CLAUDE.md §2 (tree + deploy = canonical bundle, root = copy), plan/architecture
  (deploy, casus build, repo map, status), general/architecture (reusable pattern now uses
  an `output/` bundle), assemble.mjs header.

## Naming
Chose `output/` (after `deliverables/` alphabetically; consistent with `versions/*/output/`).

## Website published?
Yes. `src/output/index.html` == root `index.html` (md5 equal); `src/output/lezing.html` ==
root `lezing.html`. Assembled root `index.html` byte-identical to the prior build.

## Verification
- `node assemble.mjs` → writes `src/output/index.html` + root; root unchanged (diff IDENTICAL).
- Link-checker over active docs: **39/39 resolve, 0 broken**.
- No `pages/` references remain in active docs except historical run-log/backlog notes.

## Open / next
- Later: point GitHub Pages at `src/output/` (or a `docs/`-style path) so root copies aren't needed.
- `CW`: refine model defaults in `…/22_casepage/appdeliverables/data.js`. `DS`: shared tokens. `JB`: PPTX.
