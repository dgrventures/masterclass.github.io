# RUN 12 — projectapps/ + dev/projects/ split; drop 22_casepage/src

- **Track:** MA  (master/infra)
- **Lock:** yes  (created `dev/LOCK` at start, removed at finish — repo-wide moves)
- **Date:** 2026-06-04
- **Commit:** `260604-MA12-projectapps`  (matches folder `12_MA_projectapps`)
- **Status:** done

## Goal
Six restructuring items: separate the **app/product** (`/projectapps/<project>/`) from
**dev/working materials** (`/dev/projects/<project>/`); drop the `src/` inside 22_casepage;
move specs + versions under projectapps; validate all references.

## What changed (all via `git mv`)
1. `dev/project/deliverables/` → `projectapps/masterclass_fin/src/deliverables/`
   (both `10_lezing/` and `22_casepage/`).
2. Dropped `src/` inside the casus app → `…/22_casepage/{appdeliverables,shared,pages,assemble.mjs}`.
3. `specs/` → `projectapps/masterclass_fin/specs/`; `versions/` → `projectapps/masterclass_fin/versions/`.
4. `dev/project/` → `dev/projects/masterclass_fin/` (its `plan/`, `tracks/`, `data/`).
5. `dev/runs/` → `dev/projects/masterclass_fin/runs/`.
6. Validated + documented (below). `dev/general/` stays (cross-project/reusable).

Resulting two-tree layout (now the documented general convention):
- `projectapps/<project>/` = `src/deliverables/`, `specs/`, `versions/`.
- `dev/projects/<project>/` = `plan/`, `tracks/`, `data/`, `runs/`.
- `dev/general/` = reusable; repo-root `CLAUDE.md` = per-project glue.

## Build / deploy
- **No build-file changes needed:** `assemble.mjs` sits beside `appdeliverables/shared/pages`
  (unchanged relative refs) and the repo root is still exactly 5 levels up — verified the
  assembled root `index.html` is **byte-identical** to before.
- Pages still serves repo-root `index.html` + `lezing.html` (can't serve a subfolder).
- Publish: casus → `node projectapps/masterclass_fin/src/deliverables/22_casepage/assemble.mjs`;
  lecture → `cp projectapps/masterclass_fin/src/deliverables/10_lezing/02_lezing.html lezing.html`.

## References (item 6)
- Bulk root-style path migration via `perl` across all active docs (ordered, specific→general).
- Hand-fixed every `../` relative link whose depth shifted (general/, plan/, tracks/, runs/).
- Generalised `dev/general/architecture.md` to the project-agnostic two-tree pattern.
- **Validated:** link-checker over active docs → **38/38 links resolve, 0 broken**; stale-path
  sweep clean (run logs + HANDOFF left as historical records).

## Website published?
Yes — re-assembled; root `index.html` byte-identical, `pages/index.html` == root.

## Verification
- `node --check`-equivalent: app assembles cleanly; root `index.html` IDENTICAL to prior build.
- All 38 markdown links in active docs resolve; no `dev/project/`, `dev/runs/`, `22_casepage/src`,
  or dropped-`src/`-mirror references remain in active docs.

## Open / next
- **JB note:** lecture source is now `projectapps/masterclass_fin/src/deliverables/10_lezing/`;
  publishes to root `lezing.html` only (no `src/` mirror). Run logs/HANDOFF keep old paths (history).
- `CW`: refine model defaults in `…/22_casepage/appdeliverables/data.js`. `DS`: shared tokens.
