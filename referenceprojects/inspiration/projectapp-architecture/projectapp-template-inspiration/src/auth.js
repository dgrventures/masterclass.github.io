// auth.js — read the Static Web Apps "client principal" from Easy Auth.
//
// When the app is hosted on Azure Static Web Apps, the platform exposes the
// signed-in user at /.auth/me (no library needed). Roles come from
// staticwebapp.config.json + the SWA role-assignment / invitation system.
//
// When the file is opened locally (file://) or served outside SWA, /.auth/me
// does not exist — we detect that and return a "local preview" principal so the
// template still renders. The REAL access gate is enforced server-side by
// staticwebapp.config.json route rules, not by this client-side code.

const ROLE_PRIORITY = ['staff', 'client', 'prospect'];

/** Returns { authenticated, local, name, email, roles, primaryRole } */
export async function getUser() {
  try {
    const res = await fetch('/.auth/me', { headers: { accept: 'application/json' } });
    if (!res.ok) return localPrincipal();
    const payload = await res.json();
    const cp = payload && payload.clientPrincipal;
    if (!cp) return anonymous();

    const roles = (cp.userRoles || []).filter((r) => r !== 'anonymous' && r !== 'authenticated');
    return {
      authenticated: true,
      local: false,
      name: cp.userDetails || 'Signed-in user',
      email: cp.userDetails || '',
      roles,
      primaryRole: pickPrimary(roles),
    };
  } catch (_e) {
    // No /.auth endpoint (local preview / single-file handoff)
    return localPrincipal();
  }
}

function pickPrimary(roles) {
  for (const r of ROLE_PRIORITY) if (roles.includes(r)) return r;
  return roles[0] || null;
}

function anonymous() {
  return { authenticated: false, local: false, name: '', email: '', roles: [], primaryRole: null };
}

function localPrincipal() {
  return {
    authenticated: true,
    local: true,
    name: 'Local preview',
    email: '',
    roles: ['staff'], // preview as staff so all panels are visible when run locally
    primaryRole: 'local',
  };
}

export const loginUrl = (returnTo = window.location.pathname) =>
  `/.auth/login/aad?post_login_redirect_uri=${encodeURIComponent(returnTo)}`;

export const logoutUrl = (returnTo = '/') =>
  `/.auth/logout?post_logout_redirect_uri=${encodeURIComponent(returnTo)}`;
