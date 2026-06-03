# CLAUDE.md

Guidance for Claude Code working in this repository.

> **Language rule:** *All deliverable content is in Dutch.* Working notes,
> instructions, run logs, and commit messages are in English. When in doubt
> about a participant-facing artifact, write it in Dutch.

---

## 1. What this project is

A **90-minute masterclass** *"Finance & Impact voor (aankomende) commissarissen"*
for the **2100 programme**: ~20 young professionals (25–35) being equipped for
supervisory-board (RvC) roles. Core design assumption: the group is **strong on
impact, weak on finance** → spend scarce time on **finance basics**, use
**impact as the familiar bridge**.

**Format (90 min):**
1. Interactive lecture — *Finance & Impact voor RvC's 101* — 30 min
2. Role-play case — *AkzoNobel–Axalta: fuseren of niet?* — 45 min, 6 groups
3. Reflection + self-assessment — 15 min

The **single source of truth** for scope, learning goals, deal facts, and the
content skeleton is
[`dev/project/brief/00_project_brief_masterclass_finance_impact.md`](dev/project/brief/00_project_brief_masterclass_finance_impact.md).
Read it before doing substantive work. Project state and open work items live in
the handoff: [`dev/runs/00_handoff_claudechat/HANDOFF.md`](dev/runs/00_handoff_claudechat/HANDOFF.md).

---

## 2. Repository layout

```
/                              GitHub Pages root — what masterclass.github.io serves
├── index.html                 DEPLOYED case website (published copy — do not hand-edit)
├── src/index.html             Mirror of the deployed file (published copy)
├── CLAUDE.md                   This file
└── dev/                        All working materials (not served, except via copies)
    ├── about.md
    ├── skills/
    │   └── impact-institute-design.skill   Brand/design kit (zipped Claude skill)
    ├── project/
    │   ├── brief/              Source of truth (project brief)
    │   ├── context/            Supporting reference material
    │   └── deliverables/       The actual outputs ↓
    │       ├── 10_lezing/      Lecture deck (.html, 29 slides) + examples + validation
    │       ├── 21_casus/       Case materials: opzet, draaiboek, rolkaarten, MKBA, spiekkaart
    │       └── 22_casepage/    casus-akzonobel-axalta.html — CANONICAL case website source
    └── runs/                   Numbered work sessions (see §4)
        ├── _template/          Templates for new runs
        ├── 00_handoff_claudechat/
        └── NN_slug/
```

### Deployment & the case website

- This repo is a **GitHub Pages site**. The app runs **directly from GitHub Pages**
  at **<https://dgrventures.github.io/masterclass.github.io/>** — this is why the case
  website is named `index.html` (GitHub Pages serves `index.html` at the directory
  root). Pushing to `main` publishes it. There is no build step.
- **The canonical case-website source is**
  [`dev/project/deliverables/22_casepage/casus-akzonobel-axalta.html`](dev/project/deliverables/22_casepage/casus-akzonobel-axalta.html).
  Edit it there.
- **Publishing** the case website = copy that file to **both** root `index.html`
  **and** `src/index.html`. These three files must stay byte-identical:

  ```bash
  cp dev/project/deliverables/22_casepage/casus-akzonobel-axalta.html index.html
  cp dev/project/deliverables/22_casepage/casus-akzonobel-axalta.html src/index.html
  ```

  Never hand-edit root `index.html` or `src/index.html` directly — your change
  would be lost on the next publish and the canonical source would drift.

---

## 3. Design & house style

Impact Institute brand. A packaged Claude skill lives at
[`dev/skills/impact-institute-design.skill`](dev/skills/impact-institute-design.skill)
(a zip: README, SKILL.md, `colors_and_type.css`, self-hosted fonts, UI-kit
previews). **Use it for any new visual asset, slide, or website work.**

To use it, unzip and read the README + `colors_and_type.css`, then copy the
fonts/CSS you need into the artifact (assets are self-hosted):

```bash
unzip -o dev/skills/impact-institute-design.skill -d /tmp/iid
```

Brand cues already in the deck: green title (#2A4D36 → #1E3A28 gradient),
orange accents, serif headings. Match the existing deck/website when extending
them.

---

## 4. Runs — how we execute work

Work is organised into **runs**: numbered folders under `dev/runs/`. A run is one
focused work session that takes a goal (usually an open item from the handoff),
produces or updates deliverables, and logs what happened.

**To start a run, follow [`dev/runs/README.md`](dev/runs/README.md).** In short:

1. Pick the next number `NN` and create `dev/runs/NN_slug/`.
2. Copy [`dev/runs/_template/RUN.md`](dev/runs/_template/RUN.md) into it and fill
   in the goal.
3. Do the work — edit deliverables under `dev/project/deliverables/`, not in the
   run folder. The run folder holds the **log**, not the output.
4. If the case website changed, run the publish step (§2).
5. Finish the `RUN.md`: what changed, decisions, what's still open.
6. Commit using the convention below.

### Commit convention

```
YYMMDD-<TAG><NN>-<label>
```

- `YYMMDD` — date (e.g. `260604`).
- `<TAG>` — **workstream tag** identifying the track (not a person). Reuse the
  existing tag for a track; pick a short new one for a new track.
- `<NN>` — run number within that workstream, zero-padded (`01`, `02`, …).
- `<label>` — short kebab/word label (e.g. `pilot`, `pptx-export`).

Example: `260604-JB02-pilot`. Branch off `main` only if the user asks; otherwise
commit to `main`. Commit/push only when the user requests it.

---

## 5. Working conventions

- **Dutch for deliverables, English for meta.** (Repeating §0 because it matters.)
- **Numbers must trace to a source.** Deal facts and figures are anchored in the
  brief (§6) and in `dev/project/deliverables/10_lezing/Validatie_getallen_presentatie.xlsx`.
  Don't invent or silently change figures — cross-check, and flag mismatches.
- **The deliverables are real teaching materials.** Favour clarity and pedagogical
  accuracy over cleverness; keep the finance-primary / impact-as-bridge framing.
- **Don't duplicate the brief or handoff** in new docs — link to them.
