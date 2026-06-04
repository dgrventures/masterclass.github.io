# RUN 19 — Casus-briefing losgemaakt van de lezing (eigen intro-deck)

- **Track:** MA (cross-cutting feature — raakt JB, CW én build/infra)
- **Lock:** yes (cross-cutting + nieuwe publish-stap; `dev/LOCK` aangemaakt bij start, verwijderd bij afronding)
- **Date:** 2026-06-04
- **Commit:** `260604-MA19-casus-intro-split` *(fill in after committing)*
- **Status:** done

## Goal
De casus-briefing zat als slides 25–29 vastgeplakt aan het einde van de lezing.
Losmaken zodat (a) de lezing een self-contained finance-talk is en (b) de casus een
eigen **intro-presentatie** heeft. Backlog-item uit [run 18](../18_PLAN_backlog-grooming/RUN.md).
Ontwerpkeuzes van gebruiker: standalone deck · alle 5 slides uit de lezing · derde tegel.

## Scope
- In scope: nieuw intro-deck + publish-stap; lezing inkorten; entry-page 3e tegel;
  intro-link op alle casus-pagina's; build-wiring; CLAUDE.md.
- Out of scope: de inhoud van `data.js` (rolkaarten blijven de canonieke referentie,
  ongewijzigd); font-hosting (`colors_and_type.css` is een bestaande dode link in de
  deck — buiten scope, intro spiegelt de lezing 1-op-1); HANDOFF.md "29 slides" (oud
  snapshot, gelaten).

## What changed
- **Nieuw deck — `…/deliverables/23_casusintro/intro.html`** (+ `publish.mjs`).
  Gemaakt door het lezing-bestand te slicen: head + chrome + deck-engine + titelslide,
  daarna de 4 briefing-slides (oud 26–29). Daarna met de hand:
  - `<title>` → "De casus — AkzoNobel × Axalta".
  - Titelslide herzien: eyebrow "2100 Masterclass · Casus", h1 "De casus: fuseren of
    niet?", lead "AkzoNobel × Axalta …", facilitator-notities aangepast.
  - Kickers herlabeld (geen "F · De casus ·" lezing-codering meer; lokaal genummerd 02–05).
  - Chrome-balk midden → "De casus · AkzoNobel × Axalta · 2100 · build __BUILD__".
  - `← Start` (homebtn) → `index.html`; deck-engine/`__BUILD__` ongewijzigd hergebruikt.
  - `publish.mjs` = spiegel van `10_lezing/publish.mjs` (stempelt build → output/docs/root).
- **Lezing self-contained — `…/10_lezing/02_lezing.html`**: slides 25–29 verwijderd
  (slice tot `<!-- 25 -->` + deck opnieuw gesloten + footer). 29 → **24 slides**;
  `tot` herberekent automatisch (teller toont nu `/ 24`). Eindigt op zelf-assessment.
- **Entry-page 3e tegel — `…/22_casepage/appdeliverables/shell.html` + `style.css`**:
  tegel "02 · Intro casus" (`<a href="intro.html">`) tussen Lezing en Casus; Casus → "03";
  sub-tekst bijgewerkt; `.landing-tiles` 2 → 3 kolommen (mobiel stack-breakpoint 640→820px).
- **Intro-link op casus-pagina's — `shell.html`**: in de topbars van `rolePage`,
  `facPage`, `analistPage` een `<a class="logout" href="intro.html" target="_blank">
  ↗ Casus-intro</a>` (nieuw tabblad → rol-/timerstate blijft behouden). `.logout` kreeg
  `text-decoration:none;display:inline-block` zodat de `<a>`-variant als de knoppen oogt.
- **Build/infra**: `src/publish-all.mjs` draait nu ook de intro-publish. `CLAUDE.md` §2
  bijgewerkt (deploy-bundle + intro-publish + gedeelde build over 3 artefacten; lezing
  is nu self-contained).

Geen cijfers gewijzigd; build blijft 12.

## Decisions
- **Standalone deck dat de lezing-engine hergebruikt** (geen view in de casus-app):
  matcht "presentatie", eigen URL, sluit aan op het build-systeem. Intro spiegelt de
  lezing visueel 1-op-1.
- **Slice i.p.v. handmatig 23 slides knippen**: betrouwbaar en base64-veilig
  (eenmalige wegwerp-node-scripts in /tmp, niet gecommit).
- **Intro-link opent in nieuw tabblad**: de casus-app is een SPA met in-memory rol/timer;
  same-tab navigeren zou die state verliezen.
- **Lezing-roadmap (slide 2) gelaten**: de "→ Casus"-stap is pedagogische routing, geen
  case-instructie.

## Website published?
Ja — `node src/publish-all.mjs` draaide alle drie de stappen. `intro.html` is nieuw in
`src/output/`, `docs/` en repo-root (build 12). Casus opnieuw geassembleerd, lezing
opnieuw gepubliceerd.

## Verification
- `publish-all.mjs`: 3 stappen zonder fouten (Node v25), alle artefacten build 12.
- Geen `__BUILD__`-lek in `docs/`, root of `src/output/`.
- Slide-tellingen: lezing 24, intro 5. Entry-page: tegels 01/02/03. `href="intro.html"`
  komt 4× voor in de geassembleerde casus (1 tegel + 3 topbars).
- Headless screenshots (1440×900): entry-page toont 3 tegels + build 12; intro-titelslide
  rendert, teller `01 / 05`, chrome "… build 12"; `index.html#rol/rvc` topbar toont de
  `↗ Casus-intro`-pill; lezing-titelslide teller `01 / 24`.
- Niet geverifieerd: handmatig door alle intro-slides klikken; live Pages-render.

## Open / next
- HANDOFF.md (regel 29/65) noemt nog "29 slides / 4 case-intro slides 26–29" — verouderd
  na deze split; bijwerken in een latere PLAN/MA-run indantig.
- Optioneel: gedeelde stijl-tokens/fonts echt hosten (`colors_and_type.css` dode link) —
  DS-track.
- Overweeg een korte verwijzing "zie de casus-intro" op de laatste lezing-slide als
  zachte brug (nu bewust weggelaten — gebruiker koos "alle 5 verwijderen").
