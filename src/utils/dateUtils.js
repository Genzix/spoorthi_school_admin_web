/**
 * Student date helpers.
 * API write/read format: YYYY-MM-DD (e.g. "2024-06-10")
 * Display format: DD-MM-YYYY (e.g. "10-06-2024")
 * HTML date inputs: YYYY-MM-DD
 */

const DISPLAY_DATE_PATTERN = /^(\d{2})-(\d{2})-(\d{4})$/;
const ISO_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const apiDateToInputValue = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return '';

  const trimmed = dateStr.trim();
  if (!trimmed) return '';

  const displayMatch = trimmed.match(DISPLAY_DATE_PATTERN);
  if (displayMatch) {
    const [, day, month, year] = displayMatch;
    return `${year}-${month}-${day}`;
  }

  if (ISO_DATE_PATTERN.test(trimmed)) {
    return trimmed;
  }

  return '';
};

/** Normalizes any supported date string to API format (YYYY-MM-DD). */
export const inputValueToApiDate = (dateStr) => apiDateToInputValue(dateStr);

export const isValidInputDate = (dateStr) => {
  const inputValue = apiDateToInputValue(dateStr);
  if (!inputValue) return false;

  const [year, month, day] = inputValue.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

/** Formats a student DOB for display as DD-MM-YYYY. */
export const formatStudentDob = (dateStr) => {
  const isoValue = apiDateToInputValue(dateStr);
  if (!isoValue) return 'N/A';

  const [year, month, day] = isoValue.split('-');
  return `${day}-${month}-${year}`;
};
