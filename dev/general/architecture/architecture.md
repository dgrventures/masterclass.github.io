# Architecture

How the repo is structured and where it's heading. `MA`-owned; planning is
independent of execution. See also [`backlog.md`](../../project/plan/backlog/backlog.md)
and [`tracks/README.md`](../../project/tracks/README.md).

---

## Current state

- **GitHub Pages site** served from repo root at
  <https://dgrventures.github.io/masterclass.github.io/>. No build on Pages.
- **Deployed artefacts (root):**
  - `index.html` — the **casus app** (landing → casus rolkeuze → role pages →
    facilitator → analist). One self-contained file (~3,500 lines: CSS + content +
    model + logic). Mirrored to `src/index.html`.
  - `lezing.html` — the **lecture** deck. Mirrored to `src/lezing.html`.
- **Canonical sources (edit here):**
  - casus → **split parts** in `dev/project/deliverables/22_casepage/src/`
    (`shell.html`, `style.css`, `data.js`, `app.js`, `assemble.mjs`) + shared
    `dev/shared/style/tokens.css`. **Done** — run `MA09`.
  - lezing → `dev/project/deliverables/10_lezing/02_lezing.html` (still monolithic).
  - Publish: casus → `node …/src/assemble.mjs`; lezing → `cp`
    (see [`/CLAUDE.md`](../../../CLAUDE.md) §2).

The casus split below is **implemented**; this section documents the realised design.

---

## Target state — split casus app + assemble

Make style, data/model, and logic separately editable, while what *ships* stays a
single self-contained `index.html` (so it runs from GitHub Pages **and** from a
double-clicked file, and integrates to one page trivially).

### Source layout (editing form — parallel-friendly)

```
dev/project/deliverables/22_casepage/src/
  shell.html     # <head>, <link rel="stylesheet" href="style.css">, view <section>s,
                 #   <script src="data.js"></script><script src="app.js"></script>
  style.css      # all casus CSS (was the <style> block); may @import shared tokens
  data.js        # CONTENT + MODEL: ROLES, ROLE_ORDER, SITUATIE, SPIEKKAART, TOETS,
                 #   IMPACT_MODEL, FINMODEL, SOURCES, PHASES, SEATS, default numbers
  app.js         # LOGIC: show/router, renderRole, buildAnalist, compute*, facilitator,
                 #   vote, QR, actions
dev/shared/style/   # DS track: tokens.css (brand colours/type), fonts — shared by casus (+ later lezing)
```

Ownership then splits cleanly: `DS` → `style.css` + `dev/shared/style`; `CW` →
`data.js` (+ `shell.html`) and `app.js`. The user tunes model numbers in `data.js`
without touching logic or style.

### The assemble step (what it is, concretely)

`assemble.mjs` is plain string-substitution — **no bundler, no npm, no GitHub
Action**. Run locally, like today's `cp` publish:

1. Read `shell.html`.
2. Replace `<link rel="stylesheet" href="style.css">` with `<style>`+file contents+`</style>`
   (inlining any `@import`ed shared tokens too).
3. Replace each `<script src="…"></script>` with `<script>`+file contents+`</script>`.
4. Write the single self-contained `index.html` → repo root **and** `src/index.html`.

Properties this guarantees:
- **(i) GitHub Pages:** serves the one assembled `index.html`. ✓
- **(ii) Download + double-click:** the assembled file is self-contained (no `fetch`,
  no ES-module `import` — both blocked on `file://`); plain inlined CSS/JS just work. ✓
  (The dev `src/` folder also runs from `file://` via classic `<link>`/`<script src>`.)
- **(iii) Single-page integration:** the assembled file *is* the single page. ✓

Canonical-source rule changes for the casus app: **the `src/` parts are canonical**;
`index.html`/`src/index.html` are generated. Never hand-edit the generated files.

### Migration plan (one locked `MA` run)

The refactor touches the whole casus app and changes the canonical rule → run it as a
**locked** `MA` run (`dev/LOCK`) so no other track edits the casepage meanwhile.
Steps: carve `<style>`→`style.css`, the data consts→`data.js`, the logic→`app.js`,
write `shell.html` + `assemble.mjs`; assemble; **verify the assembled `index.html` is
byte-/behaviour-identical to the current one** (jsdom nav + model tests, like prior
runs); publish. Lezing can adopt the same shared tokens later (`DS`).

---

## Conventions index
- Runs / commits / tags / locks → [`/CLAUDE.md`](../../../CLAUDE.md) §4 + [`../runs/README.md`](../../runs/README.md).
- Tracks & owned paths → [`tracks/README.md`](../../project/tracks/README.md).
- Reusable method → [`../workflow.md`](../workflow.md) · [`../design.md`](../design.md).
- Deploy / publish → [`/CLAUDE.md`](../../../CLAUDE.md) §2.
