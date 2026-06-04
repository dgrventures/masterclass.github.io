# RUN 18 — PLAN-track + backlog grooming

- **Track:** PLAN (planning — nieuw, hier geïntroduceerd)
- **Lock:** no (planning is parallel-safe)
- **Date:** 2026-06-04
- **Commit:** `260604-PLAN18-backlog-grooming` *(fill in after committing)*
- **Status:** done

## Goal
Een eigen **PLAN**-track introduceren voor planningswerk (brief, backlog, context),
zodat backlog-grooming niet meer onder de `MA`-vlag valt en niet botst met
infra-werk. Meteen de drie nieuwe backlog-items van de gebruiker vastleggen.

## Scope
- In scope: PLAN-track registreren (`tracks/README.md` + `CLAUDE.md` §4); de drie
  nieuwe backlog-items committen; dit run-log.
- Out of scope: de inhoud van de items uitwerken (dat zijn latere runs); de eerdere
  split-commit `dd65676` (blijft staan als losse correctie).

## Context read
- [`tracks/README.md`](../../tracks/README.md) (registry + owned paths).
- [`CLAUDE.md`](../../../../../CLAUDE.md) §4 (track-lijst, run/commit-conventie).
- Voorgeschiedenis: backlog-edit werd per ongeluk in `MA16` meegenomen, daarna
  afgesplitst naar `dd65676`; daarna voegde de gebruiker drie items toe.

## What changed
- **Nieuw — track `PLAN`.**
  - `dev/projects/masterclass_fin/tracks/README.md` — PLAN-rij toegevoegd (owns
    `…/plan/**`: brief, backlog, context, architecture; isolatie `main`;
    parallel-safe). `…/plan/` uit de `MA`-rij gehaald; notes bijgewerkt.
  - `CLAUDE.md` §4 — PLAN-bullet toegevoegd; "planning" uit de `MA`-omschrijving.
- **Backlog — drie items toegevoegd** in
  `dev/projects/masterclass_fin/plan/backlog/backlog.md` (onder `## Next`):
  - Casus-instructies losmaken van de lezing zodat beide self-contained zijn;
    intro-presentatie op de entry-page + link vanuit alle casus-pagina's.
  - `data`-map hernoemen naar `projectdata`.
  - Consistente data- en model-laag in de projectsetup.
- Dit run-log.

## Decisions
- **Tag `PLAN`** (i.p.v. 2-letterig zoals MA/CW/JB/DS) op verzoek; tag-lengte ligt
  niet vast. Commit-vorm: `260604-PLAN18-backlog-grooming`.
- **PLAN carve-out uit MA**: planning-folder verhuist naar PLAN zodat backlog/brief
  grooming los staat van MA-infra; beide blijven parallel-safe op `main`.
- **Forward-only, geen rewrite**: run 18 hoort ná run 17 in de historie, dus deze
  run is een gewone nieuwe commit (geen force-push). De eerdere split-commit
  `dd65676` blijft ongemoeid als historische correctie.

## Website published?
n.v.t. — alleen planning/governance, geen deliverable of gepubliceerde pagina.

## Verification
- Backlog bevat nu vijf `## Next`-items (2 uit `dd65676` + 3 nieuw).
- `tracks/README.md`: PLAN-rij aanwezig; `…/plan/` niet meer in de MA-rij (geen
  overlappende ownership).
- `CLAUDE.md` §4: PLAN-bullet aanwezig.

## Open / next
- Items uitwerken in eigen runs (eigenaar per item: bv. casus/lezing-splitsing raakt
  `CW`+`JB`, `data`→`projectdata` is `MA`, data/model-laag waarschijnlijk `MA`/`CW`).
- Overweeg of de eerdere `dd65676` (MA-tag, geen run) retroactief PLAN moet worden —
  voorlopig gelaten om extra history-rewrite te vermijden.
