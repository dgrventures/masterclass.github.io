# Backlog

Open work, roughly prioritised. `MA`-owned; any track can pull an item into a run.
Done items move to the relevant run log (`dev/runs/`), not here.

## Now / next
- [ ] **Casus refactor → split + assemble** (`MA`, **locked**). Carve the monolithic
      casus app into `src/{shell.html,style.css,data.js,app.js}` + `assemble.mjs`;
      extract shared tokens to `dev/shared/style/`; verify assembled output is
      identical; publish. Design: [`architecture.md`](architecture.md).
- [ ] **Refine financial-model defaults** (`CW`). Reconcile share count (~179 mln),
      multiple (~8×), realisatie (85%), fundamentele opslag (€4) against `04_mkba`.
- [ ] **PPTX export of the lecture** (`JB`, handoff §5.1): `02_lezing.html` → `.pptx`,
      keeping green title slide, house style, presenter notes.

## Soon
- [ ] **Facilitator argument cards** (`CW`/`JB`, handoff §5.3): counter-arguments per group.
- [ ] **Share/export scenario** on the analyst page (`CW`): copy current assumptions +
      outcome to clipboard for the facilitator.
- [ ] **Adopt shared style tokens in the lezing** (`DS`/`JB`) once `dev/shared/style/` exists.
- [ ] **Migrate `JB` to a branch/worktree** (currently commits to `main`).

## Later / optional
- [ ] Coordinated history cleanup to make past commit messages unique (only when no
      other session is live; `MA`, locked). Two known collisions: JB04×2, JB05×2.
- [ ] Retag legacy run folders `01`–`05` with track tags for tidiness (safe forward commit).
- [ ] Verify the case-website login on the live deployment end-to-end (handoff §5.4) — code path fixed in run JB02.
- [ ] Cross-check deck facts vs `Validatie_getallen_presentatie.xlsx` (handoff §5.5).

## Decisions log (lightweight)
- 2026-06-04 — Per-track tag + shared global counter; 1:1 run↔commit (run `CW07`).
- 2026-06-04 — Hybrid isolation; lock = per-run attribute; `MA` default; full casus
      split + local assemble; shared style folder (run `MA08`).
