import axios from 'axios';
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
const MAX_BULK_UPLOAD_SIZE = 10 * 1024 * 1024;

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

export const normalizeOptionValue = (value) =>
  (value || '').toString().replace(/\s+/g, ' ').trim();

export const extractMasterName = (value) => {
  if (!value) return '';
  if (typeof value === 'string') return normalizeOptionValue(value);
  return normalizeOptionValue(value.name || value.label || value.code);
};

const normalizeHeader = (value) =>
  normalizeOptionValue(value).toLowerCase();

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

  if (file.size > MAX_BULK_UPLOAD_SIZE) {
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

export const getSectionGrouping = (sections = []) => {
  const groups = new Set();
  const batches = new Set();

  sections.forEach((section) => {
    const group = extractMasterName(section.group);
    const batch = extractMasterName(section.batch);
    if (group) groups.add(group);
    if (batch) batches.add(batch);
  });

  return {
    hasGroups: groups.size > 0,
    hasBatches: batches.size > 0,
  };
};

export const getAvailableGroups = (sections = [], batch = '') => {
  const normalizedBatch = normalizeOptionValue(batch);
  return [...new Set(
    sections
      .filter((section) => !normalizedBatch || extractMasterName(section.batch) === normalizedBatch)
      .map((section) => extractMasterName(section.group))
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b));
};

export const getAvailableBatches = (sections = [], group = '') => {
  const normalizedGroup = normalizeOptionValue(group);
  return [...new Set(
    sections
      .filter((section) => !normalizedGroup || extractMasterName(section.group) === normalizedGroup)
      .map((section) => extractMasterName(section.batch))
      .filter(Boolean)
  )].sort((a, b) => a.localeCompare(b));
};

export const getStudentsForClass = (students = [], classId = '') => {
  if (!classId) return [];

  return students.filter((student) => {
    const studentClassId = student.class_name?.id || student.class_name_id;
    return studentClassId === classId;
  });
};

export const getBatchGroupPairs = (sections = [], students = []) => {
  const pairs = new Map();

  const addPair = (group, batch) => {
    const normalizedGroup = extractMasterName(group);
    const normalizedBatch = extractMasterName(batch);
    if (!normalizedGroup && !normalizedBatch) return;

    const key = `${normalizedGroup}|${normalizedBatch}`;
    if (!pairs.has(key)) {
      pairs.set(key, { group: normalizedGroup, batch: normalizedBatch });
    }
  };

  sections.forEach((section) => addPair(section.group, section.batch));
  students.forEach((student) => addPair(student.group, student.batch));

  return [...pairs.values()];
};

export const getMergedGroups = (sections = [], students = [], batch = '') => {
  const normalizedBatch = normalizeOptionValue(batch);
  const fromStudents = students
    .filter((student) => !normalizedBatch || extractMasterName(student.batch) === normalizedBatch)
    .map((student) => extractMasterName(student.group))
    .filter(Boolean);

  return [...new Set([...getAvailableGroups(sections, batch), ...fromStudents])]
    .sort((a, b) => a.localeCompare(b));
};

export const getMergedBatches = (sections = [], students = [], group = '') => {
  const normalizedGroup = normalizeOptionValue(group);
  const fromStudents = students
    .filter((student) => !normalizedGroup || extractMasterName(student.group) === normalizedGroup)
    .map((student) => extractMasterName(student.batch))
    .filter(Boolean);

  return [...new Set([...getAvailableBatches(sections, group), ...fromStudents])]
    .sort((a, b) => a.localeCompare(b));
};

export const isBatchGroupPairValid = (pairs = [], group = '', batch = '') => {
  const normalizedGroup = normalizeOptionValue(group);
  const normalizedBatch = normalizeOptionValue(batch);
  if (!normalizedGroup || !normalizedBatch) return true;
  if (!pairs.length) return true;

  return pairs.some(
    (pair) =>
      normalizeOptionValue(pair.group) === normalizedGroup &&
      normalizeOptionValue(pair.batch) === normalizedBatch
  );
};

export const getFilteredSectionOptions = (sections = [], { group = '', batch = '' } = {}) => {
  const { hasGroups, hasBatches } = getSectionGrouping(sections);
  const normalizedGroup = normalizeOptionValue(group);
  const normalizedBatch = normalizeOptionValue(batch);
  const applyGroupFilter = hasGroups && normalizedGroup;
  const applyBatchFilter = hasBatches && normalizedBatch;
  const sectionMap = new Map();

  sections.forEach((section) => {
    const sectionName = normalizeOptionValue(section.name);
    const sectionGroup = extractMasterName(section.group);
    const sectionBatch = extractMasterName(section.batch);

    const matchesGroup =
      !applyGroupFilter || !sectionGroup || sectionGroup === normalizedGroup;
    const matchesBatch =
      !applyBatchFilter || !sectionBatch || sectionBatch === normalizedBatch;
    if (!matchesGroup || !matchesBatch || !sectionName) return;

    const dedupeKey = `${sectionName}|${sectionGroup}|${sectionBatch}`;
    if (!sectionMap.has(dedupeKey)) {
      sectionMap.set(dedupeKey, {
        ...section,
        displayName: sectionGroup || sectionBatch
          ? `${sectionName}${sectionGroup ? ` - ${sectionGroup}` : ''}${sectionBatch ? ` (${sectionBatch})` : ''}`
          : sectionName,
      });
    }
  });

  return [...sectionMap.values()].sort((a, b) =>
    (a.displayName || a.name).localeCompare(b.displayName || b.name)
  );
};

export const readExcelHeaders = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
          resolve([]);
          return;
        }

        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        resolve(Array.isArray(rows[0]) ? rows[0] : []);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error('Failed to read the Excel file'));
    reader.readAsArrayBuffer(file);
  });

export const validateStudentBulkHeaders = (headers = []) => {
  const normalizedHeaders = headers.map(normalizeHeader).filter(Boolean);
  if (normalizedHeaders.length === 0) {
    return 'The Excel file appears to be empty or missing a header row.';
  }

  const expected = STUDENT_BULK_TEMPLATE.columns.map(normalizeHeader);
  const missing = expected.filter((column) => !normalizedHeaders.includes(column));

  if (missing.length > 0) {
    const readableMissing = STUDENT_BULK_TEMPLATE.columns.filter(
      (column) => missing.includes(normalizeHeader(column))
    );
    return `Missing required columns: ${readableMissing.join(', ')}`;
  }

  return null;
};

export const buildStudentBulkFormData = ({
  file,
  classId,
  sectionId,
  academicYearId,
  batch,
  group,
  batchId,
  groupId,
}) => {
  const formData = new FormData();
  formData.append('file', file);

  if (academicYearId) {
    formData.append('academic_year_id', academicYearId);
  }
  if (classId) {
    formData.append('class_id', classId);
  }
  if (sectionId) {
    formData.append('section_id', sectionId);
  }

  const normalizedGroup = normalizeOptionValue(group);
  const normalizedBatch = normalizeOptionValue(batch);

  if (groupId) {
    formData.append('group_id', groupId);
  }
  if (batchId) {
    formData.append('batch_id', batchId);
  }
  if (normalizedGroup) {
    formData.append('group', normalizedGroup);
  }
  if (normalizedBatch) {
    formData.append('batch', normalizedBatch);
  }

  return formData;
};

export const parseStudentBulkUploadResult = (data = {}) => {
  const payload = data?.data && typeof data.data === 'object' ? data.data : data;
  const createdCount = payload.created_count ?? payload.created ?? payload.success_count ?? null;
  const failedCount = payload.failed_count ?? payload.failed ?? payload.error_count ?? null;
  const totalCount = payload.total_count ?? payload.total ?? null;

  const rawErrors = payload.errors ?? payload.row_errors ?? payload.failed_rows ?? [];
  const errors = Array.isArray(rawErrors)
    ? rawErrors
    : Object.entries(rawErrors).map(([row, message]) => ({
        row,
        message: Array.isArray(message) ? message.join(', ') : message,
      }));

  return {
    message: data?.message || payload?.message || '',
    createdCount,
    failedCount,
    totalCount,
    errors,
  };
};

export const formatStudentBulkUploadErrors = (errors = []) => {
  if (!errors.length) return '';

  return errors
    .map((entry, index) => {
      const rowLabel = entry.row ?? entry.row_number ?? entry.line ?? index + 1;
      const message = entry.message ?? entry.error ?? entry.detail ?? JSON.stringify(entry);
      return `Row ${rowLabel}: ${message}`;
    })
    .join('\n');
};

export const downloadBulkUploadErrorReport = (errors = [], filename = 'student_bulk_upload_errors.xlsx') => {
  if (!errors.length) return;

  const rows = errors.map((entry, index) => ({
    Row: entry.row ?? entry.row_number ?? entry.line ?? index + 1,
    Error: entry.message ?? entry.error ?? entry.detail ?? JSON.stringify(entry),
  }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(rows), 'Errors');
  XLSX.writeFile(workbook, filename);
};

export const uploadStudentsBulk = async ({
  file,
  classId,
  sectionId,
  academicYearId,
  batch,
  group,
  batchId,
  groupId,
  token,
  onProgress,
}) => {
  const formData = buildStudentBulkFormData({
    file,
    classId,
    sectionId,
    academicYearId,
    batch,
    group,
    batchId,
    groupId,
  });

  const response = await axios.post(BULK_UPLOAD_ENDPOINTS.students, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (!onProgress || !progressEvent.total) return;
      onProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
    },
  });

  return parseStudentBulkUploadResult(response.data);
};
