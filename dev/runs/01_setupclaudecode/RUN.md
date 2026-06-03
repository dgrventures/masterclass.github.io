# RUN 01 — Set up Claude Code (CLAUDE.md + runs system)

- **Workstream tag:** JB
- **Date:** 2026-06-04
- **Commit:** `260604-JB01-setupclaudecode`
- **Status:** done

## Goal
Onboard the project into Claude Code: write a root `CLAUDE.md` and establish a
repeatable "runs" workflow with templates, so future work continues from the
Claude-chat handoff in a structured way.

## Scope
- In scope: `CLAUDE.md`, runs README, run template, this run log.
- Out of scope: the open deliverable work from handoff §5 (PPTX export, RvB-DCF
  model, facilitator argument cards, login-bug verification) — left for later runs.

## Context read
- `dev/project/brief/00_project_brief_masterclass_finance_impact.md` (source of truth)
- `dev/runs/00_handoff_claudechat/HANDOFF.md`
- `dev/skills/impact-institute-design.skill` → `SKILL.md` (design kit, self-hosted fonts/CSS)
- Verified root `index.html`, `src/index.html`, and
  `dev/project/deliverables/22_casepage/casus-akzonobel-axalta.html` are byte-identical.

## What changed
- `CLAUDE.md` — project guidance: what the project is, repo layout, deploy/publish
  rule, design-skill usage, the runs workflow, commit convention, working rules.
- `dev/runs/README.md` — how runs work and how to start/finish one.
- `dev/runs/_template/RUN.md` — per-run log template.
- `dev/runs/01_setupclaudecode/RUN.md` — this log.

No deliverables or figures were touched.

## Decisions
- **Deliverable is canonical** for the case website; root `index.html` + `src/index.html`
  are published copies kept byte-identical via a `cp` publish step. (User choice.)
- **Commit `<TAG>` = workstream tag**, not person initials; runs numbered within a
  workstream. (User choice.) Format `YYMMDD-<TAG><NN>-<label>` inferred from the
  existing `260604-JB01-pilot` / `JB02-pilot` commits.
- Language split kept explicit: Dutch for deliverables, English for meta/instructions.

## Website published?
n/a — website not changed.

## Verification
- Confirmed the three HTML files are identical (`diff -q`, equal byte sizes) before
  documenting the canonical/publish relationship.
- Confirmed the skill is a valid zip with `SKILL.md` + `colors_and_type.css` + fonts.
- Not verified: the case-website login bug in the real deploy environment (handoff
  §5.4) — still open.

## Open / next
Pick up from handoff §5, in priority order:
1. **PPTX export** of `dev/project/deliverables/10_lezing/02_lezing.html`.
2. **RvB-DCF model** (per-share standalone vs combined incl. synergies).
3. **Facilitator argument cards** (counter-arguments per group).
4. **Verify the case-website login** in the real deployment.
5. Optional: cross-check deck slide 27 facts vs `Validatie_getallen_presentatie.xlsx`.
