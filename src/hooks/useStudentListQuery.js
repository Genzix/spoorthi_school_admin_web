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

/**
 * Server-backed student list: search API + Year→Batch→Class→Group→Section cascade.
 * Search waits until debounced input is empty or >= minSearchLength (default 3).
 */
export const useStudentListQuery = ({
  academicYearId = '',
  debounceMs = SEARCH_DEBOUNCE_MS,
  minSearchLength = MIN_SEARCH_LENGTH,
  pageSize = 20,
  enabled = true,
  extraSearchParams = {},
} = {}) => {
  const [searchTerm, setSearchTermRaw] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const [filters, setFilters] = useState({
    batchId: '',
    classNameId: '',
    groupId: '',
    sectionId: '',
    status: '',
  });
  const [options, setOptions] = useState(EMPTY_OPTIONS);
  const [optionsLoading, setOptionsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const requestIdRef = useRef(0);
  const extraParamsRef = useRef(extraSearchParams);
  extraParamsRef.current = extraSearchParams;

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

  // Reset cascade children when academic year changes
  useEffect(() => {
    setFilters({
      batchId: '',
      classNameId: '',
      groupId: '',
      sectionId: '',
      status: '',
    });
    setPage(1);
  }, [academicYearId]);

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
    setFilters({
      batchId: '',
      classNameId: '',
      groupId: '',
      sectionId: '',
      status: '',
    });
    setSearchTermRaw('');
    setPage(1);
  }, []);

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
