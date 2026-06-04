# RUN 26 — PDF-export voor de lezing

- **Track:** JB  (lezing)
- **Lock:** no
- **Date:** 2026-06-04
- **Commit:** `260604-JB26-lezing-pdf-export` *(fill in after committing)*
- **Status:** in progress — source done, **publish pending** (geen node op deze machine)

## Goal
Backlog-item "Pdf export functionality for the lecture" oppakken: de
self-contained slide-deck (`02_lezing.html`) als PDF kunnen exporteren, met
behoud van de huisstijl (groene titelslide, kleuren) en één slide per pagina.

## Scope
- In scope: print-stylesheet + PDF-knop/sneltoets in de lezing-deck.
- Out of scope: server-side PDF-rendering, presenter notes in de PDF, de PPTX-export
  (apart backlog-item).

## Context read
- `CLAUDE.md` §2 (publish-flow lezing), `STATE.md`, `backlog.md`.
- `02_lezing.html` — deck-engine: `.slide{position:absolute;inset:0;display:none}`,
  alleen `.active` zichtbaar; nav via klik/pijl/`N`/`F`. `publish.mjs` stempelt
  `__BUILD__` + injecteert de login-gate → `src/output/lezing.html` + `docs/lezing.html`.

## What changed
- `projectapps/masterclass_fin/src/deliverables/10_lezing/02_lezing.html`:
  - **Print-stylesheet** (`@media print`): `@page size:1280px 720px;margin:0`;
    elke `.slide` wordt `position:relative`, 1280×720, `display:flex`, met
    `page-break-after:always` → één liggende pagina per slide. Chrome/nav/voortgang/
    notities/knoppen verborgen. `print-color-adjust:exact` zodat de groene
    gradient-titelslide en kleuren meeprinten. Animatie/transform uit.
  - **PDF-knop** `⤓ PDF` rechtsboven (`.pdfbtn`, gespiegeld aan `.homebtn`) die
    `window.print()` aanroept; verborgen in print.
  - **Sneltoets `P`** → `window.print()` (in `onKey`).
  - Chrome-hint uitgebreid met `P pdf`.

## Decisions
- **Browser-print i.p.v. een PDF-library.** Het bestand moet self-contained blijven
  (werkt op Pages én dubbelgeklikt vanaf file://) en zonder build-deps; `window.print()`
  + print-CSS doet dat zonder extra payload. Gebruiker kiest "Opslaan als PDF" in het
  printvenster (achtergronden/afbeeldingen aanzetten staat default aan via color-adjust).
- **@page in px (1280×720, 16:9)** zodat de paginaverhouding de slides matcht en de
  vh/vw-padding binnen de slide klopt (100vw/100vh == paginamaat).

## Website published?
**Nog niet.** `publish.mjs` (en de hele publish-flow) vereist Node; node/npm/bun/deno
zijn niet beschikbaar op deze machine, dus de bewerkte bron is nog niet doorgezet naar
`src/output/lezing.html` / `docs/lezing.html`. Bron is wel klaar (canonieke edit-plek).
Te draaien zodra node er is:

```bash
node projectapps/masterclass_fin/src/deliverables/10_lezing/publish.mjs
# of, om alle artefacten ineens te publiceren:
node projectapps/masterclass_fin/src/publish-all.mjs
```

## Verification
- Source-edits gecontroleerd (grep): print-block, `.pdfbtn`/`#btnPdf`, `P`-toets,
  click-handler en hint staan correct in `02_lezing.html`.
- **Niet** geverifieerd in een browser (geen runtime hier) en **niet** gepubliceerd —
  open na publish `docs/lezing.html`, druk `P` (of de knop) en controleer in de
  print-preview: 25 liggende pagina's, groene titelslide met kleur, geen chrome/nav.

## Open / next
- Publish draaien (zie boven) zodra node beschikbaar is, daarna in browser verifiëren.
- Backlog: dit item afvinken na publish + verificatie.
- Aparte resterende items: PPTX-export van de lezing; presenter notes optioneel in de PDF.
