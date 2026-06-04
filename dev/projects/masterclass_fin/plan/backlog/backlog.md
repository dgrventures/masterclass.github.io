# Backlog

Open work, roughly prioritised. `MA`-owned; any track can pull an item into a run.
Done items move to the relevant run log (`dev/projects/masterclass_fin/runs/`), not here.

## Now / next

## Next

- [ ] **Add consistent data and model layer to the project setup**
- [ ] **Validate the content of the presentation**
- [ ] **Refine financial-model defaults** (`CW`). Now editable in
  `…/22_casepage/appdeliverables/data.js` (FINMODEL `data-def`s). Reconcile share
  count (~179 mln), multiple (~8×), realisatie (85%), opslag (€4) against `04_mkba`.
- [ ] **PPTX export of the lecture** (`JB`, handoff §5.1): `02_lezing.html` → `.pptx`,
  keeping green title slide, house style, presenter notes.

## Soon

- [ ] **Facilitator argument cards** (`CW`/`JB`, handoff §5.3): counter-arguments per group.
- [ ] **Share/export scenario** on the analyst page (`CW`): copy current assumptions +
  outcome to clipboard for the facilitator.
- [ ] **Adopt shared style tokens in the lezing** (`DS`/`JB`) from `…/22_casepage/shared/style/`.
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
- 2026-06-04 — Restructure: `general/` vs `project/` (run `MA10`); then `project/data/`
  (input·process·projectdeliverables), `src/appdeliverables`+`shared`+`pages`, dropped
  root `src/` mirror, formalised `versions/`, split architecture (run `MA11`).

## Done

- [X] **Pdf export voor de lezing** (`JB`) — *done, runs `JB26`+`JB27`.* Print-CSS
  (`@media print`, `@page 1280×720`), `⤓ PDF`-knop top-right, toets `P`; gepubliceerd
  build 13.
- [X] **Casus refactor → split + assemble** (`MA`, locked) — *done, runs `MA09`+`MA11`.*
  Carved into `src/appdeliverables/{shell.html,style.css,data.js,app.js,vendor}` +
  `src/shared/style/tokens.css` + `src/pages/`; behaviour verified identical.