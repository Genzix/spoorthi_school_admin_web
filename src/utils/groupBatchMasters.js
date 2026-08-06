import axios from 'axios';
import { getApiBaseUrl } from '@/config/api';
import {
  extractMasterName,
  getAvailableBatches,
  getAvailableGroups,
  getBatchGroupPairs,
  getStudentsForClass,
  normalizeOptionValue,
} from './bulkUploadUtils';

/** Resolve against the active school at request time (not module load). */
export const GROUP_BATCH_ENDPOINTS = {
  get groups() {
    return `${getApiBaseUrl()}/masters/groups/`;
  },
  get batches() {
    return `${getApiBaseUrl()}/masters/batches/`;
  },
};

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const parseMasterRecord = (record = {}) => ({
  id: record.id || '',
  name: normalizeOptionValue(record.name),
  code: normalizeOptionValue(record.code),
});

export const parseMasterList = (responseData) => {
  const payload = Array.isArray(responseData)
    ? responseData
    : Array.isArray(responseData?.data)
      ? responseData.data
      : [];

  return payload
    .map(parseMasterRecord)
    .filter((record) => record.name);
};

export const findMasterByName = (masters = [], name = '') => {
  const normalized = normalizeOptionValue(name).toLowerCase();
  if (!normalized) return null;

  return masters.find(
    (master) => normalizeOptionValue(master.name).toLowerCase() === normalized
  ) || null;
};

export const fetchGroups = async (token) => {
  const response = await axios.get(GROUP_BATCH_ENDPOINTS.groups, {
    headers: authHeaders(token),
  });
  return parseMasterList(response.data);
};

export const fetchBatches = async (token) => {
  const response = await axios.get(GROUP_BATCH_ENDPOINTS.batches, {
    headers: authHeaders(token),
  });
  return parseMasterList(response.data);
};

export const createGroup = async (token, name) => {
  const response = await axios.post(
    GROUP_BATCH_ENDPOINTS.groups,
    { name: normalizeOptionValue(name) },
    { headers: { ...authHeaders(token), 'Content-Type': 'application/json' } }
  );
  return parseMasterRecord(response.data?.data || response.data);
};

export const createBatch = async (token, name) => {
  const response = await axios.post(
    GROUP_BATCH_ENDPOINTS.batches,
    { name: normalizeOptionValue(name) },
    { headers: { ...authHeaders(token), 'Content-Type': 'application/json' } }
  );
  return parseMasterRecord(response.data?.data || response.data);
};

const isDuplicateMasterError = (error) => {
  const status = error?.response?.status;
  return status === 400 || status === 409;
};

export const ensureMasterByName = async ({
  token,
  name,
  masters = [],
  createFn,
  refreshFn,
}) => {
  const normalized = normalizeOptionValue(name);
  if (!normalized) {
    throw new Error('Group and batch names are required');
  }

  const existing = findMasterByName(masters, normalized);
  if (existing?.id) {
    return { record: existing, masters, created: false };
  }

  try {
    const created = await createFn(token, normalized);
    if (created?.id) {
      return { record: created, masters: [...masters, created], created: true };
    }
  } catch (error) {
    if (!isDuplicateMasterError(error)) throw error;
  }

  const refreshed = refreshFn ? await refreshFn(token) : masters;
  const resolved = findMasterByName(refreshed, normalized);
  if (!resolved?.id) {
    throw new Error(`Unable to resolve master record for "${normalized}"`);
  }

  return { record: resolved, masters: refreshed, created: false };
};

export const resolveGroupBatchForUpload = async ({
  token,
  groupName,
  batchName,
  groups = [],
  batches = [],
}) => {
  const normalizedGroup = normalizeOptionValue(groupName);
  const normalizedBatch = normalizeOptionValue(batchName);

  let nextGroups = groups;
  let nextBatches = batches;
  let groupId = null;
  let batchId = null;
  let resolvedGroupName = normalizedGroup;
  let resolvedBatchName = normalizedBatch;
  let createdGroup = false;
  let createdBatch = false;

  if (normalizedGroup) {
    const groupResult = await ensureMasterByName({
      token,
      name: normalizedGroup,
      masters: nextGroups,
      createFn: createGroup,
      refreshFn: fetchGroups,
    });
    groupId = groupResult.record.id;
    resolvedGroupName = groupResult.record.name;
    nextGroups = groupResult.masters;
    createdGroup = groupResult.created;
  }

  if (normalizedBatch) {
    const batchResult = await ensureMasterByName({
      token,
      name: normalizedBatch,
      masters: nextBatches,
      createFn: createBatch,
      refreshFn: fetchBatches,
    });
    batchId = batchResult.record.id;
    resolvedBatchName = batchResult.record.name;
    nextBatches = batchResult.masters;
    createdBatch = batchResult.created;
  }

  return {
    groupId,
    batchId,
    groupName: resolvedGroupName,
    batchName: resolvedBatchName,
    groups: nextGroups,
    batches: nextBatches,
    createdGroup,
    createdBatch,
  };
};

const sortWithClassPriority = (names = [], classNames = new Set()) =>
  [...names].sort((a, b) => {
    const aPriority = classNames.has(a) ? 0 : 1;
    const bPriority = classNames.has(b) ? 0 : 1;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.localeCompare(b);
  });

const collectNamesFromPairs = (pairs = [], field, counterpartField, counterpartValue) => {
  const normalizedCounterpart = normalizeOptionValue(counterpartValue);
  const names = new Set();

  pairs.forEach((pair) => {
    const value = normalizeOptionValue(pair[field]);
    const counterpart = normalizeOptionValue(pair[counterpartField]);
    if (!value) return;

    if (!normalizedCounterpart || !counterpart || counterpart === normalizedCounterpart) {
      names.add(value);
    }
  });

  return names;
};

export const getContextualGroups = ({
  masterGroups = [],
  sections = [],
  students = [],
  classId = '',
  selectedBatch = '',
}) => {
  const classStudents = getStudentsForClass(students, classId);
  const pairs = getBatchGroupPairs(sections, classStudents);
  const normalizedBatch = normalizeOptionValue(selectedBatch);

  const classGroupNames = new Set(
    classStudents
      .map((student) => extractMasterName(student.group))
      .filter(Boolean)
  );

  const names = new Set([
    ...masterGroups.map((group) => group.name).filter(Boolean),
    ...getAvailableGroups(sections, normalizedBatch),
    ...collectNamesFromPairs(pairs, 'group', 'batch', normalizedBatch),
    ...classGroupNames,
  ]);

  if (normalizedBatch) {
    const batchScoped = collectNamesFromPairs(pairs, 'group', 'batch', normalizedBatch);
    if (batchScoped.size > 0) {
      return sortWithClassPriority(
        [...names].filter((name) => batchScoped.has(name) || !pairs.some((pair) => pair.batch)),
        classGroupNames
      );
    }
  }

  return sortWithClassPriority([...names], classGroupNames);
};

export const getContextualBatches = ({
  masterBatches = [],
  sections = [],
  students = [],
  classId = '',
  selectedGroup = '',
}) => {
  const classStudents = getStudentsForClass(students, classId);
  const pairs = getBatchGroupPairs(sections, classStudents);
  const normalizedGroup = normalizeOptionValue(selectedGroup);

  const classBatchNames = new Set(
    classStudents
      .map((student) => extractMasterName(student.batch))
      .filter(Boolean)
  );

  const names = new Set([
    ...masterBatches.map((batch) => batch.name).filter(Boolean),
    ...getAvailableBatches(sections, normalizedGroup),
    ...collectNamesFromPairs(pairs, 'batch', 'group', normalizedGroup),
    ...classBatchNames,
  ]);

  if (normalizedGroup) {
    const groupScoped = collectNamesFromPairs(pairs, 'batch', 'group', normalizedGroup);
    if (groupScoped.size > 0) {
      return sortWithClassPriority(
        [...names].filter((name) => groupScoped.has(name) || !pairs.some((pair) => pair.group)),
        classBatchNames
      );
    }
  }

  return sortWithClassPriority([...names], classBatchNames);
};

export const getClassesForBatch = (students = [], classes = [], batch = '') => {
  const normalizedBatch = normalizeOptionValue(batch);
  if (!normalizedBatch || !classes.length) return classes;

  const classIds = new Set(
    students
      .filter((student) => extractMasterName(student.batch) === normalizedBatch)
      .map((student) => student.class_name?.id || student.class_name_id)
      .filter(Boolean)
  );

  if (classIds.size === 0) return classes;

  const filtered = classes.filter((classItem) => classIds.has(classItem.id));
  return filtered.length > 0 ? filtered : classes;
};

export const isClassValidForBatch = (students = [], classId = '', batch = '') => {
  const normalizedBatch = normalizeOptionValue(batch);
  if (!classId || !normalizedBatch) return true;

  const classIds = new Set(
    students
      .filter((student) => extractMasterName(student.batch) === normalizedBatch)
      .map((student) => student.class_name?.id || student.class_name_id)
      .filter(Boolean)
  );

  if (classIds.size === 0) return true;

  return classIds.has(classId);
};

export const getGroupBatchCatalog = ({
  masterGroups = [],
  masterBatches = [],
  sections = [],
  students = [],
  classId = '',
  selectedGroup = '',
  selectedBatch = '',
}) => {
  const groups = getContextualGroups({
    masterGroups,
    sections,
    students,
    classId,
    selectedBatch,
  });

  const batches = getContextualBatches({
    masterBatches,
    sections,
    students,
    classId,
    selectedGroup,
  });

  return {
    groups,
    batches,
    hasPresetGroups: masterGroups.length > 0 || groups.length > 0,
    hasPresetBatches: masterBatches.length > 0 || batches.length > 0,
    pairs: getBatchGroupPairs(sections, getStudentsForClass(students, classId)),
  };
};
