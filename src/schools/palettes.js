/**
 * Brand colors that differ per school.
 * Semantic colors (error, present, etc.) stay shared elsewhere.
 * Mirrors Flutter SchoolPalette.
 */

/** @typedef {{ primary: string, primaryLight: string, secondary: string, accent: string, parentPrimary: string, parentSecondary: string, parentLight: string }} SchoolPalette */

/**
 * @param {SchoolPalette} palette
 * @returns {SchoolPalette & { primaryGradient: string, cardGradient: string, parentGradient: string, parentCardGradient: string, parentBackgroundGradient: string }}
 */
export const withGradients = (palette) => ({
  ...palette,
  primaryGradient: `linear-gradient(135deg, ${palette.primary} 0%, ${palette.secondary} 100%)`,
  cardGradient: `linear-gradient(135deg, ${palette.primaryLight} 0%, ${palette.primary} 100%)`,
  parentGradient: `linear-gradient(135deg, ${palette.parentPrimary} 0%, ${palette.parentSecondary} 100%)`,
  parentCardGradient: `linear-gradient(135deg, ${palette.parentSecondary} 0%, ${palette.parentLight} 100%)`,
  parentBackgroundGradient: `linear-gradient(135deg, ${hexToRgba(palette.parentPrimary, 0.15)} 0%, ${hexToRgba(palette.parentSecondary, 0.08)} 45%, #F5F7FB 100%)`,
});

/** @param {string} hex @param {number} alpha */
export const hexToRgba = (hex, alpha = 1) => {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/** Spoorthi — amber teacher + blue parent. */
export const spoorthiPalette = Object.freeze({
  primary: '#FFB942',
  primaryLight: '#FFCC70',
  secondary: '#E8913A',
  accent: '#FFD06A',
  parentPrimary: '#1B4D8C',
  parentSecondary: '#3B82F6',
  parentLight: '#60A5FA',
});

/** GenCampus — gold teacher + navy parent. */
export const gencampusPalette = Object.freeze({
  primary: '#E5A91A',
  primaryLight: '#F2C14E',
  secondary: '#C98A00',
  accent: '#FFD978',
  parentPrimary: '#1B4D8C',
  parentSecondary: '#3B82F6',
  parentLight: '#60A5FA',
});

export const SchoolPalette = Object.freeze({
  spoorthi: spoorthiPalette,
  gencampus: gencampusPalette,
});
