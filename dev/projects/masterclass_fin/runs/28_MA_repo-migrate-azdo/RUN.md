# RUN 28 — Migrate source repo to Azure DevOps

- **Track:** MA
- **Lock:** no
- **Date:** 2026-06-05
- **Commit:** `260605-MA28-repo-migrate-azdo` *(fill in after committing)*
- **Status:** done

## Goal

Push the current GitHub repo to Azure DevOps (EU region) as the new canonical
source. GitHub repo + Pages stays live as a read-only reference. All future
work (Vite migration, Azure SWA deploy, Entra auth) happens in the Azure DevOps
repo.

## Scope

- In scope: add `azdo` remote, push `main` to Azure DevOps; update architecture
  docs to record the new canonical source.
- Out of scope: Vite migration, SWA deploy config, Entra auth (next runs in
  Azure DevOps).

## Context read

- `ARCHITECTURE.md` reference project (ADR-006: source in Azure DevOps EU).
- Decision session: keep GitHub Pages as live reference; new work in Azure DevOps.

## What changed

- Azure DevOps remote added and `main` pushed to
  `https://dev.azure.com/dgrv/II_L2_Workspaces/_git/masterclass`.
- `dev/projects/masterclass_fin/plan/architecture.md` — updated to record
  source migration and next-run roadmap.

## Decisions

- GitHub repo (`dgrventures/masterclass.github.io`) stays intact and GitHub
  Pages stays live; it is the public/reference copy.
- Azure DevOps repo is the new canonical source for all further development.
- No force-push / history rewrite; Azure DevOps gets the full commit history.

## Website published?

n/a — no app changes this run.

## Verification

`git ls-remote azdo main` returned the expected commit SHA after push.

## Open / next

- Next run (in the Azure DevOps clone): Vite migration, `staticwebapp.config.json`,
  `azure-pipelines.yml`, and Entra auth wiring.
- Manual steps still needed before deploy:
  - Create Azure Static Web App resource (EU region, Standard plan).
  - Create Entra app registration; note tenant ID, client ID, client secret.
  - Add `SWA_DEPLOYMENT_TOKEN`, `AAD_CLIENT_ID`, `AAD_CLIENT_SECRET` as
    pipeline/SWA variables.
  - Invite participants as B2B guests; assign `participant` role.
  - Invite staff; assign `staff` role.
