# Workflow (reusable)

A project-agnostic way of running work with one or more Claude sessions. The
per-project application lives in that project's `CLAUDE.md`; this is the method.

## Runs
A **run** is one focused work session. Each run gets a folder `dev/projects/masterclass_fin/runs/<NN>_<TAG>_<slug>/`
holding a `RUN.md` log (goal, scope, what changed, decisions, verification, open
items). Outputs live in the project's deliverables, not the run folder — the run
folder is the *log*. One run maps 1:1 to one commit.

## Tracks
A **track** is a workstream identity: a tag + the paths it owns + how it isolates.
Tracks exist so parallel sessions touch **non-overlapping** files. Register them in
`dev/projects/masterclass_fin/tracks/README.md`. A typical set:
- `MA` — master/manager: repo-wide, infra, planning, integration. **Default** for
  cross-cutting work.
- one tag per major deliverable/area (owns that area's paths).
- `DS` — design/style: shared style resources.

## Numbering
`NN` is a **shared global counter** across all tracks: the next integer above the
highest any track has used. Unique in principle; a same-number collision between
tracks (`07_CW` and `07_JB`) is tolerated, not an error.

```
run folder   dev/projects/masterclass_fin/runs/<NN>_<TAG>_<slug>/   ↔   commit  YYMMDD-<TAG><NN>-<slug>
```

## Isolation (hybrid)
A naming convention can't stop two sessions clobbering one working tree — git does.
- Code-heavy tracks work on their own **branch/worktree** and merge to `main`.
- `MA` commits small planning/docs/integration straight to `main`.

## Locks
A **lock** is a per-run attribute (`Lock: yes/no` in the RUN.md), **not** a tag — it
is orthogonal to track. A locked run needs exclusive repo access (whole-repo ops:
sweeping refactors, history cleanup, build-step changes). Cooperative protocol:
1. At run start, check `dev/LOCK`. If present and not yours, **hold**.
2. A locked run **creates** `dev/LOCK` (track · run · time · scope) at start and
   **removes** it at finish (commit both).
3. Don't start another track's run while a lock is held.
It only works if every session honours it.

## Publish
Prefer a no-server static deploy. If sources are split for parallel editing, a
**local assemble step** inlines them into the shipped artefact (see `design.md`).
Generated artefacts are never hand-edited.

## History hygiene
Renumbering **run folders** retroactively is safe (a forward commit). Rewriting
**pushed commit messages** needs history rewrite + force-push — only as a
coordinated cleanup when no other session is live.
