# RUN 15 — Lezing build-marker naar build 12

- **Track:** JB (lezing)
- **Lock:** no
- **Date:** 2026-06-04
- **Commit:** `260604-JB15-lezing-build-bump` *(fill in after committing)*
- **Status:** done

## Goal
De build-marker van de lezing gelijktrekken met de casus. De casus staat
inmiddels op `build 12`; de lezing stond nog op `build 11`. Lezing bumpen naar
`build 12` zodat beide artefacten consistent geversioneerd zijn.

## Scope
- In scope: alleen de lezing-bestanden (JB-track) — de canonieke bron
  `…/10_lezing/02_lezing.html` en de gepubliceerde kopieën.
- Out of scope: de casus-app / `index.html` (CW-track, al op build 12) en de
  bewaarde snapshot in `versions/version_260603_run05/` (historisch, niet aanraken).

## Context read
- [`CLAUDE.md`](../../../../../CLAUDE.md) §2 — nieuwe mappenstructuur en de
  publicatieketen voor de lezing (bron → `src/output` → `docs/` + repo-root).
- Build-nummer-inventarisatie: casus = `build 12` (in `app.js`, `shell.html`,
  geassembleerde `output/index.html` + `docs/index.html` + root), lezing = `build 11`.

## What changed
- `projectapps/masterclass_fin/src/deliverables/10_lezing/02_lezing.html` (regel 604)
  — `build 11` → `build 12` in de chrome-balk-span (`<span class="bld">`).
- Gepubliceerd via de keten:
  - `projectapps/masterclass_fin/src/output/lezing.html`
  - `docs/lezing.html`
  - `lezing.html` (legacy root-kopie)

  Alle vier byte-identiek. Geen inhoud/cijfers gewijzigd, alleen het buildnummer.

## Decisions
- Lezing op **12** gezet (niet hoger) om exact gelijk te lopen met de huidige
  casus-build; de twee bestanden worden voortaan in lockstep gebumpt.
- De `versions/`-snapshot bewust op `build 11` gelaten — dat is een bewaarde
  deploy-staat, geen levend artefact.

## Website published?
Lezing: ja — canonieke `…/10_lezing/02_lezing.html` → `src/output/lezing.html`
→ `docs/lezing.html` + repo-root `lezing.html` (alle vier byte-identiek). Casus
niet aangeraakt.

## Verification
- `grep` over alle vier de lezing-bestanden: tonen nu `build 12`; casus-bestanden
  staan eveneens op `build 12` (in sync).
- `diff -q`: bron, `src/output`, `docs/` en root zijn byte-identiek.
- Visueel: `lezing.html` headless-screenshot (1440×900) — chrome-balk onderaan
  toont "Finance & Impact voor RvC's 101 · 2100 · build 12".
- Niet geverifieerd: live render op GitHub Pages na push.

## Open / next
- Lezing- en casus-buildnummer blijven losse hand-edits per bestand; bump ze
  voortaan samen bij elke gezamenlijke deploy.
- Optioneel: een gedeelde build-constante of assemble-stap voor de lezing zodat
  het nummer niet handmatig in sync gehouden hoeft te worden.
