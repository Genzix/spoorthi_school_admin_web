import { API_BASE_URL } from '@/config/api';
import * as XLSX from 'xlsx';

export const BULK_UPLOAD_ENDPOINTS = {
  students: `${API_BASE_URL}/masters/students/bulk-upload/`,
  testMarks: `${API_BASE_URL}/masters/test-marks/bulk-upload/`,
};

export const EXCEL_ACCEPT =
  '.xls,.xlsx,.xlsm,.xltx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const EXCEL_MIME_TYPES = [
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel.sheet.macroEnabled.12',
  'application/vnd.ms-excel.template.macroEnabled.12',
];

const EXCEL_EXTENSIONS = ['.xls', '.xlsx', '.xlsm', '.xltx'];

export const STUDENT_BULK_TEMPLATE = {
  filename: 'bulk_students_upload_template.xlsx',
  sheetName: 'Students',
  includeInstructions: false,
  columns: [
    'Sl No',
    'PEN Number',
    'Name of the Student',
    'Name of the Mother',
    'Name of the Father',
    'Student Village',
    'Class',
    'DOB',
    'Student Aadhar',
    'Mother Aadhar',
    'Father Aadhar',
    'Phone No1',
    'Phone No2',
    'Caste',
    'Sub-Caste',
  ],
};

export const TEST_MARKS_BULK_TEMPLATE = {
  filename: 'bulk_test_marks_upload_template.xlsx',
  sheetName: 'Test Marks',
  columns: [
    'admission_no',
    'student_name',
    'test_name',
    'subject',
    'marks_obtained',
    'total_marks',
    'is_absent',
  ],
  sampleRow: {
    admission_no: 'ADM001',
    student_name: 'Sample Student',
    test_name: 'unit_test_1',
    subject: 'Mathematics',
    marks_obtained: '85',
    total_marks: '100',
    is_absent: 'No',
  },
  instructions: [
    ['Field', 'Required', 'Description'],
    ['admission_no', 'Yes', 'Student admission number'],
    ['student_name', 'No', 'Student name for reference'],
    ['test_name', 'Yes', 'Test identifier, e.g. unit_test_1, mid_term'],
    ['subject', 'Yes', 'Subject name'],
    ['marks_obtained', 'Yes', 'Marks scored by the student'],
    ['total_marks', 'Yes', 'Maximum marks for the subject'],
    ['is_absent', 'No', 'Yes if absent, otherwise No'],
  ],
};

export const validateExcelFile = (file) => {
  if (!file) {
    return 'Please select a file to upload';
  }

  if (!EXCEL_MIME_TYPES.includes(file.type)) {
    const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!EXCEL_EXTENSIONS.includes(extension)) {
      return 'Please select a valid Excel file (.xls, .xlsx, .xlsm, .xltx)';
    }
  }

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return 'File size should be less than 10MB';
  }

  return null;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const units = ['Bytes', 'KB', 'MB', 'GB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / 1024 ** index).toFixed(2))} ${units[index]}`;
};

export const downloadBulkTemplate = (templateConfig) => {
  const {
    filename,
    sheetName,
    columns,
    sampleRow,
    instructions,
    includeInstructions = Boolean(instructions?.length),
  } = templateConfig;

  const dataSheet = sampleRow
    ? XLSX.utils.json_to_sheet([sampleRow], { header: columns })
    : XLSX.utils.aoa_to_sheet([columns]);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, dataSheet, sheetName);

  if (includeInstructions && instructions?.length) {
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(instructions), 'Instructions');
  }

  XLSX.writeFile(workbook, filename);
};

export const getApiErrorMessage = (error, fallbackMessage) => {
  const apiError = error?.response?.data;

  if (typeof apiError?.message === 'string' && apiError.message.trim()) {
    return apiError.message;
  }

  if (typeof apiError?.error === 'string' && apiError.error.trim()) {
    return apiError.error;
  }

  if (apiError?.errors && typeof apiError.errors === 'object') {
    return Object.entries(apiError.errors)
      .map(([field, messages]) =>
        `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
      )
      .join('\n');
  }

  return error?.message || fallbackMessage;
};
