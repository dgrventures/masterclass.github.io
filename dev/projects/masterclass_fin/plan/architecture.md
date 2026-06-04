# Project architecture — masterclass.github.io

This repo's concrete structure. Reusable patterns are in
[`../../../general/architecture/architecture.md`](../../../general/architecture/architecture.md).

## Deploy
- **Canonical deploy bundle:** `projectapps/masterclass_fin/src/output/` = `index.html`
  (casus) + `lezing.html` (lecture) + `intro.html` (casus-intro).
- **Copied to `docs/` only** — the served folder (Pages → branch `main`, folder `/docs`;
  `docs/.nojekyll` serves raw HTML). **No repo-root copies** (removed in `MA21`). No build on Pages.
- Served at <https://dgrventures.github.io/masterclass.github.io/>.

## Casus app — source & build (CW / DS)
Lives under `projectapps/masterclass_fin/src/deliverables/22_casepage/`:
```
src/
├── deliverables/22_casepage/
│   ├── appdeliverables/   shell.html · style.css · data.js · app.js · vendor-qrcode.js  (canonical, edit here)
│   ├── shared/style/      tokens.css — brand :root tokens, @import-ed by style.css
│   └── assemble.mjs       inlines the parts → ../../output/index.html → docs/
└── output/                CANONICAL deploy bundle (generated): index.html · lezing.html · intro.html
```
- `data.js` = content + the figure **models** (FINMODEL, IMPACT_MODEL + default numbers) — tune here.
- `style.css` (+ `shared/style/tokens.css`) = styling. `app.js` = logic.
- **Publish:** `node projectapps/masterclass_fin/src/deliverables/22_casepage/assemble.mjs`. The
  shipped `index.html` is self-contained (Pages **and** double-click). Dev form =
  open `appdeliverables/shell.html` from `file://`. Generated files are never hand-edited.
- `src/output/index.html` is the canonical artefact; `docs/index.html` is the served copy.

## Lecture (JB)
`…/src/deliverables/10_lezing/02_lezing.html` → `node …/10_lezing/publish.mjs` → `…/src/output/lezing.html` + `docs/lezing.html`.
Its non-app source materials (examples, validation xlsx) live in
`dev/projects/masterclass_fin/projectdata/projectdeliverables/10_lezing/`.

## Project data (`dev/projects/masterclass_fin/projectdata/`)
- `input/` — raw inputs (empty placeholder).
- `process/` — working/intermediate artefacts (empty placeholder).
- `projectdeliverables/` — source materials **not** consumed by the app:
  `21_casus/` (opzet, draaiboek, rolkaarten, MKBA xlsx, spiekkaart, intro) and
  `10_lezing/` (voorbeelden, validatieworkbook).

## Versions
`projectapps/masterclass_fin/versions/version_<YYMMDD>_<label>/output/` — kept snapshots
of the deployed output (`index.html`, `lezing.html`).
See [`versions/README.md`](../../../../projectapps/masterclass_fin/versions/README.md).

## Repo map
```
index.html · lezing.html                          (served at repo root — copies of src/output/)
projectapps/masterclass_fin/  specs/ · versions/ · src/(deliverables/(10_lezing · 22_casepage) · output/)
dev/general/                  reusable: workflow · design · skills · architecture
dev/projects/masterclass_fin/ plan/(brief·context·backlog·architecture) · tracks/ · data/ · runs/
```

## Status
- `MA09` split the casus app into parts + assemble. `MA11` introduced `data/`,
  `appdeliverables/`, moved `shared/` into `src/`, dropped root `src/`. `MA12` split
  `projectapps/` (product) from `dev/projects/` (working). `MA13` added the canonical
  `src/output/` bundle (index.html + lezing.html), copied to root; retired `pages/`.
- Open: refine model defaults (`CW`); lezing adopts shared tokens (`DS`); PPTX (`JB`).
  See [`backlog/backlog.md`](backlog/backlog.md).
