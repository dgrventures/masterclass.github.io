# RUN 08 — Track model: tags, isolation, locks, planning

- **Track:** MA  (master/infra/planning)
- **Lock:** no  (additive docs/folders only; no overlap with live tracks)
- **Date:** 2026-06-04
- **Commit:** `260604-MA08-track-model`  (matches folder `08_MA_track-model`)
- **Status:** done

## Goal
Turn the naming convention into a real parallel-work model: tracks (with owned
paths), lock-as-run-attribute, MA as default/integrator, hybrid git isolation, a
planning home, and the design for splitting the casus app.

## Decisions (from user, this session)
- **MA and LOCK are orthogonal.** Track = identity + scope; lock = per-run flag for
  exclusive repo access. Any track may lock; MA usually won't (design/planning).
- **Tracks registry** in `dev/tracks/` defining owned, non-overlapping paths.
- **One session = one track per run**, MA default for cross-cutting work; this work is MA.
- **Hybrid isolation:** code tracks (CW/JB/DS) on branches/worktrees → merge to main;
  MA small docs/planning on main; LOCK for whole-repo ops.
- **Casus refactor: full split + local assemble**, with hard constraints — must run
  from (i) GitHub Pages, (ii) a downloaded folder by double-clicking index, (iii)
  integrate to single page. Plus a shared style folder.

## Key technical resolution (constraint ii)
`fetch()` and ES-module `import` are blocked on `file://`; plain `<link>` and
`<script src>` are not. So: edit split parts (dev), and **assemble** (string-inline)
to one self-contained `index.html` that ships. That single file works on Pages, on
double-click, and *is* the single-page integration. Assemble = local string
substitution, no bundler/npm/Action. Full spec in `dev/planning/architecture.md`.

## What changed (docs/folders only)
- `dev/tracks/README.md` — track registry (MA/CW/JB/DS), owned paths, isolation, lock note.
- `dev/planning/architecture.md` — current vs target; the casus split layout +
  assemble spec + migration plan (as a locked MA run).
- `dev/planning/backlog.md` — prioritised open work + lightweight decisions log.
- `CLAUDE.md` §4 — MA/DS tags; new "Tracks, isolation & locks" (one-session-one-track,
  ownership, hybrid isolation, lock protocol via `dev/LOCK`, planning pointer).
- `dev/runs/_template/RUN.md` — added **Track** and **Lock** header fields.

No deliverables or site files touched.

## Website published?
n/a — documentation/structure only.

## Verification
- Convention consistent across CLAUDE.md §4, tracks/README, planning/architecture, template.
- Counter: highest prior NN = 07 → this run = 08 (MA). No path overlap with JB (lezing).

## Open / next
- **Casus refactor** (`MA`, locked) — execute the split + assemble per architecture.md;
  verify assembled `index.html` is identical; publish. Awaiting go-ahead.
- Then: refine financial-model defaults (`CW`); PPTX export (`JB`). See `dev/planning/backlog.md`.
