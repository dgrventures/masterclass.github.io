# Runs

A **run** is one focused work session. Each run lives in its own numbered folder
here and leaves a log (`RUN.md`) so the next session can pick up cleanly. This is
the same idea as the original Claude-chat handoff, made repeatable.

Runs hold the **log of the work**, not the work itself. The actual outputs live in
[`../project/deliverables/`](../project/deliverables/). A run folder may hold
scratch files, but anything that ships belongs in `deliverables/`.

## Folder naming — one run = one commit

```
dev/runs/<NN>_<TAG>_<slug>/      ↔  commit  YYMMDD-<TAG><NN>-<slug>
```

- `NN` — **shared global counter** across all tracks: the next integer above the
  highest `NN` any track has used. Unique in principle; a same-number collision
  between tracks (e.g. `07_CW` and `07_JB`) is tolerated, not an error.
- `TAG` — workstream tag (`CW` = casus-website & repo/infra, `JB` = lezing). New
  track → new short tag (register it in [`/CLAUDE.md`](../../CLAUDE.md) §4).
- `slug` — short kebab description (`run-convention`, `pptx-export`).

The folder name and its commit share the same `NN`, `TAG`, and `slug`.
Tagless legacy folders (`00_handoff_claudechat`, `01_setupclaudecode` … `05_*`)
predate the tag split — left as-is; the convention applies from `07` onward.

## Starting a run

1. **Read context first:** the [project brief](../project/plan/brief/00_project_brief_masterclass_finance_impact.md)
   and the [handoff](00_handoff_claudechat/HANDOFF.md) (its §5 lists open work). Brief
   lives in [`../project/plan/brief/`](../project/plan/brief/); tracks in
   [`../project/tracks/`](../project/tracks/).
2. Create `dev/runs/<NN>_<TAG>_<slug>/` with the next free global number.
3. Copy the template into it:
   ```bash
   cp dev/runs/_template/RUN.md dev/runs/<NN>_<TAG>_<slug>/RUN.md
   ```
4. Fill in **Goal** and **Scope** before starting.
5. Do the work in `deliverables/`. If the case website changed, run the publish
   step (copy canonical casepage → root `index.html` + `src/index.html`; see
   [`/CLAUDE.md`](../../CLAUDE.md) §2).
6. Complete the rest of `RUN.md`: what changed, decisions, verification, open items.
7. Commit: `YYMMDD-<TAG><NN>-<slug>` (see [`/CLAUDE.md`](../../CLAUDE.md) §4).

## Finishing a run

A run is done when `RUN.md` is filled in, deliverables are updated, the website
(if touched) is published, and — if the user asked — it's committed. Carry any
unfinished items into the **Open / next** section so the following run can grab them.
