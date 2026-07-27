import { useEffect, useMemo, useState } from 'react';
import {
  MIN_SEARCH_LENGTH,
  SEARCH_DEBOUNCE_MS,
  getSearchHint,
  resolveSearchQuery,
} from '../utils/searchConfig';

/**
 * Debounced search input with minimum character threshold.
 * - Empty → effectiveQuery '' (no text filter)
 * - 1..min-1 → effectiveQuery null (blocked), shows hint
 * - min+ → effectiveQuery after debounce
 */
export const useDebouncedSearch = ({
  debounceMs = SEARCH_DEBOUNCE_MS,
  minLength = MIN_SEARCH_LENGTH,
} = {}) => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue.trim());
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [inputValue, debounceMs]);

  const effectiveQuery = useMemo(
    () => resolveSearchQuery(debouncedValue, minLength),
    [debouncedValue, minLength]
  );

  const isBelowMinLength =
    debouncedValue.length > 0 && debouncedValue.length < minLength;

  const searchHint = getSearchHint(inputValue, minLength);

  const resetSearch = () => setInputValue('');

  return {
    inputValue,
    setInputValue,
    debouncedValue,
    effectiveQuery,
    isBelowMinLength,
    searchHint,
    minLength,
    resetSearch,
  };
};

export default useDebouncedSearch;
