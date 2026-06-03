# RUN 05 — Nieuwe lezing publiceren (v02 + terugknop)

- **Workstream tag:** JB
- **Date:** 2026-06-04
- **Commit:** `260604-JB04-lezing-v2` *(fill in after committing)*
- **Status:** done

## Goal
Een nieuwe versie van de lezing (door de gebruiker aangeleverd als
`02_lezing_v02.html`) verwerken, voorzien van een terugknop naar het startscherm,
en publiceren zodat de website de juiste lezing rendert.

## Scope
- In scope: de lezing-deliverable (`10_lezing/02_lezing.html`) en de gepubliceerde
  kopieën `lezing.html` + `src/lezing.html`; toevoegen van de `← Start`-terugknop.
- Out of scope: `casus-akzonobel-axalta.html` en `index.html` (een andere agent
  werkte daar gelijktijdig aan — bewust niet aangeraakt). De `index.html` linkt al
  naar `lezing.html`, dus daar was geen wijziging nodig.

## Context read
- Door gebruiker aangeleverde nieuwe versie: `02_lezing_v02.html` (274 KB, 29 slides,
  3 ingebedde PNG's).
- Bestaande gepubliceerde lezing `lezing.html` (voor de exacte `.homebtn`-stijl en
  het `← Start`-element).
- [`/CLAUDE.md`](../../../CLAUDE.md) §2 (publicatiepatroon).

## What changed
- `dev/project/deliverables/10_lezing/02_lezing.html` — vervangen door de nieuwe v02
  (de oude versie blijft in git-historie). De versie-temp `02_lezing_v02.html` is
  hernoemd/gepromoveerd naar de canonieke naam `02_lezing.html` (geen duplicaat).
- Terugknop toegevoegd, identiek aan de vorige lezing:
  - CSS: `.homebtn { … }` + `.homebtn:hover { … }` (vóór `.navzone`).
  - HTML: `<a class="homebtn" href="index.html" title="Terug naar het startscherm">← Start</a>`
    direct na `<body>`.
- `lezing.html` + `src/lezing.html` — gepubliceerd (kopie van de canonieke lezing).
  Alle drie de bestanden zijn byte-identiek.

Geen cijfers gewijzigd.

## Decisions
- **v02 gepromoveerd tot canon** in plaats van als apart versiebestand te bewaren —
  voorkomt drift tussen twee bijna-identieke bestanden; versiehistorie zit in git.
- **Terugknop hergebruikt** uit de vorige lezing (zelfde CSS-variabelen `--green`,
  `--line`, `--mono` aanwezig in v02) zodat de knop visueel matcht met de rest van
  de site.

## Website published?
Lezing gepubliceerd: canonieke `10_lezing/02_lezing.html` → `lezing.html` +
`src/lezing.html` (alle drie byte-identiek). De casus-website (`index.html`) is
**niet** aangeraakt — een andere agent werkte daaraan en de bestaande tegel linkt
al naar `lezing.html`.

## Verification
- Structuur: 29 `<section class="slide">`, gebalanceerde tags (29/29 sections,
  1× `</body>`, 1× `</html>`), nav-JS intact (`go()`, keydown, navL/navR clicks),
  3 ingebedde PNG's.
- Terugknop aanwezig in alle drie de bestanden (`grep class="homebtn"` → 1 elk).
- Visueel getest: `lezing.html` geopend in browser + headless screenshot
  (1440×900) — titelslide rendert correct met groene gradient, IEF + 2100 logo's,
  titel, en de `← Start`-knop linksboven.
- Niet geverifieerd: navigatie door alle 29 slides handmatig; weergave op
  GitHub Pages na push (nog niet gecommit/gepusht).

## Open / next
- Committen + pushen (op verzoek gebruiker): `260604-JB04-lezing-v2`.
- Optioneel: handmatig door de volledige slide-set klikken om alle 29 slides en de
  spreker-notities te controleren.
