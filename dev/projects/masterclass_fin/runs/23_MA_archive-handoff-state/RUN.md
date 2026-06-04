# RUN 23 — HANDOFF gearchiveerd + actueel STATE-overzicht

- **Track:** MA (governance/docs)
- **Lock:** no (doc-reorg, parallel-safe; geen build- of code-wijziging)
- **Date:** 2026-06-04
- **Commit:** `260604-MA23-archive-handoff-state` *(fill in after committing)*
- **Status:** done

## Goal
De oorspronkelijke chat-HANDOFF was een momentopname en raakte achterhaald (zie de
notitie in [run 20](../20_MA_handoff-update/RUN.md)). Archiveer 'm en vervang z'n
"lees-dit-eerst / project-state"-rol door een beknopt, actueel STATE-overzicht dat naar
de bronnen verwijst i.p.v. ze te dupliceren.

## Scope
- In scope: HANDOFF-map naar `archive/`; nieuw `STATE.md`; verwijzingen herrichten
  (CLAUDE.md §1, runs/README.md).
- Out of scope: de inhoud van HANDOFF herschrijven (blijft als historisch archief).

## What changed
- **Gearchiveerd**: `git mv dev/projects/masterclass_fin/runs/00_handoff_claudechat`
  → `…/archive/00_handoff_claudechat/` (historie behouden). Run-nummering in `runs/`
  begint nu effectief bij `01`.
- **Nieuw — `dev/projects/masterclass_fin/STATE.md`**: actueel overzicht — wat het is
  (link naar brief), artefacten + status (casus / lezing 24 slides / casus-intro, build 12,
  deploy via `docs/`), hoe werk loopt (tracks, runs, backlog, architectuur, `projectdata/`),
  en een History-sectie die naar het gearchiveerde HANDOFF wijst. Link-zwaar, geen duplicatie.
- **Verwijzingen herricht**:
  - `CLAUDE.md` §1: "project state … in de handoff" → naar `STATE.md` + backlog; archief-pointer.
  - `runs/README.md`: legacy-folderlijst (00_handoff eruit → archief-noot); "lees context"-stap
    wijst nu naar `../STATE.md` + backlog i.p.v. de handoff.

## Decisions
- **Archiveren i.p.v. verwijderen**: de handoff is een waardevol historisch record; hij
  verhuist naar `archive/`, niet weg.
- **STATE.md dupliceert niets**: conform CLAUDE.md §5 ("niet de brief/handoff dupliceren")
  — het is een navigatie-/statuslaag die naar de bronnen linkt.
- **Historische run-logs ongemoeid**: oudere runs die het oude handoff-pad noemen blijven
  als historisch record staan.

## Website published?
n.v.t. — documentatie/governance.

## Verification
- Geen levende verwijzingen meer naar het oude `runs/00_handoff_claudechat`-pad behalve de
  bewuste archief-pointers (CLAUDE.md, runs/README) + een historisch run-20-log.
- Alle linktargets in `STATE.md` bestaan (brief, archief-HANDOFF, projectdata, backlog,
  tracks, CLAUDE.md, build.json) — gecontroleerd.

## Open / next
- Houd `STATE.md` kort en actueel bij grotere wijzigingen (het is nu de instap-pagina).
- Backlog open: pdf-export lezing; consistente data-/model-laag; presentatie-inhoud valideren.
