# Architecture (reusable patterns)

Project-agnostic build/deploy patterns. The concrete, project-specific architecture
of *this* repo lives in [`../../project/plan/architecture.md`](../../project/plan/architecture.md).
See also [`../workflow.md`](../workflow.md) and [`../design.md`](../design.md).

---

## No-build static deploy
Default deliverable = one self-contained `.html` served as a static file (e.g. GitHub
Pages). It must also run by double-clicking from a downloaded folder. Constraint:
`fetch()` and ES-module `import` are blocked on `file://`; classic `<link rel=
"stylesheet">` and `<script src>` are not. So the shipped artefact must not depend on
runtime fetch/imports — inline everything.

## Split sources + local assemble
A monolithic HTML file blocks parallel editing. Split into parts and inline them with
a tiny local build step:

```
src/
  appdeliverables/   shell.html · style.css · data.js (content+model) · app.js (logic) · vendor-*.js
  shared/            shared brand tokens (style/tokens.css), @import-ed by style.css
  pages/             assembled output (generated)
  assemble.mjs       string-substitution: <link>→<style>, <script src>→<script>; resolves @import
```

- The **parts are canonical**; the **assembled file is generated** and never hand-edited.
- `assemble.mjs` is pure string replacement — no bundler, no npm, no CI. Run it like a
  copy step. It writes the assembled file to `pages/` (canonical artefact) and to the
  deploy location the host serves (e.g. repo-root `index.html`).
- The dev form runs by opening `appdeliverables/shell.html` from `file://` (classic tags).
- Shared tokens are inlined at assemble time, so the shipped file has no external deps.

## Output versions
Deployable output the user chooses to keep is snapshotted under a top-level
`versions/` folder — see `design.md`. Snapshots are copies of the deployed artefacts,
never edited.

## Where things live (general convention)
- Reusable-across-projects: `dev/general/` (this folder, `workflow.md`, `design.md`, `skills/`).
- Project-specific: `dev/project/` (`plan/` = brief·context·backlog·architecture; `tracks/`;
  `data/` = input·process·projectdeliverables; `deliverables/` = the apps/outputs).
- Per-project glue + paths: the repo-root `CLAUDE.md`.
