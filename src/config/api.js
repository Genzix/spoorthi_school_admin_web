const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!rawBaseUrl) {
  console.warn(
    'VITE_API_BASE_URL is not set. Add it to your .env file (see .env.example).'
  );
}

/** Env fallback when no school has set an API host yet. */
export const ENV_API_BASE_URL = (rawBaseUrl || '').replace(/\/+$/, '');

/**
 * Active school API origin (no trailing slash).
 * Live ESM binding — updated by setApiBaseUrl when the tenant resolves.
 * Existing `${API_BASE_URL}/...` call sites pick up the school host at request time.
 */
export let API_BASE_URL = ENV_API_BASE_URL;

/** Update the active API origin (called by SchoolProvider). */
export const setApiBaseUrl = (url) => {
  const next = (url || '').replace(/\/+$/, '');
  API_BASE_URL = next || ENV_API_BASE_URL;
};

export const getApiBaseUrl = () => API_BASE_URL || ENV_API_BASE_URL;

/** Build a full API URL from a path segment against the active school. */
export const apiUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};
