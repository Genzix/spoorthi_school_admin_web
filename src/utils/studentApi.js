import axios from 'axios';
import { API_BASE_URL } from '@/config/api';
import { apiDateToInputValue } from './dateUtils';
import { extractMasterName, normalizeStudentRecord } from './bulkUploadUtils';
import { normalizeBatchOptionName } from './groupBatchMasters';

const trimOrEmpty = (value) => (value ?? '').toString().trim();

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/** Fresh student detail for edit — never rely on lean search-list rows alone. */
export const fetchStudentById = async (studentId) => {
  if (!studentId) {
    throw new Error('Student id is required');
  }

  const response = await axios.get(`${API_BASE_URL}/masters/students/${studentId}/`, {
    headers: authHeaders(),
  });

  const raw = response.data?.data ?? response.data;
  return normalizeStudentRecord(raw || {});
};

const resolveRelatedId = (value, fallback = '') => {
  if (value && typeof value === 'object') return value.id || fallback;
  return value || fallback || '';
};

/** Map API student detail → AddStudentDialog form shape. */
export const mapStudentDetailToForm = (
  student = {},
  { fallbackAcademicYearId = '' } = {}
) => {
  const phonesFromList = Array.isArray(student.phone_numbers)
    ? student.phone_numbers.map((n) => trimOrEmpty(n)).filter(Boolean)
    : [];
  const primaryPhone = trimOrEmpty(student.phone_number);
  const phoneNumbers =
    phonesFromList.length > 0
      ? phonesFromList
      : primaryPhone
        ? [primaryPhone]
        : [];

  return {
    name: student.name || '',
    father_name: student.father_name || student.parent_name || '',
    phone_numbers: phoneNumbers.length >= 2 ? phoneNumbers : [...phoneNumbers, '', ''].slice(0, 2),
    class_name_id: resolveRelatedId(student.class_name, student.class_name_id),
    section_id: resolveRelatedId(student.section, student.section_id),
    group: extractMasterName(student.group) || '',
    batch: normalizeBatchOptionName(extractMasterName(student.batch)) || '',
    admission_no: student.admission_no || '',
    pen_no: student.pen_no || '',
    status: student.status || 'admission',
    date_of_admission:
      student.date_of_admission || new Date().toISOString().split('T')[0],
    no_of_turns: student.no_of_turns || 4,
    committed_fees: student.committed_fees ?? '',
    initial_fee_paid: student.initial_fee_paid ?? '',
    is_bookes_given: Boolean(student.is_bookes_given),
    is_uniform_given: Boolean(student.is_uniform_given),
    is_bag_given: Boolean(student.is_bag_given),
    photo: student.photo || null,
    dob: apiDateToInputValue(student.dob) || '',
    student_aadhar: student.student_aadhar || '',
    father_aadhar: student.father_aadhar || '',
    mother_aadhar: student.mother_aadhar || '',
    application_form: student.application_form || null,
    caste_id: resolveRelatedId(student.caste),
    sub_caste_id: resolveRelatedId(student.sub_caste),
    educational_officer_id: resolveRelatedId(student.educational_officer),
    permanent_address: student.permanent_address || '',
    correcspondent_address: student.correcspondent_address || '',
    previous_school: student.previous_school || '',
    academic_year_id:
      resolveRelatedId(student.academic_year, student.academic_year_id) ||
      fallbackAcademicYearId ||
      '',
  };
};

export const filterPhoneNumbers = (phoneNumbers) =>
  (Array.isArray(phoneNumbers) ? phoneNumbers : [])
    .map((num) => trimOrEmpty(num))
    .filter(Boolean);

export const buildStudentPayload = (
  formData,
  {
    apiDob,
    academicYearId,
    resolvedGroup,
    resolvedBatch,
    isEditMode = false,
    existingInitialFeePaid,
  } = {}
) => {
  const phoneNumbers = filterPhoneNumbers(formData.phone_numbers);
  const fatherName = trimOrEmpty(formData.father_name);

  const payload = {
    name: trimOrEmpty(formData.name),
    father_name: fatherName,
    parent_name: fatherName,
    admission_no: trimOrEmpty(formData.admission_no),
    status: formData.status || 'admission',
    date_of_admission: formData.date_of_admission,
    no_of_turns: parseInt(formData.no_of_turns, 10) || 0,
    committed_fees: parseFloat(formData.committed_fees) || 0,
    is_bookes_given: Boolean(formData.is_bookes_given),
    is_uniform_given: Boolean(formData.is_uniform_given),
    is_bag_given: Boolean(formData.is_bag_given),
    dob: apiDateToInputValue(apiDob ?? formData.dob),
  };

  // Never wipe initial_fee_paid on profile edits unless the field was intentionally changed.
  const rawInitial = formData.initial_fee_paid;
  if (rawInitial !== '' && rawInitial !== null && rawInitial !== undefined) {
    payload.initial_fee_paid = parseFloat(rawInitial) || 0;
  } else if (isEditMode && existingInitialFeePaid != null && existingInitialFeePaid !== '') {
    payload.initial_fee_paid = parseFloat(existingInitialFeePaid) || 0;
  } else if (!isEditMode) {
    payload.initial_fee_paid = 0;
  }

  if (phoneNumbers.length > 0) {
    payload.phone_number = phoneNumbers[0];
    payload.phone_numbers = phoneNumbers;
  }

  if (academicYearId) payload.academic_year_id = academicYearId;
  if (formData.class_name_id) payload.class_name_id = formData.class_name_id;
  if (formData.section_id) payload.section_id = formData.section_id;
  if (resolvedGroup) payload.group = resolvedGroup;
  if (resolvedBatch) payload.batch = resolvedBatch;

  const optionalScalars = [
    ['pen_no', formData.pen_no],
    ['email', formData.email],
    ['blood_group', formData.blood_group],
    ['gender', formData.gender],
    ['student_aadhar', formData.student_aadhar],
    ['father_aadhar', formData.father_aadhar],
    ['mother_aadhar', formData.mother_aadhar],
    ['permanent_address', formData.permanent_address],
    ['correcspondent_address', formData.correcspondent_address],
    ['previous_school', formData.previous_school],
  ];

  optionalScalars.forEach(([key, value]) => {
    const trimmed = trimOrEmpty(value);
    if (trimmed) payload[key] = trimmed;
  });

  if (formData.educational_officer_id) payload.educational_officer_id = formData.educational_officer_id;
  if (formData.caste_id) payload.caste_id = formData.caste_id;
  if (formData.sub_caste_id) payload.sub_caste_id = formData.sub_caste_id;

  return payload;
};

const appendPhoneNumbers = (formDataObj, phoneNumbers) => {
  filterPhoneNumbers(phoneNumbers).forEach((num) => {
    formDataObj.append('phone_numbers', num);
  });
};

export const buildStudentFormData = (formData, context, fileOptions = {}) => {
  const payload = buildStudentPayload(formData, context);
  const formDataObj = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'phone_numbers') return;
    formDataObj.append(key, value);
  });

  if (payload.phone_number) {
    formDataObj.append('phone_number', payload.phone_number);
  }

  appendPhoneNumbers(formDataObj, formData.phone_numbers);

  const { photo, applicationForm } = fileOptions;
  if (photo instanceof File) {
    formDataObj.append('photo', photo);
  }
  if (applicationForm instanceof File) {
    formDataObj.append('application_form', applicationForm);
  }

  return formDataObj;
};

export const prepareStudentRequest = (formData, context, fileOptions = {}) => {
  const { photo, applicationForm } = fileOptions;
  const needsMultipart = photo instanceof File || applicationForm instanceof File;

  if (needsMultipart) {
    return {
      body: buildStudentFormData(formData, context, fileOptions),
      isMultipart: true,
    };
  }

  return {
    body: buildStudentPayload(formData, context),
    isMultipart: false,
  };
};

export const formatStudentApiError = (err, fallbackMessage) => {
  const apiError = err.response?.data;

  if (apiError?.errors && typeof apiError.errors === 'object') {
    return Object.entries(apiError.errors)
      .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
      .join('\n');
  }

  if (apiError?.message) {
    return apiError.message;
  }

  if (typeof apiError === 'object' && apiError !== null) {
    return Object.entries(apiError)
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
      .join('\n');
  }

  return err.message || fallbackMessage;
};
