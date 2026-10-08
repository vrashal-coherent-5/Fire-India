// Auth0 login gate. Fire and Drone each have their own session cookie, their own
// login (prompt=login, so an Auth0 session for one never silently unlocks the other)
// and their own Auth0 role. Reports and report data are only served to the session
// for the ecosystem the report belongs to.

export const config = {
  matcher: ['/', '/fire', '/fire/:path*', '/drone', '/drone/:path*', '/shared/:path*', '/api/:path*', '/auth/:path*', '/index.html'],
};

const IDS = {
  fire: ['5c5554e08fd56ca5e0f53fcb','4363fea5254c96601438c964','7401cc97dcaac538fceabbd8','880ff6af70d7225cb4cdefd2','2fe8bf8f72cf0896dbd27931','fbbe54c36994bdd98559b60a','838ac4df67fd28a3b0220497','8d4e25ca9f72f33ae2d34118','83085f668d9ad8def2b3ff0b','275958c68bf24c853e97526a','9b8793de7b99cfb4b0ddb754','bcb4a53a9ed56b700e042546','cee58afdbf7a274842fb92d8','8c5c4c2b50eb5478d7215fdf','f198d984ab817383192497da','dfe0dca378538c941a579b39','2c7282c554e431ba271018ab','e129c07b28ea36e763fd1a38','a180cc086a444afb48bc552e','17410ddd30de45f0a31fdab8','7410559951d9fc2cd38ec5ce','63be66c6a73530ffdf737bd6','269e327068ad045b72f3e89f','d1d54383cdbceed4f98e4655','6ab734759041a0a01bbdb311'],
  drone: ['794643a37c1b8b8941e1fe20','caa29fde63afe414f3e02797','1005dac62aa4a5908103614c','0045a0e8008d3035b54fc2d7','71f14906d069058a1b674cb2','089808417bab32e3babd59e6','5216a5d851768ebd0b6f0b49','bf67d756b95acbff667557b6','f76f5bf292564532d3d7b7bd','70794012835421e92a77d65b','0011de38a3eac1cedbf6734d','fa2ab84532d5245e3e9a35c2','161c420ca349a076f7c9818a','dfa781d2493b6f7127239915','5f49d5b5a8503699e994f8ef','f016a05eb1fc88198a547e68','39d287dbfbba2f1f876cf208','cd695bdb740a552359a401a0','15b04c703a468a93f33083bd','05e97971de692dabc534ea37','aee48e8ac7f8d723ce6000b9','3d27e979b3b291a868fad634','8240120e5ba386d44a564691','361d2434245d6d31a89c9b1b','255b49318d003f2180fb3b52'],
};
const ECOS = ['fire', 'drone'];
const ROLE = { fire: 'fire-access', drone: 'drone-access' };
const ROLES_CLAIM = 'https://coherentinsightvault.com/roles';
const SESSION_HOURS = 8;

const ecoOfId = id => ECOS.find(e => IDS[e].includes(id));
const idOfSlug = slug => (slug.match(/--([0-9a-f]{24})$/) || [])[1];

// ---------- helpers ----------
const next = () => new Response(null, { headers: { 'x-middleware-next': '1' } });
const redirect = (url, cookies = []) => {
  const h = new Headers({ Location: url });
  cookies.forEach(c => h.append('Set-Cookie', c));
  return new Response(null, { status: 302, headers: h });
};
const page = (status, title, msg, cookies = []) => {
  const h = new Headers({ 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
  cookies.forEach(c => h.append('Set-Cookie', c));
  return new Response(`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<body style="font-family:Inter,system-ui,sans-serif;background:#f4f7fb;display:grid;place-items:center;min-height:100vh;margin:0">
<div style="background:#fff;border:1px solid #e3e9f1;border-radius:16px;padding:40px;max-width:440px;text-align:center">
<img src="/logo.png" alt="Coherent Market Insights" style="height:40px;margin-bottom:24px"><h2 style="margin:0 0 10px;color:#0f1f33">${title}</h2>
<p style="color:#5b6b7f;line-height:1.6">${msg}</p><a href="/" style="color:#1f6fb2;font-weight:600">Back to home</a></div></body>`, { status, headers: h });
};
const cookie = (name, value, maxAge) =>
  `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
const getCookie = (req, name) => {
  const m = (req.headers.get('cookie') || '').match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
  return m ? m[1] : null;
};

const enc = new TextEncoder();
const b64url = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const b64urlJson = obj => b64url(enc.encode(JSON.stringify(obj)));
const fromB64url = s => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))));

async function hmac(data) {
  const key = await crypto.subtle.importKey('raw', enc.encode(process.env.SESSION_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}
async function seal(obj) {
  const body = b64urlJson(obj);
  return `${body}.${await hmac(body)}`;
}
async function unseal(token) {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig || sig !== await hmac(body)) return null;
  try {
    const data = fromB64url(body);
    return data.exp > Date.now() ? data : null;
  } catch { return null; }
}
const session = (req, eco) => unseal(getCookie(req, `cv_${eco}`));

const loginUrl = (eco, returnTo) => `/auth/login?eco=${eco}&returnTo=${encodeURIComponent(returnTo)}`;

// ---------- auth routes ----------
async function handleAuth(req, url) {
  const { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } = process.env;
  const callback = `${url.origin}/auth/callback`;

  if (url.pathname === '/auth/login') {
    const eco = url.searchParams.get('eco');
    if (!ECOS.includes(eco)) return redirect('/');
    let returnTo = url.searchParams.get('returnTo') || `/${eco}`;
    if (!returnTo.startsWith(`/${eco}`)) returnTo = `/${eco}`;
    const state = b64url(crypto.getRandomValues(new Uint8Array(24)));
    const auth = new URL(`https://${AUTH0_DOMAIN}/authorize`);
    auth.search = new URLSearchParams({
      response_type: 'code', client_id: AUTH0_CLIENT_ID, redirect_uri: callback,
      scope: 'openid profile email', state, prompt: 'login',
    });
    const tx = await seal({ state, eco, returnTo, exp: Date.now() + 10 * 60e3 });
    return redirect(auth.toString(), [cookie('cv_tx', tx, 600)]);
  }

  if (url.pathname === '/auth/callback') {
    const tx = await unseal(getCookie(req, 'cv_tx'));
    const clearTx = cookie('cv_tx', '', 0);
    if (url.searchParams.get('error')) {
      return page(401, 'Login failed', url.searchParams.get('error_description') || 'Please try again.', [clearTx]);
    }
    if (!tx || tx.state !== url.searchParams.get('state')) {
      return page(400, 'Login expired', 'Your login session expired. Please open the report again to sign in.', [clearTx]);
    }
    const res = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code', client_id: AUTH0_CLIENT_ID, client_secret: AUTH0_CLIENT_SECRET,
        code: url.searchParams.get('code') || '', redirect_uri: callback,
      }),
    });
    if (!res.ok) return page(401, 'Login failed', 'Could not complete sign in. Please try again.', [clearTx]);
    // The ID token comes straight from Auth0 over TLS in exchange for our client secret, so its claims are trusted.
    const { id_token } = await res.json();
    const claims = fromB64url(id_token.split('.')[1]);
    const roles = claims[ROLES_CLAIM] || [];
    if (!roles.includes(ROLE[tx.eco])) {
      const name = tx.eco === 'fire' ? 'Fire' : 'Drone';
      return page(403, 'No access', `Your account (${claims.email || claims.sub}) does not have access to the ${name} Ecosystem reports. Please contact Coherent Market Insights for access.`, [clearTx]);
    }
    const sess = await seal({ sub: claims.sub, email: claims.email, eco: tx.eco, exp: Date.now() + SESSION_HOURS * 3600e3 });
    return redirect(tx.returnTo, [clearTx, cookie(`cv_${tx.eco}`, sess, SESSION_HOURS * 3600)]);
  }

  if (url.pathname === '/auth/logout') {
    const eco = url.searchParams.get('eco');
    const clear = ECOS.includes(eco) ? [cookie(`cv_${eco}`, '', 0)] : ECOS.map(e => cookie(`cv_${e}`, '', 0));
    const out = new URL(`https://${AUTH0_DOMAIN}/v2/logout`);
    out.search = new URLSearchParams({ client_id: AUTH0_CLIENT_ID, returnTo: url.origin });
    return redirect(out.toString(), clear);
  }

  return redirect('/');
}

// ---------- contact lookup (SalesQL) ----------
// The report tables call this for cells that are gated in the preview. The API key
// stays server-side and only logged-in users can spend credits.
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const domainOf = v => {
  if (!v) return '';
  const s = String(v).trim().toLowerCase();
  if (s.includes('@')) return s.split('@').pop();
  return s.replace(/^https?:\/\//, '').replace(/^www\./, '').split(/[/?#\s]/)[0];
};

async function handleEnrich(req) {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  let body;
  try { body = await req.json(); } catch { return json({ error: 'Bad request' }, 400); }
  const person = String(body.person || '').trim();
  const company = String(body.company || '').trim();
  const domain = domainOf(body.domain);
  const linkedin = String(body.linkedin || '').trim();

  const q = new URLSearchParams();
  if (/linkedin\.com\/(in|sales)\//i.test(linkedin)) q.set('linkedin_url', linkedin);
  else if (person && domain) { q.set('full_name', person); q.set('organization_domain', domain); }
  else if (person && company) { q.set('full_name', person); q.set('organization_name', company); }
  // SalesQL can only look up a named person; without one there is nobody to find.
  else return json({ found: false });

  const res = await fetch(`https://api-public.salesql.com/v1/persons/enrich?${q}`, {
    headers: { Authorization: `Bearer ${process.env.SALESQL_API_KEY}` },
  });
  if (res.status === 404) return json({ found: false });
  if (!res.ok) return json({ error: 'Lookup unavailable' }, 502);

  const p = await res.json();
  const emails = (p.emails || []).filter(e => e.email && !/invalid/i.test(e.status || ''));
  const email = (emails.find(e => /work/i.test(e.type || '')) || emails[0] || {}).email || '';
  const phone = ((p.phones || []).find(x => x.phone) || {}).phone || '';
  return json({
    found: !!(email || phone || p.linkedin_url),
    name: p.full_name || '',
    title: p.title || '',
    email,
    phone,
    linkedin: p.linkedin_url || '',
  });
}

// ---------- gate ----------
export default async function middleware(req) {
  const url = new URL(req.url);
  const parts = url.pathname.split('/').filter(Boolean);

  // The bare domain has no ecosystem of its own; send visitors to the vault's page on the main site.
  if (parts.length === 0 || url.pathname === '/index.html') {
    return redirect('https://www.coherentmarketinsights.com/coherent-insights-vault');
  }

  if (parts[0] === 'auth') return handleAuth(req, url);

  // Old public links: send them to their ecosystem path so they go through the gate.
  if (parts[0] === 'shared') {
    const eco = ecoOfId(idOfSlug(parts[1] || ''));
    return eco ? redirect(`/${eco}/${parts[1]}`) : page(404, 'Not found', 'This report does not exist.');
  }

  if (ECOS.includes(parts[0])) {
    const eco = parts[0];
    // A report path must belong to this ecosystem (no opening drone reports under /fire/...).
    if (parts[1] && ecoOfId(idOfSlug(parts[1])) !== eco) return page(404, 'Not found', 'This report does not exist.');
    return (await session(req, eco)) ? next() : redirect(loginUrl(eco, url.pathname));
  }

  if (parts[0] === 'api') {
    if (parts[1] === 'enrich') {
      for (const e of ECOS) if (await session(req, e)) return handleEnrich(req);
      return json({ error: 'Unauthorized' }, 401);
    }
    // Report data: only for the session of the report's own ecosystem.
    if (parts[1] === 'dashboards') {
      const eco = ecoOfId(parts[2]);
      if (eco && await session(req, eco)) return next();
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    for (const e of ECOS) if (await session(req, e)) return next();
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  return next();
}
