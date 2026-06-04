# Impact Institute — Project App Template

A starter for the **"one app per project"** approach: a small, branded web app per engagement,
hosted on **Azure Static Web Apps (EU region)** with **Entra** access control, worked on in a git
repo with Claude Code. Builds to a normal SWA site **or** to a single portable `index.html`.

See `ARCHITECTURE.md` (initiative repo) for the decisions behind this; this README is the runbook.

---

## What's in here

```
index.html                  App entry (set the <title> per project)
src/
  main.js                   Branded shell + role-gated content (edit this)
  auth.js                   Reads SWA Easy Auth (/.auth/me); graceful local fallback
  styles.css                App layout on brand tokens
brand/
  brand.css                 Impact Institute tokens + curated fonts
  fonts/                    Futura PT (display) + Lato (body)
  logo-full*.png            Logos
public/
  staticwebapp.config.json  Auth + per-app role gating (ships into the build)
  logo-mark.svg             Favicon / app mark
vite.config.js              Multi-file (SWA) and single-file build modes
azure-pipelines.yml         Azure DevOps -> SWA deploy
```

---

## Prerequisites (one-time, org level)

- An **Azure DevOps organisation created in an EU region** (keeps source in-region).
- An **Entra app registration** for staff sign-in; note the **tenant ID**, **client ID**, and a
  **client secret**. Use a **tenant-specific** issuer to lock sign-in to our organisation.
- Standard plan is needed for the tenant-locked custom Entra provider and custom domains.

## Bootstrap a new project

1. Create the repo from this template; clone it.
2. `npm install`
3. Set the project specifics: the `<title>` in `index.html` and the `PROJECT` object at the top of
   `src/main.js`. Build your content in `src/main.js` (and add files under `src/` as needed).
4. `npm run dev` to work locally. Running locally you'll see a **"Local preview"** state (as
   `staff`) because `/.auth/*` only exists on SWA — the real gate is server-side.

## Build

- `npm run build` -> `dist/` — multi-file, for Azure Static Web Apps (keeps auth working).
- `npm run build:single` -> `dist-single/index.html` — one self-contained file (fonts/logos
  inlined as base64) for a **portable, non-gated** handoff. ~0.8 MB with full branding.

## Deploy to Azure Static Web Apps

1. Create a Static Web App resource **in an EU region** (e.g. West Europe). Plan: **Standard**.
2. Add the Entra app settings to the SWA resource: `AAD_CLIENT_ID`, `AAD_CLIENT_SECRET`.
3. In `public/staticwebapp.config.json`, replace `<TENANT_ID>` with our tenant ID.
4. Copy the SWA **deployment token** (SWA → *Manage deployment token*) into an Azure DevOps secret
   pipeline variable named `SWA_DEPLOYMENT_TOKEN`.
5. Add `azure-pipelines.yml` as the pipeline. Pushing to `main` builds and deploys.

> Cost: keep internal/prototype apps on the **Free** plan (Entra + invitation-based roles).
> Promote to **Standard** (~$9/mo) when an app becomes client-facing (tenant-lock, custom domain, SLA).

## Granting access (the per-app permission model)

Access is granted **per app** by assigning custom roles (`staff`, `client`, `prospect`) in *this
app's* SWA resource. Role assignments are scoped to each SWA, which is what isolates one project
from another — including for external guests.

- **Staff** → they sign in with their Entra account; assign the `staff` role (SWA → *Role
  management*, or automate with an assign-roles function).
- **Clients** → **invite as an Entra B2B guest** and assign the `client` role. They sign in with
  *their own* corporate identity (email one-time-passcode fallback if they aren't on Entra/M365).
  We never hold their credentials; their org's MFA/offboarding apply automatically.
- **Prospects** → for broad, self-service access use **Entra External ID** (email OTP) and assign
  the `prospect` role.

A signed-in user with **no** assigned role is denied (this is intended — invite first).

## Compliance checklist (per project)

- [ ] SWA + DevOps resources in an **EU region**; confirm EU Data Boundary scope.
- [ ] Access is role-gated; confirm only invited people hold a role; set guest permissions to most-restricted.
- [ ] Recorded in the **ICT/DORA register**; client accepts Microsoft as ICT subprocessor.
- [ ] **AI Act**: if the app embeds AI, add a transparency notice; flag any high-risk use early.
- [ ] No secrets/API keys in client-side code.

## Notes

- The brand is a curated subset of the Impact Institute design system (Futura PT + Lato, core
  tokens). Pull in more components/photography from that system as a project needs them.
- British English, sentence case, no emoji — per brand voice.
