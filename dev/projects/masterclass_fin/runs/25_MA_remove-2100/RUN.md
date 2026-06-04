# RUN 25 — "2100" uit footers + uit de casus; © Impact Institute in de footer

- **Track:** MA (cross-cutting tekst-sweep — CW + JB + intro + gate)
- **Lock:** yes (`dev/LOCK` aangemaakt bij start, verwijderd bij afronding)
- **Date:** 2026-06-04
- **Commit:** `260604-MA25-remove-2100` *(fill in after committing)*
- **Status:** done

## Goal
Op verzoek: (1) "2100" overal uit de footer; (2) elke vermelding van "2100" uit de
casus; (3) "© Impact Institute" in de footer overal, naast het paginanummer.
Afgesproken nuance: de **presentaties (lezing + intro) behouden** het 2100-logo +
de "2100 Masterclass"-eyebrow op de **titelslide**; alleen de footer verandert daar.

## Scope
- In scope: footers van lezing/intro/casus + de login-gate; eyebrows in de casus
  (entry + login) en de gate.
- Out of scope: de 2100-logo + titelslide-eyebrow op de decks (bewust behouden).

## Context (belangrijk — parallelle runs)
- Bij aanvang bleek **MA24 (login-gate)** net gecommit (`b7515d7`): een toegangs-overlay
  (`src/gate.mjs`, geïnjecteerd via `injectGate` in alle drie de publish-stappen) en
  build → 13. Mijn run is daarom hernummerd **24 → 25** (24 was vergeven). Mijn
  wijzigingen staan schoon bovenop `b7515d7`.
- De gate toont op élke pagina een "2100 Masterclass"-eyebrow → meegnomen in de sweep.

## What changed
- **Footers — 2100 weg, © Impact Institute erbij:**
  - `10_lezing/02_lezing.html` + `23_casusintro/intro.html` (chrome-balk): center-tekst
    verliest "· 2100"; de counter wordt "NN / NN · © Impact Institute" (naast het paginanr).
  - `22_casepage/appdeliverables/shell.html`: vier footers "Impact Institute × 2100"
    → "© Impact Institute" (landing-foot + rol/facilitator/analist `.foot`).
- **Casus — 2100 overal weg:**
  - `shell.html` eyebrows: "2100 Masterclass" → "Masterclass"; "2100 Masterclass · Casus"
    → "Masterclass · Casus".
  - `src/gate.mjs` eyebrow: "2100 Masterclass" → "Masterclass" (raakt de gate op álle
    artefacten — site-brede overlay, geen titelslide).
- **Decks behouden** het 2100-logo + "2100 Masterclass(/· Casus)"-eyebrow op de titelslide.
- Opnieuw gepubliceerd via `publish-all.mjs` (build 13) → `src/output/*` + `docs/*`.

## Decisions
- **Gate-eyebrow telt als "2100 in de footer/casus"**, niet als titelslide → 2100 verwijderd.
  De titelslide-branding is de enige bewuste uitzondering.
- **© Impact Institute naast het paginanummer**: op de decks in de counter-span; in de
  casus-footers vervangt het de "× 2100"-staart (de footers hadden geen paginanr).
- **Run hernummerd 24 → 25** wegens collisie met de gecommitte MA24-login-gate.

## Website published?
Ja — alle drie de artefacten opnieuw geassembleerd/gepubliceerd naar `src/output/` +
`docs/` (build 13).

## Verification
- `grep` op de served files: `docs/index.html` 0× "2100"; `docs/lezing.html` en
  `docs/intro.html` elk 2× (uitsluitend titelslide: logo + eyebrow). "© Impact Institute":
  4× in de casus (landing + 3 paginafooters), 1× per deck (counter). Geen `__BUILD__`-lek.
- Headless screenshot van de gate: eyebrow toont nu "MASTERCLASS" (geen 2100).
- Footers achter de gate geverifieerd via HTML-grep (gate blokkeert een visuele shot;
  het is een pure tekstvervanging, geen layout-risico).

## Open / next
- Backlog open: pdf-export lezing; consistente data-/model-laag; presentatie-inhoud valideren.
