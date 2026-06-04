# Project Apps — Architecture Overview & Decisions

> One app per project. Instead of producing PowerPoint / Excel / Figma artifacts, we build a
> simple web app per project, work on it in a git repo with Claude + Claude Code, and publish it.
> **Chosen platform: Azure (EU region), in our own tenant.**

---

## 1. Context & Goal

We deliver proposals, advisory project work, and internal code work for **EU financial-sector
clients**, under **GDPR, DORA, and the EU AI Act**, with an **EU data-residency requirement**.
We want one consistent medium — a small web app per project — that is:

- **Portable / low-ops** — simple to build, cheap to host, durable.
- **Securable per app** — clear permissions per app, for staff (internal) and for invited
  prospects/clients (external).
- **EU-resident & compliance-friendly** — keeps confidential and personal data in the EU, inside
  a vendor our clients already accept.
- **Claude-Code-friendly** — a git repo Claude Code can work in productively.

## 2. Approach Options (summary)

Tiers from simplest to most capable: (0) hand-written single `index.html`; (1) modular source
inlined to one file via Vite + `vite-plugin-singlefile`; (2) standard multi-file static build;
(3) multi-page framework; (4) static front-end + backend. We default to Tier 0/1 and escalate
only when an app genuinely warrants it.

Three kinds of "modularity," solved independently: *within an app* (build step), *across apps*
(shared template + design system), *deliverable format* (single-file output). We can have all
three at once.

## 3. Key Considerations

**Speed.** Static + CDN is fast everywhere. Single-file is instant for small apps; large apps
benefit from multi-file code-splitting.

**Security / access.** The model is a **front-door identity proxy**: the platform handles sign-in,
we grant access *per app*. Azure Static Web Apps' built-in auth ("Easy Auth") is exactly this,
native to our existing Entra identity. Never put secrets/API keys in client-side code.

**Functionality.** Pure static covers rich UI, data viz, calculators, local persistence. Auth,
secrets, shared state, email → require a backend (Azure App Service / Functions).

**Cost.** Price per *user*, not per app, wherever possible. Azure SWA **Free** tier (Entra auth +
invitation-based roles) covers internal/prototype apps at $0; **Standard** (~$9/app/mo) is used
only for live client-facing apps needing tenant-locked staff auth, custom domain, or SLA. The
recurring cost is therefore bounded to the small number of concurrently-live client apps.

**Compliance (orientation, not legal sign-off — confirm with DPO/compliance + each client's ICT
arrangements):**
- *EU residency:* deploy Azure DevOps org and all SWA resources in an EU region. Azure EU
  residency is native and free; Microsoft completed the EU Data Boundary (Feb 2025).
- *GDPR:* rely on the Microsoft DPA/SCCs and EU-region deployment; the auth layer also processes
  personal data (staff + external emails) and must stay in-scope.
- *DORA:* record the architecture in our ICT third-party register; minimise vendors (one cloud,
  already vetted by most FS clients). Note: Microsoft is US-parented, so for unusually
  sovereignty-strict clients consider Microsoft Cloud for Sovereignty.
- *AI Act:* a per-app governance question, independent of hosting. Flag high-risk uses
  (e.g. creditworthiness assessment) early; add AI-transparency notices where an app embeds AI.

## 4. Decisions (ADRs)

### ADR-001 — Static web apps as the standard project deliverable medium
**Status:** Accepted. Each project is delivered as a static web app in its own git repo.

### ADR-002 — Hosting target by sensitivity
**Status:** Accepted (supersedes earlier "GitHub Pages by default").
**Decision:** All work touching confidential or personal data → Azure SWA in an EU region, in our
tenant. GitHub Pages is reserved for genuinely public, no-personal-data content only (if used at
all). **Consequence:** GitHub Pages public-by-default behaviour and Cloudflare's paid EU
localization are both ruled out for client work.

### ADR-003 — Single-file is a first-class output; develop modularly when needed
**Status:** Accepted. Default to single-file output; use Vite + `vite-plugin-singlefile` for
larger apps; escalate to multi-file only when warranted.

### ADR-004 — Maintain a shared starter template + design system
**Status:** Accepted. Per-project bootstrap via "use this template", carrying Impact Institute
branding and the deploy pipeline.

### ADR-005 — EU data residency & vendor posture
**Status:** Accepted.
**Context:** EU financial-sector clients; GDPR/DORA; EU residency required.
**Decision:** Host confidential + client/prospect-facing work on **Azure in an EU region**.
Exclude Cloudflare and public GitHub Pages from anything with confidential or personal data.
**Rationale:** Azure EU residency is native/free and DORA-mature; Cloudflare's EU localization is
a paid Enterprise add-on and adds another US ICT subprocessor to each client's DORA register.

### ADR-006 — Standard stack: Azure SWA + Entra, source in Azure DevOps (EU)
**Status:** Accepted.
**Decision:** Source in **Azure DevOps Repos (EU region)**; host on **Azure Static Web Apps**;
auth via **Entra Easy Auth**; build with **Vite** (single-file output option). **SWA Free tier by
default; promote to Standard when an app becomes client-facing.** Deploy via Azure Pipelines.

### ADR-007 — Per-app permissions model & client authentication
**Status:** Accepted.
**Decision:** Front-door proxy (SWA Easy Auth) + route-based roles in `staticwebapp.config.json`,
granted per app. Identity sources:
- **Staff** → Entra (tenant-locked custom provider on Standard; invitation-based roles on Free).
- **Clients** → **Entra B2B guest invitations**. Clients sign in with their *own* corporate
  identity; we never issue/store/rotate their credentials, and their org's MFA, Conditional
  Access, and offboarding apply automatically. Email one-time-passcode fallback covers clients
  not on Entra/M365. Best fit for GDPR/DORA (minimal credential custody, auditable, per-app scope).
- **Prospects** → **Entra External ID** (self-service email OTP) when hand-inviting each person
  isn't practical.
**Cost/governance:** External ID core is free for the first 50,000 MAU/month (B2B guests counted
only when they sign in) — $0 at our scale. Set guest permissions to most-restricted and review
guests periodically (Phase 4). Automated guest governance (access packages/reviews) is a paid
Entra ID Governance add-on (no free tier); manual review is free.
**Template default:** wire the external role around B2B invites, structured so External ID can be
switched on for prospect-facing apps.

### ADR-008 — Deploy in our own tenant by default
**Status:** Accepted. Projects live in our Azure tenant. Revisit per-engagement only if a client
contractually requires deployment into their own tenant.

## 5. Open Questions
- External access default: **Entra External ID (self-service OTP)** vs **B2B guest invites**
  (named contacts) — likely B2B for clients, External ID for broader prospect access. Confirm.
- Cost consolidation threshold: at how many concurrently-live client apps do we group several
  under one Standard SWA vs one-per-app?
- Per-client check: confirm each FS client accepts Microsoft as ICT subprocessor (usually
  pre-vetted) and whether any requires sovereign-cloud.
