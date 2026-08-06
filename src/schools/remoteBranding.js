/**
 * Deep-merge remote school branding over the static registry entry.
 * Enabled when VITE_FETCH_SCHOOL_BRANDING=true.
 *
 * Expected endpoint (optional until backend ships):
 *   GET {apiBaseUrl}/public/schools/{slug}/
 * Response fields (all optional): displayName, legalName, apiBaseUrl,
 * logo URLs, palette hexes, receipt, seo, modules.
 */

const isPlainObject = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

export const deepMerge = (base, overlay) => {
  if (!overlay) return base;
  if (!isPlainObject(base) || !isPlainObject(overlay)) return overlay ?? base;

  const result = { ...base };
  Object.keys(overlay).forEach((key) => {
    const next = overlay[key];
    if (next === undefined) return;
    if (isPlainObject(base[key]) && isPlainObject(next)) {
      result[key] = deepMerge(base[key], next);
    } else {
      result[key] = next;
    }
  });
  return result;
};

/** Normalize API payload into SchoolConfig-shaped partial. */
export const normalizeRemoteBranding = (payload = {}) => {
  if (!payload || typeof payload !== 'object') return {};

  const partial = {};

  if (payload.displayName) partial.displayName = payload.displayName;
  if (payload.legalName) partial.legalName = payload.legalName;
  if (payload.apiBaseUrl) {
    partial.apiBaseUrl = String(payload.apiBaseUrl).replace(/\/+$/, '');
  }

  if (payload.logo && typeof payload.logo === 'object') {
    partial.logo = { ...payload.logo };
  }

  if (payload.palette && typeof payload.palette === 'object') {
    const p = payload.palette;
    partial.palette = {
      primary: p.primary,
      primaryLight: p.primaryLight,
      secondary: p.secondary,
      accent: p.accent,
      parentPrimary: p.parentPrimary,
      parentSecondary: p.parentSecondary,
      parentLight: p.parentLight,
    };
    // Gradients recomputed by consumer if needed; keep API hexes.
    if (p.primary && p.secondary) {
      partial.palette.primaryGradient = `linear-gradient(135deg, ${p.primary} 0%, ${p.secondary} 100%)`;
    }
    if (p.primaryLight && p.primary) {
      partial.palette.cardGradient = `linear-gradient(135deg, ${p.primaryLight} 0%, ${p.primary} 100%)`;
    }
  }

  if (payload.receipt && typeof payload.receipt === 'object') {
    partial.receipt = { ...payload.receipt };
  }
  if (payload.seo && typeof payload.seo === 'object') {
    partial.seo = { ...payload.seo };
  }
  if (payload.modules && typeof payload.modules === 'object') {
    partial.modules = { ...payload.modules };
  }

  return partial;
};

/**
 * Fetch and merge remote branding. On failure, returns static school unchanged.
 * @param {import('./registry').SchoolConfig} school
 */
export const mergeRemoteBranding = async (school) => {
  if (!school?.slug || !school?.apiBaseUrl) return school;

  const url = `${school.apiBaseUrl}/public/schools/${school.slug}/`;
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Branding fetch failed: ${response.status}`);
  }

  const payload = await response.json();
  const partial = normalizeRemoteBranding(payload);
  return deepMerge(school, partial);
};
