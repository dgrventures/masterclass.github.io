# general — reusable across projects

Project-agnostic assets and conventions, separated from the project-specific work
in [`../project/`](../project/) so they can be lifted into other projects.

- [`workflow.md`](workflow.md) — how we run work: runs, tracks, tags, the shared
  counter, locks, hybrid git isolation, and the publish/assemble pattern.
- [`design.md`](design.md) — how we build artefacts: house style via the design
  skill, single self-contained HTML deploy, split-source + local assemble.
- [`skills/`](skills/) — packaged Claude skills (e.g. `impact-institute-design.skill`).
- [`architecture/`](architecture/) — architecture notes and general artefacts.

Project-specific counterparts live under `../project/` (brief, context, backlog →
`plan/`; tracks → `tracks/`) and the per-project glue is in the repo-root `CLAUDE.md`.
