# Tracks

A **track** is a workstream identity: a tag, the paths it owns, and how it isolates.
Tracks exist so parallel sessions touch **non-overlapping files**. When you start a
run, you work as exactly one track (see [`/CLAUDE.md`](../../../../CLAUDE.md) §4). For the
reusable method, see [`../../../general/workflow.md`](../../../general/workflow.md).

> Track = *who/what scope*. Lock = *a per-run flag* (needs exclusive repo access).
> They're independent: any track may raise a lock; `MA` usually doesn't.

## Registry

| Tag | Track | Owns (edit here) | Isolation | Usually locks? |
|---|---|---|---|---|
| `MA` | Master / manager | `CLAUDE.md`, `dev/projects/masterclass_fin/runs/`, `dev/general/`, `dev/projects/masterclass_fin/tracks/`, `dev/projects/masterclass_fin/data/`, `projectapps/masterclass_fin/{specs,versions}/` (cross-cutting), integration & merges | `main` | No — only for repo-wide ops |
| `PLAN` | Planning | `dev/projects/masterclass_fin/plan/**` (brief, backlog, context, architecture) | `main` | No — parallel-safe |
| `CW` | Casus-website app | `projectapps/masterclass_fin/src/deliverables/22_casepage/**` → assembled to repo-root `index.html` | branch/worktree `cw` | Rarely |
| `JB` | Lezing / lecture | `projectapps/masterclass_fin/src/deliverables/10_lezing/**` → published `lezing.html` (root) | branch/worktree `jb` | Rarely |
| `DS` | Design / style *(planned)* | `projectapps/masterclass_fin/src/deliverables/22_casepage/shared/style/**` (tokens, fonts, shared CSS) | branch/worktree `ds` | Rarely |

Notes:
- `MA` is the **default** when work is cross-cutting or doesn't fit a track (infra,
  governance, integration). Planning content moved to its own `PLAN` track.
- `PLAN` and `MA` are both parallel-safe and commit straight to `main`; `PLAN`
  owns the planning folder so backlog/brief grooming doesn't collide with `MA` infra work.
- `CW`/`JB`/`DS` are code-heavy → prefer a git **branch or worktree**, merge to `main`.
  (`JB` has so far committed straight to `main`; migrate to a branch when convenient.)
- `DS` becomes real once the casepage refactor extracts shared style into
  `…/22_casepage/shared/style/` (see [`architecture.md`](../plan/architecture.md)).
- New track → add a row here, pick a short tag, give it non-overlapping paths.

## Locks

Locking is a **run** property, not a track. See the protocol in
[`/CLAUDE.md`](../../../../CLAUDE.md) §4 ("Tracks, isolation & locks"). In one line: a
locked run creates `dev/LOCK` at start and removes it at finish; other tracks hold
while `dev/LOCK` exists. It is cooperative — it only works if every session checks it.
