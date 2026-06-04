# RUN 04 — Interactive analyst models (editable, live-recompute)

- **Workstream tag:** JB
- **Date:** 2026-06-04
- **Commit:** `260604-JB04-interactive-models`
- **Status:** done

## Goal
Make the analyst's financial- and impact-model pages fully interactive: all
calculations visible, with editable assumption inputs that recompute live.

## Scope
- In scope: financial value-bridge calculator + impact (broad-value) calculator
  on the Analist page; reset-to-default buttons; live verdicts.
- Out of scope: persistence across reloads (defaults live in code, by design so
  the author can keep tuning); changing the participant role pages.

## What changed
- `dev/project/deliverables/22_casepage/casus-akzonobel-axalta.html` (canonical):
  - **Financial model** (`FINMODEL`) is now a calculator: 10 editable "gele"
    assumption inputs → a visible synergy→€/aandeel calculation → a live
    value-bridge → a verdict vs the €73 cash bid.
  - **Impact model** (`IMPACT_MODEL`, new) replaces the static toets on the
    Analist tab: the 5×3 effect grid is editable, column totals + verdict
    recompute live. Driver notes + disclaimer retained.
  - Rekenlogica: `computeFin()`, `computeImpact()`, `recomputeModels()`,
    `resetFin()`, `resetImpact()`, `nlNum()` (Dutch number format). Wired via one
    `input` listener on the analyst panels; `finreset`/`impactreset` actions.
  - The **static** `TOETS` is unchanged and still used by the RvC & Minister role
    pages — participants get read-only figures, only the analyst gets the editable
    "answer key".
  - CSS for yellow editable cells, the calculator layout, and a light-theme
    `.mverdict` (the existing `.verdict` is dark/facilitator-only).
  - Build 10 → **build 11**.
- Published: case app → `index.html` + `src/index.html` (lecture unchanged).

## Model logic (illustrative, to refine)
Financial synergy chain: synergie/jaar × multiple = bruto $; ÷ wisselkoers = €mrd;
× AkzoNobel-aandeel %; × realisatie %; ÷ aandelen = €/aandeel. Bridge = koers +
opslag + synergie/aandeel + superdividend/aandeel, vs cash. Defaults reproduce the
earlier static bridge (~€81,5 vs €73). Impact = sum of the 5 effects per column;
defaults reproduce the static MKBA totals (−14,5 / −1,3 / +5,1).

## Website published?
Yes — case app → index.html + src/index.html.

## Verification
- `node --check` on the case script: clean.
- jsdom interaction test (no JS errors):
  - Fin defaults: €81,5 > €73 → "Fusie wint +€8,5". Edit realisatie 85→50 &
    opslag 4→0 → €72,7, verdict flips to "Cash wint −€0,3". `finreset` restores.
  - Impact defaults: −14,5 / −1,3 / +5,1, verdict "vernietigt brede waarde". Edit
    consumenten verwacht −1,0→+2,0 → mid total +1,7, verdict flips. `impactreset` restores.
  - RvC role "toets" tab still has 0 input fields (static for participants).
- All three case-app copies share one md5.
- Not done: real-browser visual/keyboard pass on the live URL (check footer reads
  **build 11**); number-input spinner styling across browsers.

## Open / next
- User to refine default assumptions/figures against the real 04_mkba model.
- Optional: persist analyst edits per device (SS helper) + a "share scenario"
  export, if useful during sessions.
- Remaining handoff items: §5.1 PPTX export, §5.3 facilitator argument cards.
