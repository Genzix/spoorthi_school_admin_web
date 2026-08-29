export {
  SchoolPalette,
  spoorthiPalette,
  gencampusPalette,
  techcampusPalette,
  createSchoolPalette,
  withGradients,
  hexToRgba,
  parseHex,
  mixHex,
  lighten,
  darken,
  luminance,
} from './palettes';
export {
  SCHOOLS,
  DEFAULT_SCHOOL_SLUG,
  getSchoolBySlug,
  listSchoolSlugs,
  HOST_TO_SLUG,
  SCHOOL_ALIASES,
  canonicalizeSlug,
} from './registry';
export {
  LANDING_TEMPLATE,
  resolveLandingTemplate,
  isPressLanding,
} from './landingTemplates';
export {
  resolveSchool,
  resolveSchoolSlug,
  rememberSchoolSlug,
  syncSchoolQueryInUrl,
  schoolAwarePath,
  isTenantHostLocked,
} from './resolveSchool';
export { mergeRemoteBranding, deepMerge, normalizeRemoteBranding } from './remoteBranding';
export {
  resolveLanding,
  createLandingFromSchool,
  themeFromSchool,
  LANDING_BY_SLUG,
} from './landingContent';
