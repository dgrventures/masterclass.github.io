# RUN 05 — Correct toets authorship + analyst Bronnen tab

- **Workstream tag:** JB
- **Date:** 2026-06-04
- **Commit:** `260604-JB05-authors-sources`
- **Status:** done

## Goal
1. Credit the right authors in the Maatschappelijke toets: **De Adelhart Toorop,
   De Groot Ruiz & Schoenmaker** (was "Schoenmaker & De Groot Ruiz").
2. Add a **Bronnen** tab to the analyst page with sources, linked where available.

## What changed
- `dev/project/deliverables/22_casepage/casus-akzonobel-axalta.html` (canonical):
  - **TOETS** (role-facing maatschappelijke toets): citation corrected to
    "De Adelhart Toorop, De Groot Ruiz & Schoenmaker (ESB, 2017)" and linked to
    the ESB article.
  - **IMPACT_MODEL** (analyst): added a method-credit line pointing to the same
    authors + the Bronnen tab.
  - **SOURCES** (new) + **Bronnen** tab added to `ANALIST_TABS` (5 tabs now):
    grouped, linked sources — dealfeiten, brede waarde & toetsing, impact-frameworks,
    governance & verslaggeving — plus an illustrative-model disclaimer.
  - CSS: external links in `.kv` lists are underlined/weighted.
  - Build 11 → **build 12**.
- Published: case app → `index.html` + `src/index.html`.

## Sources (all verified live, HTTP 200)
- ESB 2017 (de toets-methode): https://esb.nu/maatschappelijke-toetsing-van-overnames-is-nodig/
  — confirms the three authors AND the AkzoNobel–PPG ≈ −€6 mrd figure used in the case.
- Integrale waarde (ESB): https://esb.nu/bedrijven-moeten-sturen-op-integrale-waarde-en-niet-alleen-op-winst/
- AkzoNobel persbericht (18 nov 2025): akzonobel.com/.../akzonobel-and-axalta-to-combine-...
- Axalta IR: ir.axalta.com/news/press-releases/detail/671/...
- IWAF — Impact Economy Foundation: https://impacteconomyfoundation.org/impactweightedaccountsframework/
- True Price: https://www.trueprice.org/methodology/
- IFVI: https://ifvi.org/
- Nederlandse Corporate Governance Code 2022 (MCCG): https://www.mccg.nl/documenten/2022/12/20/corporate-governance-code-2022
- CSRD/ESRS — EFRAG: https://www.efrag.org/
- Internal (no link): 04_mkba_akzo_axalta.xlsx, Validatie_getallen_presentatie.xlsx.

Author order follows the user's instruction; web search lists the published order
as De Groot Ruiz, De Adelhart Toorop & Schoenmaker — flag if the citation order matters.

## Verification
- `node --check`: clean. All 9 external links curl → HTTP 200 (browser UA).
- jsdom: analyst now has 5 tabs incl. Bronnen (renders, 9 links); toets cites all
  three authors, old citation gone, ESB link present; no JS errors.
- All three case-app copies share one md5.

## Open / next
- **Lecture divergence (flag):** `10_lezing/02_lezing.html` is now ~274 KB (edited
  after run 03) but the deployed `lezing.html` is the older small version with the
  "← Start" back-link. Republish the new lecture (and re-add the back link) when ready.
- Possibly mirror the corrected authorship into the project brief / lecture if they
  cite the ESB piece.
- Remaining handoff items: §5.1 PPTX export, §5.3 facilitator argument cards.
