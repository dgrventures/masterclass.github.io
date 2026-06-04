# RUN 07 — Run/commit convention: per-track tags + shared counter

- **Workstream tag:** CW  (CW = casus-website & infra · JB = lezing)
- **Date:** 2026-06-04
- **Commit:** `260604-CW07-run-convention`  (matches folder `07_CW_run-convention`)
- **Status:** done

## Goal
Resolve the run/commit numbering collision caused by two parallel "JB" tracks
(case-website + lezing both produced JB04/JB05 and two run-05 folders). Adopt a
scheme that stays unique in principle but tolerates occasional same-number
collisions, with run folder ↔ commit 1:1.

## Decision (from user)
- **Per-track tag + shared global counter.** `NN` is the next integer above the
  highest used by any track; tags distinguish tracks (`CW` casus-website & infra,
  `JB` lezing). Collisions like `07_CW` / `07_JB` are acceptable.
- **One run = one commit**, names aligned: folder `NN_TAG_slug` ↔ commit
  `YYMMDD-TAGNN-slug`.

## Retroactive question — answer
- **Run folders:** safe to rename retroactively (normal forward commit).
- **Commit messages:** changing them = history rewrite + `git push --force`.
  A parallel JB/lezing session is actively pushing, so a force-push now would
  diverge/clobber its clone. Decision: **do not rewrite pushed commits now**;
  accept the two historical collisions (JB04×2, JB05×2); offer a coordinated
  one-time cleanup later when no other session is live. Legacy tagless folders
  `00`–`05` left as-is; convention applies from `07` onward.

## What changed
- `CLAUDE.md` §4 — new run & commit convention (shared counter, tag registry,
  1:1 run↔commit, parallel-session guidance).
- `dev/runs/README.md` — folder naming `NN_TAG_slug`, shared-counter rule, legacy note.
- `dev/runs/_template/RUN.md` — commit/folder format + tag hint.
- This run folder is the first under the new scheme (`07_CW_*`).

No deliverables or site files touched (docs only).

## Website published?
n/a — documentation only.

## Verification
- Convention is internally consistent across CLAUDE.md §4, runs/README, template.
- Counter: highest prior `NN` = 06 (JB06-lezing-build-marker) → next free = 07.

## Open / next
- Optional coordinated history-rewrite to make past commit messages unique
  (only when the lezing session is paused).
- Remaining handoff items: §5.1 PPTX export, §5.3 facilitator argument cards.
