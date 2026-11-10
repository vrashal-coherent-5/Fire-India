// Auth0 login gate. Fire and Drone each have their own session cookie, their own
// login (prompt=login, so an Auth0 session for one never silently unlocks the other)
// and their own Auth0 role. Reports and report data are only served to the session
// for the ecosystem the report belongs to.

export const config = {
  matcher: ['/', '/fire', '/fire/:path*', '/drone', '/drone/:path*', '/adhesive', '/adhesive/:path*', '/profoods', '/profoods/:path*', '/shared/:path*', '/api/:path*', '/auth/:path*', '/index.html'],
};

const IDS = {
  fire: ['5c5554e08fd56ca5e0f53fcb','4363fea5254c96601438c964','7401cc97dcaac538fceabbd8','880ff6af70d7225cb4cdefd2','2fe8bf8f72cf0896dbd27931','fbbe54c36994bdd98559b60a','838ac4df67fd28a3b0220497','8d4e25ca9f72f33ae2d34118','83085f668d9ad8def2b3ff0b','275958c68bf24c853e97526a','9b8793de7b99cfb4b0ddb754','bcb4a53a9ed56b700e042546','cee58afdbf7a274842fb92d8','8c5c4c2b50eb5478d7215fdf','f198d984ab817383192497da','dfe0dca378538c941a579b39','2c7282c554e431ba271018ab','e129c07b28ea36e763fd1a38','a180cc086a444afb48bc552e','17410ddd30de45f0a31fdab8','7410559951d9fc2cd38ec5ce','63be66c6a73530ffdf737bd6','269e327068ad045b72f3e89f','d1d54383cdbceed4f98e4655','6ab734759041a0a01bbdb311'],
  drone: ['794643a37c1b8b8941e1fe20','caa29fde63afe414f3e02797','1005dac62aa4a5908103614c','0045a0e8008d3035b54fc2d7','71f14906d069058a1b674cb2','089808417bab32e3babd59e6','5216a5d851768ebd0b6f0b49','bf67d756b95acbff667557b6','f76f5bf292564532d3d7b7bd','70794012835421e92a77d65b','0011de38a3eac1cedbf6734d','fa2ab84532d5245e3e9a35c2','161c420ca349a076f7c9818a','dfa781d2493b6f7127239915','5f49d5b5a8503699e994f8ef','f016a05eb1fc88198a547e68','39d287dbfbba2f1f876cf208','cd695bdb740a552359a401a0','15b04c703a468a93f33083bd','05e97971de692dabc534ea37','aee48e8ac7f8d723ce6000b9','3d27e979b3b291a868fad634','8240120e5ba386d44a564691','361d2434245d6d31a89c9b1b','255b49318d003f2180fb3b52','f27540157319f4b0ca368471','02d7219c369037c106e08582','aa98673701ccd68ec0f0b16a','8c3584d9c260d0c196092946','09df29b8201c5c48ac56d166','887ac2c49d03c9fc8bbc5613','85125963c67d3d424bed8c4e','8012a01314a05c377fdca506','6949ac5ae81304e76a8caeb4'],
  adhesive: ['8b4e5f59cabe714abd99d68c','ba407a365504698f156412c6','7afecb8d120e26e25fc34ead','759ad4e2bb3e5b9d7a4cee7e','43fa2b91bf5d813c94408eab','93b38e34cf66dcb632e5f220','b2e100b3cf0f5e96c6387434','5dcff82f96b1daefc935b242','c0677265b4d58257e358ab0c','6f68c23990944a044bd9b471','db2267703c8783df43d42f05','eb578e5c03c0ed97eb107db5','fa164fbf0016aca7917a001b','9ee20d87e49bc746626f4300','f48a07f4f4bfd03ff641e795','0f68cc1980d35afbc27d35ea','388ecb5a89553ff9ae334ddf','e6f143edaaeb30d0e5bf5a57','39b41ffaa81bc21cd7187684','4bc49711c2d336db20e4176a','29b95cda0f6811170c579b76','063d295864d2ad82beacca25','7c4c628204a203bb38ff8c5e','534755827c04aab72f1ece1e','d67b6c4bd265fa13e1976780','297c83878d0649382fcea690','15a6201bbbcbefb8fd8d6746','182781e84c93868e734dcdce','115c18383a50f279f0edbb05','0febe55cd8ac152e21950788','c95eb94e31e61d327cd1d652','07df906b842e5713e726baad','18e435533344a54b51f33b73','4c4ed84d333261ba68731377','c41d2b8d1e678c1d94b2e171','ac53bcdf2ea6b0d7a3118399','8eae7eaeea5303a5e1852664','cf4729f3f9def5521675724c','37107f0a7e7916734cf3eab5','0bebddec095878d894929b62','8c38d5af73fa7aea1d1e8b0f','8c103d9c69fcbf6523fb5058','e424ef9efc17e31fa0d06184','814cb825b62371f1e15c177f','27adc867927747b4a038c2db','8fbeb0d0257eb2b522fbf859','e7bf0fcf5e99a7fb38e32dff','cd664ab795136ffb167488da','586b2743b4fd4ba76d88118b','b97a3cd0cd7ed068746b0d16','b1552ce23b8c8ad3d48b3ce8','313edc6f97387015b0ea3bc0','3ed9ff8cb16f270e6995dba6','27ce5b9fc19491cc02ff59ed','b8b02ee003803f706e6a27b4','fb4a9ee0ef9245d1b6a47767','23875f8d1d0845ec97fc5d89','d9ab5fbfb9ff246bdcd4063c','784d4cf7102ef6efbef1694e','805f1e24149391c8ef03f6a7','8d0fc809398d64540f348f65','44a42ec435c44fec29152270','55443d9927cb2c39e6f02375','cd34212e8598df2fc69c39ce','c2a5f265c6b0d95b4646e783','57e1bb8ccca2e2be7d010ca3','98ae655969f6f761bf01ea9e','97a149a6ece91daa5b23f2e6','f868d58d4ca635ac49859dfd','0c635563b82966e2bd19e1b7','87b9662e956f8a14d2a20896','d93122da07aa1739e27ec1c1','3134d5c4b7a3a62bfe3e14fe','1cc6f76be9ef594a5d6aa34d','442317b96d47011cbe5edf93','571a9051aa43b5b66ff01f10','d3903fbae10f1b6d5711bde4','feadf1f7193f5a3dac038898','9979380877438956a55335ce','ef46dfaad91ec6f3ecebc2f8','81c3ab406b6bb07fafd089e6','4afe7bfe8504fc8c2600b7eb','b6ad295222c435c199dc390f','6573662eb60869589ed59fef','e9c288d00b790d1b69490220','09aef5bc8de1680689daaeef','10a0c520d44000f445209ab6','f9b2863385b111d496ea6417','3009b15a592eeaf47e0ebea0','70060a1d64856c9eb7aa461d','33a40ba7c60c2850c862a122','85ac342b280f505a94019d75','c8787023f4e4671f0e5882aa','a150eb93f457629ff29d5612','6f130be73c0d25b8e5eb073c','dca23d5642df582bc9c3e0d5','1fde57fe80b375a5ad2596c9','ded9ba6f32dd330525c711b8','0bce639855b26b5be9f21ce3','0721fabf446056e129ba25dc','fbb7b34293d40e6ea7508096','efb4796b37472df94a490ece','297ef0c875e1c64f6942f073','a1138992f48ba133dd220151','a574ef8b16158c4cb970f44f','3f440c9d2bde465630b3b73e','f0b7af6d87b0350f884a153b','0073f0dae8bd26b919368922','1d15af1bed67b2b91eb97db2','36d7ed514fdcac9ff39f26f2','e5a131b174a6c2633b883122','ca79b5846b97ccd58afd14e8','67518cf12210d7810f67bfe8','12f8652a89b17cb2c76de541','c8d702580afe27c3f8bf8b6c','e6a44ad52c5992df793cb789','8265e66fb652005aa7d8e58d','e04352501b45613b32bb144f','08ffe0f85fda0af7cac34e8e','10e6414ad27d704abfee079d'],
  profoods: ['eebf31eb6fe641aa0d98f789','13a73848dc204fa3606115fe','807deee582a31066d721b773','9122591526cf6bea3cc2a7e2','d9c6e1004e4eb89fd4806b00','dc7944384dddcf7a07d7b9b5','ad567a60b2db0fab812ed947','dc1b2d672a6e78ca01b7ea13','16e96783b255ee7be8a9c08d','642ef256615eeda0a789fcc5','77a6405d46d2c3681ba6aa47','4bbe8fdfa1a71f2727c4c4e0','586d86c472044aebbabbade3','e3db9426060153ef9eb05ae4','fe8bc9c54b12f8478d15d48e','e3fe43101c7a83793618741e','7431fd71612dc4f008667755','66da747d4f9330f77c314a32','f444becf45293b83a81eb0a6','95c6c429e2df0451ed78bb1c','1be9afa8f274405cd0768839','cec23397c184c1aed5ff72cf','ed1e796758fa682f159c2db6','6a7ae3d27576336cf8409f5a','b2922458101ca3b98610b85a','7cb382bd3e61bcddb7a20617','17a6ebcc9e2ee70cf6109be0','d950af9beeb69324eaee5c7b','c188e47a71427c1e2fdb75db','712256e62da16e8f7de4c368','65273a137c50d34fafebd594','8d225864c01c5aa460ee8491','87b01840ebcd7fe8920548e7','8371174f5a73f6bed8a1f2ee','c0c44b6d886747a44c4d0e60','94e218f6757a8f274aec2bf7','19f5ad73f336548e0afb60a6','26b18a14467fd676e95a70fb','eedea3795a93938e551696cb','187b3493a068b923d858b0fb','98da3279c3ead13eb54379c1','74b6fba34b4a743fe1444484','50c122539d9cdd54effb82dd','62364f4b895a12aa1f124972','361687a9c359c03a88b4d989','dbeb47044be4b8aaa9960569','f80999e647d84d6e5a1f5548','6905cfa849ef7693a4e51884','6ad37844a5b393bba73ad545','15b52ba428d90731217590ed','c66a2f8e1c72d6af3ac2da54','dcefe89cf219c15546333c0e','48b59ef721c9a974a83d11ed','3c8ec56784e6db10e9b9096c','828c92a58900e2a61425aece','28991f5b8255b222ce96359c','c7bddc0b11900415f2b1f474','82069639f14bdb4f18794a76','744fc55b3e7170603115592b','5049bb6be3fbc865a743741a','d0b5e6b4305ce1109d2609cc','edbd7bbd5f0a130cee8c6e3f','09d2a5db5b1fd131cfb38c24','698e2bfadeb00f15bcbf1ee0','79b1e00c4d666c85912dc536','864cb53f085350e6780d8c6d','652a717d2a5c6bca4f0f800e','39bcaa5b1d8b496dbbeb1a9d','f52522c9f970998cfb567a39','f3dd5dc52fa4d1301c3b942d','e39c0b439f049c2ddc2d15aa','8bdd4015d6a2086ca4bd1e1d','c7305220d590641f476ecd27','950a09f51d70868017784560','9554f8879d2068189aeecd7e'],
};
const ECOS = ['fire', 'drone', 'adhesive', 'profoods'];
const ROLE = { fire: 'fire-access', drone: 'drone-access', adhesive: 'adhesive-access', profoods: 'profoods-access' };
const ROLES_CLAIM = 'https://coherentinsightvault.com/roles';
const SESSION_HOURS = 8;

const ecoOfId = id => ECOS.find(e => IDS[e].includes(id));
const idOfSlug = slug => (slug.match(/--([0-9a-f]{24})$/) || [])[1];

// ---------- helpers ----------
const next = () => new Response(null, { headers: { 'x-middleware-next': '1' } });
const redirect = (url, cookies = []) => {
  const h = new Headers({ Location: url, 'Cache-Control': 'no-store' });
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
      const name = { fire: 'Fire', drone: 'Drone', adhesive: 'Adhesives and Bonding', profoods: 'PROFOODS' }[tx.eco];
      return page(403, 'No access', `Your account (${claims.email || claims.sub}) does not have access to the ${name} Ecosystem reports. Please contact Coherent Market Insights for access.`, [clearTx]);
    }
    const sess = await seal({ sub: claims.sub, email: claims.email, eco: tx.eco, exp: Date.now() + SESSION_HOURS * 3600e3 });
    // Only one Set-Cookie here: some edge proxies merge several into one header and the
    // browser would then keep just the first. The login cookie expires on its own (10 min).
    return redirect(tx.returnTo, [cookie(`cv_${tx.eco}`, sess, SESSION_HOURS * 3600)]);
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
    // Every market list is browsable without a login; opening a report still needs one.
    if (!parts[1]) return next();
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
