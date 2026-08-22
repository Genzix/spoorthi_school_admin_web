/** Shared search behaviour across fee + student screens */
export const SEARCH_DEBOUNCE_MS = 400;
export const MIN_SEARCH_LENGTH = 3;

const trimSearch = (value) => (value ?? '').toString().trim();

export const isBelowMinSearchLength = (
  value,
  minLength = MIN_SEARCH_LENGTH
) => {
  const trimmed = trimSearch(value);
  return trimmed.length > 0 && trimmed.length < minLength;
};

/**
 * Returns API-ready query string, or null when below minimum length.
 * Empty input → '' (list/filter-only fetch).
 */
export const resolveSearchQuery = (value, minLength = MIN_SEARCH_LENGTH) => {
  const trimmed = trimSearch(value);
  if (!trimmed) return '';
  if (trimmed.length < minLength) return null;
  return trimmed;
};

/**
 * Decide whether to hit the API for a debounced value.
 * - empty → fetch full list
 * - 1..min-1 → hold (no request; keep current rows + show hint)
 * - min+ → fetch with q
 */
export const resolveSearchFetch = (debouncedValue, minLength = MIN_SEARCH_LENGTH) => {
  const trimmed = trimSearch(debouncedValue);

  if (!trimmed) {
    return { shouldFetch: true, qParam: undefined, trimmed: '' };
  }

  if (trimmed.length < minLength) {
    return { shouldFetch: false, qParam: undefined, trimmed };
  }

  return { shouldFetch: true, qParam: trimmed, trimmed };
};

export const getSearchPlaceholder = (base = 'Search', minLength = MIN_SEARCH_LENGTH) =>
  `${base} (min ${minLength} characters)`;

export const getSearchHint = (value, minLength = MIN_SEARCH_LENGTH) => {
  const trimmed = trimSearch(value);
  if (!trimmed) return '';
  if (trimmed.length < minLength) {
    const remaining = minLength - trimmed.length;
    return `Type ${remaining} more character${remaining === 1 ? '' : 's'} to search`;
  }
  return '';
};
