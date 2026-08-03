export const AUDIENCE_MODES = {
  ALL_CLASSES: 'all_classes',
  WHOLE_CLASS: 'whole_class',
  INDIVIDUAL: 'individual',
};

export const AUDIENCE_MODE_OPTIONS = [
  { value: AUDIENCE_MODES.ALL_CLASSES, label: 'All Classes' },
  { value: AUDIENCE_MODES.WHOLE_CLASS, label: 'Whole Class' },
  { value: AUDIENCE_MODES.INDIVIDUAL, label: 'Individual' },
];

export const SCHEDULE_FILTER_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'false', label: 'Pending teacher' },
  { value: 'true', label: 'Scheduled' },
];

export const DEFAULT_EXAM_FORM = {
  title: '',
  from_date: '',
  audienceMode: AUDIENCE_MODES.WHOLE_CLASS,
  selectedClassIds: [],
  /** When true, every section of the selected class(es) is targeted. */
  allSections: true,
  selectedSectionIds: [],
  /**
   * Batch picks (required — mirrors sections):
   * - allBatches true → every named batch
   * - selectedBatchIds → specific named batches
   * - empty selection is invalid until the user picks
   */
  allBatches: false,
  selectedBatchIds: [],
};

export const isAdminEmail = (email = localStorage.getItem('email')) =>
  email === 'admin@gmail.com';

export const getScheduleBadge = (exam) => {
  if (exam?.is_scheduled === true) {
    return { label: 'Scheduled', tone: 'success' };
  }
  return { label: 'Pending teacher', tone: 'warning' };
};

export const formatAudienceLabel = (exam) => {
  const parts = [
    exam?.class_name_display,
    exam?.section_display,
    exam?.batch_display,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(' · ') : '—';
};

export const formatDateDisplay = (value) => {
  if (!value) return '—';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/** Format API time (`09:00:00` / ISO) for admin display. */
export const formatTimeDisplay = (value) => {
  if (!value) return '';
  const raw = String(value).trim();
  const timePart = raw.includes('T') ? raw.split('T')[1] : raw;
  const match = timePart.match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);
  if (!match) return raw;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return raw;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatExamTimeRange = (exam = {}) => {
  const start = formatTimeDisplay(exam.start_time);
  const end = formatTimeDisplay(exam.end_time);
  if (start && end) return `${start} – ${end}`;
  if (start) return `From ${start}`;
  if (end) return `Until ${end}`;
  return '';
};

/** Non-empty syllabus text, or null when teacher has not added one. */
export const getExamSyllabus = (exam = {}) => {
  if (typeof exam?.syllabus !== 'string') return null;
  const text = exam.syllabus.trim();
  return text || null;
};

export const toggleIdInList = (list = [], id) => {
  if (!id) return list;
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
};

/** Section ids available for the currently selected class(es). */
export const getAvailableSectionIds = (selectedClassIds = [], sectionsByClass = {}) => {
  const ids = [];
  const seen = new Set();

  selectedClassIds.filter(Boolean).forEach((classId) => {
    (sectionsByClass[classId] || []).forEach((section) => {
      if (!section?.id || seen.has(section.id)) return;
      seen.add(section.id);
      ids.push(section.id);
    });
  });

  return ids;
};

export const areAllSectionsSelected = (selectedSectionIds = [], availableSectionIds = []) => {
  if (!availableSectionIds.length) return true;
  return availableSectionIds.every((id) => selectedSectionIds.includes(id));
};

/**
 * Toggle "All Sections":
 * - On  → mark allSections and mirror every available id into the list
 * - Off → leave specific mode with an empty pick (user must choose)
 */
export const toggleAllSectionsSelection = ({
  allSections = false,
  selectedSectionIds = [],
  availableSectionIds = [],
} = {}) => {
  const currentlyAll =
    allSections || areAllSectionsSelected(selectedSectionIds, availableSectionIds);

  if (currentlyAll) {
    return { allSections: false, selectedSectionIds: [] };
  }

  return {
    allSections: true,
    selectedSectionIds: [...availableSectionIds],
  };
};

/**
 * Toggle one section while keeping "All Sections" in sync:
 * - Leaving All → start from the full set minus/plus the clicked id
 * - Selecting the last remaining section → snap back to All
 * - Clearing the last specific pick → fall back to All (safe default)
 */
export const toggleSectionSelection = ({
  sectionId,
  allSections = false,
  selectedSectionIds = [],
  availableSectionIds = [],
} = {}) => {
  if (!sectionId) {
    return { allSections, selectedSectionIds };
  }

  const currentlyAll =
    allSections || areAllSectionsSelected(selectedSectionIds, availableSectionIds);

  let nextIds;
  if (currentlyAll) {
    // Leave "all" by keeping every section except the one toggled off
    nextIds = availableSectionIds.filter((id) => id !== sectionId);
  } else {
    nextIds = toggleIdInList(selectedSectionIds, sectionId);
  }

  if (!nextIds.length) {
    return {
      allSections: true,
      selectedSectionIds: [...availableSectionIds],
    };
  }

  if (areAllSectionsSelected(nextIds, availableSectionIds)) {
    return {
      allSections: true,
      selectedSectionIds: [...availableSectionIds],
    };
  }

  return { allSections: false, selectedSectionIds: nextIds };
};

/** Master batch ids available for create targeting. */
export const getAvailableBatchIds = (batches = []) =>
  batches.filter((batch) => batch?.id).map((batch) => batch.id);

export const areAllBatchesSelected = (selectedBatchIds = [], availableBatchIds = []) => {
  if (!availableBatchIds.length) return false;
  return availableBatchIds.every((id) => selectedBatchIds.includes(id));
};

export const isNoneBatchSelected = ({
  allBatches = false,
  selectedBatchIds = [],
  availableBatchIds = [],
} = {}) =>
  !allBatches &&
  selectedBatchIds.length === 0 &&
  !areAllBatchesSelected(selectedBatchIds, availableBatchIds);

/** True when at least one batch (or All Batches) is selected. */
export const hasBatchSelection = ({
  allBatches = false,
  selectedBatchIds = [],
  availableBatchIds = [],
} = {}) => {
  if (!availableBatchIds.length) return false;
  return (
    allBatches ||
    selectedBatchIds.some((id) => availableBatchIds.includes(id)) ||
    areAllBatchesSelected(selectedBatchIds, availableBatchIds)
  );
};

/**
 * Resolve which batch values to fan out onto each class/section shell.
 * Batch is required — empty selection yields no targets.
 * - All Batches → every named batch
 * - Specific → selected batch ids only
 */
export const resolveBatchAxis = ({
  allBatches = false,
  selectedBatchIds = [],
  batches = [],
} = {}) => {
  const availableBatchIds = getAvailableBatchIds(batches);

  if (!availableBatchIds.length) {
    return [];
  }

  if (allBatches || areAllBatchesSelected(selectedBatchIds, availableBatchIds)) {
    return [...availableBatchIds];
  }

  if (!selectedBatchIds.length) {
    return [];
  }

  return selectedBatchIds.filter((id) => availableBatchIds.includes(id));
};

/** Toggle "All Batches" ↔ cleared (must pick again). */
export const toggleAllBatchesSelection = ({
  allBatches = false,
  selectedBatchIds = [],
  availableBatchIds = [],
} = {}) => {
  const currentlyAll =
    allBatches || areAllBatchesSelected(selectedBatchIds, availableBatchIds);

  if (currentlyAll) {
    return clearBatchSelection();
  }

  return {
    allBatches: true,
    selectedBatchIds: [...availableBatchIds],
  };
};

/** Clear batch picks (invalid until user selects again). */
export const clearBatchSelection = () => ({
  allBatches: false,
  selectedBatchIds: [],
});

/** @deprecated use clearBatchSelection */
export const selectNoneBatch = clearBatchSelection;

/**
 * Toggle one named batch while keeping All in sync:
 * - From empty → start with that batch
 * - From All → drop the tapped batch (narrow)
 * - Selecting every named batch → snap to All
 * - Clearing the last pick → empty (validation will require a pick)
 */
export const toggleBatchSelection = ({
  batchId,
  allBatches = false,
  selectedBatchIds = [],
  availableBatchIds = [],
} = {}) => {
  if (!batchId) {
    return { allBatches, selectedBatchIds };
  }

  const currentlyAll =
    allBatches || areAllBatchesSelected(selectedBatchIds, availableBatchIds);

  let nextIds;
  if (currentlyAll) {
    nextIds = availableBatchIds.filter((id) => id !== batchId);
  } else if (selectedBatchIds.length === 0) {
    nextIds = [batchId];
  } else {
    nextIds = toggleIdInList(selectedBatchIds, batchId);
  }

  if (!nextIds.length) {
    return clearBatchSelection();
  }

  if (areAllBatchesSelected(nextIds, availableBatchIds)) {
    return {
      allBatches: true,
      selectedBatchIds: [...availableBatchIds],
    };
  }

  return { allBatches: false, selectedBatchIds: nextIds };
};

const targetKey = ({ class_name, section = null, batch = null } = {}) =>
  `${class_name || ''}|${section || ''}|${batch || ''}`;

const pushUniqueTarget = (targets, seen, { class_name, section = null, batch = null }) => {
  if (!class_name) return;
  const key = targetKey({ class_name, section, batch });
  if (seen.has(key)) return;
  seen.add(key);

  const target = { class_name };
  if (section) target.section = section;
  if (batch) target.batch = batch;
  targets.push(target);
};

const expandTargetsAcrossBatches = (baseTargets = [], batchAxis = [null]) => {
  if (!baseTargets.length) return [];
  const targets = [];
  const seen = new Set();

  baseTargets.forEach((base) => {
    batchAxis.forEach((batchId) => {
      pushUniqueTarget(targets, seen, {
        class_name: base.class_name,
        section: base.section || null,
        batch: batchId,
      });
    });
  });

  return targets;
};

/**
 * School-wide fan-out for "All Classes":
 * every class × every section of that class × (unbatched + every batch).
 * Classes with no sections still get class-level shells across the batch axis.
 */
export const expandAllClassesTargets = ({
  classes = [],
  sectionsByClass = {},
  batches = [],
} = {}) => {
  const targets = [];
  const seen = new Set();
  // Batch is required — only named batches (no unbatched shells)
  const batchAxis = getAvailableBatchIds(batches);
  if (!batchAxis.length) return targets;

  classes
    .filter((cls) => cls?.id)
    .forEach((cls) => {
      const classSections = (sectionsByClass[cls.id] || []).filter((section) => section?.id);
      const sectionAxis = classSections.length > 0 ? classSections.map((s) => s.id) : [null];

      sectionAxis.forEach((sectionId) => {
        batchAxis.forEach((batchId) => {
          pushUniqueTarget(targets, seen, {
            class_name: cls.id,
            section: sectionId,
            batch: batchId,
          });
        });
      });
    });

  return targets;
};

/**
 * Expand badge selection into API targets[].
 * - All Classes → every class × section × batch combination
 * - Whole Class / Individual →
 *   - allSections → one shell per section of each selected class
 *     (class with no sections still gets a class-level shell)
 *   - specific sections → one shell per selected section
 *   - then fan out across the resolved batch axis (None / All / specific)
 */
export const buildTargetsFromSelection = ({
  audienceMode,
  selectedClassIds = [],
  selectedSectionIds = [],
  allSections = true,
  allBatches = false,
  selectedBatchIds = [],
  batchId = '', // legacy single-batch support
  classes = [],
  sectionMap = {},
  sectionsByClass = {},
  batches = [],
} = {}) => {
  if (audienceMode === AUDIENCE_MODES.ALL_CLASSES) {
    return expandAllClassesTargets({ classes, sectionsByClass, batches });
  }

  const classIds = selectedClassIds.filter(Boolean);
  if (!classIds.length) return [];

  const availableSectionIds = getAvailableSectionIds(classIds, sectionsByClass);
  const baseTargets = [];
  const baseSeen = new Set();

  // Class has no sections → class-level base shells
  if (availableSectionIds.length === 0) {
    classIds.forEach((classId) => {
      pushUniqueTarget(baseTargets, baseSeen, { class_name: classId });
    });
  } else {
    const useAllSections =
      allSections || areAllSectionsSelected(selectedSectionIds, availableSectionIds);

    if (useAllSections) {
      classIds.forEach((classId) => {
        const classSections = (sectionsByClass[classId] || []).filter((section) => section?.id);
        if (classSections.length === 0) {
          pushUniqueTarget(baseTargets, baseSeen, { class_name: classId });
          return;
        }

        classSections.forEach((section) => {
          pushUniqueTarget(baseTargets, baseSeen, {
            class_name: classId,
            section: section.id,
          });
        });
      });
    } else {
      selectedSectionIds.filter(Boolean).forEach((sectionId) => {
        const section = sectionMap[sectionId];
        const classId =
          section?.class_name?.id ||
          section?.class_name ||
          section?.class_name_id ||
          classIds[0] ||
          '';

        if (!classId) return;

        pushUniqueTarget(baseTargets, baseSeen, {
          class_name: classId,
          section: sectionId,
        });
      });
    }
  }

  // Prefer multi-select batch state; fall back to legacy single batchId if present
  const legacyBatchIds = batchId ? [batchId] : [];
  const batchAxis = resolveBatchAxis({
    allBatches: batchId ? false : allBatches,
    selectedBatchIds: batchId ? legacyBatchIds : selectedBatchIds,
    batches,
  });

  return expandTargetsAcrossBatches(baseTargets, batchAxis);
};

/** Admin create payload — never sends subject / schedule fields. */
export const buildCreateExamPayload = ({
  title,
  from_date,
  audienceMode,
  selectedClassIds,
  selectedSectionIds,
  allSections,
  allBatches,
  selectedBatchIds,
  batchId,
  classes,
  sectionMap,
  sectionsByClass,
  batches,
}) => {
  const trimmedTitle = (title || '').trim();
  const targets = buildTargetsFromSelection({
    audienceMode,
    selectedClassIds,
    selectedSectionIds,
    allSections,
    allBatches,
    selectedBatchIds,
    batchId,
    classes,
    sectionMap,
    sectionsByClass,
    batches,
  });

  const payload = { title: trimmedTitle };
  if (from_date) payload.from_date = from_date;

  if (targets.length === 0) {
    return payload;
  }

  if (targets.length === 1) {
    const [only] = targets;
    payload.class_name = only.class_name;
    if (only.section) payload.section = only.section;
    if (only.batch) payload.batch = only.batch;
    return payload;
  }

  payload.targets = targets;
  return payload;
};

export const buildUpdateExamPayload = ({
  title,
  from_date,
  class_name,
  section,
  batch,
}) => {
  const payload = {
    title: (title || '').trim(),
  };

  if (from_date) {
    payload.from_date = from_date;
  } else {
    payload.from_date = null;
  }

  if (class_name) payload.class_name = class_name;
  payload.section = section || null;
  payload.batch = batch || null;

  return payload;
};

export const validateCreateExamForm = ({
  title,
  audienceMode,
  selectedClassIds = [],
  selectedSectionIds = [],
  allSections = true,
  allBatches = false,
  selectedBatchIds = [],
  classes = [],
  sectionsByClass = {},
  batches = [],
}) => {
  const errors = {};
  const trimmed = (title || '').trim();

  if (!trimmed) {
    errors.title = 'Title is required';
  } else if (trimmed.length > 200) {
    errors.title = 'Title should not exceed 200 characters';
  }

  const availableBatchIds = getAvailableBatchIds(batches);

  if (audienceMode === AUDIENCE_MODES.ALL_CLASSES) {
    if (!classes.length) {
      errors.audience = 'No classes available to target';
    } else if (!availableBatchIds.length) {
      errors.batch = 'No batches available. Add batches before creating exams.';
    } else if (
      expandAllClassesTargets({ classes, sectionsByClass, batches }).length === 0
    ) {
      errors.audience = 'No class / section / batch combinations available';
    }
  } else if (
    audienceMode === AUDIENCE_MODES.WHOLE_CLASS ||
    audienceMode === AUDIENCE_MODES.INDIVIDUAL
  ) {
    if (selectedClassIds.length === 0) {
      errors.audience = 'Select at least one class';
    } else {
      const availableSectionIds = getAvailableSectionIds(selectedClassIds, sectionsByClass);
      if (availableSectionIds.length > 0 && !allSections && selectedSectionIds.length === 0) {
        errors.audience = 'Select at least one section (or All Sections)';
      }
    }

    if (!availableBatchIds.length) {
      errors.batch = 'No batches available. Add batches before creating exams.';
    } else if (
      !hasBatchSelection({
        allBatches,
        selectedBatchIds,
        availableBatchIds,
      })
    ) {
      errors.batch = 'Select at least one batch (or All Batches)';
    }
  }

  return errors;
};

export const validateUpdateExamForm = ({ title, class_name, batch }) => {
  const errors = {};
  const trimmed = (title || '').trim();

  if (!trimmed) {
    errors.title = 'Title is required';
  } else if (trimmed.length > 200) {
    errors.title = 'Title should not exceed 200 characters';
  }

  if (!class_name) {
    errors.class_name = 'Class is required';
  }

  if (!batch) {
    errors.batch = 'Batch is required';
  }

  return errors;
};

export const examToEditForm = (exam = {}) => ({
  title: exam.title || '',
  from_date: exam.from_date || '',
  class_name: typeof exam.class_name === 'object' ? exam.class_name?.id : exam.class_name || '',
  section: typeof exam.section === 'object' ? exam.section?.id : exam.section || '',
  batch: typeof exam.batch === 'object' ? exam.batch?.id : exam.batch || '',
});

/** Stable key for shells that belong to the same admin-created exam series. */
export const getExamGroupKey = (exam = {}) => {
  const title = (exam.title || '').trim().toLowerCase();
  const fromDate = exam.from_date || '';
  return `${title}::${fromDate}`;
};

export const resolveRelationId = (value) => {
  if (value == null || value === '') return '';
  if (typeof value === 'object') return value.id || value.pk || '';
  return value;
};

/**
 * Unique audience identity: class + section + batch.
 * Falls back to display labels when ids are missing so shells still collapse correctly.
 */
export const getAudienceBucketKey = (exam = {}) => {
  const classId =
    resolveRelationId(exam.class_name) || exam.class_name_display || '';
  const sectionId =
    resolveRelationId(exam.section) || exam.section_display || '';
  const batchId = resolveRelationId(exam.batch) || exam.batch_display || '';
  return `${classId}|${sectionId}|${batchId}`;
};

const compareAudience = (a, b) => {
  const aLabel = formatAudienceLabel(a);
  const bLabel = formatAudienceLabel(b);
  return aLabel.localeCompare(bLabel, undefined, { numeric: true, sensitivity: 'base' });
};

const compareShellDetail = (a, b) => {
  const subjectCompare = (a.subject || '').localeCompare(b.subject || '', undefined, {
    sensitivity: 'base',
  });
  if (subjectCompare !== 0) return subjectCompare;
  return (a.code || '').localeCompare(b.code || '');
};

export const getGroupScheduleSummary = (shells = []) => {
  const total = shells.length;
  const scheduledCount = shells.filter((exam) => exam.is_scheduled === true).length;

  if (total === 0) {
    return { label: 'Pending teacher', tone: 'warning', scheduledCount: 0, total: 0 };
  }
  if (scheduledCount === 0) {
    return { label: 'Pending teacher', tone: 'warning', scheduledCount, total };
  }
  if (scheduledCount === total) {
    return { label: 'Scheduled', tone: 'success', scheduledCount, total };
  }
  return {
    label: `${scheduledCount}/${total} scheduled`,
    tone: 'mixed',
    scheduledCount,
    total,
  };
};

/**
 * Collapse shells that share the same class · section · batch.
 * Multiple subjects under one audience become an inner dropdown group.
 */
export const groupShellsByAudience = (shells = []) => {
  const map = new Map();

  shells.forEach((exam) => {
    const key = getAudienceBucketKey(exam);
    if (!map.has(key)) {
      map.set(key, {
        key,
        label: formatAudienceLabel(exam),
        classLabel: exam.class_name_display || '',
        shells: [],
      });
    }
    map.get(key).shells.push(exam);
  });

  return [...map.values()]
    .map((bucket) => {
      const sorted = [...bucket.shells].sort(compareShellDetail);
      return {
        ...bucket,
        shells: sorted,
        shellCount: sorted.length,
        hasMultiple: sorted.length > 1,
        schedule: getGroupScheduleSummary(sorted),
        primary: sorted[0] || null,
      };
    })
    .sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { numeric: true, sensitivity: 'base' })
    );
};

/**
 * Collapse API shells into unique exams (title + from_date),
 * then nest by unique class · section · batch for the inner accordion.
 */
export const groupUpcomingExams = (exams = []) => {
  const map = new Map();

  exams.forEach((exam) => {
    const key = getExamGroupKey(exam);
    if (!map.has(key)) {
      map.set(key, {
        key,
        title: exam.title || 'Untitled exam',
        from_date: exam.from_date || null,
        shells: [],
      });
    }
    map.get(key).shells.push(exam);
  });

  return [...map.values()]
    .map((group) => {
      const shells = [...group.shells].sort(compareAudience);
      const audienceBuckets = groupShellsByAudience(shells);
      const newest = shells.reduce((latest, exam) => {
        const stamp = exam.modified_on || exam.created_on || '';
        return stamp > (latest || '') ? stamp : latest;
      }, '');

      return {
        ...group,
        shells,
        audienceBuckets,
        audienceCount: audienceBuckets.length,
        shellCount: shells.length,
        schedule: getGroupScheduleSummary(shells),
        classLabels: [
          ...new Set(audienceBuckets.map((bucket) => bucket.classLabel).filter(Boolean)),
        ],
        newest,
      };
    })
    .sort((a, b) => {
      if (a.from_date && b.from_date && a.from_date !== b.from_date) {
        return a.from_date.localeCompare(b.from_date);
      }
      if (a.from_date && !b.from_date) return -1;
      if (!a.from_date && b.from_date) return 1;
      return a.title.localeCompare(b.title);
    });
};
