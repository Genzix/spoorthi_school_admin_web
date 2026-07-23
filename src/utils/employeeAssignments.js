export const extractIds = (items) => {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => (typeof item === 'object' && item?.id ? item.id : item))
    .filter(Boolean);
};

export const extractRelatedId = (value) => {
  if (value == null || value === '') return '';
  if (typeof value === 'object') return value.id || '';
  return value;
};

export const normalizeApiList = (response) => {
  if (Array.isArray(response?.data?.data)) return response.data.data;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

export const getSectionClassId = (section) =>
  section?.class_name?.id || section?.class_name || section?.class_name_id || null;

export const formatSectionLabel = (section) => {
  if (!section) return 'Unknown section';
  const name = section.name || 'Unknown section';
  const group = section.group ? ` - ${section.group}` : '';
  const batch = section.batch ? ` (${section.batch})` : '';
  return `${name}${group}${batch}`;
};

export const getSectionDisplayLabel = (section, sectionsInClass = []) => {
  const baseLabel = formatSectionLabel(section);
  const duplicateNames = sectionsInClass.filter((item) => item.name === section.name).length > 1;
  if (duplicateNames && section.code) {
    return `${baseLabel} [${section.code}]`;
  }
  return baseLabel;
};

export const buildSectionsByClass = (sections = [], { activeOnly = true } = {}) => {
  const sectionsByClass = {};

  sections.forEach((section) => {
    if (activeOnly && section.is_active === false) return;

    const classId = getSectionClassId(section);
    if (!classId) return;

    if (!sectionsByClass[classId]) {
      sectionsByClass[classId] = [];
    }
    sectionsByClass[classId].push(section);
  });

  Object.keys(sectionsByClass).forEach((classId) => {
    sectionsByClass[classId].sort((a, b) => {
      const nameCompare = (a.name || '').localeCompare(b.name || '');
      if (nameCompare !== 0) return nameCompare;
      return (a.code || '').localeCompare(b.code || '');
    });
  });

  return sectionsByClass;
};

export const getSectionsForClass = (classId, sectionsByClass = {}) =>
  sectionsByClass[classId] || [];

export const buildSectionMaps = (sectionsByClass = {}) => {
  const sectionMap = {};
  const sectionToClass = {};

  Object.entries(sectionsByClass).forEach(([classId, sections]) => {
    (sections || []).forEach((section) => {
      sectionMap[section.id] = section;
      sectionToClass[section.id] = classId;
    });
  });

  return { sectionMap, sectionToClass };
};

export const createEmptyTeachingAssignment = () => ({
  class_name: '',
  batch: '',
  section: '',
  department: '',
});

export const normalizeTeachingAssignmentsFromApi = (assignments) => {
  if (!Array.isArray(assignments) || assignments.length === 0) return [];

  return assignments.map((row) => ({
    class_name: extractRelatedId(row?.class_name ?? row?.class_name_id),
    batch: extractRelatedId(row?.batch ?? row?.batch_id),
    section: extractRelatedId(row?.section ?? row?.section_id),
    department: extractRelatedId(row?.department ?? row?.department_id),
  }));
};

export const isCompleteTeachingAssignment = (row) =>
  Boolean(row?.class_name && row?.batch && row?.section && row?.department);

export const toTeachingAssignmentsPayload = (assignments = []) =>
  (Array.isArray(assignments) ? assignments : [])
    .map((row) => ({
      class_name: extractRelatedId(row?.class_name),
      section: extractRelatedId(row?.section),
      department: extractRelatedId(row?.department),
      batch: extractRelatedId(row?.batch),
    }))
    .filter((row) => row.class_name || row.batch || row.section || row.department);

export const validateTeachingAssignments = (assignments = []) => {
  const rows = Array.isArray(assignments) ? assignments : [];

  for (const row of rows) {
    const classId = extractRelatedId(row?.class_name);
    const batchId = extractRelatedId(row?.batch);
    const sectionId = extractRelatedId(row?.section);
    const departmentId = extractRelatedId(row?.department);

    if (!classId && !batchId && !sectionId && !departmentId) continue;

    if (!classId) {
      return 'Each teaching assignment needs a class.';
    }
    if (!batchId) {
      return 'Select a batch for each class assignment.';
    }
    if (!sectionId) {
      return 'Select a section for each class assignment.';
    }
    if (!departmentId) {
      return 'Select a teaching department for each assignment.';
    }
  }

  const completeRows = toTeachingAssignmentsPayload(rows).filter(isCompleteTeachingAssignment);
  const seen = new Set();

  for (const row of completeRows) {
    const key = `${row.class_name}|${row.batch}|${row.section}|${row.department}`;
    if (seen.has(key)) {
      return 'Duplicate class, batch, section, and department combination is not allowed.';
    }
    seen.add(key);
  }

  return null;
};

const resolveName = (value, map = {}, fallbackKeys = []) => {
  if (value && typeof value === 'object') {
    if (value.name) return value.name;
  }

  const id = extractRelatedId(value);
  if (id && map[id]?.name) return map[id].name;

  for (const key of fallbackKeys) {
    if (typeof key === 'string' && key) return key;
  }

  return null;
};

export const formatTeachingAssignmentChip = (
  row,
  classMap = {},
  sectionMap = {},
  departmentMap = {},
  batchMap = {}
) => {
  if (!row) return 'Unknown';

  const className =
    resolveName(row.class_name, classMap, [row.class_name_name, row.class_name_label]) ||
    'Unknown class';

  const sectionName =
    resolveName(row.section, sectionMap, [row.section_name, row.section_label]) ||
    'Unknown section';

  const batchName = resolveName(row.batch, batchMap, [row.batch_name, row.batch_label]);

  const departmentName =
    resolveName(row.department, departmentMap, [
      row.department_name,
      row.teaching_department_name,
    ]) || 'Unknown department';

  const parts = [`${className}-${sectionName}`];
  if (batchName) parts.push(batchName);
  parts.push(departmentName);
  return parts.join(' · ');
};

export const getTeachingAssignmentChips = (
  employee,
  classMap = {},
  sectionMap = {},
  departmentMap = {},
  batchMap = {}
) => {
  const assignments = employee?.teaching_assignments;
  if (!Array.isArray(assignments) || assignments.length === 0) return [];

  return assignments.map((row, index) => {
    const classId = extractRelatedId(row?.class_name ?? row?.class_name_id);
    const batchId = extractRelatedId(row?.batch ?? row?.batch_id);
    const sectionId = extractRelatedId(row?.section ?? row?.section_id);
    const departmentId = extractRelatedId(row?.department ?? row?.department_id);

    return {
      key: row?.id || `${classId}-${batchId}-${sectionId}-${departmentId}-${index}`,
      label: formatTeachingAssignmentChip(row, classMap, sectionMap, departmentMap, batchMap),
      classId,
      batchId,
      sectionId,
      departmentId,
    };
  });
};

export const employeeHasAssignments = (employee) => {
  if (Array.isArray(employee?.teaching_assignments) && employee.teaching_assignments.length > 0) {
    return true;
  }
  return extractIds(employee?.handled_classes).length > 0;
};

export const groupEmployeeAssignments = (
  handledClassIds,
  handledSectionIds,
  classMap = {},
  sectionsByClass = {}
) => {
  const classIds = extractIds(handledClassIds);
  const sectionIds = new Set(extractIds(handledSectionIds));

  if (classIds.length === 0) {
    return [];
  }

  const { sectionMap, sectionToClass } = buildSectionMaps(sectionsByClass);

  return classIds.map((classId) => {
    const classInfo = classMap[classId];
    const className = classInfo?.name || 'Unknown class';
    const classSections = getSectionsForClass(classId, sectionsByClass);

    const sections = [...sectionIds]
      .filter((sectionId) => sectionToClass[sectionId] === classId)
      .map((sectionId) => {
        const sectionInfo = sectionMap[sectionId];
        return {
          id: sectionId,
          label: sectionInfo
            ? getSectionDisplayLabel(sectionInfo, classSections)
            : 'Unknown section',
        };
      });

    return {
      classId,
      className,
      sections,
      isComplete: sections.length > 0,
    };
  });
};

export const formatAssignmentsSummary = (
  employee,
  classMap = {},
  sectionsByClass = {},
  departmentMap = {},
  batchMap = {}
) => {
  const { sectionMap } = buildSectionMaps(sectionsByClass);
  const teachingChips = getTeachingAssignmentChips(
    employee,
    classMap,
    sectionMap,
    departmentMap,
    batchMap
  );

  if (teachingChips.length > 0) {
    return teachingChips.map((chip) => chip.label).join(', ');
  }

  const groups = groupEmployeeAssignments(
    employee?.handled_classes,
    employee?.handled_sections,
    classMap,
    sectionsByClass
  );

  if (groups.length === 0) {
    return '-';
  }

  return groups
    .map((group) => {
      if (group.sections.length === 0) {
        return `${group.className} (no sections)`;
      }
      return `${group.className} (${group.sections.map((section) => section.label).join(', ')})`;
    })
    .join(' · ');
};

export const getAssignmentsSearchText = (
  employee,
  classMap = {},
  sectionsByClass = {},
  departmentMap = {},
  batchMap = {}
) => formatAssignmentsSummary(employee, classMap, sectionsByClass, departmentMap, batchMap).toLowerCase();

/** @deprecated Prefer validateTeachingAssignments for the new assignment rows UI. */
export const validateHandledAssignments = (classIds, sectionIds, sectionsByClass, classes) => {
  if (classIds.length === 0) {
    if (sectionIds.length > 0) {
      return 'Remove selected sections or choose the classes they belong to.';
    }
    return null;
  }

  if (sectionIds.length === 0) {
    return 'Select at least one section for the chosen classes.';
  }

  const { sectionToClass } = buildSectionMaps(sectionsByClass);

  const orphanSections = sectionIds.filter((sectionId) => !classIds.includes(sectionToClass[sectionId]));
  if (orphanSections.length > 0) {
    return 'Some selected sections do not belong to the chosen classes.';
  }

  const classesWithSections = new Set(
    sectionIds.map((sectionId) => sectionToClass[sectionId]).filter(Boolean)
  );
  const classesMissingSections = classIds.filter((classId) => !classesWithSections.has(classId));

  if (classesMissingSections.length > 0) {
    const classNames = classesMissingSections
      .map((classId) => classes.find((cls) => cls.id === classId)?.name || 'Unknown class')
      .join(', ');
    return `Select at least one section for: ${classNames}`;
  }

  return null;
};
