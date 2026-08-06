import { getSchoolBySlug } from '@/schools/registry';
import { resolveSchoolSlug } from '@/schools/resolveSchool';

export const ROLES = Object.freeze({
  ADMIN: 'admin',
  INCHARGE: 'incharge',
  PRINCIPAL: 'principal',
  EMPLOYEE: 'employee',
});

const ROLE_ALIASES = Object.freeze({
  admin: ROLES.ADMIN,
  administrator: ROLES.ADMIN,
  incharge: ROLES.INCHARGE,
  'in-charge': ROLES.INCHARGE,
  principal: ROLES.PRINCIPAL,
  employee: ROLES.EMPLOYEE,
  staff: ROLES.EMPLOYEE,
  teacher: ROLES.EMPLOYEE,
});

/** Normalize API / storage role strings. */
export const normalizeRole = (role) => {
  if (!role) return null;
  const key = String(role).trim().toLowerCase();
  return ROLE_ALIASES[key] || key;
};

/**
 * Resolve role for the current user.
 * Preference: localStorage.role → user.role JSON → school legacyEmailRoles.
 */
export const resolveRole = ({
  email = localStorage.getItem('email'),
  role = localStorage.getItem('role'),
  schoolSlug = resolveSchoolSlug(),
} = {}) => {
  const fromStorage = normalizeRole(role);
  if (fromStorage) return fromStorage;

  try {
    const raw = localStorage.getItem('user');
    if (raw) {
      const user = JSON.parse(raw);
      const fromUser = normalizeRole(user?.role || user?.user_type || user?.userType);
      if (fromUser) return fromUser;
    }
  } catch {
    /* ignore */
  }

  const school = getSchoolBySlug(schoolSlug);
  const legacyMap = school?.legacyEmailRoles || {};
  if (email && legacyMap[email]) {
    return normalizeRole(legacyMap[email]);
  }

  return null;
};

/** Persist session after login. */
export const persistSession = ({ token, user, schoolSlug }) => {
  if (token) localStorage.setItem('token', token);
  if (user?.email) localStorage.setItem('email', user.email);

  const role =
    normalizeRole(user?.role || user?.user_type || user?.userType) ||
    resolveRole({ email: user?.email, role: null, schoolSlug });

  if (role) localStorage.setItem('role', role);
  if (user) localStorage.setItem('user', JSON.stringify(user));
  if (schoolSlug) localStorage.setItem('schoolSlug', schoolSlug);
};

export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('role');
  localStorage.removeItem('user');
};

export const hasRole = (...allowed) => {
  const current = resolveRole();
  if (!current) return false;
  const set = allowed.map(normalizeRole).filter(Boolean);
  if (current === ROLES.ADMIN) return true; // admin passes all role gates
  return set.includes(current);
};

export const isAdmin = () => hasRole(ROLES.ADMIN);
export const isIncharge = () => hasRole(ROLES.INCHARGE, ROLES.ADMIN);
export const isPrincipal = () => hasRole(ROLES.PRINCIPAL, ROLES.ADMIN);
export const isEmployee = () => resolveRole() === ROLES.EMPLOYEE;

/** Home path for the active role. */
export const getDefaultHomePath = () => {
  const role = resolveRole();
  switch (role) {
    case ROLES.EMPLOYEE:
      return '/'; // StudentsPage via App default
    case ROLES.INCHARGE:
      return '/attendance';
    case ROLES.PRINCIPAL:
      return '/principal/students';
    default:
      return '/';
  }
};

/**
 * If the API returns a school slug/id, ensure it matches the resolved tenant.
 * @returns {{ ok: boolean, message?: string }}
 */
export const assertSchoolMatch = (user, resolvedSlug) => {
  if (!user || !resolvedSlug) return { ok: true };
  const userSlug =
    user.school_slug ||
    user.schoolSlug ||
    user.school?.slug ||
    user.tenant ||
    null;
  if (!userSlug) return { ok: true };
  if (String(userSlug).toLowerCase() !== String(resolvedSlug).toLowerCase()) {
    return {
      ok: false,
      message: `This account belongs to "${userSlug}", not "${resolvedSlug}".`,
    };
  }
  return { ok: true };
};
