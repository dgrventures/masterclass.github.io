# RUN 14 — docs/ served copy (GitHub Pages /docs)

- **Track:** MA  (master/infra)
- **Lock:** yes  (created `dev/LOCK` at start, removed at finish)
- **Date:** 2026-06-04
- **Commit:** `260604-MA14-docs-serve`  (matches folder `14_MA_docs-serve`)
- **Status:** done

## Goal
Add a repo-root `docs/` folder holding the served pages, so GitHub Pages can be set to
"Deploy from branch → main /docs". Keep `src/output/` as the canonical bundle.

## What changed
- New `docs/` = `index.html` + `lezing.html` + `.nojekyll` (disables Jekyll → raw HTML served).
- `assemble.mjs` now writes the casus build to three targets: `src/output/index.html`
  (canonical) → `docs/index.html` (served) → repo-root `index.html` (legacy copy).
- Lecture publish copies `02_lezing.html` → `src/output/lezing.html` → `docs/lezing.html` + root.
- Docs updated: CLAUDE.md (tree + deploy: docs served, root legacy), plan/architecture, assemble header.

## Deploy model now
- **Canonical:** `projectapps/masterclass_fin/src/output/`.
- **Served:** `docs/` (set Pages → branch `main`, folder `/docs`).
- **Legacy:** repo-root `index.html`/`lezing.html` — kept in sync until Pages is switched
  to `/docs`, then droppable (a quick follow-up run once the user confirms the switch).

## Website published?
Yes. Three-way parity verified: `src/output/` == `docs/` == root for both pages (md5 equal).

## Verification
- `node assemble.mjs` wrote all three index.html copies; identical content.
- Link-checker over active docs: **40/40 resolve, 0 broken**.

## Open / next
- **User:** set GitHub Pages → Deploy from branch `main`, folder `/docs`. Then ping me to
  **drop the legacy root copies** (and remove the root write from assemble.mjs).
- `CW`: refine model defaults. `DS`: shared tokens. `JB`: PPTX.
