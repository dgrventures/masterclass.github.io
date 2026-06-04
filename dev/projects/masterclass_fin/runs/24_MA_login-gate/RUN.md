# RUN 24 — Soft login gate (password 3100)

- **Track:** MA
- **Lock:** yes (created dev/LOCK at start, removed at finish)
- **Date:** 2026-06-04
- **Commit:** `260604-MA24-login-gate`
- **Status:** done

## Goal
Add a client-side password gate to all three published pages. Correct password
unlocks the page and persists in localStorage so it's only asked once per device.

## Security caveat (documented in gate.mjs)
CLIENT-SIDE ONLY — the hash is visible in page source. This is a casual deterrent,
not real auth. For real protection use a backend (Netlify, Cloudflare Access, etc.).

## What changed
- New `projectapps/masterclass_fin/src/gate.mjs` — shared gate source:
  - Styled overlay (brand green/orange, Dutch copy: "Voer de toegangscode in")
  - Password stored as SHA-256 hash of "3100" (not plaintext)
  - On correct entry: dismisses overlay + sets localStorage flag (persists per device)
  - On wrong entry: shake animation + "Onjuiste code. Probeer het opnieuw."
- `src/build.mjs` — exports `injectGate(html)` (inserts gate HTML after `<body>`)
- Three publish scripts wired: `assemble.mjs` (casus), `10_lezing/publish.mjs`,
  `23_casusintro/publish.mjs` — each calls `injectGate(out)` after `stampBuild`
- Build 12 → **13** (to confirm the gated version is live)
- Republished: `src/output/` + `docs/` for all three pages

## To change the password
Edit `GATE_HASH` in `gate.mjs` with the SHA-256 of the new password:
  node -e "const c=require('crypto');console.log(c.createHash('sha256').update('newpass').digest('hex'))"
Then run `node projectapps/masterclass_fin/src/publish-all.mjs`.

## Verification
- All three `docs/` pages: gate overlay present (4 occurrences), correct hash injected,
  build 13 confirmed.
- SHA-256("3100") computed at runtime matches GATE_HASH in gate.mjs ✓
- `publish-all` ran cleanly; output = docs (canonical = src/output/)
