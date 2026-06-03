# Runs

A **run** is one focused work session. Each run lives in its own numbered folder
here and leaves a log (`RUN.md`) so the next session can pick up cleanly. This is
the same idea as the original Claude-chat handoff, made repeatable.

Runs hold the **log of the work**, not the work itself. The actual outputs live in
[`../project/deliverables/`](../project/deliverables/). A run folder may hold
scratch files, but anything that ships belongs in `deliverables/`.

## Folder naming

```
dev/runs/NN_slug/
```

- `NN` — next sequential number, zero-padded (`00`, `01`, `02`, …).
- `slug` — short kebab description (`setupclaudecode`, `pptx-export`).

Existing: `00_handoff_claudechat` (the import from Claude chat),
`01_setupclaudecode` (this Claude Code setup).

## Starting a run

1. **Read context first:** the [project brief](../project/brief/00_project_brief_masterclass_finance_impact.md)
   and the [handoff](00_handoff_claudechat/HANDOFF.md) (its §5 lists open work).
2. Create `dev/runs/NN_slug/` with the next number.
3. Copy the template into it:
   ```bash
   cp dev/runs/_template/RUN.md dev/runs/NN_slug/RUN.md
   ```
4. Fill in **Goal** and **Scope** before starting.
5. Do the work in `deliverables/`. If the case website changed, run the publish
   step (copy canonical casepage → root `index.html` + `src/index.html`; see
   [`/CLAUDE.md`](../../CLAUDE.md) §2).
6. Complete the rest of `RUN.md`: what changed, decisions, verification, open items.
7. Commit: `YYMMDD-<TAG><NN>-<label>` (see [`/CLAUDE.md`](../../CLAUDE.md) §4).

## Finishing a run

A run is done when `RUN.md` is filled in, deliverables are updated, the website
(if touched) is published, and — if the user asked — it's committed. Carry any
unfinished items into the **Open / next** section so the following run can grab them.
