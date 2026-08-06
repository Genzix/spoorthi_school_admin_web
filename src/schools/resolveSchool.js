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

/** Longest slug first so "gencampus" wins over a shorter accidental match. */
const knownSlugsLongestFirst = () =>
  listSchoolSlugs().sort((a, b) => b.length - a.length);

const isPlatformHost = (host) =>
  PLATFORM_HOST_SUFFIXES.some((suffix) => host.endsWith(suffix));

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
 * Extract school slug from hostname.
 * - Custom domains via HOST_TO_SLUG
 * - Any host containing a known slug (spoorthi / gencampus in the URI)
 * - Product subdomain only when it exactly matches a known school
 * - Platform project names (*.vercel.app) are not tenants unless they embed a slug
 */
export const slugFromHostname = (hostname = '') => {
  const host = String(hostname).toLowerCase().split(':')[0];
  if (!host) return null;

  if (HOST_TO_SLUG[host]) return HOST_TO_SLUG[host];

  // Local / IP hosts have no tenant subdomain
  if (
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    /^\d+\.\d+\.\d+\.\d+$/.test(host) ||
    host === '127.0.0.1'
  ) {
    return null;
  }

  // spoorthi-school-admin-web.vercel.app, spoorthi.example.com, etc.
  const embedded = slugEmbeddedInHost(host);
  if (embedded) return embedded;

  // Preview/platform hosts without an embedded school slug → use query/default
  if (isPlatformHost(host)) return null;

  const parts = host.split('.');
  if (parts.length < 3) return null;

  const sub = parts[0];
  if (RESERVED_SUBDOMAINS.has(sub)) return null;

  // Only accept exact known school subdomains (ignore unknown labels)
  if (SCHOOLS[sub]) return sub;

  return null;
};

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

/**
 * Resolution order:
 * 1. Hostname (custom map, embedded slug, known subdomain)
 * 2. ?school= query
 * 3. VITE_DEFAULT_SCHOOL
 * 4. localStorage.schoolSlug
 * 5. DEFAULT_SCHOOL_SLUG (spoorthi)
 */
export const resolveSchoolSlug = (options = {}) => {
  const {
    hostname = typeof window !== 'undefined' ? window.location.hostname : '',
    search = typeof window !== 'undefined' ? window.location.search : '',
  } = options;

  const fromHost = slugFromHostname(hostname);
  if (fromHost && SCHOOLS[fromHost]) return fromHost;

  const fromQuery = slugFromQuery(search);
  if (fromQuery) return fromQuery;

  const fromEnv = (import.meta.env.VITE_DEFAULT_SCHOOL || '').trim().toLowerCase();
  if (fromEnv) return fromEnv;

  try {
    const fromStorage = (localStorage.getItem('schoolSlug') || '').trim().toLowerCase();
    if (fromStorage) return fromStorage;
  } catch {
    /* ignore */
  }

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

/** Persist resolved slug for subsequent visits (local override). */
export const rememberSchoolSlug = (slug) => {
  try {
    if (slug && SCHOOLS[slug]) localStorage.setItem('schoolSlug', slug);
  } catch {
    /* ignore */
  }
};
