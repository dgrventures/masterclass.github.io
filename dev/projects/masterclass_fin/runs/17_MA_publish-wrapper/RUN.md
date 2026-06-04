# RUN 17 — Eén-commando publish-wrapper

- **Track:** MA (build tooling — raakt casus + lezing publish)
- **Lock:** yes (build-tooling; `dev/LOCK` aangemaakt bij start, verwijderd bij afronding)
- **Date:** 2026-06-04
- **Commit:** `260604-MA17-publish-wrapper` *(fill in after committing)*
- **Status:** done

## Goal
Beide publish-stappen (casus `assemble.mjs` + lezing `publish.mjs`) achter één
commando zetten, zodat een build-bump één handeling is. Volgt op de open vraag uit
[run 16](../16_MA_shared-build-constant/RUN.md).

## Scope
- In scope: een dunne wrapper `src/publish-all.mjs`; CLAUDE.md §2 bijwerken naar het
  ene commando.
- Out of scope: de build-logica zelf (ongewijzigd); het build-nummer (blijft 12);
  inhoud van casus of lezing.

## Context read
- [run 16](../16_MA_shared-build-constant/RUN.md) — gedeelde build-constante en de
  twee publish-scripts.
- `src/build.mjs`, `…/22_casepage/assemble.mjs`, `…/10_lezing/publish.mjs`.

## What changed
- **Nieuw — `projectapps/masterclass_fin/src/publish-all.mjs`** — draait beide
  publish-stappen op volgorde via dynamische import (elke stap heeft top-level
  side-effects en lost zijn eigen paden op, dus cwd-onafhankelijk). Logt het
  build-nummer uit `build.mjs`.
- `CLAUDE.md` §2 — bump-instructie wijst nu naar het ene commando
  `node …/src/publish-all.mjs` i.p.v. "re-run both scripts".

## Decisions
- **Dynamische import i.p.v. child_process**: de bestaande scripts voeren uit bij
  import en bepalen hun eigen locatie met `import.meta.url`, dus importeren is
  voldoende, zonder een node-subproces te spawnen.
- **Wrapper voegt geen logica toe** — de twee scripts blijven los bruikbaar; dit is
  puur gemak. Geen wijziging aan de gegenereerde uitvoer.

## Website published?
Wrapper getest = beide artefacten opnieuw gegenereerd; uitvoer **byte-identiek** aan
build 12 (git markeert geen output-bestanden als gewijzigd).

## Verification
- `node src/publish-all.mjs` draait beide stappen, logt "build 12", schrijft alle 6
  bestanden.
- Geen `__BUILD__`-lek in `docs/`, root of `src/output/`.
- `git status`: alleen het nieuwe script + LOCK; geen gegenereerde output gewijzigd
  (bit-voor-bit gelijk aan HEAD).
- Niet geverifieerd: live Pages-render (uitvoer is ongewijzigd, dus n.v.t.).

## Open / next
- Build bumpen voortaan: pas `src/build.json` aan → `node src/publish-all.mjs`. Klaar.
