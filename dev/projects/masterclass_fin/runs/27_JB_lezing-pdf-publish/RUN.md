# RUN 27 — Publish + verify PDF-export lezing

- **Track:** JB  (lezing)
- **Lock:** no
- **Date:** 2026-06-04
- **Commit:** `260604-JB27-lezing-pdf-publish` *(fill in after committing)*
- **Status:** done

## Goal

Afmaken wat run 26 openliet: het lezing-PDF-export werk publiceren (Node was
niet beschikbaar in die sessie) en in de browser verifiëren.

## Scope

- In scope: `publish.mjs` draaien → `src/output/lezing.html` + `docs/lezing.html`;
  browser-verificatie van de PDF-knop en print-flow; backlog-item afvinken.
- Out of scope: verdere functionaliteitswijzigingen; PPTX-export.

## Context read

- RUN 26 log (source-edits al gedaan, publish pending).
- `CLAUDE.md` §2 (publish-flow lezing).

## What changed

- `projectapps/masterclass_fin/src/output/lezing.html` + `docs/lezing.html` —
  gepubliceerd via `publish.mjs`; build bumped naar **13**. Bevat de PDF-export
  wijzigingen uit run 26 (print-CSS, `⤓ PDF`-knop, `P`-toets).

## Decisions

Geen nieuwe beslissingen; zie RUN 26.

## Website published?

**Ja.** `node projectapps/masterclass_fin/src/deliverables/10_lezing/publish.mjs`
→ `src/output/lezing.html` (272 413 bytes, build 13) + `docs/lezing.html`.

## Verification

Playwright headless (chromium, `file://`):

- `#btnPdf` visible: true, positie top-right (x 1202 / 1280).
- Hint-balk toont `P pdf`.
- Print-emulatie: 24 slides `display:flex`, `position:relative`; `pdfbtn` en
  `homebtn` `display:none` — nav en knop verborgen in print.
- Huisstijl/kleuren aanwezig in print-screenshot.

**Niet geverifieerd:** daadwerkelijk browservenster openen + printdialoog (vereist
desktop; headless bevestigt de CSS-kant).

**Kanttekening:** de login-gate is niet verborgen in print. Wie vóór het ontgrendelen
print, ziet de gate als eerste "pagina". Niet door deze run geïntroduceerd.

## Open / next

- Backlog: "Pdf export functionality for the lecture" afgevinkt (zie backlog.md).
- Resterende backlog-items: PPTX-export van de lezing; presenter notes optioneel
  in de PDF; overige items ongewijzigd.
