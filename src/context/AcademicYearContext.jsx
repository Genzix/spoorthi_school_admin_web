import { API_BASE_URL } from '@/config/api';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import axios from 'axios';

const AcademicYearContext = createContext(null);

const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes — AY list rarely changes
const SESSION_CACHE_KEY = 'academicYearsCache_v1';
const SELECTED_ID_KEY = 'selectedAcademicYearId';

/**
 * Module-level singleton so React StrictMode remounts and any concurrent
 * callers share one network request instead of hammering the API.
 */
const store = {
  data: null,
  fetchedAt: 0,
  promise: null,
};

const readSessionCache = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      Array.isArray(parsed?.data) &&
      typeof parsed?.fetchedAt === 'number' &&
      Date.now() - parsed.fetchedAt < CACHE_DURATION_MS
    ) {
      return parsed;
    }
  } catch {
    // ignore corrupt cache
  }
  return null;
};

const writeSessionCache = (data, fetchedAt) => {
  try {
    sessionStorage.setItem(
      SESSION_CACHE_KEY,
      JSON.stringify({ data, fetchedAt })
    );
  } catch {
    // quota / private mode — memory cache still works
  }
};

const clearSessionCache = () => {
  try {
    sessionStorage.removeItem(SESSION_CACHE_KEY);
  } catch {
    // ignore
  }
};

const isCacheFresh = () =>
  Array.isArray(store.data) &&
  store.fetchedAt > 0 &&
  Date.now() - store.fetchedAt < CACHE_DURATION_MS;

const resolveSelectedYear = (years) => {
  if (!Array.isArray(years) || years.length === 0) return null;
  const savedId = localStorage.getItem(SELECTED_ID_KEY);
  const found = savedId ? years.find((ay) => String(ay.id) === String(savedId)) : null;
  if (found) return found;
  localStorage.setItem(SELECTED_ID_KEY, years[0].id);
  return years[0];
};

/**
 * Single flight fetch — concurrent callers await the same promise.
 */
const fetchAcademicYearsOnce = async (forceRefresh = false) => {
  if (!forceRefresh && isCacheFresh()) {
    return store.data;
  }

  if (!forceRefresh) {
    const session = readSessionCache();
    if (session) {
      store.data = session.data;
      store.fetchedAt = session.fetchedAt;
      return session.data;
    }
  }

  if (store.promise && !forceRefresh) {
    return store.promise;
  }

  store.promise = (async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${API_BASE_URL}/masters/academic-years/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data?.status !== 'success') {
      throw new Error('Failed to fetch academic years');
    }

    const data = Array.isArray(response.data.data) ? response.data.data : [];
    const fetchedAt = Date.now();
    store.data = data;
    store.fetchedAt = fetchedAt;
    writeSessionCache(data, fetchedAt);
    return data;
  })().finally(() => {
    store.promise = null;
  });

  return store.promise;
};

/** Clear in-memory + session cache (e.g. after logout). */
export const clearAcademicYearsCache = () => {
  store.data = null;
  store.fetchedAt = 0;
  store.promise = null;
  clearSessionCache();
};

export const useAcademicYear = () => {
  const context = useContext(AcademicYearContext);
  if (!context) {
    throw new Error('useAcademicYear must be used within an AcademicYearProvider');
  }
  return context;
};

export const AcademicYearProvider = ({ children }) => {
  const [academicYears, setAcademicYears] = useState(() => store.data || []);
  const [selectedAcademicYear, setSelectedAcademicYearState] = useState(() =>
    store.data ? resolveSelectedYear(store.data) : null
  );
  const [loading, setLoading] = useState(() => !isCacheFresh() && !!localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);
  const hasBootstrappedRef = useRef(false);

  const applyYears = useCallback((data) => {
    if (!mountedRef.current) return;
    setAcademicYears(data);
    setSelectedAcademicYearState((prev) => {
      // Keep current selection if it still exists; otherwise resolve default
      if (prev && data.some((ay) => String(ay.id) === String(prev.id))) {
        return prev;
      }
      return resolveSelectedYear(data);
    });
  }, []);

  const fetchAcademicYears = useCallback(async (forceRefresh = false) => {
    const token = localStorage.getItem('token');
    if (!token) {
      if (mountedRef.current) {
        setLoading(false);
        setAcademicYears([]);
        setSelectedAcademicYearState(null);
      }
      return [];
    }

    // Serve memory/session cache synchronously without flipping loading
    if (!forceRefresh && isCacheFresh()) {
      applyYears(store.data);
      if (mountedRef.current) {
        setLoading(false);
        setError(null);
      }
      return store.data;
    }

    if (!forceRefresh) {
      const session = readSessionCache();
      if (session) {
        store.data = session.data;
        store.fetchedAt = session.fetchedAt;
        applyYears(session.data);
        if (mountedRef.current) {
          setLoading(false);
          setError(null);
        }
        return session.data;
      }
    }

    if (mountedRef.current) {
      setLoading(true);
      setError(null);
    }

    try {
      const data = await fetchAcademicYearsOnce(forceRefresh);
      applyYears(data);
      if (mountedRef.current) setError(null);
      return data;
    } catch (err) {
      console.error('Failed to fetch academic years', err);
      if (mountedRef.current) {
        setError('Failed to load academic years. Please try again.');
      }
      throw err;
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [applyYears]);

  const changeSelectedAcademicYear = useCallback(
    (academicYearId) => {
      if (academicYearId === '' || academicYearId == null) {
        setSelectedAcademicYearState(null);
        localStorage.removeItem(SELECTED_ID_KEY);
        return;
      }
      const found = academicYears.find(
        (ay) => String(ay.id) === String(academicYearId)
      );
      if (found) {
        setSelectedAcademicYearState(found);
        localStorage.setItem(SELECTED_ID_KEY, found.id);
      }
    },
    [academicYears]
  );

  // Bootstrap once per provider mount when authenticated
  useEffect(() => {
    mountedRef.current = true;

    if (!hasBootstrappedRef.current) {
      hasBootstrappedRef.current = true;
      if (localStorage.getItem('token')) {
        fetchAcademicYears(false).catch(() => {});
      } else {
        setLoading(false);
      }
    }

    // Cross-tab login only (storage does not fire in the same tab)
    const onStorage = (event) => {
      if (event.key !== 'token') return;
      if (event.newValue) {
        fetchAcademicYears(false).catch(() => {});
      } else {
        clearAcademicYearsCache();
        if (mountedRef.current) {
          setAcademicYears([]);
          setSelectedAcademicYearState(null);
          setLoading(false);
          setError(null);
        }
      }
    };

    window.addEventListener('storage', onStorage);
    return () => {
      mountedRef.current = false;
      window.removeEventListener('storage', onStorage);
    };
  }, [fetchAcademicYears]);

  const value = useMemo(
    () => ({
      academicYears,
      selectedAcademicYear,
      setSelectedAcademicYear: changeSelectedAcademicYear,
      // Alias used by Attendance.jsx
      setSelectedAcademicYearId: changeSelectedAcademicYear,
      loading,
      error,
      fetchAcademicYears,
      refreshAcademicYears: () => fetchAcademicYears(true),
    }),
    [
      academicYears,
      selectedAcademicYear,
      changeSelectedAcademicYear,
      loading,
      error,
      fetchAcademicYears,
    ]
  );

  return (
    <AcademicYearContext.Provider value={value}>
      {children}
    </AcademicYearContext.Provider>
  );
};
