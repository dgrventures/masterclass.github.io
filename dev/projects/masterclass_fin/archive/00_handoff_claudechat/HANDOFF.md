# HANDOFF — Masterclass Finance & Impact voor (jonge) commissarissen (2100)

*Handoff voor voortzetting in Claude Code. Bevat: wat het project is, alle bestanden, wat af is, wat nog open staat, en de validatie-/cijferbronnen. Alle inhoud is in het Nederlands; deze handoff-instructies zijn in het Engels.*

> **Snapshot van de oorspronkelijke chat-handoff.** Bestandsnamen, paden en build-nummers
> hieronder weerspiegelen die beginstaat en zijn deels achterhaald (bv. `casus-akzonobel-axalta.html`
> → nu de geassembleerde `index.html`; build 8 → nu 12; de repo is geherstructureerd in runs `MA09`–`MA14`).
> **De actuele staat staat in de runs** (`dev/projects/masterclass_fin/runs/`), niet hier.
> Alleen rechtstreeks gemelde feiten worden bijgewerkt; zie de inline *(update …)*-notities.

---

## 1. What this project is

A 90-minute masterclass for the **2100 programme**: ~20 young professionals (25–35), mostly in sustainability roles, being equipped for supervisory-board (RvC) roles. Core design assumption: the group is **strong on impact, weak on finance** → invest scarce learning time in the **finance basics**, use **impact as the familiar bridge**.

**Format (90 min):**
- Interactive lecture *Finance & Impact voor RvC's 101* — 30 min, slides + 1–2 polls
- Role-play case *AkzoNobel–Axalta: fuseren of niet?* — 45 min, 6 groups
- Reflection + self-assessment — 15 min

**The case (pivot point, summer 2026):** The unsolicited €73/share cash bid from Nippon Paint + Sherwin-Williams is **rejected and off the table**. On the table now is the **merger-of-equals with Axalta**. Central question for all bodies: **merge or not?** Vote simulation is the climax. This mirrors real events (MoE announced 18 Nov 2025; cash bid rejected 1 May).

Didactic frame: Schoenmaker & De Groot Ruiz, *"Maatschappelijke toetsing van overnames is nodig"* (ESB) — broad value = Financial + Social + Ecological (F+S+E). We flip it: the weighing happens **from inside the boardroom** (RvB, RvC, shareholders), with finance explicit.

---

## 2. All files in this package

| File | What it is | Status |
|---|---|---|
| `00_project_brief_masterclass_finance_impact.md` | Master brief + detailed content skeleton mapped to the 6 learning goals. **The source of truth.** | Done (v0.2) |
| `01a_voorbeeld_alliander.md` | The running example used through the lecture: Alliander (regulated grid operator, publishes a real IP&L via Impact Institute, capital-intensive like Akzo). | Done |
| `01b_voorbeeld_tonys.md` | Alternative running example: Tony's Chocolonely (true price, Mission Lock). **Not used** — kept as fallback. | Reserve |
| `02_lezing.html` | The lecture deck — Impact Institute house style, green title slide, presenter notes per slide. *(update MA19: now **24 slides** — self-contained finance, ending on self-assessment. The case briefing was split into a separate intro deck `23_casusintro/intro.html`, surfaced as the "02 · Intro casus" entry tile + a link on every case page.)* | Done; not yet exported to .pptx |
| `03_casus_opzet.md` | Case setup: scenario, 6 groups, flow, vote mechanic. | Done |
| `04_mkba_akzo_axalta.xlsx` | MKBA / broad-value model. Sheets: `Toelichting`, `MKBA 2026 MOE` (yellow cells = assumptions, recalc on edit), `Vergelijking` (2017 PPG vs 2026 MoE). Method: F+S+M, 3% discount, 4yr mid / 8yr extremes, jobs calculator, +autonomy effect. | Done |
| `04_mkba_samenvatting_1A4.md` | 1-page table hand-out of the MKBA for RvC + Minister. | Done |
| `05_draaiboek.md` | Facilitator run-sheet, tightly timed with cues for the 45-min case. | Done |
| `06_algemene_intro.md` | General case intro handed to every group. | Done |
| `07_rolkaarten.md` | Role cards for all 6 groups (mandate, key figures, main question, strongest play). | Done |
| `08_spiekkaart_finance.md` | ½–1 A4 finance mini-glossary hand-out (3 statements, ratios, value & takeover, impact). | Done |
| `Validatie_getallen_presentatie.xlsx` | **Validation workbook** backing every number in the deck. 13 sheets, one per slide with figures (W&V/balans/kasstroom examples + Alliander, kerngetallen, AkzoNobel value, market-vs-fundamental, IP&L). | Done — cross-check source |
| `casus-akzonobel-axalta.html` | Single-file case website: login per role with a code, role page (rolkaart + spiekkaart + intro; RvC & Minister also get the MKBA), facilitator page with a projected timer driven from the run-sheet. No backend, no sync. Currently **build 8**. | Working but see open issue below |

---

## 3. Key locked-in numbers (deal facts, lightly simplified)

- All-stock merger of equals; combined ~$17bn revenue, ~$25bn EV.
- Ownership after closing: AkzoNobel **55%**, Axalta **45%**.
- Exchange ratio: **0.6539** AkzoNobel share per Axalta share.
- **€2.5bn super-dividend** to AkzoNobel shareholders.
- ~**$600m** annual cost synergies (largely within 3 years).
- Domicile stays NL (tax), dual HQ Amsterdam/Philadelphia, one-tier board, eventually **NYSE-only listing** → delisting Euronext Amsterdam.
- Context anchor: cash bid €73 vs share price ~€52 → a large cash premium the board still rejected. (Note: the no-premium MoE design and the premium complaint sit on the *Axalta* side — Artisan/Shapiro disappointed; Cevian supportive.)
- MKBA broad-value band: roughly **−€14.5bn to +€5.2bn**.

It is normally a no-premium MoE — good fuel for the premium-vs-intrinsic-value discussion.

---

## 4. Vote mechanic (the climax)

Shareholder vote: **5 seats, 1 vote each, simple majority (3 of 5) decides** — odd number so there is always an outcome, no facilitator tie-break. VEB votes on behalf of small investors; the 5th seat is an activist investor (Cevian/Elliott type) as the swing vote, marked as swappable. A stalemate ("only on better terms") is also a valid outcome.

---

## 5. What is DONE vs OPEN

**Done:** brief, lecture deck (.html — 24 slides since MA19, + a separate casus-intro deck), all case materials (opzet, draaiboek, rolkaarten, algemene intro, spiekkaart), MKBA model + 1-A4 summary, validation workbook, and a working case website (build 8 at handoff; build 12 now).

**Open / next steps (in priority order, from where we left off):**
1. **PowerPoint export** — `02_lezing.html` still needs to be turned into `03_lezing.pptx` (the brief's stated final lecture deliverable). Use the `pptx` skill; carry over the green title slide, house style, and presenter notes.
2. **RvB-DCF model** — was queued next: a per-share value model, AkzoNobel standalone (pre-merger) vs the combination incl. synergies, rolled down to the AkzoNobel shareholder, so the RvB has a hard number that beats the €73 cash — parallel to how RvC/Minister get the MKBA.
3. **Facilitator argument cards** — counter-arguments per group for the facilitator.
4. **Case website — login bug** — the original bug was that login ran via the URL hash and got blocked in some environments ("nothing happens" on entering e.g. `rvc`). It was reworked to render directly and a visible diagnostic line ("build 8 · interactief ✓" / error / loading) was added at the bottom of the start screen. **Verify the login actually works in the real deployment environment** before relying on it; the logo was removed on request.
5. Optional: cross-check the deck's facts table (slide 27) against `Validatie_getallen_presentatie.xlsx`.

---

## 6. House style / design

Impact Institute brand. There is a user skill `impact-institute-design` (colors, type, fonts, UI kit) — use it for any new visual asset or website work. Deck uses brand green (#2A4D36 → #1E3A28 gradient) with orange (#FF…) accents; serif headings.

---

## 7. Conversation map (where each piece was built)

- **"Finance en impact voor aankomende commissarissen"** — brief, lecture outline, `02_lezing.html`, validation workbook. Running example switched Tony's → Alliander.
- **"Casus Akzo en Exalta"** — `03`, `04` (MKBA xlsx + 1A4), `05`, `06`, `07`, `08`; vote mechanic.
- **"Website voor interactieve casus met rollen en timer"** — `casus-akzonobel-axalta.html` (build 8, login debugging).

---

*Pick up at section 5, step 1 (PPTX export) unless you decide otherwise.*
