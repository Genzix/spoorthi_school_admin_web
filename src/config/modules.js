/**
 * Feature / module toggles for the admin app.
 *
 * Flip a module on or off via .env (Vite rebuild / restart required):
 *   VITE_MODULE_UPCOMING_EXAMS=true|false
 *
 * Add new modules here — Sidebar and routes read from this single source.
 */

const TRUTHY = new Set(['1', 'true', 'yes', 'on']);
const FALSY = new Set(['0', 'false', 'no', 'off']);

/** Parse env strings safely; empty / unknown → fallback. */
export const parseEnvBool = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') return fallback;
  const normalized = String(value).trim().toLowerCase();
  if (TRUTHY.has(normalized)) return true;
  if (FALSY.has(normalized)) return false;
  return fallback;
};

/**
 * Registry of optional admin modules.
 * `enabled` is the only switch consumers need; path/id stay in sync with routes.
 */
export const MODULES = Object.freeze({
  upcomingExams: Object.freeze({
    id: 'upcomingExams',
    label: 'Upcoming Exams',
    path: '/upcoming-exams',
    envKey: 'VITE_MODULE_UPCOMING_EXAMS',
    // Default on so the module ships visible; set false in .env to hide.
    enabled: parseEnvBool(import.meta.env.VITE_MODULE_UPCOMING_EXAMS, true),
  }),
});

/**
 * @param {keyof typeof MODULES} moduleId
 * @param {Record<string, boolean> | null | undefined} schoolModules — per-tenant overrides from registry
 */
export const isModuleEnabled = (moduleId, schoolModules) => {
  if (schoolModules && Object.prototype.hasOwnProperty.call(schoolModules, moduleId)) {
    return Boolean(schoolModules[moduleId]);
  }
  return Boolean(MODULES[moduleId]?.enabled);
};

/** Filter a menu/route list that may include an optional `module` key. */
export const withEnabledModules = (items = [], schoolModules) =>
  items.filter((item) => !item.module || isModuleEnabled(item.module, schoolModules));
