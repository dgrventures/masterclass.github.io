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
[`dev/projects/masterclass_fin/plan/brief/00_project_brief_masterclass_finance_impact.md`](dev/projects/masterclass_fin/plan/brief/00_project_brief_masterclass_finance_impact.md).
Read it before doing substantive work. Project state and open work items live in
the handoff: [`dev/projects/masterclass_fin/runs/00_handoff_claudechat/HANDOFF.md`](dev/projects/masterclass_fin/runs/00_handoff_claudechat/HANDOFF.md).

---

## 2. Repository layout

```
/                              repo root
├── docs/                      SERVED copy for GitHub Pages /docs: index.html · lezing.html · .nojekyll
├── index.html                 legacy served copy (until Pages switched to /docs) — generated
├── lezing.html                legacy served copy — generated
├── CLAUDE.md                   This file
├── projectapps/               THE APPS / PRODUCT (per project)
│   └── masterclass_fin/
│       ├── specs/.gitkeep      Specs (placeholder)
│       ├── versions/           Kept output snapshots (see versions/README.md)
│       └── src/
│           ├── deliverables/
│           │   ├── 10_lezing/02_lezing.html   Lecture source (→ output/lezing.html)
│           │   └── 22_casepage/    CANONICAL casus app:
│           │       ├── appdeliverables/   shell.html · style.css · data.js · app.js · vendor-qrcode.js
│           │       ├── shared/style/      tokens.css (brand tokens, inlined)
│           │       └── assemble.mjs       inlines parts → output/index.html + root
│           └── output/            CANONICAL deploy bundle (generated): index.html · lezing.html → copied to root
└── dev/                        WORKING MATERIALS (not served)
    ├── about.md
    ├── general/                REUSABLE across projects (see dev/general/README.md)
    │   ├── workflow.md         Generalized workflow (runs/tracks/locks/isolation/publish)
    │   ├── design.md           Generalized design approach (house style, split+assemble)
    │   ├── skills/             Packaged Claude skills (impact-institute-design.skill)
    │   └── architecture/       Reusable build/deploy patterns
    └── projects/masterclass_fin/   PROJECT-specific
        ├── plan/
        │   ├── brief/          Source of truth (project brief)
        │   ├── context/.gitkeep   Supporting reference material
        │   ├── backlog/backlog.md
        │   └── architecture.md    This project's concrete architecture
        ├── tracks/README.md    Track registry
        ├── data/
        │   ├── input/.gitkeep · process/.gitkeep
        │   └── projectdeliverables/  Source materials NOT used by the app (21_casus, 10_lezing/*.md+xlsx)
        └── runs/               Numbered work sessions (see §4); _template/, NN_TAG_slug/
```

### Deployment & the case website

- This repo is a **GitHub Pages site** at **<https://dgrventures.github.io/masterclass.github.io/>**.
  Pushing to `main` publishes it. No build on Pages. The served copy lives in
  [`docs/`](docs/) (set Pages → "Deploy from branch", `main`/`docs`). Repo-root
  `index.html`/`lezing.html` are **legacy** copies kept in sync until Pages is switched
  to `/docs`; once it is, they can be dropped.
- **The canonical casus-app source is the split parts in**
  [`projectapps/masterclass_fin/src/deliverables/22_casepage/appdeliverables/`](projectapps/masterclass_fin/src/deliverables/22_casepage/appdeliverables/):
  `style.css` (+ shared [`../shared/style/tokens.css`](projectapps/masterclass_fin/src/deliverables/22_casepage/shared/style/)),
  `data.js` (content + figure models/numbers), `app.js` (logic), `shell.html` (links them).
  Edit those. The dev form runs by opening `appdeliverables/shell.html` directly (file://).
- **The canonical deploy bundle is** [`projectapps/masterclass_fin/src/output/`](projectapps/masterclass_fin/src/output/)
  — `index.html` (casus) + `lezing.html` (lecture). It is **copied** to `docs/` (served)
  and repo-root (legacy). Ideally Pages serves the bundle directly one day.
- **Publishing the casus app:** run the assemble step. It inlines the parts into one
  self-contained file written to `src/output/index.html` (canonical) **and** copied to
  `docs/index.html` + repo-root `index.html`:

  ```bash
  node projectapps/masterclass_fin/src/deliverables/22_casepage/assemble.mjs
  ```

  The shipped `index.html` is self-contained (works on Pages **and** double-clicked from a
  folder — no fetch/ES-module import, both blocked on file://). Never hand-edit the
  generated `src/output/*`, `docs/*` or root copies — edit the parts and re-assemble.
- **Publishing the lecture** (JB track): run its publish script. It stamps the
  shared build number into `02_lezing.html` and writes the canonical bundle
  `src/output/lezing.html` plus the served copies `docs/lezing.html` + repo-root
  `lezing.html`:

  ```bash
  node projectapps/masterclass_fin/src/deliverables/10_lezing/publish.mjs
  ```
- **Build number (shared):** the footer/diag build number for *both* the casus and
  the lecture lives in
  [`projectapps/masterclass_fin/src/build.json`](projectapps/masterclass_fin/src/build.json).
  It is injected wherever the literal placeholder `__BUILD__` appears, by
  `assemble.mjs` (casus) and `publish.mjs` (lecture), both via the shared
  [`src/build.mjs`](projectapps/masterclass_fin/src/build.mjs). To bump it, edit
  **only** `build.json`, then re-publish both artifacts in one command:

  ```bash
  node projectapps/masterclass_fin/src/publish-all.mjs
  ```

  (the wrapper just runs `assemble.mjs` + the lecture `publish.mjs`). Never
  hand-edit `__BUILD__` in the sources or a number in the generated files.
- **Versions:** to keep a deployed state, copy the served files into
  `projectapps/masterclass_fin/versions/version_<YYMMDD>_<label>/output/`
  (see [`versions/README.md`](projectapps/masterclass_fin/versions/README.md)).

---

## 3. Design & house style

Impact Institute brand. A packaged Claude skill lives at
[`dev/general/skills/impact-institute-design.skill`](dev/general/skills/impact-institute-design.skill)
(a zip: README, SKILL.md, `colors_and_type.css`, self-hosted fonts, UI-kit
previews). **Use it for any new visual asset, slide, or website work.**

To use it, unzip and read the README + `colors_and_type.css`, then copy the
fonts/CSS you need into the artifact (assets are self-hosted):

```bash
unzip -o dev/general/skills/impact-institute-design.skill -d /tmp/iid
```

Brand cues already in the deck: green title (#2A4D36 → #1E3A28 gradient),
orange accents, serif headings. Match the existing deck/website when extending
them.

---

## 4. Runs — how we execute work

Work is organised into **runs**: numbered folders under `dev/projects/masterclass_fin/runs/`. A run is one
focused work session that takes a goal (usually an open item from the handoff),
produces or updates deliverables, and logs what happened.

**To start a run, follow [`dev/projects/masterclass_fin/runs/README.md`](dev/projects/masterclass_fin/runs/README.md).** In short:

1. Pick the next free **global** number `NN` (see counter rule below) and create
   `dev/projects/masterclass_fin/runs/NN_TAG_slug/`.
2. Copy [`dev/projects/masterclass_fin/runs/_template/RUN.md`](dev/projects/masterclass_fin/runs/_template/RUN.md) into it and fill
   in the goal.
3. Do the work — edit deliverables under `projectapps/masterclass_fin/src/deliverables/`, not in the
   run folder. The run folder holds the **log**, not the output.
4. If the case website changed, run the publish step (§2).
5. Finish the `RUN.md`: what changed, decisions, what's still open.
6. Commit using the convention below.

### Run & commit convention — one run = one commit

The run folder name and the commit message carry the **same** `NN`, `TAG`, and
`slug`, so each run maps 1:1 to its commit:

```
run folder:   dev/projects/masterclass_fin/runs/<NN>_<TAG>_<slug>/
commit:       YYMMDD-<TAG><NN>-<slug>
```

- `YYMMDD` — date (e.g. `260604`).
- `<TAG>` — **track** (a workstream, not a person). Registry + owned paths:
  [`dev/projects/masterclass_fin/tracks/README.md`](dev/projects/masterclass_fin/tracks/README.md). In brief:
  - `MA` — master/manager: repo-wide, infra, planning, integration. **Default** for
    cross-cutting work (this convention update is `MA`).
  - `CW` — casus-website app (`22_casepage` + published `index.html`/`src`).
  - `JB` — lezing / lecture (`10_lezing` + `lezing.html`/`src`).
  - `DS` — design/style: shared style resources (`…/22_casepage/shared/style/`). *(planned)*
  - New track → register it in `dev/projects/masterclass_fin/tracks/README.md`.
- `<NN>` — **shared global counter** across all tracks: the next integer above the
  highest `NN` used by *any* track. Numbers are unique in principle; when two
  tracks run at once a collision (e.g. `07_CW` and `07_JB`) is tolerated, not an error.
- `<slug>` — short kebab label (e.g. `pptx-export`, `run-convention`).

Example: run `07_CW_run-convention/` ↔ commit `260604-CW07-run-convention`.
Branch off `main` only if asked; otherwise commit to `main`. Commit/push only when
the user requests it.

### Tracks, isolation & locks

- **One session = one track per run.** A Claude window drives one track; `MA` is the
  default for cross-cutting work. Declare the track in the RUN.md header.
- **Tracks own non-overlapping paths** (see [`dev/projects/masterclass_fin/tracks/README.md`](dev/projects/masterclass_fin/tracks/README.md))
  so parallel work doesn't collide. That ownership matters more than the tag.
- **Isolation (hybrid).** Code-heavy tracks (`CW`, `JB`, `DS`) work on their own git
  branch/worktree and merge to `main`; `MA` commits small planning/docs/integration
  straight to `main`. A convention alone can't stop two sessions clobbering one
  working tree — branches/worktrees are the real fix.
- **Lock = a per-run attribute** (`Lock: yes/no` in the RUN.md), **not** a tag. A
  locked run needs exclusive repo access — whole-repo operations that can't be
  branched cleanly (sweeping refactor, history cleanup, the assemble/build change).
  Protocol (cooperative — only works if every session honours it):
  1. At run start, check [`dev/LOCK`](dev/LOCK). If present and not yours, **hold**.
  2. A locked run **creates** `dev/LOCK` (track · run · time · scope) at start and
     **removes** it at finish (commit both).
  3. Don't start another track's run while a lock is held.
- **Planning** is `MA`-owned and parallel-safe: brief, context & backlog in
  [`dev/projects/masterclass_fin/plan/`](dev/projects/masterclass_fin/plan/); architecture in
  [`dev/general/architecture/`](dev/general/architecture/); the reusable method in
  [`dev/general/workflow.md`](dev/general/workflow.md).

### Parallel sessions — history hygiene

Renumbering **run folders** retroactively is safe (a normal forward commit).
Rewriting **pushed commit messages** requires history rewrite + `git push --force`
— do this only as a deliberate, coordinated cleanup when no other session is active;
never force-push while another track is live.

---

## 5. Working conventions

- **Dutch for deliverables, English for meta.** (Repeating §0 because it matters.)
- **Numbers must trace to a source.** Deal facts and figures are anchored in the
  brief (§6) and in `projectapps/masterclass_fin/src/deliverables/10_lezing/Validatie_getallen_presentatie.xlsx`.
  Don't invent or silently change figures — cross-check, and flag mismatches.
- **The deliverables are real teaching materials.** Favour clarity and pedagogical
  accuracy over cleverness; keep the finance-primary / impact-as-bridge framing.
- **Don't duplicate the brief or handoff** in new docs — link to them.
