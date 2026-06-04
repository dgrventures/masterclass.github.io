# RUN 03 — Landing page, lecture link & faciliterende analist

- **Workstream tag:** JB
- **Date:** 2026-06-04
- **Commit:** `260604-JB03-landing-analist`
- **Status:** done

## Goal
Turn the site into the home for the whole masterclass: a landing page that
navigates to (1) the introductory lecture and (2) the case, with back-navigation
everywhere. Add a facilitation role **faciliterende analist** with pages for the
financial- and impact-model details of the case.

## Scope
- In scope: landing view + routing; lecture "back to start" link; analyst page
  with financial value-bridge (new) + impact model (existing toets) + situatie +
  spiekkaart; back/home links on all views.
- Out of scope: merging the lecture into the SPA (kept as its own page); a full
  DCF spreadsheet; refining the illustrative financial figures (user will tune).

## Decisions (confirmed with user)
- **Analyst = separate facilitation tile**, not a 7th participant role. Reachable
  from the case (role-picker) screen alongside Facilitator, kept away from the
  landing so participants don't stumble into the "answer key".
- **Financial model built now as an illustrative value-bridge**, clearly labelled
  (same "illustratief / redeneer-aannames" framing as the impact toets); user
  refines the numbers later.
- Architecture: landing is a new `.view` inside the existing case SPA (shares
  brand CSS/fonts, instant nav). The lecture stays a separate file (`lezing.html`)
  — different design system + deck-stage JS — cross-linked both ways.

## What changed
- `dev/project/deliverables/22_casepage/casus-akzonobel-axalta.html` (canonical case app):
  - New `#landing` view (default) with two tiles → lecture (`lezing.html`) and
    case (`#casus`); build marker in footer.
  - Case role-picker (`#login`) demoted from default; added "← Terug naar start"
    and a facilitation row (Facilitator + **Analist**).
  - New `#analistPage` view + `buildAnalist()` with 4 tabs: **Financieel model**
    (new `FINMODEL` value-bridge), **Impact-model** (`TOETS`), Situatie, Spiekkaart.
  - Generalised routing: `go()` handles casus/analist/facilitator/home; new hash
    routes `#casus`, `#analist`, landing as default; `logout()` → role-picker;
    new `home` action (stops timer + → landing). Back/Start buttons on every view.
  - CSS for landing/tiles/facilitation row/back links. Build 9 → **build 10**.
- `dev/project/deliverables/10_lezing/02_lezing.html` (canonical lecture):
  - Fixed "← Start" link (top-left) back to `index.html`; matching `.homebtn` CSS.
- Published: case app → `index.html` + `src/index.html`; lecture → `lezing.html`
  + `src/lezing.html`.

## The financial model (illustrative)
Value-bridge per AkzoNobel share, 3 scenarios: beurskoers ~€52 → + fundamentele
opslag → + aandeel in synergie (≈$600 mln × ~8×, 55% toegerekend, na risico) → +
€2,5 mrd superdividend (≈€14/aandeel @ ~179 mln aandelen) → ~€71 / ~€81 / ~€92,
vs the €73 cash bid. Point made explicit: in the expected case the merger just
beats €73, but it rides on assumptions — the cautious case drops below €73.
Numbers, share count (~179 mln) and multiple (~8×) are flagged as rough anchors
to refine. Partly addresses handoff §5.2 (the never-built RvB-DCF), as a
facilitator aid rather than a per-group deliverable.

## Website published?
Yes — case app → index.html + src/index.html; lecture → lezing.html + src/lezing.html.

## Verification
- `node --check` on both case script blocks and the lecture script: clean.
- jsdom + `getComputedStyle` against published `index.html` (no JS errors):
  landing default → Casus → role/analist/facilitator all show exactly one view;
  "Terug naar start" and "↩ Start" return to landing; "Andere rol" → role-picker;
  analyst has all 4 tabs, financial value-bridge + MKBA table render; deep-link
  `#rol/minister` still routes straight to the role (QR path intact); lecture tile
  href = `lezing.html`.
- All three case-app copies share one md5.
- Not done: real-browser visual pass on the live URL after redeploy (check the
  landing reads **build 10**); the lecture's external link click (verified href
  only, jsdom doesn't navigate).

## Open / next
- User to refine the illustrative financial-model numbers (share count, multiple,
  fundamentele opslag) against the real model / 04_mkba.
- Optionally surface Facilitator/Analist on the landing too (currently case-screen
  only, by design).
- Resume handoff §5.1 (PPTX export) and §5.3 (facilitator argument cards) when ready.
