/**
 * Auth session helpers — single source of truth for guest vs staff boot.
 * Fire `AUTH_CHANGE_EVENT` whenever token storage changes so UI reacts
 * without a full reload (and stays correct after hard refresh).
 */

import { useEffect, useState } from 'react';
import { resolveRole, ROLES } from './roles';

export const AUTH_CHANGE_EVENT = 'spoorthi:auth-change';
const POST_LOGIN_KEY = 'postLoginRedirect';

/** True when a non-empty access token is present. */
export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('token');
    return Boolean(token && String(token).trim());
  } catch {
    return false;
  }
};

/** Notify same-tab listeners (storage events only fire cross-tab). */
export const notifyAuthChange = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

/**
 * Only allow in-app relative paths (blocks open redirects).
 * @param {unknown} path
 */
export const isSafeAppPath = (path) => {
  if (typeof path !== 'string') return false;
  const value = path.trim();
  if (!value.startsWith('/')) return false;
  if (value.startsWith('//')) return false;
  if (value.startsWith('/login')) return false;
  if (value.includes('://')) return false;
  return true;
};

/** Remember where a guest tried to go (survives landing → Staff Login). */
export const rememberReturnPath = (path) => {
  if (!isSafeAppPath(path)) return;
  try {
    sessionStorage.setItem(POST_LOGIN_KEY, path);
  } catch {
    /* ignore */
  }
};

export const consumeReturnPath = () => {
  try {
    const path = sessionStorage.getItem(POST_LOGIN_KEY);
    sessionStorage.removeItem(POST_LOGIN_KEY);
    return isSafeAppPath(path) ? path : null;
  } catch {
    return null;
  }
};

/** Role-aware CRM home after a successful login. */
export const getDefaultHomePath = () => {
  const role = resolveRole();
  switch (role) {
    case ROLES.INCHARGE:
      return '/attendance';
    case ROLES.PRINCIPAL:
      return '/principal/students';
    case ROLES.EMPLOYEE:
    case ROLES.ADMIN:
    default:
      return '/dashboard';
  }
};

/**
 * Prefer `location.state.from`, then `?next=`, then session memory, then role home.
 * @param {{ state?: { from?: string }, search?: string } | null} location
 */
export const resolvePostLoginPath = (location) => {
  const fromState = location?.state?.from;
  let nextQuery = '';
  try {
    nextQuery = new URLSearchParams(location?.search || '').get('next') || '';
  } catch {
    nextQuery = '';
  }

  if (isSafeAppPath(fromState)) return fromState;
  if (isSafeAppPath(nextQuery)) return nextQuery;

  const remembered = consumeReturnPath();
  if (remembered) return remembered;

  return getDefaultHomePath();
};

/** Tracks auth across reload, focus, and login/logout. */
export const useAuthSession = () => {
  const [authed, setAuthed] = useState(() => isAuthenticated());

  useEffect(() => {
    const sync = () => setAuthed(isAuthenticated());
    window.addEventListener('storage', sync);
    window.addEventListener(AUTH_CHANGE_EVENT, sync);
    window.addEventListener('focus', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener(AUTH_CHANGE_EVENT, sync);
      window.removeEventListener('focus', sync);
    };
  }, []);

  return authed;
};
