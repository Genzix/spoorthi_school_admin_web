import { SCHOOLS, DEFAULT_SCHOOL_SLUG, HOST_TO_SLUG } from './registry';

const RESERVED_SUBDOMAINS = new Set([
  'www',
  'app',
  'api',
  'admin',
  'localhost',
  'staging',
  'preview',
]);

/**
 * Extract school slug from hostname.
 * e.g. spoorthi.yourproduct.com → spoorthi
 * Custom domains map via HOST_TO_SLUG.
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

  const parts = host.split('.');
  if (parts.length < 3) return null;

  const sub = parts[0];
  if (RESERVED_SUBDOMAINS.has(sub)) return null;
  return sub;
};

/** Read ?school= from the current URL (local / preview override). */
export const slugFromQuery = (search = typeof window !== 'undefined' ? window.location.search : '') => {
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
 * 1. Subdomain / custom host
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
  if (fromHost) return fromHost;

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
 * When slug is unknown, school is null and known is false.
 */
export const resolveSchool = (options = {}) => {
  const slug = resolveSchoolSlug(options);
  const school = SCHOOLS[slug] || null;
  return {
    slug,
    school,
    known: Boolean(school),
  };
};

/** Persist resolved slug for subsequent visits (local override). */
export const rememberSchoolSlug = (slug) => {
  try {
    if (slug) localStorage.setItem('schoolSlug', slug);
  } catch {
    /* ignore */
  }
};
