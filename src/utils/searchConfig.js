/** Shared search behaviour across fee + student screens */
export const SEARCH_DEBOUNCE_MS = 400;
export const MIN_SEARCH_LENGTH = 3;

/**
 * Returns API-ready query string, or empty when below minimum length.
 * Empty input → no text filter (list/filter-only fetch).
 */
export const resolveSearchQuery = (value, minLength = MIN_SEARCH_LENGTH) => {
  const trimmed = (value ?? '').toString().trim();
  if (!trimmed) return '';
  if (trimmed.length < minLength) return null;
  return trimmed;
};

export const getSearchPlaceholder = (base = 'Search', minLength = MIN_SEARCH_LENGTH) =>
  `${base} (min ${minLength} characters)`;

export const getSearchHint = (value, minLength = MIN_SEARCH_LENGTH) => {
  const trimmed = (value ?? '').toString().trim();
  if (!trimmed) return '';
  if (trimmed.length < minLength) {
    return `Type ${minLength - trimmed.length} more character${minLength - trimmed.length === 1 ? '' : 's'} to search`;
  }
  return '';
};
