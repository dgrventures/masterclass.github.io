# RUN 16 — Gedeelde build-constante (geen handmatige sync meer)

- **Track:** MA (cross-cutting build/infra — raakt zowel CW als JB)
- **Lock:** yes (build-systeemwijziging; `dev/LOCK` aangemaakt bij start, verwijderd bij afronding)
- **Date:** 2026-06-04
- **Commit:** `260604-MA16-shared-build-constant` *(fill in after committing)*
- **Status:** done

## Goal
Het build-nummer (footer/diag) van casus én lezing uit één bron laten komen, zodat
het niet meer per bestand handmatig gelijkgetrokken hoeft te worden. Volgt op de
open vraag uit [run 15](../15_JB_lezing-build-bump/RUN.md).

## Scope
- In scope: één gedeelde build-constante + injectie in beide publish-stappen
  (casus `assemble.mjs`, nieuwe lezing `publish.mjs`); placeholder in de bronnen;
  CLAUDE.md §2 bijwerken.
- Out of scope: het build-nummer zelf veranderen (blijft 12); inhoud/cijfers van
  casus of lezing; de Pages-configuratie.

## Context read
- [`CLAUDE.md`](../../../../../CLAUDE.md) §2 (publicatieketen) en §4 (lock-regel
  voor build-wijzigingen).
- `…/22_casepage/assemble.mjs` (string-substitutie-patroon) en de build-referenties
  in `shell.html` (2×) + `app.js` (1×); lezing-marker in `02_lezing.html` (1×).

## What changed
- **Nieuw — `projectapps/masterclass_fin/src/build.json`** — single source of truth:
  `{ "build": 12 }`.
- **Nieuw — `projectapps/masterclass_fin/src/build.mjs`** — exporteert `BUILD`,
  `PLACEHOLDER` (`__BUILD__`) en `stampBuild(s)`; leest `build.json`. Beide
  publish-stappen importeren dit (één leespad).
- **Nieuw — `…/10_lezing/publish.mjs`** — lezing-publicatiescript: stempelt het
  build-nummer en schrijft `src/output/lezing.html` + `docs/lezing.html` +
  repo-root `lezing.html` (de lezing-tegenhanger van `assemble.mjs`).
- `…/22_casepage/assemble.mjs` — importeert `stampBuild`; voegt
  `out = stampBuild(out)` toe na het inlinen.
- `…/22_casepage/appdeliverables/shell.html` — `build 12` → `build __BUILD__` (2×).
- `…/22_casepage/appdeliverables/app.js` — `build 12` → `build __BUILD__` (1×, diag).
- `…/10_lezing/02_lezing.html` — `build 12` → `build __BUILD__` (1×, chrome-balk).
- `CLAUDE.md` §2 — lezing-publicatie nu via `publish.mjs`; nieuw kopje over de
  gedeelde build-constante (`build.json` + `__BUILD__`).

Geen cijfers gewijzigd; build blijft 12.

## Decisions
- **Placeholder `__BUILD__` in de bronnen** i.p.v. een hard getal: de bron kan niet
  meer driften, injectie gebeurt bij publish. De dev-vorm (shell.html direct via
  file://) toont het placeholder-label — bewust geaccepteerd, het is duidelijk
  een template.
- **Eén gedeelde `build.mjs`** zodat casus en lezing exact hetzelfde leespad/format
  gebruiken; bumpen = alleen `build.json` aanpassen + beide scripts draaien.
- **MA-track + lock**: dit raakt CW (casus) én JB (lezing) en is een build-wijziging
  → conform CLAUDE.md §4 met `dev/LOCK`.

## Website published?
Beide opnieuw gegenereerd via de scripts. De gepubliceerde bestanden (`docs/`,
repo-root, `src/output/`) zijn **byte-identiek** aan de bestaande build-12-versie
(git markeert ze niet als gewijzigd) — de wijziging zit volledig in het
build-proces, niet in de uitvoer.

## Verification
- `node assemble.mjs` + `node publish.mjs` draaien zonder fouten (Node v25).
- Geen `__BUILD__`-lek in `docs/`, root of `src/output/`; placeholder alleen nog in
  de bronnen + `build.mjs`.
- Propagatietest: `build.json` → 99, beide scripts gedraaid → `build 99` in alle 6
  gepubliceerde bestanden (casus 3 plekken, lezing 1); daarna terug naar 12 en
  opnieuw gedraaid → geen `build 99` meer, alles `build 12`.
- `git status`: gegenereerde uitvoer ongewijzigd t.o.v. HEAD (bit-voor-bit gelijk
  aan de bekende goede build-12-versie).
- Visueel (headless screenshot 1440×900): casus-landing toont footer "… · build 12";
  lezing chrome-balk toont "… · 2100 · build 12".
- Niet geverifieerd: live render op GitHub Pages na push; volledige interactieve
  klikdoorloop van de casus (uitvoer is echter byte-identiek aan de werkende versie).

## Open / next
- Bumpen voortaan: pas `projectapps/masterclass_fin/src/build.json` aan en draai
  **beide** publish-scripts. Eén bron, geen handmatige sync meer.
- Optioneel later: één wrapper-script dat assemble + lezing-publish achter elkaar
  draait, zodat het bumpen één commando is.
