# Project state — Masterclass Finance & Impact (2100)

*Current snapshot. Replaces the original Claude-chat handoff (now archived in
[`archive/00_handoff_claudechat/HANDOFF.md`](archive/00_handoff_claudechat/HANDOFF.md)).
This file points to the sources of truth — it does not duplicate them. Keep it short and
current; the runs are the detailed record.*

## What this is

A 90-minute masterclass for the **2100 programme** (~20 young professionals, strong on
impact, weak on finance → finance basics, impact as the bridge). Scope, learning goals,
deal facts and the content skeleton — the **single source of truth** — is the brief:
[`plan/brief/00_project_brief_masterclass_finance_impact.md`](plan/brief/00_project_brief_masterclass_finance_impact.md).
Working method (runs, tracks, locks, deploy) is in [`/CLAUDE.md`](../../../CLAUDE.md).

## Artifacts & status — build 13

| Artifact | Canonical source (edit here) | Served | Status |
|---|---|---|---|
| Casus app | `…/22_casepage/appdeliverables/` (split parts → `assemble.mjs`) | `docs/index.html` | working |
| Lecture | `…/10_lezing/02_lezing.html` | `docs/lezing.html` | **24 slides**, self-contained finance |
| Casus-intro | `…/23_casusintro/intro.html` | `docs/intro.html` | 5-slide briefing deck (split from the lecture, run MA19) |

- **Deploy:** GitHub Pages serves **`docs/`** only (no repo-root copies since MA21).
  Canonical bundle is `…/src/output/`; each publish step writes there then copies to `docs/`.
- **Build number** is shared across all three via [`…/src/build.json`](../../../projectapps/masterclass_fin/src/build.json);
  publish everything with `node projectapps/masterclass_fin/src/publish-all.mjs`.
- Full deploy/publish detail: [`/CLAUDE.md`](../../../CLAUDE.md) §2.

## How work runs

- **Tracks** (who owns which paths): [`tracks/README.md`](tracks/README.md) — `MA`, `PLAN`, `CW`, `JB`, `DS`.
- **Runs** (one focused session = one commit): [`runs/`](runs/) (see [`runs/README.md`](runs/README.md)).
  Most recent: MA28 (source migrated to Azure DevOps), JB27 (PDF-export publish, build 13).
- **Open work:** [`plan/backlog/backlog.md`](plan/backlog/backlog.md).
- **Architecture:** [`plan/architecture.md`](plan/architecture.md) (this project) ·
  [`../../general/architecture/`](../../general/architecture/) (reusable patterns).
- **Project working materials** (not used by the app): [`projectdata/`](projectdata/)
  — `projectdeliverables/` holds the case materials (opzet, draaiboek, rolkaarten, MKBA,
  spiekkaart) and lecture sources (voorbeelden, validation workbook).

## History

The original chat handoff is archived at
[`archive/00_handoff_claudechat/HANDOFF.md`](archive/00_handoff_claudechat/HANDOFF.md)
— a point-in-time snapshot; its paths and build numbers are historical. Current state
lives here and in the runs.
