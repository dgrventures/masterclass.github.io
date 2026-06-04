# RUN 20 — HANDOFF bijgewerkt na de casus-intro-split

- **Track:** MA (handoff-doc onder `runs/`, MA-owned)
- **Lock:** no
- **Date:** 2026-06-04
- **Commit:** `260604-MA20-handoff-update` *(fill in after committing)*
- **Status:** done

## Goal
De achterhaalde "29 slides / 4 case-intro slides (26–29)"-verwijzingen in
HANDOFF.md gelijktrekken met [run 19](../19_MA_casus-intro-split/RUN.md) (lezing nu
24 slides, briefing in een apart intro-deck).

## Scope
- In scope: de slides/intro-feiten in HANDOFF.md (regel 29 + samenvatting) + een korte
  snapshot-notitie bovenaan.
- Out of scope: HANDOFF integraal verversen. Het is een momentopname van de
  oorspronkelijke chat-handoff; build 8 en oude bestandsnamen blijven staan, gedekt door
  de nieuwe notitie die naar de runs verwijst voor de actuele staat.

## What changed
- `dev/projects/masterclass_fin/runs/00_handoff_claudechat/HANDOFF.md`:
  - Snapshot-notitie onder de titel: doc weerspiegelt de beginstaat; actuele staat staat
    in de runs; alleen rechtstreeks gemelde feiten worden bijgewerkt.
  - Regel `02_lezing.html`: "29 slides … 4 case-intro slides (26–29)" → 24 slides
    (self-contained), met *(update MA19)*-notitie over het aparte `23_casusintro`-deck +
    de entry-tegel/case-pagina-link.
  - "Done"-samenvatting: 24 slides + apart casus-intro-deck; build 8→12 als context.

## Decisions
- **Gericht bijwerken, niet herschrijven**: HANDOFF is een historische momentopname;
  één regel stilletjes corrigeren terwijl de rest achterhaald is, is misleidend. Daarom
  een snapshot-banner + inline *(update …)*-notities i.p.v. een volledige herschrijving.

## Website published?
n.v.t. — alleen documentatie.

## Verification
- `grep "29 slide"` op HANDOFF.md → geen treffers meer.

## Open / next
- Bij de volgende grote doc-opschoning: overweeg HANDOFF te archiveren of te vervangen
  door een actueel "project-state"-overzicht (de runs zijn nu de bron van waarheid).
