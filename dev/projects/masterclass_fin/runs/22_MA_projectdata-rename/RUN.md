# RUN 22 — `data/` → `projectdata/` hernoemd

- **Track:** MA (cross-cutting structuurwijziging)
- **Lock:** yes (mappenrename + ref-sweep; `dev/LOCK` aangemaakt bij start, verwijderd bij afronding)
- **Date:** 2026-06-04
- **Commit:** `260604-MA22-projectdata-rename` *(fill in after committing)*
- **Status:** done

## Goal
De projectwerkmap `dev/projects/masterclass_fin/data/` hernoemen naar `projectdata/`
(duidelijker, en geen verwarring met de casus-app `data.js`). Backlog-item uit
[run 18](../18_PLAN_backlog-grooming/RUN.md).

## Scope
- In scope: `git mv` van de map + sweep van álle levende verwijzingen; backlog-items
  afvinken (rename + case-split).
- Out of scope: inhoud van de bestanden; historische run-logs en de decisions-log
  (die houden hun oorspronkelijke paden als historisch record).

## Context read
- Ref-survey op de nieuwe base (ná MA21 drop-root): live `data/`-refs in CLAUDE.md,
  beide `architecture.md`, `tracks/README.md`; stale Validatie-pad in CLAUDE.md §5.

## What changed
- **`git mv dev/projects/masterclass_fin/data → …/projectdata`** — hele map met
  historie (`input/`, `process/`, `projectdeliverables/{10_lezing,21_casus}`).
- Refs bijgewerkt:
  - `CLAUDE.md` §2 layout-tree (`data/` → `projectdata/`); §5 Validatie-pad — was
    **fout** (wees naar `src/deliverables/10_lezing/…`, bestaat daar niet) → nu
    `…/projectdata/projectdeliverables/10_lezing/Validatie_getallen_presentatie.xlsx`.
  - `dev/projects/masterclass_fin/plan/architecture.md` (pad + "Project data"-kop).
  - `dev/general/architecture/architecture.md` (generieke patroon: `data/` →
    `projectdata/`, zodat het herbruikbare patroon meeloopt).
  - `dev/projects/masterclass_fin/tracks/README.md` (MA-owned-paden).
- **Backlog opgeschoond** (`plan/backlog/backlog.md`): twee afgeronde items verwijderd
  — de rename (deze run) én de casus-instructie-split (gedaan in MA19; was abusievelijk
  blijven staan). Conform conventie: done-items leven in de run-logs, niet in de backlog.

Geen code-refs: de app gebruikt deze map niet (publish/assemble raken alleen
`src/output` + `docs`).

## Decisions
- **`git mv`** zodat de historie van de bronmaterialen behouden blijft.
- **Generiek patroon meegerenamed** in `dev/general/architecture.md`: toekomstige
  projecten gebruiken nu ook `projectdata/`.
- **Historische logs ongemoeid**: run-logs (`0*`,`1*`) en de decisions-log noemen nog
  `data/`/`project/data/` als weergave van wat toen gebeurde — dat is correct historisch.

## Website published?
n.v.t. — alleen werkmateriaal + docs; niets gepubliceerd.

## Verification
- `git grep` op live `masterclass_fin/data` (excl. historische run-logs/output/versions):
  geen treffers meer. `projectdata`-refs aanwezig in CLAUDE.md, beide architectuurdocs,
  tracks.
- `git status`: alle bestanden als rename (R) gedetecteerd; `data/` weg, `projectdata/` aanwezig.

## Open / next
- (Run 23) HANDOFF archiveren + actueel STATE-overzicht — referenties naar `projectdata`.
