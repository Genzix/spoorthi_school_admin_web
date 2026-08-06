import logoMark from '@/assets/logo.svg';
import logoPng from '@/assets/logo1.png';
import gencampusLogo from '@/assets/gencampus_logo.png';
import feeReceiptBg from '@/assets/fee_recepit.jpeg';
import { SchoolPalette, withGradients } from './palettes';

const envApiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

/**
 * @typedef {Object} SchoolConfig
 * @property {string} slug
 * @property {string} displayName
 * @property {string} legalName
 * @property {string} apiBaseUrl
 * @property {{ mark: string, wordmark: string, favicon: string, receipt: string }} logo
 * @property {ReturnType<typeof withGradients>} palette
 * @property {{ feeBg: string, address: string, footer: string }} receipt
 * @property {{ title: string, siteName: string, description: string, ogImage: string, url: string }} seo
 * @property {Record<string, boolean>} modules
 * @property {Record<string, string>} [legacyEmailRoles] — Spoorthi-only email → role map
 * @property {string[]} [hosts] — optional custom domain → this school
 */

/** @type {Record<string, SchoolConfig>} */
export const SCHOOLS = Object.freeze({
  spoorthi: Object.freeze({
    slug: 'spoorthi',
    displayName: 'Spoorthi',
    legalName: 'Spoorthi Educational Institute',
    apiBaseUrl: envApiBase || 'https://spoorthischool.genzix.space',
    logo: Object.freeze({
      mark: logoMark,
      wordmark: logoMark,
      favicon: '/logo1.png',
      receipt: logoPng,
    }),
    palette: Object.freeze(withGradients(SchoolPalette.spoorthi)),
    receipt: Object.freeze({
      feeBg: feeReceiptBg,
      address: '123 School Street, City, State',
      footer: '© Spoorthi Educational Institute',
    }),
    seo: Object.freeze({
      title: 'Spoorthi CRM - School Management System',
      siteName: 'Spoorthi CRM',
      description:
        'Comprehensive school management system for student records, attendance, fees, expenses, and employee management.',
      ogImage: '/logo1.png',
      url: 'https://spoorthi-crm.netlify.app/',
    }),
    modules: Object.freeze({
      upcomingExams: true,
    }),
    /** Legacy email → role until API returns role claims. Spoorthi only. */
    legacyEmailRoles: Object.freeze({
      'admin@gmail.com': 'admin',
      'incharge@gmail.com': 'incharge',
      'principal@gmail.com': 'principal',
      'employee@gmail.com': 'employee',
    }),
    hosts: Object.freeze([]),
  }),

  gencampus: Object.freeze({
    slug: 'gencampus',
    displayName: 'GenCampus',
    legalName: 'GenCampus Educational Institute',
    // Override via VITE_GENCAMPUS_API_BASE_URL; production uses registry host.
    apiBaseUrl: import.meta.env.VITE_GENCAMPUS_API_BASE_URL
      ? String(import.meta.env.VITE_GENCAMPUS_API_BASE_URL).replace(/\/+$/, '')
      : 'https://school-dev.genzix.space',
    logo: Object.freeze({
      mark: gencampusLogo,
      wordmark: gencampusLogo,
      favicon: gencampusLogo,
      receipt: gencampusLogo,
    }),
    palette: Object.freeze(withGradients(SchoolPalette.gencampus)),
    receipt: Object.freeze({
      feeBg: feeReceiptBg,
      address: '',
      footer: '© GenCampus Educational Institute',
    }),
    seo: Object.freeze({
      title: 'GenCampus CRM - School Management System',
      siteName: 'GenCampus CRM',
      description:
        'School management system for GenCampus — students, attendance, fees, and staff.',
      ogImage: gencampusLogo,
      url: 'https://gencampus.yourproduct.com/',
    }),
    modules: Object.freeze({
      upcomingExams: true,
    }),
    /** Legacy email → role until API returns role claims (same accounts as Spoorthi). */
    legacyEmailRoles: Object.freeze({
      'admin@gmail.com': 'admin',
      'incharge@gmail.com': 'incharge',
      'principal@gmail.com': 'principal',
      'employee@gmail.com': 'employee',
    }),
    hosts: Object.freeze([]),
  }),
});

export const DEFAULT_SCHOOL_SLUG = 'spoorthi';

/** Custom domain → slug map built from registry hosts. */
export const HOST_TO_SLUG = Object.freeze(
  Object.values(SCHOOLS).reduce((acc, school) => {
    (school.hosts || []).forEach((host) => {
      acc[String(host).toLowerCase()] = school.slug;
    });
    return acc;
  }, /** @type {Record<string, string>} */ ({}))
);

/** @param {string} slug */
export const getSchoolBySlug = (slug) => SCHOOLS[slug] || null;

export const listSchoolSlugs = () => Object.keys(SCHOOLS);
