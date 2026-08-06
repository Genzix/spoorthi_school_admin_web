export {
  SchoolPalette,
  spoorthiPalette,
  gencampusPalette,
  createSchoolPalette,
  withGradients,
  hexToRgba,
  parseHex,
  mixHex,
  lighten,
  darken,
  luminance,
} from './palettes';
export { SCHOOLS, DEFAULT_SCHOOL_SLUG, getSchoolBySlug, listSchoolSlugs, HOST_TO_SLUG } from './registry';
export { resolveSchool, resolveSchoolSlug, rememberSchoolSlug } from './resolveSchool';
export { mergeRemoteBranding, deepMerge, normalizeRemoteBranding } from './remoteBranding';
