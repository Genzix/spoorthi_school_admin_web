import { MIN_SEARCH_LENGTH, getSearchHint } from './searchConfig';

const ADMISSION_PREFIX = /^(?:adm(?:ission)?(?:\s*no\.?)?|adno)[\s:#-]+(.+)$/i;
const DATE_PREFIX = /^date[\s:#-]+(.+)$/i;
const ADMISSION_CODE = /^[A-Za-z]{1,6}[-_/]?\d{2,}$/;
const PARTIAL_DATE = /^\d{1,2}[\/\-.]\d{0,2}(?:[\/\-.]\d{0,4})?$/;
const DIGITS_ONLY = /^\d+$/;

const pad2 = (n) => String(n).padStart(2, '0');

const toIsoDate = (year, month, day) => {
  const y = Number(year);
  const m = Number(month);
  const d = Number(day);
  if (!y || !m || !d) return null;
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;

  const date = new Date(y, m - 1, d);
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }

  return `${y}-${pad2(m)}-${pad2(d)}`;
};

/**
 * Parse user-entered payment date (DD/MM/YYYY, DD-MM-YY, YYYY-MM-DD, DD/MM with default year).
 */
export const parsePaymentDateInput = (raw, defaultYear = new Date().getFullYear()) => {
  const trimmed = (raw ?? '').toString().trim();
  if (!trimmed) return null;

  const prefixed = trimmed.match(DATE_PREFIX);
  const candidate = (prefixed ? prefixed[1] : trimmed).trim();

  const iso = candidate.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (iso) return toIsoDate(iso[1], iso[2], iso[3]);

  const dmy = candidate.match(/^(\d{1,2})[\/\-.](\d{1,2})(?:[\/\-.](\d{2,4}))?$/);
  if (dmy) {
    let year = dmy[3] ? parseInt(dmy[3], 10) : defaultYear;
    if (year < 100) year += 2000;
    return toIsoDate(year, dmy[2], dmy[1]);
  }

  return null;
};

export const isPartialPaymentDateInput = (raw) => {
  const trimmed = (raw ?? '').toString().trim();
  if (!trimmed) return false;
  if (parsePaymentDateInput(trimmed)) return false;
  return PARTIAL_DATE.test(trimmed) || DATE_PREFIX.test(trimmed);
};

export const extractAdmissionNoInput = (raw) => {
  const trimmed = (raw ?? '').toString().trim();
  if (!trimmed) return null;

  const prefixed = trimmed.match(ADMISSION_PREFIX);
  if (prefixed) return prefixed[1].trim() || null;

  if (ADMISSION_CODE.test(trimmed)) return trimmed;

  return null;
};

/**
 * Resolve payment list search into API params.
 * - payment date → { payment_date } (caller may sync period UI)
 * - admission no → { admission_no }
 * - otherwise → { q } when length >= minLength
 */
export const resolvePaymentSearch = (
  raw,
  { minLength = MIN_SEARCH_LENGTH, defaultYear = new Date().getFullYear() } = {}
) => {
  const trimmed = (raw ?? '').toString().trim();

  if (!trimmed) {
    return { ready: true, params: {}, mode: 'none', label: '' };
  }

  const forcedDate = trimmed.match(DATE_PREFIX);
  const dateCandidate = forcedDate ? forcedDate[1].trim() : trimmed;
  const parsedDate = parsePaymentDateInput(dateCandidate, defaultYear);

  if (parsedDate) {
    return {
      ready: true,
      params: { payment_date: parsedDate },
      mode: 'payment_date',
      label: `Showing payments on ${parsedDate}`,
    };
  }

  if (isPartialPaymentDateInput(trimmed)) {
    return {
      ready: false,
      params: {},
      mode: 'payment_date_partial',
      label: '',
      hint: 'Enter full payment date (DD/MM/YYYY)',
    };
  }

  const admissionNo = extractAdmissionNoInput(trimmed);
  if (admissionNo != null) {
    if (admissionNo.length < minLength) {
      return {
        ready: false,
        params: {},
        mode: 'admission_no_partial',
        label: '',
        hint: getSearchHint(admissionNo, minLength),
      };
    }
    return {
      ready: true,
      params: { admission_no: admissionNo },
      mode: 'admission_no',
      label: `Admission no: ${admissionNo}`,
    };
  }

  if (trimmed.length < minLength) {
    return {
      ready: false,
      params: {},
      mode: 'text_partial',
      label: '',
      hint: getSearchHint(trimmed, minLength),
    };
  }

  // Pure numeric strings are often receipt / transaction ids — keep as general q.
  if (DIGITS_ONLY.test(trimmed)) {
    return {
      ready: true,
      params: { q: trimmed },
      mode: 'receipt_or_txn',
      label: `Receipt / transaction: ${trimmed}`,
    };
  }

  return {
    ready: true,
    params: { q: trimmed },
    mode: 'text',
    label: '',
  };
};

export const getPaymentSearchPlaceholder = (minLength = MIN_SEARCH_LENGTH) =>
  `Search payments · name, admission no, receipt, date (min ${minLength} chars)`;

export const getPaymentSearchHint = (raw, options = {}) => {
  const resolved = resolvePaymentSearch(raw, options);
  if (resolved.hint) return resolved.hint;
  if (resolved.label) return resolved.label;
  return '';
};
