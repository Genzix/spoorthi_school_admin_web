import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  resolveSchool,
  rememberSchoolSlug,
  syncSchoolQueryInUrl,
} from '@/schools/resolveSchool';
import { mergeRemoteBranding } from '@/schools/remoteBranding';
import { setApiBaseUrl } from '@/api/client';

const SchoolContext = createContext(null);

/**
 * Provides active school config to the tree.
 * Optionally merges remote branding (Phase 4) when VITE_FETCH_SCHOOL_BRANDING=true.
 */
export const SchoolProvider = ({ children }) => {
  const initial = resolveSchool();
  const [slug] = useState(initial.slug);
  const [school, setSchool] = useState(() => {
    // Sync before child providers fetch — useEffect is too late.
    if (initial.known && initial.slug) {
      rememberSchoolSlug(initial.slug);
      syncSchoolQueryInUrl(initial.slug);
    }
    if (initial.school?.apiBaseUrl) {
      setApiBaseUrl(initial.school.apiBaseUrl);
    }
    return initial.school;
  });
  const [known] = useState(initial.known);
  const [brandingStatus, setBrandingStatus] = useState(
    initial.known ? 'static' : 'unknown'
  );

  // Keep module-level API_BASE_URL in sync on every school change (incl. remount)
  if (school?.apiBaseUrl) {
    setApiBaseUrl(school.apiBaseUrl);
  }

  useEffect(() => {
    if (known && slug) {
      rememberSchoolSlug(slug);
      syncSchoolQueryInUrl(slug);
    }
  }, [known, slug]);
  useEffect(() => {
    if (!school?.apiBaseUrl) return;
    setApiBaseUrl(school.apiBaseUrl);
  }, [school?.apiBaseUrl]);

  useEffect(() => {
    if (!known || !school) return;

    const shouldFetch =
      String(import.meta.env.VITE_FETCH_SCHOOL_BRANDING || '')
        .trim()
        .toLowerCase() === 'true';

    if (!shouldFetch) return;

    let cancelled = false;
    setBrandingStatus('loading');

    mergeRemoteBranding(school)
      .then((merged) => {
        if (cancelled) return;
        setSchool(merged);
        setBrandingStatus('merged');
        if (merged.apiBaseUrl) setApiBaseUrl(merged.apiBaseUrl);
      })
      .catch(() => {
        if (!cancelled) setBrandingStatus('static');
      });

    return () => {
      cancelled = true;
    };
  }, [known, slug]); // eslint-disable-line react-hooks/exhaustive-deps -- merge once per slug

  const value = useMemo(
    () => ({
      slug,
      school,
      known,
      palette: school?.palette ?? null,
      brandingStatus,
    }),
    [slug, school, known, brandingStatus]
  );

  return (
    <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const ctx = useContext(SchoolContext);
  if (!ctx) {
    throw new Error('useSchool must be used within SchoolProvider');
  }
  return ctx;
};

/** Safe hook when provider might be absent (tests / isolated stories). */
export const useSchoolOptional = () => useContext(SchoolContext);
