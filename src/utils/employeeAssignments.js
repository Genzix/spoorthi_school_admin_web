export const extractIds = (items) => {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => (typeof item === 'object' && item?.id ? item.id : item))
    .filter(Boolean);
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

export const formatAssignmentsSummary = (employee, classMap = {}, sectionsByClass = {}) => {
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

export const getAssignmentsSearchText = (employee, classMap = {}, sectionsByClass = {}) =>
  formatAssignmentsSummary(employee, classMap, sectionsByClass).toLowerCase();

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
