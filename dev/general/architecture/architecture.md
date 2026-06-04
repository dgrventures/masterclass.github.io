# Architecture (reusable patterns)

Project-agnostic build/deploy patterns. The concrete, project-specific architecture
of *this* repo lives in [`../../projects/masterclass_fin/plan/architecture.md`](../../projects/masterclass_fin/plan/architecture.md).
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
  deliverables/<app>/
    appdeliverables/   shell.html · style.css · data.js (content+model) · app.js (logic) · vendor-*.js
    shared/            shared brand tokens (style/tokens.css), @import-ed by style.css
    assemble.mjs       string-substitution: <link>→<style>, <script src>→<script>; resolves @import
  output/              assembled deploy bundle (generated): one file per page
```

- The **parts are canonical**; the **assembled bundle is generated** and never hand-edited.
- `assemble.mjs` is pure string replacement — no bundler, no npm, no CI. Run it like a
  copy step. It writes the assembled file to the `output/` bundle (canonical artefact) and
  to the deploy location the host serves (e.g. a `docs/` folder for GitHub Pages).
- The dev form runs by opening `appdeliverables/shell.html` from `file://` (classic tags).
- Shared tokens are inlined at assemble time, so the shipped file has no external deps.

## Output versions
Deployable output the user chooses to keep is snapshotted under the project's
`versions/` folder — see `design.md`. Snapshots are copies of the deployed artefacts,
never edited.

## Where things live (general convention)
Two trees, keyed by project name, plus a shared reusable tree:
- **Reusable across projects:** `dev/general/` (this folder, `workflow.md`, `design.md`, `skills/`).
- **Project working materials:** `dev/projects/<project>/` — `plan/` (brief·context·backlog·architecture),
  `tracks/`, `projectdata/` (input·process·projectdeliverables), `runs/`.
- **Project app / product:** `projectapps/<project>/` — `src/deliverables/` (the apps/outputs),
  `specs/`, `versions/`.
- **Per-project glue + paths:** the repo-root `CLAUDE.md`.
