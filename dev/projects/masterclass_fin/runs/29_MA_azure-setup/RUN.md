# RUN 29 — Azure infrastructure setup

- **Track:** MA
- **Lock:** no
- **Date:** 2026-06-05
- **Commit:** `260605-MA29-azure-setup` *(fill in after committing)*
- **Status:** in progress

## Goal

Provision the Azure infrastructure needed before Run 30 (Vite migration + SWA
deploy config): a Static Web App resource, an Entra app registration, and the
pipeline variables in Azure DevOps. All steps are manual portal actions; this
run documents them as a checklist and collects the values Run 30 will need.

## Scope

- In scope: Azure SWA resource, Entra app registration, pipeline variable
  group, SWA application settings.
- Out of scope: code changes (Run 30); assigning participant/staff roles to
  actual users (after the app is deployed).

## Values to collect

Fill these in as you go — Run 30 needs all of them.

| Key | Value |
| --- | --- |
| `AAD_TENANT_ID` | *(your Directory / tenant ID)* |
| `AAD_CLIENT_ID` | *(app registration Application ID)* |
| `AAD_CLIENT_SECRET` | *(client secret value — store securely, not in git)* |
| `SWA_DEPLOYMENT_TOKEN` | *(from SWA → Manage deployment token — store securely)* |
| SWA URL | *(e.g. `https://masterclass-fin.azurestaticapps.net`)* |

> **Note:** never commit actual secret values to git. The table above is for
> your own notes during setup; replace with `set` before committing this file.

---

## Step 1 — Resource group

1. - [ ] Go to **portal.azure.com** → *Resource groups* → **Create**.
2. - [ ] Subscription: your subscription.
3. - [ ] Name: `rg-masterclass-fin`.
4. - [ ] Region: **West Europe**.
5. - [ ] Review + create → **Create**.

---

## Step 2 — Azure Static Web App

1. - [ ] Portal → *Create a resource* → search **Static Web App** → **Create**.
2. - [ ] Resource group: `rg-masterclass-fin`.
3. - [ ] Name: `masterclass-fin`.
4. - [ ] Plan type: **Standard**.
5. - [ ] Region: **West Europe**.
6. - [ ] Deployment source: **Other** (we use Azure Pipelines — not GitHub/GitLab).
7. - [ ] Review + create → **Create**. Wait for deployment to complete.
8. - [ ] Open the resource. Copy the **URL** (something like
        `https://masterclass-fin.azurestaticapps.net`) → note it in the table above.
9. - [ ] In the resource: *Manage deployment token* → **Copy** the token →
        note as `SWA_DEPLOYMENT_TOKEN` in the table above.

---

## Step 3 — Entra app registration

1. - [ ] Portal → **Microsoft Entra ID** → *App registrations* → **New registration**.
2. - [ ] Name: `masterclass-fin`.
3. - [ ] Supported account types: **Accounts in this organisational directory only**
        (single tenant — this locks sign-in to your org).
4. - [ ] Redirect URI: platform **Web**, value:
        `https://<your-swa-url>/.auth/login/aad/callback`
        (use the SWA URL from Step 2).
5. - [ ] **Register**.
6. - [ ] On the overview page, copy:
   - **Application (client) ID** → note as `AAD_CLIENT_ID`.
   - **Directory (tenant) ID** → note as `AAD_TENANT_ID`.
7. - [ ] *Certificates & secrets* → *Client secrets* → **New client secret**.
   - Description: `masterclass-fin-swa`.
   - Expiry: 24 months (or per your org policy).
   - **Add** → immediately copy the **Value** (not the Secret ID) →
     note as `AAD_CLIENT_SECRET`. It is only shown once.

---

## Step 4 — SWA application settings (runtime Entra config)

These are environment variables the SWA Easy Auth layer reads at runtime.
They are set on the SWA resource, not in code.

1. - [ ] SWA resource → *Configuration* → *Application settings* → **Add**.
2. - [ ] Add `AAD_CLIENT_ID` = *(value from Step 3)*.
3. - [ ] Add `AAD_CLIENT_SECRET` = *(value from Step 3)*.
4. - [ ] **Save**.

---

## Step 5 — Azure DevOps pipeline variable group

The pipeline (`azure-pipelines.yml`, added in Run 30) references these variables.

1. - [ ] Azure DevOps → project `II_L2_Workspaces` → **Pipelines** → **Library**.
2. - [ ] **+ Variable group** → name: `masterclass-fin-secrets`.
3. - [ ] Add variable `SWA_DEPLOYMENT_TOKEN` → paste value → click the **lock**
        icon to mark it secret.
4. - [ ] Add variable `AAD_CLIENT_ID` → paste value → lock it.
5. - [ ] Add variable `AAD_CLIENT_SECRET` → paste value → lock it.
6. - [ ] **Save**.

---

## Step 6 — Verify (smoke-check before Run 30)

1. - [ ] Browse to the SWA URL. You should see a default Azure placeholder page
        (the app is not deployed yet — that is fine).
2. - [ ] Portal → Entra ID → App registrations → `masterclass-fin` → *Authentication*
        → confirm the redirect URI is listed correctly.
3. - [ ] Azure DevOps Library → `masterclass-fin-secrets` → confirm 3 variables
        are present and locked.

---

## What changed

*(no code changes — this is a guided setup run)*

## Decisions

- SWA **Standard** plan from the start: needed for tenant-locked Entra provider
  and custom domain. Upgrading later is one click but causes a brief re-auth
  cycle for users.
- Deployment source set to **Other**: Azure Pipelines handles the build + deploy;
  we do not use the SWA GitHub/Azure DevOps integration (which would bypass our
  Vite build step).
- Client secret expiry set to 24 months: rotate before expiry (calendar reminder
  recommended); update `AAD_CLIENT_SECRET` in SWA settings + DevOps library.

## Website published?

n/a — no app changes this run.

## Verification

Checklist above completed; see Step 6 smoke-check.

## Open / next

Once all steps above are ticked:
- Clone Azure DevOps repo locally (new folder).
- Start **Run 30** (Vite migration + `staticwebapp.config.json` + `azure-pipelines.yml`
  + Entra auth wiring in `app.js`). Run 30 needs all four values from the table above.
