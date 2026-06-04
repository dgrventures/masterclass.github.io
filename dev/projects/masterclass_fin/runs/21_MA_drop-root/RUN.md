# RUN 21 — drop legacy repo-root copies (serve only from /docs)

- **Track:** MA  (master/infra)
- **Lock:** yes  (created `dev/LOCK` at start, removed at finish)
- **Date:** 2026-06-04
- **Commit:** `260604-MA21-drop-root`  (matches folder `21_MA_drop-root`)
- **Status:** done

## Goal
Now that GitHub Pages serves `/docs`, remove the legacy repo-root copies so the
deploy is provably sourced from `docs/` (canonical stays `src/output/`). Definitive
test: with no root files, the live site must still work → it's serving `/docs`.

## What changed
- **Removed** repo-root `index.html`, `lezing.html`, `intro.html` (`git rm`).
- **Stopped writing root** in all three publish scripts — dropped the `root` dest from
  the write loop (kept the `root` var only to derive the `docs` path + relative logging):
  - `…/22_casepage/assemble.mjs` (casus)
  - `…/10_lezing/publish.mjs` (lecture)
  - `…/23_casusintro/publish.mjs` (intro)
  - `…/publish-all.mjs` summary message updated.
- **Specs updated** to "served only from `docs/`, no repo-root copies": CLAUDE.md §2
  (tree + deploy + all three publish blurbs), `plan/architecture.md` (deploy, build map,
  lecture), `tracks/README.md` (CW row), `general/architecture.md` (reusable example).

## Deploy model now
- **Canonical:** `projectapps/masterclass_fin/src/output/` (index.html · lezing.html · intro.html).
- **Served:** `docs/` (Pages → branch `main`, `/docs`; `.nojekyll`). **No repo-root copies.**

## Website published?
Yes — `node …/src/publish-all.mjs` writes `src/output/` + `docs/` only. Verified the
scripts do **not** recreate any root file. `docs/*` == `src/output/*` for all 3 pages.

## Verification
- Re-ran `publish-all.mjs`: wrote output + docs; `ls *.html` at root → none.
- Link-checker over active docs: **42/42 resolve, 0 broken**. No residual root-copy refs.
- Build number unchanged (**12**) — this run only moved/removed copies, no content change.

## Open / next
- This is the clean end state for deploy. If the live `/docs` ever 404s, re-check the
  Pages "Deploy from branch → main /docs" setting.
- `CW`: refine model defaults. `DS`: shared tokens. (Backlog under `…/plan/backlog/`.)
