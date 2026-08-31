import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  fetchStudentFilterOptions,
  searchStudents,
} from '../utils/studentSearchApi';
import {
  MIN_SEARCH_LENGTH,
  SEARCH_DEBOUNCE_MS,
  getSearchHint,
  isBelowMinSearchLength,
  resolveSearchFetch,
} from '../utils/searchConfig';

const EMPTY_OPTIONS = {
  batches: [],
  classes: [],
  groups: [],
  sections: [],
};

const EMPTY_FILTERS = {
  batchId: '',
  classNameId: '',
  groupId: '',
  sectionId: '',
  status: '',
};

const readStorage = (storageKey, currentAyId) => {
  if (!storageKey || typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    // If academicYearId is saved and differs from current (when current is known), discard
    if (
      currentAyId &&
      parsed.academicYearId &&
      String(parsed.academicYearId) !== String(currentAyId)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

/**
 * Server-backed student list: search API + Year→Batch→Class→Group→Section cascade.
 * Search waits until debounced input is empty or >= minSearchLength (default 3).
 * Supports storageKey for persisting filters/search across route navigation in sessionStorage.
 */
export const useStudentListQuery = ({
  academicYearId = '',
  debounceMs = SEARCH_DEBOUNCE_MS,
  minSearchLength = MIN_SEARCH_LENGTH,
  pageSize = 20,
  enabled = true,
  extraSearchParams = {},
  storageKey = '',
} = {}) => {
  const initialStorage = useMemo(
    () => readStorage(storageKey, academicYearId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const [searchTerm, setSearchTermRaw] = useState(
    () => initialStorage?.searchTerm ?? ''
  );
  const [debouncedQ, setDebouncedQ] = useState(
    () => (initialStorage?.searchTerm ?? '').trim()
  );
  const [filters, setFilters] = useState(() => ({
    ...EMPTY_FILTERS,
    ...(initialStorage?.filters || {}),
  }));
  const [options, setOptions] = useState(EMPTY_OPTIONS);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(() => initialStorage?.page ?? 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);
  const prevAyRef = useRef(academicYearId);
  const extraParamsRef = useRef(extraSearchParams);
  extraParamsRef.current = extraSearchParams;

  // Sync to sessionStorage whenever relevant state changes
  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') return;
    const hasAnyFilter = Boolean(
      searchTerm.trim() ||
        filters.batchId ||
        filters.classNameId ||
        filters.groupId ||
        filters.sectionId ||
        filters.status ||
        page > 1
    );

    try {
      if (hasAnyFilter) {
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            academicYearId: academicYearId || '',
            searchTerm,
            filters,
            page,
          })
        );
      } else {
        sessionStorage.removeItem(storageKey);
      }
    } catch {
      // ignore storage quota/private mode
    }
  }, [storageKey, academicYearId, searchTerm, filters, page]);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQ(searchTerm.trim()), debounceMs);
    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  const searchFetch = useMemo(
    () => resolveSearchFetch(debouncedQ, minSearchLength),
    [debouncedQ, minSearchLength]
  );

  const isBelowMinLength = isBelowMinSearchLength(debouncedQ, minSearchLength);
  const isPendingBelowMin = isBelowMinSearchLength(searchTerm, minSearchLength);
  const isDebouncing = searchTerm.trim() !== debouncedQ;
  const isSearchTypingHint = isPendingBelowMin || isBelowMinLength;

  const searchHint = getSearchHint(searchTerm, minSearchLength);

  const totalPages = Math.max(1, Math.ceil(count / pageSize) || 1);

  // Reset cascade children ONLY when academic year changes to a different non-empty value
  // or switches after initial mount. Avoid wiping restored cache on initial AY resolution.
  useEffect(() => {
    const prevAy = prevAyRef.current;
    prevAyRef.current = academicYearId;

    if (!prevAy && academicYearId) {
      // First resolution of academic year (e.g. async context load)
      // Check if session storage matched this academic year; if so, retain it
      if (storageKey && typeof window !== 'undefined') {
        const stored = readStorage(storageKey, academicYearId);
        if (stored?.filters) {
          return;
        }
      }
    }

    if (prevAy && academicYearId && String(prevAy) !== String(academicYearId)) {
      setFilters(EMPTY_FILTERS);
      setPage(1);
      if (storageKey && typeof window !== 'undefined') {
        try {
          sessionStorage.removeItem(storageKey);
        } catch {
          // ignore
        }
      }
    }
  }, [academicYearId, storageKey]);

  const loadFilterOptions = useCallback(async () => {
    if (!enabled) return;
    setOptionsLoading(true);
    try {
      const next = await fetchStudentFilterOptions({
        academicYearId: academicYearId || undefined,
        batchId: filters.batchId || undefined,
        classNameId: filters.classNameId || undefined,
        groupId: filters.groupId || undefined,
      });
      setOptions({
        batches: next.batches,
        classes: next.classes,
        groups: next.groups,
        sections: next.sections,
      });
    } catch (err) {
      console.error('Failed to load student filter options', err);
      setOptions(EMPTY_OPTIONS);
    } finally {
      setOptionsLoading(false);
    }
  }, [
    enabled,
    academicYearId,
    filters.batchId,
    filters.classNameId,
    filters.groupId,
  ]);

  useEffect(() => {
    loadFilterOptions();
  }, [loadFilterOptions]);

  const loadStudents = useCallback(async () => {
    if (!enabled) return;

    // 1–2 characters: wait for min length — no API call, no loading flash.
    if (!searchFetch.shouldFetch) return;

    const requestId = ++requestIdRef.current;
    setLoading(true);
    setError(null);
    try {
      const result = await searchStudents({
        q: searchFetch.qParam,
        page,
        pageSize,
        academicYearId: academicYearId || undefined,
        batchId: filters.batchId || undefined,
        classNameId: filters.classNameId || undefined,
        groupId: filters.groupId || undefined,
        sectionId: filters.sectionId || undefined,
        status: filters.status || undefined,
        ...extraParamsRef.current,
      });
      if (requestId !== requestIdRef.current) return;
      setStudents(result.results);
      setCount(result.count);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      console.error('Failed to search students', err);
      setError(err.response?.data?.message || err.message || 'Failed to search students');
      setStudents([]);
      setCount(0);
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [
    enabled,
    searchFetch,
    page,
    pageSize,
    academicYearId,
    filters.batchId,
    filters.classNameId,
    filters.groupId,
    filters.sectionId,
    filters.status,
  ]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const setFilter = useCallback((key, value) => {
    setPage(1);
    setFilters((prev) => {
      const next = { ...prev, [key]: value };

      if (key === 'batchId') {
        next.classNameId = '';
        next.groupId = '';
        next.sectionId = '';
      } else if (key === 'classNameId') {
        next.groupId = '';
        next.sectionId = '';
      } else if (key === 'groupId') {
        next.sectionId = '';
      }

      return next;
    });
  }, []);

  const setSearchTerm = useCallback((value) => {
    const next =
      typeof value === 'string' ? value : (value?.target?.value ?? '');
    setPage(1);
    setSearchTermRaw(next);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    setSearchTermRaw('');
    setPage(1);
    if (storageKey && typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    }
  }, [storageKey]);

  const hasActiveFilters = Boolean(
    searchTerm.trim() ||
      filters.batchId ||
      filters.classNameId ||
      filters.groupId ||
      filters.sectionId ||
      filters.status
  );

  const activeFiltersCount = useMemo(() => {
    let cnt = 0;
    if (searchTerm.trim()) cnt++;
    if (filters.batchId) cnt++;
    if (filters.classNameId) cnt++;
    if (filters.groupId) cnt++;
    if (filters.sectionId) cnt++;
    if (filters.status) cnt++;
    return cnt;
  }, [filters, searchTerm]);

  const refresh = useCallback(() => {
    loadFilterOptions();
    loadStudents();
  }, [loadFilterOptions, loadStudents]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    setFilter,
    clearFilters,
    hasActiveFilters,
    activeFiltersCount,
    options,
    optionsLoading,
    students,
    count,
    page,
    setPage,
    pageSize,
    totalPages,
    loading,
    error,
    refresh,
    searchHint,
    isBelowMinLength,
    isPendingBelowMin,
    isSearchTypingHint,
    isDebouncing,
    minSearchLength,
  };
};

export default useStudentListQuery;
