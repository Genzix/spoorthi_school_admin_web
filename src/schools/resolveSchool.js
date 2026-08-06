import { SCHOOLS, DEFAULT_SCHOOL_SLUG, HOST_TO_SLUG, listSchoolSlugs } from './registry';

const RESERVED_SUBDOMAINS = new Set([
  'www',
  'app',
  'api',
  'admin',
  'localhost',
  'staging',
  'preview',
]);

/** Hosting platforms whose leftmost label is the project name, not a tenant. */
const PLATFORM_HOST_SUFFIXES = [
  '.vercel.app',
  '.netlify.app',
  '.github.io',
  '.pages.dev',
  '.web.app',
  '.firebaseapp.com',
];

const STORAGE_KEY = 'schoolSlug';

/** Longest slug first so "gencampus" wins over a shorter accidental match. */
const knownSlugsLongestFirst = () =>
  listSchoolSlugs().sort((a, b) => b.length - a.length);

export const isPlatformHost = (host) =>
  PLATFORM_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));

export const isLocalHost = (host) =>
  host === 'localhost' ||
  host.endsWith('.localhost') ||
  /^\d+\.\d+\.\d+\.\d+$/.test(host) ||
  host === '127.0.0.1';

/**
 * If hostname contains a registered school slug anywhere
 * (e.g. spoorthi-school-admin-web.vercel.app → spoorthi).
 */
export const slugEmbeddedInHost = (hostname = '') => {
  const host = String(hostname).toLowerCase().split(':')[0];
  if (!host) return null;
  return knownSlugsLongestFirst().find((slug) => host.includes(slug)) || null;
};

/**
 * Exact product subdomain on a real domain (not platform / localhost).
 * e.g. gencampus.yourproduct.com → gencampus
 */
export const slugFromExactSubdomain = (hostname = '') => {
  const host = String(hostname).toLowerCase().split(':')[0];
  if (!host || isLocalHost(host) || isPlatformHost(host)) return null;

  const parts = host.split('.');
  if (parts.length < 3) return null;

  const sub = parts[0];
  if (RESERVED_SUBDOMAINS.has(sub)) return null;
  return SCHOOLS[sub] ? sub : null;
};

/**
 * Locked (authoritative) host binding — custom domain map or exact tenant subdomain.
 * Soft platform project names are NOT locked so ?school= / sticky storage can win.
 */
export const slugFromLockedHost = (hostname = '') => {
  const host = String(hostname).toLowerCase().split(':')[0];
  if (!host) return null;

  if (HOST_TO_SLUG[host]) return HOST_TO_SLUG[host];
  return slugFromExactSubdomain(host);
};

/**
 * Soft host hint — slug embedded in hostname (incl. platform project names).
 */
export const slugFromSoftHost = (hostname = '') => {
  const host = String(hostname).toLowerCase().split(':')[0];
  if (!host || isLocalHost(host)) return null;
  return slugEmbeddedInHost(host);
};

/**
 * Extract school slug from hostname (locked first, then soft).
 * Prefer slugFromLockedHost / slugFromSoftHost when distinguishing priority.
 */
export const slugFromHostname = (hostname = '') =>
  slugFromLockedHost(hostname) || slugFromSoftHost(hostname);

/** True when the host alone dictates the tenant (production DNS). */
export const isTenantHostLocked = (
  hostname = typeof window !== 'undefined' ? window.location.hostname : ''
) => Boolean(slugFromLockedHost(hostname));

/** Read ?school= from the current URL (local / preview override). */
export const slugFromQuery = (
  search = typeof window !== 'undefined' ? window.location.search : ''
) => {
  try {
    const params = new URLSearchParams(search);
    const value = params.get('school');
    return value ? value.trim().toLowerCase() : null;
  } catch {
    return null;
  }
};

export const slugFromStorage = () => {
  try {
    const fromStorage = (localStorage.getItem(STORAGE_KEY) || '').trim().toLowerCase();
    return fromStorage || null;
  } catch {
    return null;
  }
};

/**
 * Resolution order (sticky-safe):
 * 1. Locked hostname (custom map / exact tenant subdomain)
 * 2. Explicit ?school= query
 * 3. Soft hostname hint (slug embedded in platform project name)
 * 4. Sticky localStorage.schoolSlug
 * 5. VITE_DEFAULT_SCHOOL (cold-start default only)
 * 6. DEFAULT_SCHOOL_SLUG (spoorthi)
 */
export const resolveSchoolSlug = (options = {}) => {
  const {
    hostname = typeof window !== 'undefined' ? window.location.hostname : '',
    search = typeof window !== 'undefined' ? window.location.search : '',
  } = options;

  const locked = slugFromLockedHost(hostname);
  if (locked && SCHOOLS[locked]) return locked;

  const fromQuery = slugFromQuery(search);
  if (fromQuery) return fromQuery;

  const soft = slugFromSoftHost(hostname);
  if (soft && SCHOOLS[soft]) return soft;

  const fromStorage = slugFromStorage();
  if (fromStorage && SCHOOLS[fromStorage]) return fromStorage;

  const fromEnv = (import.meta.env.VITE_DEFAULT_SCHOOL || '').trim().toLowerCase();
  if (fromEnv) return fromEnv;

  return DEFAULT_SCHOOL_SLUG;
};

/**
 * Resolve full school config. Returns { school, slug, known }.
 * Unknown explicit ?school= → not found. Everything else falls back to default.
 */
export const resolveSchool = (options = {}) => {
  const {
    search = typeof window !== 'undefined' ? window.location.search : '',
  } = options;

  const slug = resolveSchoolSlug(options);
  if (SCHOOLS[slug]) {
    return { slug, school: SCHOOLS[slug], known: true };
  }

  const fromQuery = slugFromQuery(search);
  if (fromQuery && !SCHOOLS[fromQuery]) {
    return { slug: fromQuery, school: null, known: false };
  }

  const fallback = DEFAULT_SCHOOL_SLUG;
  return {
    slug: fallback,
    school: SCHOOLS[fallback] || null,
    known: Boolean(SCHOOLS[fallback]),
  };
};

/** Persist resolved slug for subsequent visits (local / preview sticky tenant). */
export const rememberSchoolSlug = (slug) => {
  try {
    if (slug && SCHOOLS[slug]) localStorage.setItem(STORAGE_KEY, slug);
  } catch {
    /* ignore */
  }
};

/**
 * Keep ?school= in the URL on shared hosts (localhost / platform) so reload
 * and shareable links stay on the active tenant. No-op on locked DNS hosts.
 */
export const syncSchoolQueryInUrl = (
  slug,
  {
    hostname = typeof window !== 'undefined' ? window.location.hostname : '',
    href = typeof window !== 'undefined' ? window.location.href : '',
  } = {}
) => {
  if (typeof window === 'undefined' || !slug || !SCHOOLS[slug]) return;
  if (isTenantHostLocked(hostname)) return;

  try {
    const url = new URL(href || window.location.href);
    if (url.searchParams.get('school') === slug) return;
    url.searchParams.set('school', slug);
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  } catch {
    /* ignore */
  }
};

/**
 * Build a path that carries the tenant on soft hosts.
 * Locked hosts omit ?school= (DNS already defines the school).
 */
export const schoolAwarePath = (
  path = '/',
  slug = resolveSchoolSlug(),
  {
    hostname = typeof window !== 'undefined' ? window.location.hostname : '',
  } = {}
) => {
  if (!slug || !SCHOOLS[slug] || isTenantHostLocked(hostname)) return path;
  const [pathname, hash = ''] = String(path).split('#');
  const hasQuery = pathname.includes('?');
  const joiner = hasQuery ? '&' : '?';
  // Avoid duplicating school= if caller already set it
  if (/[?&]school=/.test(pathname)) {
    return hash ? `${pathname}#${hash}` : pathname;
  }
  const next = `${pathname}${joiner}school=${encodeURIComponent(slug)}`;
  return hash ? `${next}#${hash}` : next;
};
