const rawBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!rawBaseUrl) {
  console.warn(
    'VITE_API_BASE_URL is not set. Add it to your .env file (see .env.example).'
  );
}

/** API origin without trailing slash, e.g. https://spoorthischool.genzix.space */
export const API_BASE_URL = (rawBaseUrl || '').replace(/\/+$/, '');

/** Build a full API URL from a path segment. */
export const apiUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
