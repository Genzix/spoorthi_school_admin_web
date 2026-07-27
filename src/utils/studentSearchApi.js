import axios from 'axios';
import { API_BASE_URL } from '@/config/api';
import { normalizeStudentRecord } from './bulkUploadUtils';

const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const pickOptions = (data, keys) => {
  for (const key of keys) {
    if (Array.isArray(data?.[key])) return data[key];
  }
  return [];
};

const normalizeOption = (item) => {
  if (item == null) return null;
  if (typeof item === 'string') {
    return { id: item, name: item, label: item };
  }
  const id = item.id ?? item.value ?? item.uuid;
  const name =
    item.name ??
    item.label ??
    item.code ??
    item.batch ??
    item.group ??
    item.class_name ??
    String(id ?? '');
  if (id == null && !name) return null;
  return {
    id: id ?? name,
    name,
    label: item.label || name,
    ...item,
  };
};

const normalizeOptionList = (list) =>
  (Array.isArray(list) ? list : []).map(normalizeOption).filter(Boolean);

/** Cascade filter options: Year → Batch → Class → Group → Section */
export const fetchStudentFilterOptions = async ({
  academicYearId,
  batchId,
  classNameId,
  groupId,
} = {}) => {
  const params = {};
  if (academicYearId) params.academic_year_id = academicYearId;
  if (batchId) params.batch_id = batchId;
  if (classNameId) params.class_name_id = classNameId;
  if (groupId) params.group_id = groupId;

  const response = await axios.get(`${API_BASE_URL}/masters/students/filter-options/`, {
    headers: authHeaders(),
    params,
  });

  const data = response.data?.data ?? response.data ?? {};

  return {
    batches: normalizeOptionList(
      pickOptions(data, ['batches', 'batch_options', 'batch_list'])
    ),
    classes: normalizeOptionList(
      pickOptions(data, ['classes', 'class_names', 'class_options', 'class_list'])
    ),
    groups: normalizeOptionList(
      pickOptions(data, ['groups', 'group_options', 'group_list'])
    ),
    sections: normalizeOptionList(
      pickOptions(data, ['sections', 'section_options', 'section_list'])
    ),
    raw: data,
  };
};

export const buildStudentSearchParams = ({
  q,
  page = 1,
  pageSize = 20,
  limit,
  offset,
  academicYearId,
  batchId,
  batch,
  classNameId,
  groupId,
  group,
  sectionId,
  status,
  gender,
  isJoin,
  ordering = '-code',
} = {}) => {
  const params = {};

  if (q) params.q = q;
  if (limit != null) {
    params.limit = limit;
    if (offset != null) params.offset = offset;
  } else {
    params.page = page;
    params.page_size = pageSize;
  }

  if (academicYearId) params.academic_year_id = academicYearId;
  if (batchId) params.batch_id = batchId;
  if (batch) params.batch = batch;
  if (classNameId) params.class_name_id = classNameId;
  if (groupId) params.group_id = groupId;
  if (group) params.group = group;
  if (sectionId) params.section_id = sectionId;
  if (status) params.status = status;
  if (gender) params.gender = gender;
  if (isJoin !== undefined && isJoin !== null && isJoin !== '') {
    params.is_join = isJoin;
  }
  if (ordering) params.ordering = ordering;

  return params;
};

export const searchStudents = async (query = {}) => {
  const params = buildStudentSearchParams(query);
  const response = await axios.get(`${API_BASE_URL}/masters/students/search/`, {
    headers: authHeaders(),
    params,
  });

  const envelope = response.data?.data ?? response.data ?? {};
  const resultsRaw = Array.isArray(envelope.results)
    ? envelope.results
    : Array.isArray(envelope)
      ? envelope
      : Array.isArray(response.data?.results)
        ? response.data.results
        : [];

  const results = resultsRaw.map(normalizeStudentRecord);

  return {
    count: envelope.count ?? response.data?.count ?? results.length,
    results,
    next: envelope.next ?? null,
    previous: envelope.previous ?? null,
    raw: response.data,
  };
};
