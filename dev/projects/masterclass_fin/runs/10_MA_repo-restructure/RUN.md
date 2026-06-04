# RUN 10 — Repo restructure (plan / general / tracks / specs)

- **Track:** MA  (master/infra)
- **Lock:** yes  (created `dev/LOCK` at start, removed at finish — repo-wide moves)
- **Date:** 2026-06-04
- **Commit:** `260604-MA10-repo-restructure`  (matches folder `10_MA_repo-restructure`)
- **Status:** done

## Goal
Reorganise the repo per request: a project `plan/` (brief + context + backlog), move
`tracks/` under `project/`, a top-level `specs/`, and a `dev/general/` for reusable
assets (skills, workflow/design descriptions, architecture).

## What changed (git mv — no content lost)
- **-1 plan:** `dev/project/plan/` now holds `brief/` (moved from `dev/project/brief/`),
  `context/` (from `dev/project/context/`), and `backlog/backlog.md` (from `dev/planning/`).
- **-2 tracks:** `dev/tracks/` → `dev/project/tracks/`.
- **-3 specs:** new top-level `specs/.gitkeep`.
- **-4 general:** new `dev/general/` with `skills/` (moved from `dev/skills/`),
  `architecture/architecture.md` (moved from `dev/planning/`), and **new reusable**
  `workflow.md`, `design.md`, `README.md` (project-agnostic distillations). `dev/planning/`
  dissolved (empty).
- **References updated** so all internal links resolve: `CLAUDE.md` (§1 brief, §2 layout
  tree, §3 skill, §4 tracks/planning pointers), `dev/runs/README.md`, run template,
  `dev/general/architecture/architecture.md`, `dev/project/tracks/README.md`.

Untouched: the app (`22_casepage/src/`, `dev/shared/style/`), `10_lezing/`, deployed
`index.html`/`lezing.html`. Historical run logs + HANDOFF keep their original paths
(records of past state). The parallel session's untracked `versions/` left alone.

## Resulting shape
```
specs/.gitkeep
dev/general/{README,workflow,design}.md · skills/ · architecture/architecture.md
dev/shared/style/tokens.css
dev/project/plan/{brief,context,backlog}/ · tracks/README.md · deliverables/…
dev/runs/…
```

## Website published?
n/a — structure/docs only. Verified `assemble.mjs` still reproduces an identical
`index.html` (app unaffected by the move).

## Verification
- All moved/cross-doc links resolve to real files (checked each target exists).
- No stale `dev/skills|tracks/|planning|project/brief|project/context` refs in active
  docs (run logs/HANDOFF excluded as historical).
- `node assemble.mjs` → `index.html` byte-unchanged (git diff empty).
- Commit staged my paths only; `versions/` excluded.

## Open / next
- `CW`: refine FINMODEL/IMPACT_MODEL defaults in `22_casepage/src/data.js`.
- `DS`: lezing adopts `dev/shared/style/tokens.css`.
- `JB`: PPTX export. (See `dev/project/plan/backlog/backlog.md`.)
- Optional: generalise `architecture.md` further (split project-specifics out of `general/`).
