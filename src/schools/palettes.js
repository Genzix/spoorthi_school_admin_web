/**
 * Brand colors that differ per school.
 * Semantic colors (error, present, etc.) stay shared elsewhere.
 * Mirrors Flutter SchoolPalette.
 *
 * Prefer createSchoolPalette({ primary, accent }) for new schools —
 * light/secondary/parent shades are derived. Spoorthi keeps explicit hexes.
 */

/** @typedef {{ primary: string, primaryLight: string, secondary: string, accent: string, parentPrimary: string, parentSecondary: string, parentLight: string, panel: string, rowHover: string }} SchoolPalette */

/** @typedef {{ r: number, g: number, b: number }} Rgb */

const clamp = (n, min = 0, max = 255) => Math.min(max, Math.max(min, Math.round(n)));

/** @param {string} hex @returns {Rgb} */
export const parseHex = (hex) => {
  const normalized = String(hex || '').replace('#', '').trim();
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  if (full.length !== 6 || Number.isNaN(Number.parseInt(full, 16))) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  };
};

/** @param {Rgb} rgb */
export const rgbToHex = ({ r, g, b }) =>
  `#${[r, g, b]
    .map((c) => clamp(c).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;

/**
 * Linear mix of two hex colors. t=0 → a, t=1 → b.
 * @param {string} a
 * @param {string} b
 * @param {number} t
 */
export const mixHex = (a, b, t) => {
  const A = parseHex(a);
  const B = parseHex(b);
  const w = Math.min(1, Math.max(0, t));
  return rgbToHex({
    r: A.r + (B.r - A.r) * w,
    g: A.g + (B.g - A.g) * w,
    b: A.b + (B.b - A.b) * w,
  });
};

/** @param {string} hex @param {number} amount 0–1 toward white */
export const lighten = (hex, amount) => mixHex(hex, '#FFFFFF', amount);

/** @param {string} hex @param {number} amount 0–1 toward black */
export const darken = (hex, amount) => mixHex(hex, '#000000', amount);

/**
 * Relative luminance (WCAG) for contrast-aware derivation.
 * @param {string} hex
 */
export const luminance = (hex) => {
  const { r, g, b } = parseHex(hex);
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

/**
 * Build a full school palette from brand seeds.
 * New / future schools only need `primary` (+ optional `accent` / parent overrides).
 *
 * @param {{
 *   primary: string,
 *   accent?: string,
 *   secondary?: string,
 *   primaryLight?: string,
 *   parentPrimary?: string,
 *   parentSecondary?: string,
 *   parentLight?: string,
 *   panel?: string,
 *   rowHover?: string,
 * }} seeds
 * @returns {SchoolPalette}
 */
export const createSchoolPalette = (seeds) => {
  if (!seeds?.primary) {
    throw new Error('createSchoolPalette requires a primary brand color');
  }

  const primary = seeds.primary.toUpperCase().startsWith('#')
    ? seeds.primary
    : `#${seeds.primary}`;

  const isDarkBrand = luminance(primary) < 0.35;

  // Dark brands (navy): lift more for surfaces; blend accent into secondary
  // so primary→secondary gradients have visible depth (pure darken is a no-op).
  // Light brands (amber): nudge toward white carefully so UI stays vivid.
  const primaryLight =
    seeds.primaryLight ?? lighten(primary, isDarkBrand ? 0.32 : 0.22);

  const secondary =
    seeds.secondary ??
    (isDarkBrand ? lighten(primary, 0.18) : darken(primary, 0.14));

  const accent =
    seeds.accent ??
    (isDarkBrand ? mixHex(primary, '#F5A623', 0.85) : lighten(primary, 0.28));

  const parentPrimary = seeds.parentPrimary ?? primary;
  const parentIsDark = luminance(parentPrimary) < 0.35;
  const parentSecondary =
    seeds.parentSecondary ??
    (parentIsDark
      ? mixHex(parentPrimary, '#3B82F6', 0.42)
      : lighten(parentPrimary, 0.2));
  const parentLight =
    seeds.parentLight ?? lighten(parentPrimary, parentIsDark ? 0.48 : 0.36);

  // Drawer / side-panel wash and table row hover — derived for new schools.
  const panel = seeds.panel ?? lighten(primary, isDarkBrand ? 0.78 : 0.82);
  const rowHover = seeds.rowHover ?? lighten(primary, isDarkBrand ? 0.86 : 0.88);

  return Object.freeze({
    primary,
    primaryLight,
    secondary,
    accent,
    parentPrimary,
    parentSecondary,
    parentLight,
    panel,
    rowHover,
  });
};

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
  const { r, g, b } = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/** Spoorthi — amber teacher + blue parent (explicit; do not regenerate). */
export const spoorthiPalette = Object.freeze({
  primary: '#FFB942',
  primaryLight: '#FFCC70',
  secondary: '#E8913A',
  accent: '#FFD06A',
  parentPrimary: '#1B4D8C',
  parentSecondary: '#3B82F6',
  parentLight: '#60A5FA',
  panel: '#FFE6BB',
  rowHover: '#FFF3DF',
});

/**
 * GenCampus — soft navy primary + gold accent (#F5A623).
 * Logo mark is deeper (#001A41); UI primary is lifted for readable chrome.
 * Seeds only; shades derived for consistent future-school pattern.
 */
export const gencampusPalette = createSchoolPalette({
  primary: '#7AA8E0',
  accent: '#F5A623',
  parentPrimary: '#7AA8E0',
});

/**
 * TechCampus — deep teal chrome + cyan accent.
 * Distinct from Spoorthi amber and GenCampus navy-gold.
 */
export const techcampusPalette = createSchoolPalette({
  primary: '#0B3D4A',
  accent: '#2EC4B6',
  parentPrimary: '#0B3D4A',
});

export const SchoolPalette = Object.freeze({
  spoorthi: spoorthiPalette,
  gencampus: gencampusPalette,
  techcampus: techcampusPalette,
});
