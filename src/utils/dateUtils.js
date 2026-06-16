/**
 * Student date helpers.
 * API dob format: DD-MM-YYYY (e.g. "10-06-2024")
 * HTML date inputs: YYYY-MM-DD
 */

const API_DATE_PATTERN = /^(\d{2})-(\d{2})-(\d{4})$/;
const INPUT_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const apiDateToInputValue = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return '';

  const trimmed = dateStr.trim();
  if (!trimmed) return '';

  const apiMatch = trimmed.match(API_DATE_PATTERN);
  if (apiMatch) {
    const [, day, month, year] = apiMatch;
    return `${year}-${month}-${day}`;
  }

  if (INPUT_DATE_PATTERN.test(trimmed)) {
    return trimmed;
  }

  return '';
};

export const inputValueToApiDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return '';

  const trimmed = dateStr.trim();
  if (!trimmed) return '';

  const inputMatch = trimmed.match(INPUT_DATE_PATTERN);
  if (inputMatch) {
    const [, year, month, day] = inputMatch;
    return `${day}-${month}-${year}`;
  }

  if (API_DATE_PATTERN.test(trimmed)) {
    return trimmed;
  }

  return '';
};

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

export const formatStudentDob = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return 'N/A';

  const trimmed = dateStr.trim();
  if (!trimmed) return 'N/A';

  if (API_DATE_PATTERN.test(trimmed)) {
    return trimmed;
  }

  const inputValue = apiDateToInputValue(trimmed);
  if (!inputValue) return 'N/A';

  return inputValueToApiDate(inputValue);
};
