// main.js — renders a branded project-app shell and demonstrates the
// per-app permission model (staff / client / prospect roles).
//
// PROJECT AUTHORS: replace the PROJECT config below and build your content
// inside renderApp(). The role gating pattern shown here mirrors the
// server-side rules in staticwebapp.config.json.

import { getUser, loginUrl, logoutUrl } from './auth.js';

const PROJECT = {
  name: 'Project name',                 // e.g. "ABN AMRO — Impact baseline"
  eyebrow: 'Advisory project',          // or "Proposal", "Internal", ...
  title: 'A clear, sentence-case title for this engagement',
  lead:
    'Replace this with the one-paragraph framing of the project. This template ' +
    'is the starting point for a single-purpose web app delivered per project.',
};

const logoFull = new URL('../brand/logo-full.png', import.meta.url).href;
const logoWhite = new URL('../brand/logo-full-white.png', import.meta.url).href;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function roleChip(role) {
  const known = ['staff', 'client', 'prospect', 'local'];
  const cls = known.includes(role) ? role : 'prospect';
  const label = role === 'local' ? 'Local preview' : (role || 'no role');
  return `<span class="role-chip role-chip--${cls}">${esc(label)}</span>`;
}

function signInScreen() {
  return `
    <div class="signin-wrap">
      <div class="signin-card">
        <img src="${logoFull}" alt="Impact Institute" />
        <h2 class="ii-h3">Sign in required</h2>
        <p class="ii-body">This project app is restricted. Please sign in with your account to continue.</p>
        <a class="ii-btn ii-btn-primary" href="${loginUrl()}">Sign in &rarr;</a>
      </div>
    </div>`;
}

function appScreen(user) {
  const has = (r) => user.roles.includes(r) || user.local;
  return `
    <header class="app-bar">
      <div class="app-bar__brand">
        <img src="${logoFull}" alt="Impact Institute" />
        <span class="app-bar__project">${esc(PROJECT.name)}</span>
      </div>
      <div class="app-bar__user">
        <div class="who">
          <div class="who__name">${esc(user.name)}</div>
          <div class="who__role">${roleChip(user.primaryRole)}</div>
        </div>
        ${user.local
          ? '<span class="ii-small">running locally</span>'
          : `<a class="muted-link" href="${logoutUrl()}">Sign out</a>`}
      </div>
    </header>

    <main>
      <section class="hero">
        <span class="ii-eyebrow">${esc(PROJECT.eyebrow)}</span>
        <h1 class="ii-h1">${esc(PROJECT.title)}</h1>
        <p class="ii-lead">${esc(PROJECT.lead)}</p>
      </section>

      <section class="grid">
        <article class="card">
          <h3 class="ii-h3">Shared content</h3>
          <p class="ii-body">Anyone signed in and authorised for this app sees this section. Build the core deliverable here.</p>
        </article>

        ${has('client') || has('staff') ? `
        <article class="card card--gated">
          <h3 class="ii-h3">Client area</h3>
          <p class="ii-body">Content for the invited client contacts on this engagement.</p>
          <p class="card__lock">Visible to: <strong>client</strong>, staff</p>
        </article>` : ''}

        ${has('staff') ? `
        <article class="card card--gated">
          <h3 class="ii-h3">Staff area</h3>
          <p class="ii-body">Internal-only notes, working data, or controls for the delivery team.</p>
          <p class="card__lock">Visible to: <strong>staff</strong> only</p>
        </article>` : ''}
      </section>

      <div class="notice">
        <strong>EU-hosted &amp; access-controlled.</strong>
        <span class="ii-body"> This app is served from Azure Static Web Apps in an EU region; access is
        granted per app via Entra (staff) and B2B guest invitations (clients). See README for the runbook.</span>
      </div>
    </main>

    <footer>
      Impact Institute &middot; ${esc(PROJECT.name)} &middot; Confidential — for invited recipients only.
    </footer>`;
}

async function render() {
  const root = document.getElementById('app');
  const user = await getUser();
  root.innerHTML = user.authenticated ? appScreen(user) : signInScreen();
  root.setAttribute('aria-busy', 'false');
  // silence unused-import warning for the white logo (available for dark headers)
  void logoWhite;
}

render();
